## ADDED Requirements

### Requirement: TanStack Query is configured at app root

The web app SHALL wrap the React tree with `QueryClientProvider`.

#### Scenario: Query client is available to features

- **WHEN** an appointments feature hook calls `useQuery`
- **THEN** it runs without missing provider errors
