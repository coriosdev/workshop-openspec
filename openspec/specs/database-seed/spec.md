# database-seed Specification

## Purpose
TBD - created by archiving change phase-1. Update Purpose after archive.
## Requirements
### Requirement: Seed populates baseline entities

The seed script SHALL create three clients, two professionals, and three services matching the baseline plan examples.

#### Scenario: Clients are seeded

- **WHEN** `pnpm db:seed` completes successfully
- **THEN** the database contains clients named Ana García, Luis Pérez, and María López

#### Scenario: Professionals are seeded

- **WHEN** `pnpm db:seed` completes successfully
- **THEN** the database contains Carlos (Barbero) and Dra. Vega (General)

#### Scenario: Services are seeded

- **WHEN** `pnpm db:seed` completes successfully
- **THEN** the database contains Corte (30 min), Consulta (45 min), and Barba (20 min) with prices in cents

### Requirement: Seed creates mixed appointment states

The seed script SHALL create appointments in `scheduled`, `completed`, and `cancelled` states for workshop demo scenarios.

#### Scenario: Scheduled appointments for tomorrow

- **WHEN** `pnpm db:seed` completes successfully
- **THEN** there are two `scheduled` appointments for tomorrow (Ana+Carlos+Corte at 10:00, Luis+Dra. Vega+Consulta at 14:00)

#### Scenario: Completed appointment in the past

- **WHEN** `pnpm db:seed` completes successfully
- **THEN** there is one `completed` appointment for yesterday (María+Carlos+Corte at 09:00)

#### Scenario: Far-future scheduled appointment

- **WHEN** `pnpm db:seed` completes successfully
- **THEN** there is one `scheduled` appointment on the next Monday at 11:00 (Ana+Dra. Vega+Consulta)

#### Scenario: Cancelled appointment in the past

- **WHEN** `pnpm db:seed` completes successfully
- **THEN** there is one `cancelled` appointment in the past (Luis+Carlos+Barba)

### Requirement: Seed dates are relative to execution time

Appointment `startsAt` values SHALL be computed from the current date when seed runs, not hardcoded absolute timestamps.

#### Scenario: Tomorrow appointments stay in the future

- **WHEN** `pnpm db:seed` is run on any calendar day
- **THEN** tomorrow's seeded appointments have `startsAt` on the day after seed execution

### Requirement: Seed is idempotent via wipe and reinsert

Re-running the seed SHALL clear existing domain data and insert a fresh dataset.

#### Scenario: Second seed run replaces data

- **WHEN** `pnpm db:seed` is run twice in succession
- **THEN** the database contains exactly one set of seed entities (no duplicate clients from two runs)

