# web-api-client Specification

## Purpose
TBD - created by archiving change phase-3. Update Purpose after archive.
## Requirements
### Requirement: Web API client parses JSON and error envelope

The web app SHALL provide a fetch helper that calls `/api` paths and throws structured errors from `{ error: { code, message } }` responses.

#### Scenario: API error is surfaced to callers

- **WHEN** the API returns HTTP 400 with an error envelope
- **THEN** the fetch helper throws an error carrying `code` and `message`

### Requirement: Catalog and appointment API functions exist

The appointments feature SHALL expose functions to list appointments, create an appointment, and list clients, professionals, and services.

#### Scenario: List appointments via proxy

- **WHEN** `listAppointments()` is called with API running
- **THEN** it returns the appointment array from `GET /api/appointments`

