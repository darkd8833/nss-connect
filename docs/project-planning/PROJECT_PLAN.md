# NSS Connect Project Plan

## 1. Product objective

Build a simple, trustworthy digital management system for NSS volunteers and program officers. The system should reduce manual registration work, make event participation visible, and provide reliable volunteer records without pretending to be an identity authority.

## 2. Success measures

### Pilot success

- 90% of pilot volunteers can complete registration without assistance.
- 95% of event registrations are recorded without duplicate entries.
- Program officers can create, postpone, revoke, and review events in under two minutes.
- No critical data loss during the pilot.
- All sensitive actions are attributable to an authenticated user.

### Product quality

- Health endpoint remains available during normal service hours.
- Core workflows have automated smoke tests.
- Data export works for roster and event reports.
- Accessibility issues found during pilot testing are tracked and prioritized.

## 3. Scope

### In scope

- Volunteer enrollment and profile management
- Event creation and lifecycle management
- Event registration and cancellation rules
- Attendance approval and service-hour credit
- Officer dashboard and volunteer dashboard
- Digital ID preview and QR verification
- CSV roster export
- Audit history for sensitive changes
- Persistent storage and backups

### Out of scope for the first pilot

- Government identity verification
- Certificate authority or legally significant certificates
- Complex multi-institution federation
- Native mobile applications
- Automated WhatsApp messaging
- Payment or fundraising features

## 4. Workstreams

1. Product and workflow validation
2. Security and authentication
3. Data persistence and migration
4. Core feature hardening
5. Reporting and exports
6. Operations and deployment
7. Pilot rollout and training

## 5. Milestone plan

### M0 — Prototype stabilization

- Confirm current live URL and health check.
- Remove or label smoke-test records.
- Document known limitations.
- Add repeatable API smoke tests.

Exit criteria: demo can be repeated from a clean seed state and all core flows pass.

### M1 — Secure pilot foundation

- Add login and session management.
- Enforce officer versus volunteer permissions server-side.
- Add request validation and rate limits.
- Add audit events for enrollment, event changes, attendance approval, and revocation.

Exit criteria: unauthorized users cannot perform officer actions; security review has no critical findings.

### M2 — Persistent data layer

- Select a free or approved database provider.
- Define schema and migrations.
- Add a repository layer so routes do not depend directly on JSON files.
- Migrate demo records and verify counts.
- Add backup/export procedure.

Exit criteria: restart and redeploy do not erase approved test records; migration can be repeated safely.

### M3 — Pilot readiness

- Improve mobile layout and accessibility.
- Add error states and empty states.
- Add officer reports and event attendance export.
- Prepare onboarding guide and support process.
- Conduct user acceptance testing.

Exit criteria: pilot group completes scripted tasks and all critical issues are resolved or accepted.

### M4 — Pilot and improvement

- Launch with a small group.
- Review weekly metrics and feedback.
- Fix high-impact friction.
- Decide whether to expand to more departments or institutions.

## 6. Delivery method

Use one-week iterations. Each iteration should produce a deployable increment, a short demo, and an updated risk/backlog review.

Every change should include:

- user outcome
- acceptance criteria
- test evidence
- deployment note
- rollback consideration

## 7. Key decisions still required

- Who owns the production data and access approvals?
- Which authentication provider is acceptable?
- Which database provider and free-tier limits are acceptable?
- What fields are required for enrollment and what fields are optional?
- What retention period applies to volunteer and attendance records?
- Who can revoke an event or edit service hours?
