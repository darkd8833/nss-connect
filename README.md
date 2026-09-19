# NSS Connect — Digital Management System

A runnable hackathon prototype for volunteer registration, service events, attendance approvals, announcements, performance tracking, and digital NSS IDs.

## Run locally

Requirements: Node.js 18 or newer. No npm package installation is required.

```bash
cd /Users/s.naveenkrishna/Downloads/studio/nss
npm run init-db   # optional: reset the demo data
npm start
```

Open http://localhost:3000.

The app stores demo data in `files/nss-data.json`, which is generated automatically and is intentionally ignored by the app code as a local demo datastore. To reset the demo state, run `npm run init-db` again.

## Demo flows

- Switch between Volunteer and Program Officer views.
- Use Events Hub to register the demo volunteer for an available event; pending registrations can be cancelled before approval. Events with a WhatsApp group link show a join action.
- Use Officer Desk to approve or reject attendance, credit service hours, create events with an optional WhatsApp group link, and manage recent activities. Program Officers can postpone an event to a new date or revoke it; revoking removes registrations and pending approvals. Approved attendance cannot be cancelled from the volunteer view.
- Enrol a volunteer from the officer dashboard; the server validates the email, phone, and duplicates.
- Use Volunteer Roster to filter and export the roster as CSV.
- Use Digital ID to preview an NSS ID card, upload a profile photo, and edit saved details.
- Scan or open the Digital ID QR code to verify the live saved record at `verify.html?id=<NSS-ID>`.

## Important scope note

This is a hackathon-ready local prototype, not a production identity or certificate authority. Authentication, certificate PDF generation, role permissions, audit logs, and multi-user database hosting should be added before deployment beyond a demo. QR verification is implemented for the local prototype and should use HTTPS plus authenticated records in production.
