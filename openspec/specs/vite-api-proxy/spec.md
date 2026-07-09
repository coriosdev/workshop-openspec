# vite-api-proxy Specification

## Purpose
TBD - created by archiving change phase-3. Update Purpose after archive.
## Requirements
### Requirement: Vite proxies API requests in development

The web dev server SHALL proxy `/api` requests to the Fastify API on port 3000.

#### Scenario: Proxied appointment list request

- **WHEN** the browser fetches `/api/appointments` during `pnpm dev`
- **THEN** the request is forwarded to `http://localhost:3000/appointments`

