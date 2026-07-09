## Context

Phase 3 archived: full-stack baseline works when DB is seeded. README still describes "Phase 0 scaffold" and omits `db:push`, `db:seed`, and `.env` setup. Error envelope exists from Phase 2. No Vitest or smoke checklist.

## Goals / Non-Goals

**Goals:**

- README enables fresh clone → see mixed-state appointments in browser.
- Smoke checklist for manual pre-workshop verification.
- 1–2 Vitest unit tests on `appointmentService.create` future-date rule.
- Root `pnpm test` runs API tests.
- `.env.example` committed and documented.

**Non-Goals:**

- Integration/HTTP tests, frontend tests.
- Field-level Zod error details.
- CI pipeline, production deploy docs.

## Decisions

### README structure

1. Intro — baseline checkpoint (not Phase 0)
2. Prerequisites — Node 20+, pnpm 9+
3. First-time setup — install, copy `.env`, `db:push`, `db:seed`
4. Development — `pnpm dev`, ports, proxy
5. Database scripts — `db:push`, `db:seed`, `db:studio`
6. API errors — JSON envelope example
7. Smoke test — link to `SMOKE_TEST.md`
8. Workshop — pointer to `Taller.md`, next change `appointment-reschedule-and-cancel`

### Smoke checklist

`SMOKE_TEST.md` at repo root with checkbox items matching Phase 4 done criterion.

### Vitest

- Package: `apps/api`
- Config: `vitest.config.ts`
- Tests: `apps/api/src/modules/appointments/service.test.ts`
- Mock repositories; use `vi.setSystemTime` for deterministic dates
- Test cases:
  1. Past `startsAt` → `STARTS_AT_MUST_BE_FUTURE`
  2. Future `startsAt` with valid FKs → calls repository create

### Root test script

```json
"test": "pnpm --filter @workshop/api test"
```

### .gitignore

Add `!.env.example` under `apps/api/` or global exception for `.env.example`.

### Error shape polish

No code rewrite — document existing `{ error: { code, message } }` in README. Phase 2 implementation is sufficient.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| `.env.example` gitignored | Explicit gitignore exception |
| Date test flakiness | `vi.setSystemTime` fixed clock |
| Service hard to test | Mock repos via vi.mock |

## Migration Plan

1. Fix gitignore for `.env.example`
2. Update README + add SMOKE_TEST.md
3. Add Vitest + tests
4. Add root test script
5. Run `pnpm test` and manual smoke

## Open Questions

- _(none)_
