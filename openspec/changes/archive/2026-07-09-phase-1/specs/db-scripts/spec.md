## ADDED Requirements

### Requirement: Root database scripts exist

The repository root SHALL expose scripts to push schema, seed data, and open Prisma Studio.

#### Scenario: Push schema from root

- **WHEN** a developer runs `pnpm db:push` from the repository root
- **THEN** the Prisma schema is applied to the SQLite database

#### Scenario: Seed from root

- **WHEN** a developer runs `pnpm db:seed` from the repository root
- **THEN** the seed script executes and populates the database

#### Scenario: Studio from root

- **WHEN** a developer runs `pnpm db:studio` from the repository root
- **THEN** Prisma Studio starts against the configured SQLite database

### Requirement: API package declares Prisma seed command

`apps/api/package.json` SHALL configure Prisma to run the TypeScript seed via `tsx`.

#### Scenario: Prisma invokes seed script

- **WHEN** `prisma db seed` is run in the API package context
- **THEN** `prisma/seed.ts` executes via `tsx`
