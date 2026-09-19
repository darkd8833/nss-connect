# NSS Connect Project Planning Kit

This package contains planning materials for taking NSS Connect from a hackathon-ready prototype toward a dependable pilot deployment.

## Current baseline

- Live deployment: https://nss-connect-2fpv.onrender.com
- Source repository: https://github.com/darkd8833/nss-connect
- Current stack: Node.js, vanilla JavaScript, HTML/CSS
- Current storage: local JSON file (`files/nss-data.json`)
- Current deployment: Render free web service
- Health check: `/api/health`

## Recommended sequence

1. Stabilize the current demo and remove test records.
2. Add authentication and role-based authorization.
3. Introduce a persistent database behind a repository/data-access layer.
4. Add audit logging, backups, and operational monitoring.
5. Run a small pilot with real NSS users.
6. Improve reporting, accessibility, and mobile workflows.

## Files in this kit

- `PROJECT_PLAN.md` — goals, scope, milestones, and delivery approach
- `ROADMAP.md` — phased roadmap with exit criteria
- `PRODUCT_BACKLOG.md` — prioritized epics and user stories
- `RISK_REGISTER.md` — risks, mitigations, and owners
- `RELEASE_PLAN.md` — release checklist and rollback plan
- `MEETING_TEMPLATES.md` — templates for kickoff, weekly review, and pilot feedback
