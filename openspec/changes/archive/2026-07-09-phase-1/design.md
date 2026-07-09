## Context

Phase 0 archived successfully: pnpm workspace, Fastify hello-world API, Vite React web, `@workshop/shared` placeholder. No database exists yet. `BASELINE_PLAN.md` Fase 1 defines the minimum schema and seed scenarios that power the later cancel/reschedule workshop demo.

## Goals / Non-Goals

**Goals:**

- Define Prisma schema for Client, Professional, Service, Appointment.
- Store `price` as integer cents for simple seed values.
- Seed mixed appointment states using dates computed relative to seed execution time.
- Provide `pnpm db:seed` at repo root as the Phase 1 done checkpoint.
- Use `prisma db push` for fast schema sync during baseline build.

**Non-Goals:**

- HTTP API, repositories, or Prisma client in `server.ts`.
- Zod schemas in `packages/shared`.
- Migration history files.
- History/audit tables or cancel/reschedule fields.

## Decisions

### Prisma location: `apps/api/prisma/`

Schema and seed live under the API package per `Taller.md` backend layout. `DATABASE_URL` points to `file:../dev.db` (SQLite file at `apps/api/dev.db`).

**Alternative considered:** root-level `prisma/` — rejected; database is owned by the API for this workshop.

### Schema sync: `db push` not `migrate dev`

`prisma db push` syncs schema to SQLite without migration files. Faster for baseline iteration; sufficient before the workshop OpenSpec change.

**Alternative considered:** `migrate dev` — deferred; adds migration folder maintenance without benefit for the teaching baseline.

### IDs: `cuid()` strings

All entities use `String @id @default(cuid())`. Works well with Prisma + SQLite and matches common workshop patterns.

### Price: integer cents

`Service.price` is `Int` storing cents (e.g. `1500` = $15.00). Avoids Decimal/float quirks in SQLite seeds.

### Seed strategy: wipe and reinsert

Seed deletes appointments → services → professionals → clients (FK order), then inserts fresh data. Rerunning `pnpm db:seed` is predictable.

### Seed dates: computed relative to `new Date()`

| Appointment | Computation | Status |
|---|---|---|
| Ana + Carlos + Corte | tomorrow 10:00 | scheduled |
| Luis + Dra. Vega + Consulta | tomorrow 14:00 | scheduled |
| María + Carlos + Corte | yesterday 09:00 | completed |
| Ana + Dra. Vega + Consulta | next Monday 11:00 | scheduled |
| Luis + Carlos + Barba | 3 days ago 16:00 | cancelled |

Hardcoded absolute dates would go stale and break the 2-hour rule demo later.

### Seed runner: `tsx`

API package already uses `tsx` for dev. Prisma seed config: `"seed": "tsx prisma/seed.ts"`.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| `.env` missing on fresh clone | Provide `.env.example`; seed/push docs in tasks verification |
| `db push` vs production migrations | Acceptable for baseline; workshop uses OpenSpec for feature work |
| ESM + Prisma seed | Use `tsx`; Prisma 5+ supports ESM projects |
| Optional cancelled row omitted | Include it so Phase 3 can show all three status badges |

## Migration Plan

Greenfield data layer:

1. `pnpm install` (adds Prisma deps)
2. Copy `.env.example` → `.env` in `apps/api` (or document one-time step)
3. `pnpm db:push`
4. `pnpm db:seed`
5. Verify with `pnpm db:studio` or sqlite inspection

Rollback: delete `apps/api/prisma/`, `apps/api/dev.db`, Prisma deps, and db scripts.

## Open Questions

- _(none blocking)_
