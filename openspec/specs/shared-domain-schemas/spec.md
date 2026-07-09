# shared-domain-schemas Specification

## Purpose
TBD - created by archiving change phase-2. Update Purpose after archive.
## Requirements
### Requirement: Shared package exports Zod schemas for domain entities

`packages/shared` SHALL export Zod schemas for create and update bodies of clients, professionals, services, and appointments.

#### Scenario: Client create schema is exported

- **WHEN** the API imports from `@workshop/shared`
- **THEN** `createClientSchema` (or equivalent) is available for request validation

#### Scenario: Appointment create schema is exported

- **WHEN** the API imports from `@workshop/shared`
- **THEN** `createAppointmentSchema` validates `clientId`, `professionalId`, `serviceId`, and `startsAt`

### Requirement: Shared package exports appointment status type

`packages/shared` SHALL export an `AppointmentStatus` type or const aligned with Prisma enum values.

#### Scenario: Status values match schema

- **WHEN** the shared status definition is inspected
- **THEN** it includes `scheduled`, `cancelled`, and `completed`

