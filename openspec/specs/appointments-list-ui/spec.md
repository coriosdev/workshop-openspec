# appointments-list-ui Specification

## Purpose
TBD - created by archiving change phase-3. Update Purpose after archive.
## Requirements
### Requirement: Appointment list displays seed data with relations

The appointments list SHALL show client, professional, service, formatted date/time, and status for each appointment.

#### Scenario: List row format

- **WHEN** appointments are loaded from the API
- **THEN** each row displays `{client.name} · {professional.name} · {service.name}` and a date/time line with status

#### Scenario: All status badges are visible with seed data

- **WHEN** the database is seeded and the list loads
- **THEN** badges for `scheduled`, `completed`, and `cancelled` are all visible

#### Scenario: Loading and error states

- **WHEN** the appointments query is loading or fails
- **THEN** the UI shows a loading indicator or error message respectively

