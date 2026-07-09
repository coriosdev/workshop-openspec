# appointments-api Specification

## Purpose
TBD - created by archiving change phase-2. Update Purpose after archive.
## Requirements
### Requirement: Create appointment endpoint exists

The API SHALL expose `POST /appointments` to create appointments with status `scheduled`.

#### Scenario: Successful appointment creation

- **WHEN** `POST /appointments` is called with valid FK ids and a future `startsAt`
- **THEN** the response is HTTP 201 with the appointment including nested `client`, `professional`, and `service`, and `status` is `scheduled`

#### Scenario: Past startsAt is rejected

- **WHEN** `POST /appointments` is called with `startsAt` in the past
- **THEN** the response is HTTP 400 with error code `STARTS_AT_MUST_BE_FUTURE`

#### Scenario: Invalid client id is rejected

- **WHEN** `POST /appointments` is called with a non-existent `clientId`
- **THEN** the response is HTTP 404 with error code `NOT_FOUND`

#### Scenario: Status cannot be set by client

- **WHEN** `POST /appointments` includes a `status` field in the body
- **THEN** the created appointment still has status `scheduled`

### Requirement: List appointments endpoint exists

The API SHALL expose `GET /appointments` returning all appointments with nested relations.

#### Scenario: List includes relations

- **WHEN** `GET /appointments` is called after seeding
- **THEN** each item includes nested `client`, `professional`, and `service` objects

#### Scenario: List is sorted by startsAt

- **WHEN** `GET /appointments` is called
- **THEN** appointments are ordered by `startsAt` ascending

### Requirement: Get appointment by id endpoint exists

The API SHALL expose `GET /appointments/:id`.

#### Scenario: Get existing appointment

- **WHEN** `GET /appointments/:id` is called with a valid id
- **THEN** the response is HTTP 200 with nested relations

#### Scenario: Get missing appointment

- **WHEN** `GET /appointments/:id` is called with an unknown id
- **THEN** the response is HTTP 404 with error code `NOT_FOUND`

