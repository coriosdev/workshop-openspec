## 1. Dependencies and proxy

- [x] 1.1 Add `@tanstack/react-query` and `zod` to `apps/web`
- [x] 1.2 Configure Vite proxy `/api` → `http://localhost:3000` in `vite.config.ts`

## 2. API client and Query setup

- [x] 2.1 Create `apps/web/src/lib/api.ts` with `fetchJson` and error parsing
- [x] 2.2 Add `QueryClientProvider` to `main.tsx`

## 3. Appointments feature

- [x] 3.1 Create `appointment.types.ts` with `AppointmentWithRelations`
- [x] 3.2 Create `appointment.api.ts` with list/create and catalog fetchers
- [x] 3.3 Create `appointment.hooks.ts` with useQuery/useMutation hooks
- [x] 3.4 Create `AppointmentList.tsx` with status badges and date formatting
- [x] 3.5 Create `AppointmentForm.tsx` with dropdowns, datetime inputs, validation
- [x] 3.6 Add `appointments.css` for layout and badges

## 4. App integration

- [x] 4.1 Update `App.tsx` to render appointments feature with form toggle

## 5. Verification

- [x] 5.1 With API + web running, list shows seeded appointments in all three statuses
- [x] 5.2 Create appointment with future date → appears in list without page reload
- [x] 5.3 Create with past date → form shows API error message
