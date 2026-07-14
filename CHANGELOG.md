# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/) and this project adheres to [Semantic Versioning](https://semver.org/).

---

## v0.1.0 — 2026-07-14

### Added

- Monorepo scaffold with numeric directory structure
- OpenCode instruction files (.opencode/)
- Project governance docs (06-docs/project/)
- Task register, milestone register, decision log, build summary, progress dashboard
- CHANGELOG.md

---

## v0.2.0 — 2026-07-14

### Added

- Next.js 16 application (01-apps/web) with App Router, React 19, Tailwind CSS v4
- UI package (02-packages/ui) with barrel exports and build config
- Design tokens: colors, typography, spacing, radius, shadows, motion, breakpoints
- ThemeProvider + useTheme hook
- COMPONENTS.md catalog

### Components

- Button (5 variants, 3 sizes, loading/disabled states, 8 tests)
- Card (composition-based, 3 tests)
- Badge (6 color variants, 2 sizes, 4 tests)
- Input (3 sizes, error state with aria-invalid, 7 tests)

### Tooling

- Vitest + React Testing Library + jsdom test setup
- Phoenix CLI (09-tools/phoenix) — status, doctor, progress, task management, validation, NL queries

### Changed

- STACK.md updated: Next.js 15→16, Tailwind CSS v3→v4
- WORKFLOW.md simplified to delegate to WORKFLOWS/
- MEMORY.md, DEVELOPMENT_LOG.md, PROJECT_STATE.md updated

---

## v0.3.0 — 2026-07-14

### Added

- Phoenix AI Software Factory foundation (.ai/ directory)
- 10 reusable prompt templates: build-web-app, build-ui-component, build-api, build-sql, build-google-sheet, build-apps-script, generate-documentation, review-code, refactor-code, generate-tests
- 9 business workflow definitions: build-web-app, build-ui-component, build-dashboard, build-google-sheet, build-apps-script, build-sql, review-code, refactor-code, generate-documentation
- 8 agent definitions: Project Manager, Solution Architect, Repository Engineer, UI Engineer, API Engineer, Test Engineer, Documentation Engineer, Release Manager
- .ai/memory/, .ai/validators/, .ai/schemas/, .ai/examples/, .ai/templates/
- PULL_REQUEST_TEMPLATE.md with quality checklist
- CODEOWNERS file for repository governance
- phoenix-request.yml issue template for AI-assisted requests
