## ADDED Requirements

### Requirement: Smoke test checklist exists

The repository SHALL include a manual smoke test checklist for baseline verification.

#### Scenario: Checklist covers install and database

- **WHEN** a reviewer opens the smoke test checklist
- **THEN** it includes steps for `pnpm install`, `pnpm db:push`, and `pnpm db:seed`

#### Scenario: Checklist covers UI verification

- **WHEN** a reviewer opens the smoke test checklist
- **THEN** it includes verifying mixed status badges and creating an appointment

#### Scenario: Checklist covers API error case

- **WHEN** a reviewer opens the smoke test checklist
- **THEN** it includes verifying past-date creation shows an error
