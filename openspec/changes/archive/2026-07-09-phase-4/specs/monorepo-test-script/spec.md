## ADDED Requirements

### Requirement: Root test script runs API tests

The root `package.json` SHALL expose a `test` script that runs the API package test suite.

#### Scenario: Test from repository root

- **WHEN** a developer runs `pnpm test` from the repository root
- **THEN** the API Vitest suite executes
