## ADDED Requirements

### Requirement: Tailwind CSS is configured for the web app

The web package SHALL use Tailwind CSS with PostCSS and a global stylesheet imported from `main.tsx`.

#### Scenario: Tailwind classes apply in components

- **WHEN** a component uses Tailwind utility classes
- **THEN** styles are applied in the Vite dev server and production build

### Requirement: shadcn ui utility exists

The web app SHALL provide a `cn()` helper in `src/lib/utils.ts` for class merging.

#### Scenario: cn helper is importable

- **WHEN** shadcn components import from `@/lib/utils`
- **THEN** TypeScript resolves the module without errors

### Requirement: Path alias resolves src imports

The web app SHALL support `@/` as an alias for `src/` in Vite and TypeScript.

#### Scenario: Component imports use alias

- **WHEN** feature code imports from `@/components/ui/button`
- **THEN** the import resolves correctly
