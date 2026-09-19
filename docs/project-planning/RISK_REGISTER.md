# NSS Connect Risk Register

| ID | Risk | Impact | Likelihood | Mitigation | Owner | Trigger |
|---|---|---:|---:|---|---|---|
| R1 | JSON file storage is lost on restart or redeploy | High | High | Move to persistent database before real pilot; keep exports until then | Technical owner | Any data disappears after restart |
| R2 | UI role switching is mistaken for real security | High | High | Add authentication and server-side authorization | Technical owner | Unauthorized API action succeeds |
| R3 | Duplicate volunteer or event records | Medium | Medium | Add database uniqueness constraints and duplicate checks | Product/technical owner | Duplicate enrollment report |
| R4 | Sensitive volunteer data is exposed | High | Medium | Minimize fields, restrict access, use HTTPS, audit access, define retention | Data owner | Privacy complaint or unexpected exposure |
| R5 | Free hosting sleeps and causes slow first request | Medium | High | Explain expected delay, add health checks, upgrade only if needed | Operations owner | User reports timeout or long first load |
| R6 | Smoke-test records pollute the demo | Low | High | Add reset/cleanup capability and a named demo dataset | Technical owner | Test IDs appear in live roster |
| R7 | Event revocation rules are misunderstood | High | Medium | Document state transitions and confirm with officers | Product owner | Conflicting registration/attendance outcome |
| R8 | No reliable backup or restore process | High | Medium | Automate exports and run restore drills | Data owner | Backup cannot be restored |
| R9 | Requirements expand before core workflows are secure | Medium | High | Use P0/P1/P2 backlog and require acceptance criteria | Product owner | New feature displaces security work |
| R10 | Deployment changes break live service | High | Medium | Use staging, smoke tests, health checks, and rollback notes | Operations owner | Failed deployment or health check |

## Review cadence

Review this register weekly during development and before every pilot release. Close a risk only when evidence shows the mitigation works; do not close it merely because work has been planned.
