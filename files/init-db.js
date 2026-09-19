const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'nss-data.json');
const serverSource = fs.readFileSync(path.join(__dirname, 'server.js'), 'utf8');
const start = serverSource.indexOf('function seedData() {');
const end = serverSource.indexOf('\n\nfunction loadData()', start);
if (start < 0 || end < 0) throw new Error('Could not locate seed data in server.js');
const seedSource = serverSource.slice(start, end).replace(/^function seedData\(\) \{/, 'return function seedData() {').replace(/\n\}$/, '\n};');
const seedData = new Function(`${seedSource}`)();
fs.writeFileSync(dataFile, JSON.stringify(seedData(), null, 2));
console.log('Database reset complete.');
console.log(`  Volunteers: ${seedData().volunteers.length}`);
console.log(`  Events: ${seedData().events.length}`);
console.log(`  Pending approvals: ${seedData().attendanceQueue.length}`);
console.log(`  Data file: ${dataFile}`);
