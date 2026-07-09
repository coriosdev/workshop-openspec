## Why

Phase 1 delivered the SQLite data model and seed fixtures. Phase 2 exposes that data through a modular Fastify REST API so the workshop baseline matches `Taller.md`'s "backend inicial" before the frontend (Phase 3) and the OpenSpec cancel/reschedule change.

## What Changes

- Split `apps/api` into `app.ts` (Fastify setup) and `server.ts` (listen).
- Add Prisma client singleton and global error handler.
- Add four domain modules: `clients`, `professionals`, `services`, `appointments` (routes → service → repository).
- Add Zod request/response contracts in `packages/shared`.
- Implement full catalog CRUD for clients, professionals, and services.
- Implement appointment create, list, and get-by-id with nested relations in responses.
- Validate `startsAt` is in the future and foreign keys exist on appointment create.

**Non-goals (deferred):**

- Cancel, reschedule, history, state transitions.
- 2-hour rule, business hours, overlap detection.
- CORS (`@fastify/cors`) — Vite proxy in Phase 3.
- Frontend changes, Vitest tests, README polish (Phase 3/4).
- Accepting `status` from clients on appointment create.

## Capabilities

### New Capabilities

- `api-app-structure`: `app.ts`/`server.ts` split, Prisma singleton, route registration.
- `api-error-handling`: Minimal JSON error envelope and HTTP status mapping.
- `shared-domain-schemas`: Zod schemas and shared types for domain DTOs.
- `clients-crud`: REST CRUD for clients.
- `professionals-crud`: REST CRUD for professionals.
- `services-crud`: REST CRUD for services.
- `appointments-api`: Create, list, and get appointments with relations.

### Modified Capabilities

- `api-scaffold`: Hello route preserved inside new app structure.
- `shared-package`: Exports domain schemas and types beyond `WORKSHOP_NAME`.

## Impact

| Area | Impact |
|---|---|
| `apps/api` | New `app.ts`, `lib/`, `modules/`; `server.ts` simplified |
| `packages/shared` | Zod schemas, types, error codes |
| `apps/web` | Unchanged |
| Dependencies | `zod`, `fastify-type-provider-zod` (or equivalent validation in routes) |
| `openspec/specs/` | Updated on archive with new/modified capabilities |
