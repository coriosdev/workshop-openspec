## ADDED Requirements

### Requirement: Appointment future-date validation has unit tests

The API package SHALL include Vitest tests for the appointment service future-date rule.

#### Scenario: Past startsAt is rejected in unit test

- **WHEN** the appointment service create method is called with a past `startsAt`
- **THEN** the test expects an error with code `STARTS_AT_MUST_BE_FUTURE`

#### Scenario: Future startsAt is accepted in unit test

- **WHEN** the appointment service create method is called with a future `startsAt` and valid FK mocks
- **THEN** the test expects the repository create method to be invoked

### Requirement: API package exposes test script

`apps/api/package.json` SHALL include a `test` script that runs Vitest.

#### Scenario: Run API tests

- **WHEN** a developer runs `pnpm test` inside `apps/api`
- **THEN** Vitest executes and reports pass/fail
