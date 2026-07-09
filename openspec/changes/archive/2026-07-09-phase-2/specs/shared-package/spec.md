## MODIFIED Requirements

### Requirement: Shared package exports a minimal public API

The shared package SHALL define a `package.json` `exports` field and export domain Zod schemas, types, error code constants, and `WORKSHOP_NAME` from `src/index.ts`.

#### Scenario: Apps can import shared placeholder

- **WHEN** api or web imports a named export from `@workshop/shared`
- **THEN** TypeScript resolves the symbol and the value is available at runtime

#### Scenario: API imports domain schemas from shared

- **WHEN** API route handlers validate request bodies
- **THEN** they import Zod schemas from `@workshop/shared`

## ADDED Requirements

### Requirement: Shared package exports domain contracts beyond placeholder

`packages/shared` SHALL export domain Zod schemas, types, and error code constants in addition to `WORKSHOP_NAME`.

#### Scenario: Domain exports are reachable

- **WHEN** `apps/api` imports `@workshop/shared`
- **THEN** domain schema exports resolve without TypeScript errors
