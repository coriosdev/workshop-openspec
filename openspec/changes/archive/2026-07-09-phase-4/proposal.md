## Why

Phases 0–3 delivered a working appointment booking baseline (database, API, UI). Phase 4 is the workshop checkpoint: documentation, a minimal test safety net, and a smoke checklist so anyone can clone, run, and see seed appointments in mixed states before the OpenSpec cancel/reschedule change.

## What Changes

- Expand `README.md` with first-time DB setup, seed, ports, expected UI, and workshop context.
- Add `SMOKE_TEST.md` manual verification checklist.
- Add Vitest to `apps/api` with 1–2 unit tests for future-date appointment validation.
- Add root `pnpm test` script.
- Ensure `.env.example` is committable (gitignore exception).
- Document API error envelope in README.

**Non-goals (deferred):**

- Cancel/reschedule, E2E browser tests, CI, ESLint.
- OpenSpec cleanup (user does before workshop).
- Rewriting error handling (already implemented in Phase 2).

## Capabilities

### New Capabilities

- `readme-workshop-bootstrap`: Complete README for clone → seed → dev → UI.
- `smoke-test-checklist`: Manual smoke test checklist file.
- `vitest-appointment-validation`: Vitest config and future-date service tests.
- `monorepo-test-script`: Root `test` script delegating to API.

### Modified Capabilities

- `monorepo-workspace`: README requirement extended for DB bootstrap and seed.
- `api-error-handling`: Document error envelope in README.

## Impact

| Area | Impact |
|---|---|
| `README.md` | Major update |
| `SMOKE_TEST.md` | New file |
| `apps/api` | Vitest config + test file |
| Root `package.json` | `test` script |
| `.gitignore` | Allow `.env.example` |
