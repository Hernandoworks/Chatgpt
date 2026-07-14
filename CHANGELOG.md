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
