## ADDED Requirements

### Requirement: Web imports shared schemas for form validation

The web app SHALL import `createAppointmentSchema` and `AppointmentStatus` from `@workshop/shared`.

#### Scenario: Form uses shared appointment schema

- **WHEN** the create appointment form validates input
- **THEN** it uses `createAppointmentSchema` from `@workshop/shared`
