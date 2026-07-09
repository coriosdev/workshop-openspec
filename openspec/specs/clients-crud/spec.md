# clients-crud Specification

## Purpose
TBD - created by archiving change phase-2. Update Purpose after archive.
## Requirements
### Requirement: Clients REST CRUD endpoints exist

The API SHALL expose full CRUD for clients at `/clients`.

#### Scenario: List clients

- **WHEN** `GET /clients` is called
- **THEN** the response is HTTP 200 with a JSON array of clients

#### Scenario: Get client by id

- **WHEN** `GET /clients/:id` is called with a valid id
- **THEN** the response is HTTP 200 with the client object

#### Scenario: Create client

- **WHEN** `POST /clients` is called with valid `name` and `phone`
- **THEN** the response is HTTP 201 with the created client

#### Scenario: Update client

- **WHEN** `PATCH /clients/:id` is called with partial fields
- **THEN** the response is HTTP 200 with the updated client

#### Scenario: Delete client without appointments

- **WHEN** `DELETE /clients/:id` is called for a client with no appointments
- **THEN** the response is HTTP 204

#### Scenario: Delete client with appointments fails

- **WHEN** `DELETE /clients/:id` is called for a client that has appointments
- **THEN** the response is HTTP 409 with error code `HAS_APPOINTMENTS`

