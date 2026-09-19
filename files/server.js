const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = Number(process.env.PORT) || 3000;
const ROOT = __dirname;
const DATA_FILE = path.join(ROOT, 'nss-data.json');
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

function seedData() {
  return {
    state: { role: 'volunteer', announcement: 'Campus-wide service week registrations are now open. Check the Events Hub for upcoming drives.' },
    volunteers: [
      { id: 'NSS-2026-1001', name: 'Naveen', roll: '2024CSE019', registerNumber: '2024CSE019', dept: 'Computer Science (CSE)', year: '3rd Year', institution: 'NSS College of Engineering', age: 20, gender: 'Male', blood: 'O+', phone: '+91 98765 43210', email: 'rahul.sharma@college.edu', hours: 42, status: 'Active', registeredEvents: ['EVT-001', 'EVT-003'] },
      { id: 'NSS-2026-1002', name: 'Shaik Sahil', roll: '2024ECE015', registerNumber: '2024ECE015', dept: 'Electronics (ECE)', year: '2nd Year', institution: 'NSS College of Engineering', age: 19, gender: 'Female', blood: 'A+', phone: '+91 97654 32109', email: 'ananya.roy@college.edu', hours: 28, status: 'Active', registeredEvents: ['EVT-002'] },
      { id: 'NSS-2026-1003', name: 'Jashwanth', roll: '2024MECH022', registerNumber: '2024MECH022', dept: 'Mechanical (MECH)', year: '4th Year', institution: 'NSS College of Engineering', age: 21, gender: 'Male', blood: 'B+', phone: '+91 96543 21098', email: 'vikram.patel@college.edu', hours: 85, status: 'Active', registeredEvents: ['EVT-001', 'EVT-002', 'EVT-003'] },
      { id: 'NSS-2026-1004', name: 'Remesh', roll: '2024CIVIL018', registerNumber: '2024CIVIL018', dept: 'Civil Engineering', year: '3rd Year', institution: 'NSS College of Engineering', age: 20, gender: 'Female', blood: 'AB+', phone: '+91 95432 10987', email: 'priya.gupta@college.edu', hours: 15, status: 'Active', registeredEvents: [] },
      { id: 'NSS-2026-1005', name: 'Arjun Singh', roll: '2024BIO021', registerNumber: '2024BIO021', dept: 'Biotechnology', year: '2nd Year', institution: 'NSS College of Engineering', age: 19, gender: 'Male', blood: 'O-', phone: '+91 94321 09876', email: 'arjun.singh@college.edu', hours: 52, status: 'Active', registeredEvents: ['EVT-002', 'EVT-004'] },
      { id: 'NSS-2026-1006', name: 'Neha Patel', roll: '2024ARTS012', registerNumber: '2024ARTS012', dept: 'Arts & Humanities', year: '1st Year', institution: 'NSS College of Engineering', age: 18, gender: 'Female', blood: 'Others', phone: '+91 93210 98765', email: 'neha.patel@college.edu', hours: 8, status: 'Active', registeredEvents: [] }
    ],
    events: [
      { id: 'EVT-001', title: 'Blood Donation Drive', category: 'Health & Wellness', date: '2026-09-19', venue: 'Campus Health Center', hours: 8, target: 50, registered: 35, status: 'Active Today', inCharge: 'Dr. Sharma' },
      { id: 'EVT-002', title: 'Environmental Cleanup', category: 'Environmental', date: '2026-09-20', venue: 'College Campus Grounds', hours: 6, target: 40, registered: 28, status: 'Upcoming', inCharge: 'Prof. Mehta' },
      { id: 'EVT-003', title: 'Digital Literacy Workshop', category: 'Education', date: '2026-09-22', venue: 'Computer Lab Building', hours: 5, target: 30, registered: 15, status: 'Upcoming', inCharge: 'Prof. Kumar' },
      { id: 'EVT-004', title: 'Community Health Checkup', category: 'Health & Wellness', date: '2026-09-25', venue: 'Local Community Center', hours: 7, target: 45, registered: 20, status: 'Upcoming', inCharge: 'Dr. Patel' },
      { id: 'EVT-005', title: 'Tree Plantation Drive', category: 'Environmental', date: '2026-09-30', venue: 'College Botanical Garden', hours: 8, target: 60, registered: 0, status: 'Upcoming', inCharge: 'Prof. Singh' }
    ],
    attendanceQueue: [
      { id: 'ATT-001', volunteerId: 'NSS-2026-1001', volunteerName: 'Naveen', eventId: 'EVT-001', eventTitle: 'Blood Donation Drive', hours: 8, date: '2026-09-19' },
      { id: 'ATT-002', volunteerId: 'NSS-2026-1003', volunteerName: 'Jashwanth', eventId: 'EVT-003', eventTitle: 'Digital Literacy Workshop', hours: 5, date: '2026-09-22' }
    ]
  };
}

function loadData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const data = seedData();
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      return data;
    }
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return normalizeData(data);
  } catch (error) {
    console.error('Could not load data; recreating seed data:', error.message);
    const data = seedData();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return data;
  }
}

function normalizeData(data) {
  data.state ||= { role: 'volunteer', announcement: '' };
  data.volunteers ||= [];
  data.events ||= [];
  data.attendanceQueue ||= [];
  data.volunteers.forEach((v) => {
    if (!Array.isArray(v.registeredEvents)) {
      try { v.registeredEvents = JSON.parse(v.registeredEvents || '[]'); } catch { v.registeredEvents = []; }
    }
    v.registerNumber = v.registerNumber ?? v.roll ?? 'Not applicable';
    v.institution = v.institution ?? 'Not applicable';
    v.age = v.age ?? '';
    v.gender = v.gender ?? 'Prefer not to say';
    v.photo = validPhoto(v.photo) ? v.photo : '';
    v.dept = v.dept || 'Not applicable';
    v.phone = v.phone || 'Not applicable';
  });
  data.events.forEach((event) => {
    event.whatsappLink = typeof event.whatsappLink === 'string' ? event.whatsappLink : '';
  });
  return data;
}

let data = loadData();
let writeQueue = Promise.resolve();
const otpChallenges = new Map();

function normalizePhone(value) {
  return String(value || '').replace(/[\s()-]/g, '');
}

function validPhone(value) {
  return typeof value === 'string' && /^\+?[0-9\s()-]{10,}$/.test(value.trim());
}

function persist() {
  writeQueue = writeQueue.then(() => fs.promises.writeFile(DATA_FILE, JSON.stringify(data, null, 2)));
  return writeQueue;
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(body);
}

function sendError(res, status, message) { sendJson(res, status, { success: false, message }); }

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) req.destroy(new Error('Request too large'));
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try { resolve(JSON.parse(body)); } catch { reject(new Error('Request body must be valid JSON')); }
    });
    req.on('error', reject);
  });
}

function validText(value, max = 160) { return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= max; }
function validPhoto(value) { return value === '' || (typeof value === 'string' && /^data:image\/(png|jpeg|jpg|webp);base64,[A-Za-z0-9+/=]+$/.test(value) && value.length <= 700000); }
function validWhatsAppLink(value) {
  if (value === '' || value === undefined || value === null) return true;
  if (typeof value !== 'string' || value.trim().length > 500) return false;
  try {
    const parsed = new URL(value.trim());
    const host = parsed.hostname.toLowerCase();
    return ['http:', 'https:'].includes(parsed.protocol) && ['chat.whatsapp.com', 'wa.me', 'whatsapp.com', 'www.whatsapp.com'].includes(host);
  } catch {
    return false;
  }
}
function findVolunteer(id) { return data.volunteers.find((v) => v.id === id); }
function findEvent(id) { return data.events.find((e) => e.id === id); }
function nextVolunteerId() { return `NSS-2026-${1001 + data.volunteers.length}`; }

async function handleApi(req, res, url) {
  if (req.method === 'GET' && url.pathname === '/api/health') return sendJson(res, 200, { ok: true, service: 'nss-digital-management-system' });
  if (req.method === 'GET' && url.pathname === '/api/state') return sendJson(res, 200, data.state);
  if (req.method === 'GET' && url.pathname === '/api/volunteers') return sendJson(res, 200, data.volunteers);
  if (req.method === 'GET' && url.pathname === '/api/events') return sendJson(res, 200, data.events);
  if (req.method === 'GET' && url.pathname === '/api/attendance') return sendJson(res, 200, data.attendanceQueue);

  const verifyMatch = url.pathname.match(/^\/api\/verify\/([^/]+)$/);
  if (req.method === 'GET' && verifyMatch) {
    const volunteer = findVolunteer(decodeURIComponent(verifyMatch[1]));
    if (!volunteer) return sendJson(res, 404, { valid: false, message: 'Digital ID not found' });
    return sendJson(res, 200, {
      valid: true,
      verifiedAt: new Date().toISOString(),
      volunteer: {
        id: volunteer.id,
        name: volunteer.name,
        dept: volunteer.dept,
        year: volunteer.year,
        institution: volunteer.institution,
        blood: volunteer.blood,
        hours: volunteer.hours,
        status: volunteer.status,
        photo: volunteer.photo || ''
      }
    });
  }

  let body;
  try { body = await readBody(req); } catch (error) { return sendError(res, 400, error.message); }

  if (req.method === 'POST' && url.pathname === '/api/auth/request-otp') {
    const phone = String(body.phone || '').trim();
    const role = body.role === 'admin' ? 'admin' : 'volunteer';
    if (!validPhone(phone)) return sendError(res, 400, 'Enter a valid phone number');
    const normalized = normalizePhone(phone);
    const volunteer = data.volunteers.find((item) => normalizePhone(item.phone) === normalized);
    if (role === 'volunteer' && !volunteer) return sendError(res, 404, 'No volunteer account found for this phone number');
    const challengeId = crypto.randomUUID();
    const otp = String(crypto.randomInt(100000, 1000000));
    otpChallenges.set(challengeId, { otp, role, phone: normalized, volunteerId: volunteer?.id || null, expiresAt: Date.now() + 5 * 60 * 1000 });
    return sendJson(res, 200, { success: true, challengeId, demoOtp: otp, role, volunteer: volunteer ? { id: volunteer.id, name: volunteer.name } : null, message: 'Demo OTP generated. No SMS was sent.' });
  }

  if (req.method === 'POST' && url.pathname === '/api/auth/verify-otp') {
    const challenge = otpChallenges.get(String(body.challengeId || ''));
    if (!challenge || challenge.expiresAt < Date.now()) return sendError(res, 400, 'This OTP has expired. Request a new one.');
    if (String(body.otp || '').trim() !== challenge.otp) return sendError(res, 401, 'Incorrect OTP');
    otpChallenges.delete(String(body.challengeId));
    return sendJson(res, 200, { success: true, session: { role: challenge.role, phone: challenge.phone, volunteerId: challenge.volunteerId } });
  }

  if (req.method === 'POST' && url.pathname === '/api/state') {
    if (!['role', 'announcement'].includes(body.key)) return sendError(res, 400, 'Unsupported state key');
    if (body.key === 'role' && !['volunteer', 'admin'].includes(body.value)) return sendError(res, 400, 'Invalid role');
    if (body.key === 'announcement' && typeof body.value !== 'string') return sendError(res, 400, 'Invalid announcement');
    data.state[body.key] = String(body.value).trim();
    await persist();
    return sendJson(res, 200, { success: true, state: data.state });
  }

  if (req.method === 'POST' && url.pathname === '/api/volunteers') {
    const fields = ['name', 'dept', 'year', 'blood', 'phone', 'email'];
    if (fields.some((field) => !validText(body[field], 180))) return sendError(res, 400, 'All volunteer fields are required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return sendError(res, 400, 'Invalid email address');
    if (!/^\+?[0-9\s-]{10,}$/.test(body.phone)) return sendError(res, 400, 'Invalid phone number');
    const registerNumber = validText(body.registerNumber, 80) ? body.registerNumber.trim() : (validText(body.roll, 80) ? body.roll.trim() : 'Not applicable');
    if (data.volunteers.some((v) => (v.registerNumber || v.roll || '').toLowerCase() === registerNumber.toLowerCase() && registerNumber !== 'Not applicable' || v.email.toLowerCase() === body.email.trim().toLowerCase())) return sendError(res, 409, 'A volunteer with that register number or email already exists');
    const volunteer = { id: nextVolunteerId(), name: body.name.trim(), roll: registerNumber, registerNumber, dept: body.dept.trim(), year: body.year.trim(), institution: validText(body.institution, 180) ? body.institution.trim() : 'Not applicable', age: body.age ? Number(body.age) : '', gender: validText(body.gender, 40) ? body.gender.trim() : 'Prefer not to say', blood: body.blood.trim(), phone: body.phone.trim(), email: body.email.trim(), photo: '', hours: 0, status: 'Active', registeredEvents: [] };
    data.volunteers.push(volunteer);
    await persist();
    return sendJson(res, 201, volunteer);
  }

  const profileMatch = url.pathname.match(/^\/api\/volunteers\/([^/]+)\/profile$/);
  if (req.method === 'PUT' && profileMatch) {
    const volunteer = findVolunteer(decodeURIComponent(profileMatch[1]));
    if (!volunteer) return sendError(res, 404, 'Volunteer not found');
    const allowed = ['name', 'registerNumber', 'dept', 'year', 'institution', 'age', 'gender', 'phone', 'email', 'blood', 'photo'];
    if (allowed.some((field) => body[field] !== undefined && typeof body[field] !== 'string' && field !== 'age')) return sendError(res, 400, 'Invalid profile data');
    if (body.photo !== undefined && !validPhoto(body.photo)) return sendError(res, 400, 'Photo must be a PNG, JPEG, or WebP image under 500 KB');
    const name = String(body.name ?? volunteer.name).trim();
    const registerNumber = String(body.registerNumber ?? volunteer.registerNumber ?? volunteer.roll ?? 'Not applicable').trim() || 'Not applicable';
    const dept = String(body.dept ?? volunteer.dept ?? 'Not applicable').trim() || 'Not applicable';
    const institution = String(body.institution ?? volunteer.institution ?? 'Not applicable').trim() || 'Not applicable';
    const phone = String(body.phone ?? volunteer.phone ?? 'Not applicable').trim() || 'Not applicable';
    const email = String(body.email ?? volunteer.email ?? '').trim();
    const age = body.age === '' || body.age === null || body.age === undefined ? '' : Number(body.age);
    if (!validText(name, 120) || name.length < 2) return sendError(res, 400, 'Name is required');
    if (!validText(registerNumber, 80) || !validText(dept, 120) || !validText(institution, 180) || !validText(phone, 40)) return sendError(res, 400, 'Profile fields cannot be empty');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return sendError(res, 400, 'Invalid email address');
    if (age !== '' && (!Number.isInteger(age) || age < 1 || age > 120)) return sendError(res, 400, 'Age must be between 1 and 120');
    if (data.volunteers.some((other) => other.id !== volunteer.id && registerNumber !== 'Not applicable' && String(other.registerNumber || other.roll || '').toLowerCase() === registerNumber.toLowerCase())) return sendError(res, 409, 'That register number is already in use');
    volunteer.name = name;
    volunteer.registerNumber = registerNumber;
    volunteer.roll = registerNumber;
    volunteer.dept = dept;
    volunteer.year = String(body.year ?? volunteer.year ?? 'Not applicable').trim() || 'Not applicable';
    volunteer.institution = institution;
    volunteer.age = age;
    volunteer.gender = String(body.gender ?? volunteer.gender ?? 'Prefer not to say').trim() || 'Prefer not to say';
    volunteer.phone = phone;
    volunteer.email = email;
    volunteer.blood = String(body.blood ?? volunteer.blood ?? 'Others').trim() || 'Others';
    volunteer.photo = body.photo !== undefined ? body.photo : (volunteer.photo || '');
    await persist();
    return sendJson(res, 200, { success: true, volunteer });
  }

  if (req.method === 'POST' && url.pathname === '/api/events') {
    if (!validText(body.title, 180) || !validText(body.date, 40) || !Number.isInteger(Number(body.hours)) || Number(body.hours) < 1 || Number(body.hours) > 24) return sendError(res, 400, 'Title, date and valid hours are required');
    const whatsappLink = String(body.whatsappLink ?? '').trim();
    if (!validWhatsAppLink(whatsappLink)) return sendError(res, 400, 'Enter a valid WhatsApp group link from chat.whatsapp.com, wa.me, or whatsapp.com');
    const event = { id: `EVT-${crypto.randomInt(1000, 10000)}`, title: body.title.trim(), category: body.category || 'Community Drive', date: body.date, venue: body.venue || 'TBD', hours: Number(body.hours), target: Number(body.target) > 0 ? Number(body.target) : 50, registered: 0, status: body.status || 'Upcoming', inCharge: body.inCharge || 'NSS Program Officer', whatsappLink };
    data.events.push(event);
    await persist();
    return sendJson(res, 201, event);
  }

  if (req.method === 'POST' && url.pathname === '/api/events/revoke') {
    const event = findEvent(body.eventId);
    if (!event) return sendError(res, 404, 'Event not found');
    if (event.status === 'Revoked') return sendError(res, 409, 'This event is already revoked');
    if (event.status === 'Completed') return sendError(res, 409, 'Completed events cannot be revoked');
    event.status = 'Revoked';
    event.revokedAt = new Date().toISOString();
    data.volunteers.forEach((volunteer) => {
      volunteer.registeredEvents = (volunteer.registeredEvents || []).filter((id) => id !== event.id);
    });
    data.attendanceQueue = data.attendanceQueue.filter((item) => item.eventId !== event.id);
    event.registered = 0;
    await persist();
    return sendJson(res, 200, { success: true, event });
  }

  if (req.method === 'POST' && url.pathname === '/api/events/postpone') {
    const event = findEvent(body.eventId);
    const newDate = String(body.date || '').trim();
    if (!event) return sendError(res, 404, 'Event not found');
    if (event.status === 'Revoked') return sendError(res, 409, 'Revoked events cannot be postponed');
    if (event.status === 'Completed') return sendError(res, 409, 'Completed events cannot be postponed');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(newDate) || Number.isNaN(Date.parse(`${newDate}T00:00:00`))) return sendError(res, 400, 'Enter a valid new event date');
    event.previousDate = event.date;
    event.date = newDate;
    event.status = 'Postponed';
    event.postponedAt = new Date().toISOString();
    data.attendanceQueue.forEach((item) => {
      if (item.eventId === event.id) item.date = newDate;
    });
    await persist();
    return sendJson(res, 200, { success: true, event });
  }

  if (req.method === 'POST' && url.pathname === '/api/events/register') {
    const volunteer = findVolunteer(body.volunteerId);
    const event = findEvent(body.eventId);
    if (!volunteer || !event) return sendError(res, 404, 'Volunteer or event not found');
    if (event.status === 'Completed') return sendError(res, 409, 'This event has already concluded');
    if (volunteer.registeredEvents.includes(event.id)) return sendError(res, 409, 'Volunteer is already registered for this event');
    if (event.registered >= event.target) return sendError(res, 409, 'This event has reached capacity');
    volunteer.registeredEvents.push(event.id);
    event.registered += 1;
    const alreadyQueued = data.attendanceQueue.some((item) => item.volunteerId === volunteer.id && item.eventId === event.id);
    if (!alreadyQueued) data.attendanceQueue.push({ id: `ATT-${Date.now()}`, volunteerId: volunteer.id, volunteerName: volunteer.name, eventId: event.id, eventTitle: event.title, hours: event.hours, date: event.date });
    await persist();
    return sendJson(res, 200, { success: true, volunteer, event });
  }

  if (req.method === 'POST' && url.pathname === '/api/events/cancel') {
    const volunteer = findVolunteer(body.volunteerId);
    const event = findEvent(body.eventId);
    if (!volunteer || !event) return sendError(res, 404, 'Volunteer or event not found');
    if (!volunteer.registeredEvents.includes(event.id)) return sendError(res, 409, 'Volunteer is not registered for this event');
    const attendanceIndex = data.attendanceQueue.findIndex((item) => item.volunteerId === volunteer.id && item.eventId === event.id);
    if (attendanceIndex < 0) return sendError(res, 409, 'Attendance has already been approved; contact the Program Officer to amend the record');
    volunteer.registeredEvents = volunteer.registeredEvents.filter((id) => id !== event.id);
    event.registered = Math.max(0, Number(event.registered || 0) - 1);
    data.attendanceQueue.splice(attendanceIndex, 1);
    await persist();
    return sendJson(res, 200, { success: true, volunteer, event });
  }

  if (req.method === 'POST' && url.pathname === '/api/attendance/approve') {
    const index = data.attendanceQueue.findIndex((item) => item.id === body.id);
    if (index < 0) return sendError(res, 404, 'Attendance request not found');
    const item = data.attendanceQueue[index];
    const volunteer = findVolunteer(item.volunteerId);
    if (!volunteer) return sendError(res, 404, 'Volunteer not found');
    volunteer.hours = Number(volunteer.hours || 0) + Number(item.hours || 0);
    data.attendanceQueue.splice(index, 1);
    await persist();
    return sendJson(res, 200, { success: true, addedHours: Number(item.hours || 0), volunteer });
  }

  if (req.method === 'POST' && url.pathname === '/api/attendance/reject') {
    const index = data.attendanceQueue.findIndex((item) => item.id === body.id);
    if (index < 0) return sendError(res, 404, 'Attendance request not found');
    const item = data.attendanceQueue[index];
    const volunteer = findVolunteer(item.volunteerId);
    if (volunteer) volunteer.registeredEvents = volunteer.registeredEvents.filter((id) => id !== item.eventId);
    const event = findEvent(item.eventId);
    if (event) event.registered = Math.max(0, Number(event.registered || 0) - 1);
    data.attendanceQueue.splice(index, 1);
    await persist();
    return sendJson(res, 200, { success: true });
  }

  sendError(res, 404, 'API route not found');
}

function serveStatic(req, res, url) {
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === '/') pathname = '/index.html';
  const filePath = path.resolve(ROOT, `.${pathname}`);
  if (!filePath.startsWith(ROOT + path.sep)) return sendError(res, 403, 'Forbidden');
  fs.stat(filePath, (error, stats) => {
    if (error || !stats.isFile()) return sendError(res, 404, 'File not found');
    res.writeHead(200, { 'Content-Type': MIME_TYPES[path.extname(filePath)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  try {
    if (url.pathname.startsWith('/api/')) await handleApi(req, res, url);
    else if (req.method === 'GET') serveStatic(req, res, url);
    else sendError(res, 405, 'Method not allowed');
  } catch (error) {
    console.error(error);
    if (!res.headersSent) sendError(res, 500, 'Internal server error');
  }
});

server.listen(PORT, () => console.log(`NSS Digital Management System running at http://localhost:${PORT}`));
