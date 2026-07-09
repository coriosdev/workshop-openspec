# shared-package

## Purpose

Minimal shared workspace package wired into api and web for the workshop baseline (Phase 0).
## Requirements
### Requirement: Shared package is a workspace dependency

The `packages/shared` package SHALL be referenced from both `apps/api` and `apps/web` using the pnpm workspace protocol (`workspace:*`).

#### Scenario: Shared package resolves from apps

- **WHEN** `apps/api` or `apps/web` imports from `@workshop/shared`
- **THEN** the import resolves to the local `packages/shared` source without publishing to a registry

### Requirement: Shared package exports a minimal public API

The shared package SHALL define a `package.json` `exports` field and export domain Zod schemas, types, error code constants, and `WORKSHOP_NAME` from `src/index.ts`.

#### Scenario: Apps can import shared placeholder

- **WHEN** api or web imports a named export from `@workshop/shared`
- **THEN** TypeScript resolves the symbol and the value is available at runtime

#### Scenario: API imports domain schemas from shared

- **WHEN** API route handlers validate request bodies
- **THEN** they import Zod schemas from `@workshop/shared`

### Requirement: Shared package exports domain contracts beyond placeholder

`packages/shared` SHALL export domain Zod schemas, types, and error code constants in addition to `WORKSHOP_NAME`.

#### Scenario: Domain exports are reachable

- **WHEN** `apps/api` imports `@workshop/shared`
- **THEN** domain schema exports resolve without TypeScript errors

### Requirement: Web imports shared schemas for form validation

The web app SHALL import `createAppointmentSchema` and `AppointmentStatus` from `@workshop/shared`.

#### Scenario: Form uses shared appointment schema

- **WHEN** the create appointment form validates input
- **THEN** it uses `createAppointmentSchema` from `@workshop/shared`

