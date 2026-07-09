## ADDED Requirements

### Requirement: Vite proxies API requests in development

The web dev server SHALL proxy `/api` requests to the Fastify API on port 3000.

#### Scenario: Proxied appointment list request

- **WHEN** the browser fetches `/api/appointments` during `pnpm dev`
- **THEN** the request is forwarded to `http://localhost:3000/appointments`
