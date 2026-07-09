## Context

Phases 0–4 delivered a working baseline. Current UI uses ~100 lines of plain CSS (`appointments.css`), native `<select>` and date/time inputs, and minimal layout. Workshop plan: polish now, proper datetime picker in extended iteration (`reschedule-datetime-picker` or part of reschedule follow-up).

## Goals / Non-Goals

**Goals:**

- Professional, cohesive visual design for appointments screen.
- Tailwind + shadcn/ui as the design system foundation.
- Card-based appointment list with refined status badges.
- shadcn Select for catalog dropdowns; shadcn Input for date/time (native types, styled).
- Warm, clean aesthetic suitable for barbería/consultorio context.

**Non-Goals:**

- react-day-picker, Calendar, DateTimePicker, Mantine dates.
- Reschedule/cancel UI.
- Changing TanStack Query logic, API client, or validation rules.

## Decisions

### Stack: Tailwind CSS v4 or v3 + shadcn/ui

Use Tailwind CSS 3.x with PostCSS (standard shadcn + Vite path). shadcn components copied into `apps/web/src/components/ui/`.

### Components to add

| Component | Use |
|-----------|-----|
| Button | Header CTA, form submit |
| Card | Form container, appointment list items |
| Badge | Status (scheduled/completed/cancelled) |
| Select | Client, professional, service dropdowns |
| Label | Form field labels |
| Input | Date and time inputs (`type="date"`, `type="time"`) |

### Layout

- Centered page with max-width container, subtle background (`bg-muted/40` or similar).
- Header with title + primary Button.
- Form inside Card with CardHeader/CardContent.
- Each appointment as Card or card-styled list item with shadow-sm.

### Badge variants

Map status to shadcn Badge variants:
- `scheduled` → default/secondary blue tone
- `completed` → outline or green custom class
- `cancelled` → destructive/muted

### Date/time: native, styled

Keep `combineDateTime` logic unchanged. Replace raw `<input>` with shadcn `<Input type="date">` and `<Input type="time">`. No Calendar component.

### Path alias

Add `@/` → `src/` in `tsconfig.json` and `vite.config.ts` for shadcn imports.

### Remove appointments.css

Delete `appointments.css` import; styles live in Tailwind classes and shadcn components.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| shadcn init complexity in monorepo | Scope to `apps/web` only |
| Bundle size increase | Only add needed components |
| Select vs native select behavior | Use Radix Select; test form submit |

## Migration Plan

1. Install Tailwind + shadcn deps.
2. Add config files and global CSS.
3. Add shadcn components.
4. Refactor App, AppointmentList, AppointmentForm.
5. Remove appointments.css.
6. Verify `tsc`, `vite build`, manual/browser smoke.

## Open Questions

- _(none — locked from explore)_
