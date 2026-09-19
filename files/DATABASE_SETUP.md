# NSS Connect — Local Setup

## Quick start

The project now runs with Node.js only; no `npm install` or SQLite dependency is required.

```bash
cd /Users/s.naveenkrishna/Downloads/studio/nss
npm run init-db   # optional: reset the demo dataset
npm start
```

Open http://localhost:3000.

The local server is `files/server.js`. It serves `files/index.html` and `files/app.js`, and exposes the API under `/api`. Demo data is stored in `files/nss-data.json` and is created automatically on first start.

## API smoke checks

```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/volunteers
curl http://localhost:3000/api/events
curl http://localhost:3000/api/attendance
curl http://localhost:3000/api/state
```

## Resetting demo data

Stop the server, then run:

```bash
npm run init-db
npm start
```

This restores six volunteers, five events, and two pending attendance approvals. Do not use the demo datastore for real personal data or production deployment.

## Implemented demo flows

- Volunteer and Program Officer views
- Volunteer roster with search, department, blood-group filtering, and CSV export
- Event listing and registration with duplicate/capacity checks
- Attendance approval and rejection with hour updates
- Volunteer enrollment with email, phone, and duplicate validation
- Announcements and event creation
- Service-hour milestone and digital ID preview

## Production gaps to disclose in a hackathon demo

Authentication and authorization are simulated by the role switcher. Production work would also need a hosted database, password/session management, audit logs, server-generated QR verification, certificate generation, notification delivery, and proper multi-user concurrency controls.
