## MODIFIED Requirements

### Requirement: Appointments feature folder is wired into the app shell

The web app SHALL organize appointments UI under `src/features/appointments/` and render a polished appointments screen from `App.tsx`.

#### Scenario: App shows appointments screen

- **WHEN** a developer opens the web app in the browser
- **THEN** the appointments list and new-appointment control are visible with cohesive Tailwind/shadcn styling

#### Scenario: New appointment toggle

- **WHEN** the user clicks the new appointment control
- **THEN** the create form is shown above the list inside a styled card layout
