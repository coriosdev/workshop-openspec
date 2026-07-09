## Why

Phase 0 delivered a runnable monorepo skeleton with no domain data. Phase 1 establishes the SQLite data model and seed fixtures so later phases (REST CRUD, UI, workshop demo) can build on a known database with mixed appointment states.

## What Changes

- Add Prisma to `apps/api` with SQLite datasource and domain schema (Client, Professional, Service, Appointment).
- Add `AppointmentStatus` enum: `scheduled`, `cancelled`, `completed`.
- Add idempotent seed script with workshop demo data and relative dates.
- Add root scripts: `db:push`, `db:seed`, `db:studio`.
- Add `apps/api/.env.example` with `DATABASE_URL`.

**Non-goals (deferred to later phases):**

- REST endpoints, Zod schemas, or Prisma client usage in the running server (Phase 2).
- Frontend changes (Phase 3).
- State transitions, cancel/reschedule, history, overlap rules (OpenSpec workshop change).
- Prisma migrations (`migrate dev`) — use `db push` for baseline speed.
- Changes to `packages/shared` domain types (Phase 2).

## Capabilities

### New Capabilities

- `prisma-schema`: Prisma schema with four domain entities and appointment status enum.
- `database-seed`: Seed script with clients, professionals, services, and five appointment scenarios.
- `db-scripts`: Root and API package scripts to push schema and run seed.

### Modified Capabilities

- _(none — Phase 0 capabilities unchanged at requirement level)_

## Impact

| Area | Impact |
|---|---|
| `apps/api` | New `prisma/` directory, Prisma dependencies, seed script, `.env.example` |
| Root `package.json` | New `db:push`, `db:seed`, `db:studio` scripts |
| `apps/web` | Unchanged |
| `packages/shared` | Unchanged |
| SQLite | New local `dev.db` (gitignored) created on first `db:push` |
