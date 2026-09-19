# NSS Connect Product Backlog

Priority guide: P0 = required before a real pilot; P1 = high-value pilot improvement; P2 = later enhancement.

## Epic A — Identity and access

### A1 — User login (P0)
As a user, I want to sign in securely so that my actions are associated with my account.

Acceptance criteria:

- Login succeeds for valid credentials.
- Invalid attempts return a generic error.
- Sessions expire and can be revoked.
- Passwords are never stored in plain text.

### A2 — Role authorization (P0)
As a program officer, I want officer actions protected so that volunteers cannot modify privileged records.

Acceptance criteria:

- Authorization is enforced on the API, not only in the UI.
- Volunteer requests to officer endpoints are rejected.
- Unauthorized attempts are logged without exposing secrets.

## Epic B — Persistent records

### B1 — Database schema (P0)
As an administrator, I want records stored in a persistent database so that redeployments do not erase data.

Acceptance criteria:

- Volunteers, events, registrations, attendance, announcements, and audit entries have defined tables.
- Relationships and uniqueness rules are enforced.
- A migration can create the schema from an empty database.

### B2 — Data migration (P0)
As an administrator, I want existing demo records migrated safely.

Acceptance criteria:

- A dry-run reports counts and conflicts.
- Migration is idempotent or safely repeatable.
- Post-migration smoke tests pass.

## Epic C — Event operations

### C1 — Event lifecycle rules (P0)
As an officer, I want event status changes to follow clear rules.

Acceptance criteria:

- Draft, open, postponed, completed, and revoked states are defined.
- Revocation removes or invalidates registrations according to policy.
- Past events cannot accept new registrations.

### C2 — Attendance approval (P0)
As an officer, I want to approve attendance and credit hours.

Acceptance criteria:

- Each attendance decision records actor and timestamp.
- Hours are validated and cannot be negative.
- Duplicate approvals are prevented.

## Epic D — Trust and accountability

### D1 — Audit log (P0)
As an administrator, I want sensitive changes recorded for review.

Acceptance criteria:

- Enrollment, profile edits, event changes, attendance decisions, and revocations are logged.
- Audit records include actor, action, target, time, and outcome.
- Normal users cannot edit audit entries.

### D2 — Data export (P1)
As an officer, I want to export filtered volunteer and event data.

Acceptance criteria:

- Export respects current filters.
- Export includes column headers and consistent date formats.
- Export access is permission-controlled.

## Epic E — User experience

### E1 — Mobile workflow (P1)
As a volunteer, I want to register for an event from a phone.

Acceptance criteria:

- Core registration works at narrow mobile widths.
- Buttons and inputs are touch-friendly.
- Errors remain visible after validation.

### E2 — Accessibility pass (P1)
As a user with accessibility needs, I want the system usable with keyboard and assistive technology.

Acceptance criteria:

- Form controls have labels.
- Focus order is logical.
- Color is not the only error indicator.
- Automated and manual checks are recorded.

## Epic F — Operations

### F1 — CI smoke tests (P0)
As a maintainer, I want every deployment checked automatically.

Acceptance criteria:

- Health, enrollment, event, registration, postpone, and revoke tests run against a test environment.
- A failing test blocks release or clearly marks it failed.

### F2 — Backup and restore drill (P0)
As an administrator, I want to recover from data loss.

Acceptance criteria:

- Backup frequency and retention are documented.
- Restore is tested with a sample backup.
- Recovery owner and expected recovery time are documented.
