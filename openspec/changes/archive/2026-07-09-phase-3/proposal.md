## Why

Phase 2 delivered the REST API and shared Zod contracts. Phase 3 builds the browser UI so the baseline demonstrates create → list appointment flow with seed data in mixed states, matching `Taller.md`'s "frontend inicial" before the workshop cancel/reschedule change.

## What Changes

- Add Vite dev proxy from `/api` to the Fastify API on port 3000.
- Add TanStack Query with `QueryClientProvider` at app root.
- Add thin `fetchJson` API client with error envelope parsing.
- Add `features/appointments/` with list, create form, hooks, and types.
- Replace hello-world `App.tsx` with appointments screen (list + toggle form).
- Add minimal CSS for layout and status badges.

**Non-goals (deferred):**

- Cancel/reschedule buttons, modal, reason field.
- Business-rule error UX for 2h rule, overlap, business hours.
- React Router, CSS framework, auth, Vitest, README polish (Phase 4).
- CORS on API (proxy handles dev).

## Capabilities

### New Capabilities

- `vite-api-proxy`: Vite `server.proxy` for `/api` → `http://localhost:3000`.
- `web-query-client`: TanStack Query provider and default setup.
- `web-api-client`: Shared fetch helper and catalog/appointment API functions.
- `appointments-list-ui`: List with status badges and date formatting.
- `appointment-create-form`: Create form with dropdowns, datetime inputs, mutation.
- `appointments-feature`: Feature folder wiring and app shell integration.

### Modified Capabilities

- `web-scaffold`: App renders appointments feature instead of hello-world only.
- `shared-package`: Web imports `createAppointmentSchema` and `AppointmentStatus`.

## Impact

| Area | Impact |
|---|---|
| `apps/web` | New feature folder, proxy, Query, API client, styles |
| `apps/api` | Unchanged (no CORS) |
| `packages/shared` | Consumed by web for form validation |
| Dependencies | `@tanstack/react-query`, `zod` in web |
