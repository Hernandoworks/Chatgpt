# Development Log

## Session 001 — 2026-07-14

### Completed

- Monorepo scaffold (TASK-0001)
- OpenCode instruction files (TASK-0002)
- Project governance docs (TASK-0003)
- Workspace tooling configuration (TASK-0004)

### Files Created

- pnpm-workspace.yaml, package.json, turbo.json
- tsconfig.base.json, tsconfig.json
- eslint.config.mjs, .prettierrc, .editorconfig, .gitignore
- .opencode/ARCHITECTURE.md, .opencode/PROMPTS/master-execution.md
- 06-docs/project/ (5 files), CHANGELOG.md

### Validation

- Prettier: 7 files fixed, all clean
- ESLint: PASS (0 errors)
- TypeScript: N/A — no source yet
- Tests: N/A

### Problems

- Turbo 2 renamed `pipeline` to `tasks` — caught at runtime, fixed immediately
- ESLint flat config required removing `next/core-web-vitals` reference until Next.js was installed

### Solutions

- Updated turbo.json to use `tasks` key
- Simplified ESLint config to only reference installed plugins

### Next Session

- TASK-0005: Next.js application setup

---

## Session 002 — 2026-07-14

### Completed

- TASK-0005: Next.js 16 application scaffold (01-apps/web)
- TASK-0006: UI package scaffold (02-packages/ui)
- TASK-0007: Design tokens (8 token files) + ThemeProvider + useTheme
- TASK-0008: Button, Card, Badge, Input components (full template compliance)
- COMPONENTS.md catalog
- Demo page wired up showing all 4 components

### Files Created

**01-apps/web/**

- package.json, tsconfig.json, next.config.ts, postcss.config.mjs, eslint.config.mjs
- src/app/layout.tsx, page.tsx, globals.css

**02-packages/ui/**

- package.json, tsconfig.json
- src/index.ts, lib/cn.ts
- src/tokens/ (8 files: colors, typography, spacing, radius, shadows, motion, breakpoints, index)
- src/theme/ (ThemeProvider.tsx, index.ts)
- src/components/Button/ (7 files: types, constants, Button.tsx, index, test, story, README)
- src/components/Card/ (7 files)
- src/components/Badge/ (7 files)
- src/components/Input/ (7 files)

**Root**

- COMPONENTS.md
- vitest.config.ts, vitest.setup.ts

### Validation

| Check              | Status |
| ------------------ | ------ |
| TypeScript (web)   | PASS   |
| TypeScript (ui)    | PASS   |
| ESLint (web)       | PASS   |
| ESLint (ui)        | PASS   |
| Tests (22)         | PASS   |
| Build (next build) | PASS   |
| Prettier           | PASS   |

### Problems

1. **Next.js 16 removed `next lint`** — had to switch to `eslint src/` directly
2. **eslint-config-next incompatible with ESLint 10 flat config** — circular JSON error. Used simple config instead
3. **cva `error` variant conflicts with `error?: string` prop** — renamed cva variant to `hasError`
4. **ThemeProvider uses client hooks** — added `"use client"` directive to both ThemeProvider and demo page
5. **@types/react-dom version mismatch** — 19.2.5 didn't exist, pinned to 19.2.3
6. **ESLint ignores all files when using `ignores` with broad patterns** — removed from web config
7. **Test matchers not available** — added `@testing-library/jest-dom/vitest` setup file

### Solutions

- All issues documented in MEMORY.md for future reference
- Each fix validated end-to-end: build → typecheck → lint → test → format

### What I Learned

- Next.js 16 is stable but has CLI differences from v15
- Tailwind v4 CSS-first config is simpler and works well
- Component + test + story + readme pattern takes ~10 min per component once tokens are ready
- pnpm workspace imports need `transpilePackages` in next.config.ts and proper `exports` in package.json

### Repository Health

| Metric        | Value         |
| ------------- | ------------- |
| Workspace     | PASS          |
| Build         | PASS          |
| TypeScript    | PASS          |
| Lint          | PASS          |
| Tests         | 22/22 passing |
| Documentation | PASS          |
| Formatting    | PASS          |
| Overall       | Healthy       |

### Next Session

- TASK-0009: UI primitives (Select, Checkbox, Dialog, Tooltip, DropdownMenu, Tabs, Switch, RadioGroup)
