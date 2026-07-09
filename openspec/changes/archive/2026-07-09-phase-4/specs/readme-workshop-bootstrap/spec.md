## ADDED Requirements

### Requirement: README documents full workshop bootstrap

The repository README SHALL document prerequisites, install, first-time database setup, seed, development, and expected UI outcomes.

#### Scenario: Fresh clone bootstrap path

- **WHEN** a developer follows the README after cloning
- **THEN** instructions include copying `apps/api/.env.example` to `.env`, running `pnpm db:push`, and `pnpm db:seed`

#### Scenario: Development ports documented

- **WHEN** a developer reads the README development section
- **THEN** API port 3000 and web port 5173 are documented

#### Scenario: Expected seed UI documented

- **WHEN** a developer reads the README
- **THEN** it states that seeded appointments appear in `scheduled`, `completed`, and `cancelled` states

#### Scenario: Workshop next step documented

- **WHEN** a developer reads the README
- **THEN** it references `Taller.md` and the upcoming `appointment-reschedule-and-cancel` change
