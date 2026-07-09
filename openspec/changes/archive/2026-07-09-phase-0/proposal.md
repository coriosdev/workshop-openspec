## Why

The workshop needs a runnable monorepo skeleton before any domain work (database, CRUD, UI). Phase 0 establishes the pnpm workspace, TypeScript toolchain, and hello-world apps so later phases can build on a known-good foundation without fighting project setup.

## What Changes

- Add root workspace configuration (`package.json`, `pnpm-workspace.yaml`, shared `tsconfig` base).
- Create `packages/shared` as a minimal workspace package referenced by `apps/api` and `apps/web`.
- Create `apps/api` with a Fastify hello-world server.
- Create `apps/web` with a Vite + React hello-world app.
- Add root `pnpm dev` script that starts API and web in parallel.
- Add `README.md` with install and dev instructions.

**Non-goals (deferred to later phases):**

- Prisma, SQLite, or seed data (Phase 1).
- REST CRUD endpoints or Zod domain schemas (Phase 2).
- TanStack Query, appointment UI, or API proxy (Phase 3).
- Vitest tests, error-shape polish, smoke-test checklist (Phase 4).
- Cancel/reschedule feature or OpenSpec cleanup (post-baseline workshop).
- Authentication, Docker, Turborepo, or ESLint/Prettier setup beyond what is needed to boot.

## Capabilities

### New Capabilities

- `monorepo-workspace`: pnpm workspaces, TypeScript across packages, root dev scripts.
- `api-scaffold`: Fastify server that starts and responds on a fixed port.
- `web-scaffold`: Vite + React app that renders in the browser.
- `shared-package`: Minimal `@workshop/shared` package wired into api and web.

### Modified Capabilities

- _(none — greenfield repo; no existing specs under `openspec/specs/`)_

## Impact

| Area | Impact |
|---|---|
| Repository root | New `package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, `README.md` |
| `packages/shared` | New package with exports map and placeholder export |
| `apps/api` | New Fastify app (`server.ts`), own `package.json` and `tsconfig.json` |
| `apps/web` | New Vite + React app, own `package.json`, `vite.config.ts`, entry HTML/TSX |
| `openspec/` | Unchanged — remains until user cleanup after baseline (per `BASELINE_PLAN.md`) |
| Dependencies | Fastify, React, Vite, TypeScript (dev tooling only; no Prisma/Zod/TanStack yet) |
