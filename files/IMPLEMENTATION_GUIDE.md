# NSS Connect — Implementation Guide

## Files

- `index.html` — complete web interface and responsive views
- `app.js` — frontend state, rendering, validation, and API calls
- `server.js` — dependency-free Node HTTP server and JSON API
- `init-db.js` — resets the local demo dataset
- `nss-data.json` — generated local data file
- `../package.json` — `npm start` and `npm run init-db` commands

## Start the app

```bash
cd /Users/s.naveenkrishna/Downloads/studio/nss
npm run init-db
npm start
```

Then visit http://localhost:3000.

## Demo path for judging

1. Start in Volunteer view and show the dashboard metrics, recent activities, Events Hub, and Digital ID.
2. Open Events Hub and register for an event that is not already registered. The capacity counter updates, a pending attendance approval is created, and a pending registration can be cancelled to release the capacity.
3. Switch to Program Officer view and open Officer Desk. Approve the pending record; the volunteer's service hours increase. Once approved, the volunteer sees attendance approved instead of a cancellation control.
4. Use Volunteer Roster to search, filter by `Others` blood group, preview an ID card, and export the CSV.
5. Open Enrol Volunteer, demonstrate the generated NSS ID and validation fields, then either submit synthetic data or close the modal.
6. Publish an announcement or create a new event to demonstrate admin communication and event management.

## Fixes included

- Added the missing `index.html`, `server.js`, and root `package.json`.
- Removed the runtime dependency on `sqlite3`; the prototype persists to a local JSON file so it works immediately on a clean Node installation.
- Added API health checks and validation for malformed JSON, invalid email/phone, duplicates, duplicate registrations, capacity, and invalid attendance IDs.
- Updated sample event dates to September 2026 so the demo is not seeded with stale 2025 dates.
- Fixed negative blood groups displaying as `O- Positive` or `B- Positive` on the digital ID.
- Added a real empty-state-friendly responsive interface for the existing frontend logic.

## Scope limitations

This is a hackathon prototype. The role switcher is not authentication, the first volunteer acts as the demo logged-in volunteer, the ID card has no real QR verification endpoint, and certificates are represented by milestone status rather than generated documents. State-changing APIs should be protected by real accounts and authorization before deployment.
