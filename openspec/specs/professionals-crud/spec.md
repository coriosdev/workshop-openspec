# professionals-crud Specification

## Purpose
TBD - created by archiving change phase-2. Update Purpose after archive.
## Requirements
### Requirement: Professionals REST CRUD endpoints exist

The API SHALL expose full CRUD for professionals at `/professionals`.

#### Scenario: List professionals

- **WHEN** `GET /professionals` is called
- **THEN** the response is HTTP 200 with a JSON array of professionals

#### Scenario: Create professional

- **WHEN** `POST /professionals` is called with valid `name` and `specialty`
- **THEN** the response is HTTP 201 with the created professional

#### Scenario: Delete professional with appointments fails

- **WHEN** `DELETE /professionals/:id` is called for a professional that has appointments
- **THEN** the response is HTTP 409 with error code `HAS_APPOINTMENTS`

