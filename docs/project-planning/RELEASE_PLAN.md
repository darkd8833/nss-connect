# NSS Connect Release Plan

## Release types

### Demo release

Purpose: show the current prototype to reviewers.

Required checks:

- App loads.
- `/api/health` returns success.
- Volunteer enrollment works.
- Event creation and registration work.
- Postpone and revoke behavior matches the documented rules.
- No secrets are committed.

### Pilot release

Purpose: support a small real user group.

Required gates:

- Authentication and API authorization enabled.
- Persistent database configured and migration verified.
- Backup and restore tested.
- Audit log enabled for sensitive actions.
- Critical security and privacy issues resolved.
- Mobile and accessibility checks completed.
- Support contact and incident process documented.

## Pre-release checklist

- [ ] Confirm commit and change summary.
- [ ] Review database migration and rollback approach.
- [ ] Run automated tests.
- [ ] Run live smoke tests in the intended environment.
- [ ] Check health endpoint.
- [ ] Verify environment variables without exposing values.
- [ ] Confirm no debug credentials or test secrets are present.
- [ ] Review user-facing copy and error messages.
- [ ] Record known limitations.
- [ ] Confirm backup status.

## Deployment procedure

1. Announce a short deployment window.
2. Confirm the current live version and last known-good commit.
3. Deploy the new version.
4. Watch build and startup logs.
5. Check `/api/health`.
6. Run core smoke tests.
7. Review logs for errors.
8. Announce success or rollback.

## Rollback procedure

1. Stop additional changes.
2. Identify the last known-good commit.
3. Redeploy that commit or restore the previous service version.
4. Run health and core workflow tests.
5. Verify data integrity.
6. Record the cause and follow-up action.

## Post-release review

- What changed?
- What worked?
- What failed or was unclear?
- Were users affected?
- Did monitoring detect the issue?
- What backlog item prevents recurrence?
