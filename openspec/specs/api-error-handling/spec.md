# api-error-handling Specification

## Purpose
TBD - created by archiving change phase-2. Update Purpose after archive.
## Requirements
### Requirement: API returns structured error responses

The API SHALL return errors as JSON `{ "error": { "code": string, "message": string } }`.

#### Scenario: Validation error shape

- **WHEN** a request body fails Zod validation
- **THEN** the response status is 400 and body includes `error.code` of `INVALID_BODY`

#### Scenario: Not found error shape

- **WHEN** a resource ID does not exist
- **THEN** the response status is 404 and body includes `error.code` of `NOT_FOUND`

#### Scenario: Business rule error shape

- **WHEN** an appointment is created with a past `startsAt`
- **THEN** the response status is 400 and body includes `error.code` of `STARTS_AT_MUST_BE_FUTURE`

#### Scenario: Delete conflict error shape

- **WHEN** a client with appointments is deleted
- **THEN** the response status is 409 and body includes `error.code` of `HAS_APPOINTMENTS`

### Requirement: API error envelope is documented for developers

The README SHALL document the API error response shape with an example.

#### Scenario: Error envelope example in README

- **WHEN** a developer reads the API errors section of the README
- **THEN** they see the JSON shape `{ "error": { "code": string, "message": string } }` with at least one example code

