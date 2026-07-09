## ADDED Requirements

### Requirement: API dev server starts on a fixed port

The API package SHALL expose a `dev` script that starts a Fastify HTTP server on port `3000` by default.

#### Scenario: API responds to health check

- **WHEN** the API dev server is running
- **THEN** a GET request to `/` returns HTTP 200 with a plain-text hello message

### Requirement: API is written in TypeScript

The API package SHALL use TypeScript with an entry point under `src/` (e.g. `src/server.ts`).

#### Scenario: API dev script uses TypeScript runner

- **WHEN** a developer runs `pnpm dev` inside `apps/api`
- **THEN** the Fastify server starts from the TypeScript source without a separate manual build step for local dev
