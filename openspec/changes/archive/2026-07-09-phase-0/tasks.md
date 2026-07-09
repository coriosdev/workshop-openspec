## 1. Root workspace

- [x] 1.1 Create root `package.json` with `private: true`, `dev` script (`pnpm -r --parallel dev`), and workspace metadata
- [x] 1.2 Create `pnpm-workspace.yaml` including `apps/*` and `packages/*`
- [x] 1.3 Create `tsconfig.base.json` with `strict: true`, ESM-oriented compiler options
- [x] 1.4 Add root `.gitignore` entries for `node_modules`, `dist`, `.env`, SQLite artifacts (future-proof)

## 2. Shared package

- [x] 2.1 Scaffold `packages/shared/package.json` as `@workshop/shared` with `type: module` and `exports` map
- [x] 2.2 Add `packages/shared/tsconfig.json` extending root base config
- [x] 2.3 Create `packages/shared/src/index.ts` exporting `WORKSHOP_NAME` placeholder constant

## 3. API scaffold

- [x] 3.1 Scaffold `apps/api/package.json` with Fastify, `tsx`, TypeScript dev deps, and `dev` script
- [x] 3.2 Add `apps/api/tsconfig.json` extending root base config
- [x] 3.3 Implement `apps/api/src/server.ts` — Fastify on port 3000, `GET /` returns hello text
- [x] 3.4 Add `@workshop/shared` as workspace dependency and log/import `WORKSHOP_NAME` at startup (verify wiring)

## 4. Web scaffold

- [x] 4.1 Scaffold `apps/web` with Vite + React + TypeScript (`package.json`, `vite.config.ts`, `index.html`)
- [x] 4.2 Add `apps/web/tsconfig.json` (and `tsconfig.node.json` if Vite requires it)
- [x] 4.3 Create `src/main.tsx` and `src/App.tsx` rendering a React hello-world page
- [x] 4.4 Add `@workshop/shared` as workspace dependency and display `WORKSHOP_NAME` on the page (verify wiring)

## 5. Documentation and verification

- [x] 5.1 Write `README.md` with prerequisites (Node, pnpm), `pnpm install`, and `pnpm dev` instructions
- [x] 5.2 Run `pnpm install` at repo root and confirm workspace links resolve
- [x] 5.3 Run `pnpm dev` and verify API responds at `http://localhost:3000/`
- [x] 5.4 Verify web app loads at `http://localhost:5173/` with hello content visible
