# Appointments

Small monorepo for managing appointments: clients, professionals, services, and booking slots.

**Stack:** Fastify, React, Prisma (SQLite), Zod, TanStack Query.

## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/) 9+

## Setup

```bash
pnpm install
cp apps/api/.env.example apps/api/.env
pnpm db:push
pnpm db:seed
```

`DATABASE_URL` points to a SQLite file at the repo root (`file:../dev.db`).

## Development

```bash
pnpm dev
```

| Service | URL |
|---|---|
| API | http://localhost:3000/ |
| Web | http://localhost:5173/ |

The web app proxies `/api` to the backend (the `/api` prefix is stripped before forwarding).

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start API and web in parallel |
| `pnpm test` | Run API tests |
| `pnpm db:push` | Apply Prisma schema |
| `pnpm db:seed` | Load sample data |
| `pnpm db:studio` | Open Prisma Studio |

## Project layout

| Path | Role |
|---|---|
| `apps/api` | REST API (Fastify) |
| `apps/web` | UI (React + Vite) |
| `packages/shared` | Shared schemas and constants |

## API errors

Errors use a consistent JSON envelope:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message"
  }
}
```

Example — appointment with a past `startsAt`:

```json
{
  "error": {
    "code": "STARTS_AT_MUST_BE_FUTURE",
    "message": "startsAt must be in the future"
  }
}
```
