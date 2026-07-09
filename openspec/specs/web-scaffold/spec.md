# web-scaffold

## Purpose

Vite + React hello-world scaffold for the workshop baseline (Phase 0).
## Requirements
### Requirement: Web dev server starts with Vite

The web package SHALL expose a `dev` script that starts a Vite development server on port `5173` by default.

#### Scenario: Web app renders hello world

- **WHEN** a developer opens the Vite dev server URL in a browser
- **THEN** the appointments feature is visible with list and create controls

### Requirement: Web app is written in TypeScript

The web package SHALL use React with TypeScript entry files (e.g. `src/main.tsx`).

#### Scenario: Web dev script uses Vite

- **WHEN** a developer runs `pnpm dev` inside `apps/web`
- **THEN** Vite serves the React application with hot module replacement enabled

