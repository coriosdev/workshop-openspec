# Workshop OpenSpec — Appointment Booking

Monorepo baseline for the OpenSpec workshop. This is the **baseline checkpoint**: a working full-stack appointment booking app with seeded data, API error envelopes, and a React UI.

## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/) 9+

## First-time setup

```bash
pnpm install
cp apps/api/.env.example apps/api/.env
pnpm db:push
pnpm db:seed
```

The `.env.example` file sets `DATABASE_URL="file:../dev.db"` (SQLite at the repo root).

## Development

Start API and web in parallel:

```bash
pnpm dev
```

| Service | URL |
|---|---|
| API | http://localhost:3000/ |
| Web | http://localhost:5173/ |

The Vite dev server proxies `/api` requests to the API on port 3000 (path rewrite strips the `/api` prefix).

### Expected UI

After seeding, the appointments list shows **5 appointments** with mixed status badges: **scheduled**, **completed**, and **cancelled**.

## Database scripts

| Command | Description |
|---|---|
| `pnpm db:push` | Apply Prisma schema to the local SQLite database |
| `pnpm db:seed` | Seed clients, professionals, services, and 5 appointments |
| `pnpm db:studio` | Open Prisma Studio to inspect the database |

## API errors

All API errors return a JSON envelope:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message"
  }
}
```

Example — creating an appointment with a past `startsAt`:

```json
{
  "error": {
    "code": "STARTS_AT_MUST_BE_FUTURE",
    "message": "startsAt must be in the future"
  }
}
```

## Smoke test

Before the workshop, run through the manual checklist in [SMOKE_TEST.md](./SMOKE_TEST.md).

## Packages

| Package | Description |
|---|---|
| `apps/api` | Fastify backend |
| `apps/web` | React + Vite frontend |
| `packages/shared` | Shared types and constants |

## Workshop

- Workshop guide: [Taller.md](./Taller.md)
- Next OpenSpec change: `appointment-reschedule-and-cancel` (reschedule and cancel flows)
