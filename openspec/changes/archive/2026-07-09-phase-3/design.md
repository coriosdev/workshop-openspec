## Context

Phase 2 archived: modular Fastify API, shared Zod schemas, seed with mixed appointment statuses. Web is still Phase 0 hello-world (`App.tsx` shows `WORKSHOP_NAME`). Phase 2 explicitly deferred CORS; Vite proxy is the Phase 3 connectivity solution.

## Goals / Non-Goals

**Goals:**

- Single appointments screen: list + create form toggle.
- TanStack Query for list, catalog dropdowns, and create mutation.
- Status badges for `scheduled`, `completed`, `cancelled`.
- Relative date labels ("Tomorrow", "Yesterday") where applicable.
- Form validation via `createAppointmentSchema` from `@workshop/shared`.
- List refreshes after successful create without full page reload.

**Non-Goals:**

- Cancel/reschedule UI, history, business error messages.
- React Router, modal library, date library (date-fns/dayjs).
- Production build/deploy config, Vitest.

## Decisions

### Vite proxy: `/api` → `http://localhost:3000`

```ts
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
```

Fetch calls use `/api/appointments`, `/api/clients`, etc.

### Feature folder structure

```
apps/web/src/
├── features/appointments/
│   ├── AppointmentList.tsx
│   ├── AppointmentForm.tsx
│   ├── appointment.api.ts
│   ├── appointment.types.ts
│   ├── appointment.hooks.ts
│   └── appointments.css
├── lib/api.ts          (fetchJson helper)
├── App.tsx
└── main.tsx            (QueryClientProvider)
```

### TanStack Query keys

- `['appointments']` — list
- `['clients']`, `['professionals']`, `['services']` — catalog
- On create success: `invalidateQueries({ queryKey: ['appointments'] })`

### Date/time inputs

Native `<input type="date">` + `<input type="time">`. Combine to local `Date`, send `startsAt` as ISO string.

### Status badges

CSS classes: `badge badge--scheduled`, `badge--completed`, `badge--cancelled`.

### Form UX

`[+ New appointment]` toggles form visibility above the list. On success: hide form, reset fields, invalidate list. On API error: show `error.message` from envelope.

### Types

`appointment.types.ts` defines `AppointmentWithRelations` matching Phase 2 API response (web-only, not in shared).

### Display format

List row: `{client.name} · {professional.name} · {service.name}`  
Second line: `{relativeOrFormattedDate} · {status badge}`

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| Timezone on datetime inputs | Use `.toISOString()`; acceptable for workshop |
| API not running | Show connection error in list query |
| No seed data | Empty state message |

## Migration Plan

1. Add dependencies and proxy.
2. Add Query provider and API client.
3. Build list + form components.
4. Wire `App.tsx`.
5. Manual browser test with `pnpm dev` (root) + seeded DB.

## Open Questions

- _(none — locked from explore)_
