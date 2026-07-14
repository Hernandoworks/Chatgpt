---
id: build-dashboard
version: 2.0.0
agents: [ui-engineer, data-analyst, ux-designer]
prompts: [build-dashboard]
validators: [code-quality]
triggers: [phoenix/dashboard]
---

# Workflow: Build Dashboard

## Trigger

Issue labeled `phoenix/dashboard`

## Steps

1. Identify data sources (API endpoints, database tables, external services)
2. Select chart components from `02-packages/ui` or specify new ones
3. Build page layout using layout components (AppShell, Grid, Stack)
4. Wire data fetching with TanStack Query
5. Add loading, empty, and error states for each data widget
6. Call DeepSeek API with constructed prompt
7. Run validation
8. Create draft pull request

## Handoffs

- UX Designer → Data Analyst: layout wireframes, widget placement, user flow
- Data Analyst → UI Engineer: metric definitions, aggregation queries, refresh cadence
- UI Engineer → UX Designer: implemented widget states (loading, empty, error)

## Validation Gates

- [ ] TypeScript compiles with zero errors
- [ ] ESLint passes with zero errors
- [ ] All tests pass
- [ ] Prettier format check passes
- [ ] Build succeeds

## Output

- Dashboard page with data widgets
- Loading/empty/error states
- Responsive layout
- Performance-optimized data fetching
