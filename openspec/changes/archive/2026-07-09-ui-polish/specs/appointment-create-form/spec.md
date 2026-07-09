## MODIFIED Requirements

### Requirement: Create appointment form exists

The web app SHALL provide a polished form to create appointments using shadcn Select for catalog fields and shadcn Input for native date and time pickers.

#### Scenario: Form submits valid appointment

- **WHEN** the user selects catalog values and a future date/time and submits
- **THEN** `POST /api/appointments` is called and the form closes on success

#### Scenario: Form validates with shared schema

- **WHEN** the user submits with missing required fields
- **THEN** client-side validation errors are shown before calling the API

#### Scenario: API validation error is displayed

- **WHEN** the API returns `STARTS_AT_MUST_BE_FUTURE`
- **THEN** the form displays the API error message in styled error text

#### Scenario: List refreshes after create

- **WHEN** an appointment is created successfully
- **THEN** the appointments list updates without a full page reload
