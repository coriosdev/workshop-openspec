## 1. Tailwind and shadcn setup

- [x] 1.1 Install Tailwind CSS, PostCSS, autoprefixer, and shadcn peer deps in `apps/web`
- [x] 1.2 Add `tailwind.config.ts`, `postcss.config.js`, `src/index.css` with Tailwind directives
- [x] 1.3 Add `src/lib/utils.ts` with `cn()` helper
- [x] 1.4 Configure `@/` path alias in `vite.config.ts` and `tsconfig.json`
- [x] 1.5 Import global CSS from `main.tsx`

## 2. shadcn components

- [x] 2.1 Add `components.json` and shadcn theme variables in CSS
- [x] 2.2 Add Button, Card, Badge, Label, Input, Select components under `src/components/ui/`

## 3. Feature refactor

- [x] 3.1 Refactor `App.tsx` with Tailwind layout and shadcn Button
- [x] 3.2 Refactor `AppointmentList.tsx` with Card items and Badge
- [x] 3.3 Refactor `AppointmentForm.tsx` with shadcn Select, Input, Button, Card
- [x] 3.4 Remove `appointments.css` and its import

## 4. Verification

- [x] 4.1 `pnpm --filter @workshop/web exec tsc --noEmit` passes
- [x] 4.2 `pnpm --filter @workshop/web build` passes
- [x] 4.3 App still loads appointments, creates with future date, shows API error on past date
