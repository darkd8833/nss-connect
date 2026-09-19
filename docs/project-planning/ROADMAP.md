# NSS Connect Roadmap

## Now — Stabilize the demo

Priority: P0

- Add automated health, volunteer, event, registration, postpone, and revoke tests.
- Add a clean demo reset command or admin-only cleanup flow.
- Replace browser-only validation with consistent server validation.
- Document the current JSON storage limitation prominently.
- Add structured error responses for API failures.

Definition of done: a new reviewer can run the app, execute the demo script, and understand what is and is not production-ready.

## Next — Secure the core workflows

Priority: P0

- Add authentication.
- Add server-side authorization middleware.
- Hash and protect credentials if local accounts are used.
- Add audit records for privileged actions.
- Add rate limiting and safer CORS/security headers.
- Add input validation for email, phone, dates, IDs, and URLs.

Definition of done: volunteer and officer permissions are enforced by the server and actions can be traced.

## Later — Make data durable

Priority: P0

- Choose database provider within approved budget.
- Create normalized schema for volunteers, events, registrations, attendance, announcements, and audit entries.
- Add migrations and seed data.
- Add repository/data-access functions.
- Add backup and restore instructions.

Definition of done: data survives service restarts and redeployments, and restore has been tested.

## Pilot — Improve usability and reporting

Priority: P1

- Improve responsive mobile screens.
- Add accessible labels, keyboard navigation, and contrast checks.
- Add roster, event, attendance, and service-hour reports.
- Add CSV import/export validation.
- Add clearer success/error messages.
- Create volunteer and officer onboarding guides.

Definition of done: pilot users complete scripted tasks with minimal assistance.

## Scale — Operational maturity

Priority: P2

- Add staging environment.
- Add CI checks and deployment gates.
- Add error tracking and uptime alerts.
- Add privacy/retention controls.
- Add multi-institution support only after pilot evidence.

Definition of done: releases are repeatable, observable, and reversible.
