## ADDED Requirements

### Requirement: API error envelope is documented for developers

The README SHALL document the API error response shape with an example.

#### Scenario: Error envelope example in README

- **WHEN** a developer reads the API errors section of the README
- **THEN** they see the JSON shape `{ "error": { "code": string, "message": string } }` with at least one example code
