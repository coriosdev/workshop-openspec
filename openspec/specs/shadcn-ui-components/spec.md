# shadcn-ui-components Specification

## Purpose
TBD - created by archiving change ui-polish. Update Purpose after archive.
## Requirements
### Requirement: Core shadcn components are available

The web app SHALL include shadcn/ui components for Button, Card, Badge, Select, Label, and Input under `src/components/ui/`.

#### Scenario: Button component exists

- **WHEN** feature code imports Button from `@/components/ui/button`
- **THEN** the component renders with shadcn styling

#### Scenario: Card component exists

- **WHEN** feature code imports Card from `@/components/ui/card`
- **THEN** Card, CardHeader, CardContent, and CardTitle are available

