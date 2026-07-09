## ADDED Requirements

### Requirement: Services REST CRUD endpoints exist

The API SHALL expose full CRUD for services at `/services`.

#### Scenario: List services

- **WHEN** `GET /services` is called
- **THEN** the response is HTTP 200 with a JSON array of services with `price` in integer cents

#### Scenario: Create service

- **WHEN** `POST /services` is called with valid `name`, `durationMinutes`, and `price`
- **THEN** the response is HTTP 201 with the created service

#### Scenario: Delete service with appointments fails

- **WHEN** `DELETE /services/:id` is called for a service that has appointments
- **THEN** the response is HTTP 409 with error code `HAS_APPOINTMENTS`
