## Why

The baseline UI (Phase 3) is functional but visually bare — plain CSS, native unstyled controls, flat list. Before the workshop demo, the app should look professional enough to present with confidence, without pulling in calendar/datetime picker complexity reserved for the extended workshop iteration.

## What Changes

- Add Tailwind CSS and shadcn/ui foundation to `apps/web`.
- Add shadcn components: Button, Card, Badge, Select, Label, Input.
- Refactor appointments list and form to use shadcn components and Tailwind layout.
- Style native date/time inputs consistently with shadcn Input (still native pickers, not Calendar).
- Remove legacy `appointments.css` in favor of Tailwind + component styles.

**Non-goals (deferred to workshop extended iteration):**

- Calendar, DateTimePicker, Popover date components.
- RescheduleDialog or cancel UI.
- Dark mode, i18n, new routes.
- Backend changes.

## Capabilities

### New Capabilities

- `tailwind-shadcn-setup`: Tailwind, PostCSS, shadcn config, `cn()` utility, base styles.
- `shadcn-ui-components`: Button, Card, Badge, Select, Label, Input in `components/ui/`.

### Modified Capabilities

- `appointments-list-ui`: Card-based list, shadcn Badge, improved typography and spacing.
- `appointment-create-form`: shadcn Select, Input, Button, Card; styled native date/time.
- `appointments-feature`: Visual polish only; behavior unchanged.

## Impact

| Area | Impact |
|---|---|
| `apps/web` | Tailwind, shadcn, new `components/ui/`, refactored feature components |
| `apps/api` | Unchanged |
| `packages/shared` | Unchanged |
| Dependencies | tailwindcss, shadcn deps, radix-ui primitives, lucide-react |
