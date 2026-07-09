## Context

Phase 1 archived: Prisma schema, seed, `pnpm db:seed`. API is still hello-world in `server.ts`. `Taller.md` expects CRUD modules and appointment endpoints before the workshop feature change.

## Goals / Non-Goals

**Goals:**

- Modular Fastify REST API with routes → service → repository per domain.
- Shared Zod contracts for create/update bodies used by API (and Phase 3 frontend).
- Appointment responses include nested `client`, `professional`, `service`.
- `startsAt > now` validation in appointment service layer.
- Minimal stable error shape: `{ "error": { "code": string, "message": string } }`.
- Full catalog CRUD (list, get, create, patch, delete).

**Non-Goals:**

- CORS, Vite proxy (Phase 3).
- Overlap, business hours, 2-hour rule, cancel/reschedule.
- Pagination, filtering, auth.
- Vitest (Phase 4).

## Decisions

### App structure: `app.ts` + `server.ts`

- `app.ts` — `buildApp()` registers plugins, error handler, routes.
- `server.ts` — imports `buildApp()`, listens on port 3000.
- `lib/prisma.ts` — singleton `PrismaClient`.
- `lib/errors.ts` — `AppError` class + Fastify error handler.

### Validation: Zod in shared + route parsing

- Request bodies validated with Zod schemas from `@workshop/shared`.
- Route params (`:id`) validated as non-empty strings (cuid).
- `fastify-type-provider-zod` for typed routes where practical.

### Appointment create rules

- Body: `clientId`, `professionalId`, `serviceId`, `startsAt` (ISO datetime).
- Service checks each FK exists → `404 NOT_FOUND` with entity name.
- Service checks `startsAt > new Date()` → `400 STARTS_AT_MUST_BE_FUTURE`.
- Status always `scheduled`; ignore/strip `status` if sent.
- Response: created appointment with nested relations.

### Appointment list/detail shape

```json
{
  "id": "cuid",
  "startsAt": "ISO-8601",
  "status": "scheduled",
  "client": { "id", "name", "phone" },
  "professional": { "id", "name", "specialty" },
  "service": { "id", "name", "durationMinutes", "price" }
}
```

List sorted by `startsAt` ascending. `price` is integer cents.

### Catalog CRUD

| Method | Path | Behavior |
|--------|------|----------|
| GET | `/clients` | List all |
| GET | `/clients/:id` | Get one or 404 |
| POST | `/clients` | Create |
| PATCH | `/clients/:id` | Partial update |
| DELETE | `/clients/:id` | Delete or 409 if has appointments |

Same pattern for `/professionals` and `/services`.

DELETE with FK appointments → `409 HAS_APPOINTMENTS`.

### Error mapping

| Condition | HTTP | Code |
|-----------|------|------|
| Zod validation failure | 400 | `INVALID_BODY` |
| Entity not found | 404 | `NOT_FOUND` |
| Future date violation | 400 | `STARTS_AT_MUST_BE_FUTURE` |
| Delete with FK dependents | 409 | `HAS_APPOINTMENTS` |
| Unknown server error | 500 | `INTERNAL_ERROR` |

Prisma `P2025` → 404, `P2003` → 400/404 for bad FKs.

### CORS: deferred to Phase 3

Phase 3 adds Vite proxy to API. Phase 2 verified via curl/Postman only.

### Health route

Keep `GET /` returning plain-text hello to satisfy existing `api-scaffold` spec.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| Large implementation surface (4 modules) | Repetitive catalog modules first; appointments last |
| Timezone edge cases on `startsAt` | Accept ISO strings; compare with `new Date()` at validation time |
| Shared package build vs TS source imports | Keep `exports` pointing to `./src/index.ts` like Phase 0 |

## Migration Plan

1. Add dependencies (`zod`, type provider).
2. Scaffold `app.ts`, `lib/`, module structure.
3. Implement shared schemas.
4. Implement catalog modules (clients → professionals → services).
5. Implement appointments module.
6. Smoke test with curl.

## Open Questions

- _(none — decisions locked from explore)_
