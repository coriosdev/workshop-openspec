## ADDED Requirements

### Requirement: Shared package is a workspace dependency

The `packages/shared` package SHALL be referenced from both `apps/api` and `apps/web` using the pnpm workspace protocol (`workspace:*`).

#### Scenario: Shared package resolves from apps

- **WHEN** `apps/api` or `apps/web` imports from `@workshop/shared`
- **THEN** the import resolves to the local `packages/shared` source without publishing to a registry

### Requirement: Shared package exports a minimal public API

The shared package SHALL define a `package.json` `exports` field and export at least one named symbol from `src/index.ts`.

#### Scenario: Apps can import shared placeholder

- **WHEN** api or web imports a named export from `@workshop/shared`
- **THEN** TypeScript resolves the symbol and the value is available at runtime
