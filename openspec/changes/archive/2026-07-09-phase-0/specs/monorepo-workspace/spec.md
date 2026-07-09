## ADDED Requirements

### Requirement: Root workspace uses pnpm workspaces

The repository SHALL define a pnpm workspace that includes `apps/*` and `packages/*`.

#### Scenario: Workspace packages are discoverable

- **WHEN** a developer runs `pnpm install` at the repository root
- **THEN** dependencies for `apps/api`, `apps/web`, and `packages/shared` are installed and linked via workspace protocol

### Requirement: TypeScript is configured across the monorepo

The repository SHALL provide a shared TypeScript base configuration extended by each package.

#### Scenario: Packages compile with strict TypeScript

- **WHEN** TypeScript is run in any workspace package
- **THEN** the package extends the root base config with `strict` mode enabled

### Requirement: Root dev script starts all apps

The root `package.json` SHALL expose a `dev` script that starts API and web concurrently.

#### Scenario: Single command boots both apps

- **WHEN** a developer runs `pnpm dev` from the repository root
- **THEN** both `apps/api` and `apps/web` dev servers start without manual per-app commands

### Requirement: README documents bootstrap

The repository SHALL include a `README.md` with prerequisites, install, and dev instructions.

#### Scenario: New developer can follow README

- **WHEN** a developer clones the repo and follows the README
- **THEN** they can run `pnpm install` and `pnpm dev` successfully
