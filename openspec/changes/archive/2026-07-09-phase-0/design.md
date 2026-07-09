## Context

The repository currently contains only workshop documentation (`Taller.md`, `BASELINE_PLAN.md`) and OpenSpec configuration. No `apps/` or `packages/` exist yet. Phase 0 is the first construction step of the baseline plan: a runnable monorepo skeleton with no domain logic.

Constraints from `BASELINE_PLAN.md`:

- Stack: pnpm workspaces, TypeScript, Fastify (api), React + Vite (web).
- `openspec/` stays in place until post-baseline cleanup.
- Done criterion: `pnpm install && pnpm dev` boots both apps.

## Goals / Non-Goals

**Goals:**

- Establish monorepo layout matching the workshop target structure.
- Prove workspace linking (`@workshop/shared` consumed by api and web).
- Provide a single root `pnpm dev` entry point.
- Document install and dev steps in `README.md`.

**Non-Goals:**

- Database, Prisma, seed scripts (Phase 1).
- REST CRUD, Zod domain schemas, module structure (Phase 2).
- TanStack Query, Vite API proxy, appointment UI (Phase 3).
- Vitest, error-shape conventions, smoke-test checklist (Phase 4).
- ESLint/Prettier, Docker, Turborepo, CI pipelines.

## Decisions

### Package naming: `@workshop/*`

Use scoped names `@workshop/api`, `@workshop/web`, `@workshop/shared` for clarity in a teaching repo.

**Alternative considered:** unscoped `api` / `web` — rejected because scoped names avoid npm registry collisions and read clearly in imports.

### Root dev orchestration: `pnpm -r --parallel dev`

Root `package.json` runs `pnpm -r --parallel dev` so each package owns its own `dev` script.

**Alternative considered:** `concurrently` — rejected to avoid an extra root dependency when pnpm recursion is sufficient.

### API runtime: `tsx watch` for dev

`apps/api` uses `tsx watch src/server.ts` for zero-config TypeScript execution in development.

**Alternative considered:** `tsc` + `node dist/` — rejected for Phase 0 because it adds a build step before every dev session.

### Ports: API `3000`, Web `5173`

Fixed defaults align with common conventions. Vite proxy to API is deferred to Phase 3.

### Shared package: ESM with `exports` map

`packages/shared` uses `"type": "module"` and a `package.json` `exports` field pointing to `./src/index.ts` (or compiled output if needed). Export a single placeholder constant (e.g. `WORKSHOP_NAME`) so api/web can import it and verify wiring.

**Alternative considered:** literally empty package — rejected because unresolved imports fail TypeScript resolution checks.

### TypeScript: shared `tsconfig.base.json`

Root `tsconfig.base.json` sets `strict: true`, `moduleResolution: "bundler"`, `module: "ESNext"`, `target: "ES2022"`. Each package extends it with package-specific `include`/`outDir`.

### API hello route

Fastify registers `GET /` returning plain text `"Hello from API"`. No CORS plugin yet (not needed until web calls API in Phase 3).

### Web hello page

Minimal React 18+ app: `index.html` → `src/main.tsx` → `App.tsx` rendering a heading. No router, no CSS framework.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| ESM/CJS interop issues between packages | Use `"type": "module"` consistently; test import from shared in both apps |
| `tsx` vs `ts-node` version drift | Pin `tsx` in api devDependencies |
| Root `pnpm dev` noise from parallel logs | Acceptable for Phase 0; revisit with `concurrently --names` if needed |
| Premature scope creep (adding Prisma "while we're here") | Tasks explicitly gate domain deps to later phases |

## Migration Plan

Greenfield — no migration. After implementation:

1. `pnpm install`
2. `pnpm dev`
3. Verify `http://localhost:3000/` and `http://localhost:5173/` respond.

Rollback: delete `apps/`, `packages/`, and root workspace files.

## Open Questions

- _(none blocking)_ — Vite proxy can wait until Phase 3 when the frontend calls the API.

## Target layout

```
taller/
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── README.md
├── apps/
│   ├── api/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/server.ts
│   └── web/
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.ts
│       ├── index.html
│       └── src/
│           ├── main.tsx
│           └── App.tsx
├── packages/
│   └── shared/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/index.ts
└── openspec/          (unchanged)
```
