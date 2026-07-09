# api-app-structure Specification

## Purpose
TBD - created by archiving change phase-2. Update Purpose after archive.
## Requirements
### Requirement: Fastify app is built via buildApp factory

The API package SHALL expose a `buildApp()` function that creates and configures the Fastify instance.

#### Scenario: Server entry uses buildApp

- **WHEN** `server.ts` starts the API
- **THEN** it imports `buildApp()` from `app.ts` and calls `listen` on the returned instance

### Requirement: Prisma client singleton exists

The API package SHALL provide a shared Prisma client instance for repositories.

#### Scenario: Repositories use shared client

- **WHEN** a repository performs a database query
- **THEN** it uses the singleton from `lib/prisma.ts`

### Requirement: Domain routes are registered on the app

The Fastify app SHALL register routes for clients, professionals, services, and appointments modules.

#### Scenario: Appointment routes are reachable

- **WHEN** the API is running
- **THEN** `GET /appointments` is registered and responds (not 404 from missing route)

