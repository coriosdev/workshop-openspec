## 1. Prisma setup

- [x] 1.1 Add `prisma` and `@prisma/client` dependencies to `apps/api`
- [x] 1.2 Create `apps/api/prisma/schema.prisma` with four models and `AppointmentStatus` enum
- [x] 1.3 Add `apps/api/.env.example` with `DATABASE_URL=file:../dev.db`

## 2. Seed script

- [x] 2.1 Create `apps/api/prisma/seed.ts` with wipe-and-reinsert logic
- [x] 2.2 Seed clients, professionals, and services per baseline plan
- [x] 2.3 Seed five appointments with relative dates and mixed statuses (including cancelled)
- [x] 2.4 Configure `prisma.seed` in `apps/api/package.json` to run via `tsx`

## 3. Root scripts

- [x] 3.1 Add `db:push`, `db:seed`, and `db:studio` scripts to root `package.json`
- [x] 3.2 Ensure scripts delegate to the API package Prisma context

## 4. Verification

- [x] 4.1 Create `apps/api/.env` from example and run `pnpm db:push`
- [x] 4.2 Run `pnpm db:seed` and confirm seed completes without errors
- [x] 4.3 Verify mixed appointment statuses exist in the database (scheduled, completed, cancelled)
