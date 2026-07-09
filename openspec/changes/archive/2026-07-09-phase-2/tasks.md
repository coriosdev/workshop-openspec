## 1. Dependencies and shared schemas

- [x] 1.1 Add `zod` to `packages/shared` and `apps/api`; add `fastify-type-provider-zod` to `apps/api`
- [x] 1.2 Create shared Zod schemas for client, professional, service, appointment create/update
- [x] 1.3 Export `AppointmentStatus`, error codes, and schemas from `packages/shared/src/index.ts`

## 2. API infrastructure

- [x] 2.1 Create `apps/api/src/lib/prisma.ts` singleton
- [x] 2.2 Create `apps/api/src/lib/errors.ts` with `AppError` and Fastify error handler
- [x] 2.3 Create `apps/api/src/app.ts` with `buildApp()`, health route, route registration
- [x] 2.4 Refactor `apps/api/src/server.ts` to use `buildApp()`

## 3. Catalog modules

- [x] 3.1 Implement `clients` module (repository, service, routes)
- [x] 3.2 Implement `professionals` module (repository, service, routes)
- [x] 3.3 Implement `services` module (repository, service, routes)

## 4. Appointments module

- [x] 4.1 Implement `appointments` repository with Prisma includes
- [x] 4.2 Implement appointment service (FK checks, future-date validation, force scheduled status)
- [x] 4.3 Implement appointment routes (POST, GET list, GET by id)

## 5. Verification

- [x] 5.1 Run API and verify `GET /` hello still works
- [x] 5.2 `GET /appointments` returns seeded data with nested relations
- [x] 5.3 `POST /appointments` creates appointment with future date; past date returns 400
- [x] 5.4 `DELETE /clients/:id` on client with appointments returns 409
