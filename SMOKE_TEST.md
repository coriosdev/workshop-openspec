# Smoke Test Checklist

Manual verification before the workshop. Check each item after a fresh clone.

## Setup

- [ ] `pnpm install`
- [ ] `cp apps/api/.env.example apps/api/.env`
- [ ] `pnpm db:push`
- [ ] `pnpm db:seed`

## Dev server

- [ ] `pnpm dev` — API on :3000, web on :5173

## Appointments list

- [ ] Open http://localhost:5173/ — list shows **5 appointments**
- [ ] Status badges include a mix of **scheduled**, **completed**, and **cancelled**

## Create appointment

- [ ] Create an appointment with a **future** date/time — it appears in the list
- [ ] Create an appointment with a **past** date/time — UI shows an error

## Optional: API curl

Verify the past-date rule directly:

```bash
curl -s -X POST http://localhost:3000/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "replace-with-real-id",
    "professionalId": "replace-with-real-id",
    "serviceId": "replace-with-real-id",
    "startsAt": "2020-01-01T10:00:00.000Z"
  }'
```

Expected response (400):

```json
{
  "error": {
    "code": "STARTS_AT_MUST_BE_FUTURE",
    "message": "startsAt must be in the future"
  }
}
```

Replace the IDs with values from `pnpm db:studio` or the list API (`GET http://localhost:3000/appointments`).
