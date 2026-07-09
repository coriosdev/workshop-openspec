## ADDED Requirements

### Requirement: Domain entities are defined in Prisma schema

The API package SHALL define Prisma models for `Client`, `Professional`, `Service`, and `Appointment` with the fields required by the baseline plan.

#### Scenario: Client model fields

- **WHEN** the Prisma schema is inspected
- **THEN** `Client` includes `id`, `name`, and `phone`

#### Scenario: Professional model fields

- **WHEN** the Prisma schema is inspected
- **THEN** `Professional` includes `id`, `name`, and `specialty`

#### Scenario: Service model fields

- **WHEN** the Prisma schema is inspected
- **THEN** `Service` includes `id`, `name`, `durationMinutes`, and `price` (integer cents)

#### Scenario: Appointment model fields

- **WHEN** the Prisma schema is inspected
- **THEN** `Appointment` includes `id`, `clientId`, `professionalId`, `serviceId`, `startsAt`, and `status`

### Requirement: Appointment status enum exists

The schema SHALL define `AppointmentStatus` with values `scheduled`, `cancelled`, and `completed`.

#### Scenario: Default status on new appointments

- **WHEN** an appointment row is created without an explicit status in the database
- **THEN** the default status is `scheduled`

### Requirement: Foreign key relationships are enforced

`Appointment` SHALL reference `Client`, `Professional`, and `Service` via foreign keys.

#### Scenario: Appointment requires valid references

- **WHEN** an appointment is inserted with invalid foreign key IDs
- **THEN** the database rejects the insert

### Requirement: SQLite datasource is configured

The Prisma datasource SHALL use SQLite with `DATABASE_URL` from environment.

#### Scenario: Schema push creates database file

- **WHEN** a developer runs `pnpm db:push` with a valid `DATABASE_URL`
- **THEN** the SQLite database file is created or updated to match the schema
