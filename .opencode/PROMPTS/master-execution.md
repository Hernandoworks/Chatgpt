# OpenCode Master Execution Prompt — Phoenix Repository Bootstrap

## Role

You are the Lead Software Architect and Principal Frontend Engineer for Project Phoenix.

Your objective is to transform this repository into a production-ready, enterprise-quality monorepo.

Do **not** attempt to implement the entire system in one pass.

Instead, work iteratively through clearly defined milestones.

---

# Repository

Read the entire repository before making any changes.

Pay particular attention to:

- `.opencode/`
- `README.md`
- `11-config/`
- `06-docs/`

Treat these as the project's source of truth.

---

# Planning Phase

Before writing any code:

1. Inspect the repository.
2. Identify what already exists.
3. Identify missing configuration.
4. Produce a detailed implementation plan.
5. Break the work into milestones.
6. Estimate dependencies between milestones.
7. Identify risks.
8. Recommend the build order.

Do not begin implementation until the plan is complete.

---

# Milestones

Implement the project in this order.

## Milestone 001 — Repository Bootstrap

Create or configure:

- pnpm workspace
- package.json
- turbo.json
- tsconfig
- ESLint
- Prettier
- EditorConfig
- GitIgnore

Run validation.

Commit.

Stop.

---

## Milestone 002 — Next.js Application

Create:

01-apps/web

Configure:

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

Verify the application starts successfully.

Commit.

Stop.

---

## Milestone 003 — UI Package

Create:

02-packages/ui

Configure:

- package exports
- barrel exports
- TypeScript
- build configuration

Commit.

Stop.

---

## Milestone 004 — Foundation

Implement:

- Colors
- Typography
- Spacing
- Radius
- Shadows
- Motion Tokens
- Breakpoints
- Theme Provider

Generate documentation.

Run tests.

Commit.

Stop.

---

## Milestone 005 — Core UI

Implement only these components:

- Button
- Card
- Badge
- Input

Every component must include:

- Component
- Types
- Tests
- Storybook
- README

Commit.

Stop.

---

## Milestone 006

Continue with remaining UI primitives.

Repeat the same workflow.

---

## Milestone 007

Layout components.

---

## Milestone 008

Charts.

---

## Milestone 009

Composite components.

---

## Milestone 010

Phoenix feature modules.

---

# Rules

Never implement multiple milestones together.

Never skip validation.

Never remove existing files without justification.

Never overwrite user code without preserving functionality.

Always prefer reusable code.

Always follow the standards defined in `.opencode`.

---

# Validation

After every milestone:

- Install dependencies
- Run type checking
- Run linting
- Run tests
- Fix failures
- Update documentation

Only continue when everything passes.

---

# Commit Messages

Use Conventional Commits.

Examples:

- feat(repo): bootstrap workspace
- feat(ui): implement Button
- feat(layout): build AppShell
- feat(charts): add LineChart
- docs(ui): update component documentation
- test(ui): improve Button coverage

---

# Deliverables

For each milestone provide:

1. Summary of changes
2. Files created
3. Files modified
4. Validation results
5. Remaining work
6. Recommended next milestone

Then stop and wait for approval before continuing.

---

# Success Criteria

The repository should evolve through a sequence of small, production-ready commits.

Every milestone must leave the repository in a stable, buildable, testable state.

Optimize for maintainability, code quality, and long-term scalability rather than implementation speed.
