# Task Register

## Status Values

- BACKLOG
- READY
- IN_PROGRESS
- BLOCKED
- REVIEW
- COMPLETED
- CANCELLED

---

## TASK-0001

| Field            | Value                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Title            | Repository bootstrap                                                                                                                                                                                                                                                                                                                                                           |
| Description      | Initialize monorepo scaffold with numeric directory structure, .gitkeep placeholders, and README.                                                                                                                                                                                                                                                                              |
| Priority         | HIGH                                                                                                                                                                                                                                                                                                                                                                           |
| Status           | COMPLETED                                                                                                                                                                                                                                                                                                                                                                      |
| Dependencies     | None                                                                                                                                                                                                                                                                                                                                                                           |
| Files affected   | 01-apps/.gitkeep, 02-packages/.gitkeep, 03-services/.gitkeep, 04-database/.gitkeep, 05-infra/.gitkeep, 06-docs/.gitkeep, 07-tests/.gitkeep, 08-scripts/.gitkeep, 09-tools/.gitkeep, 10-assets/.gitkeep, 11-config/.gitkeep, 12-templates/.gitkeep, 13-examples/.gitkeep, 14-monitoring/.gitkeep, 15-security/.gitkeep, 16-experiments/.gitkeep, 99-archive/.gitkeep, README.md |
| Estimated effort | 1h                                                                                                                                                                                                                                                                                                                                                                             |
| Actual effort    | 1h                                                                                                                                                                                                                                                                                                                                                                             |
| Owner            | hernando                                                                                                                                                                                                                                                                                                                                                                       |
| Date Created     | 2026-07-14                                                                                                                                                                                                                                                                                                                                                                     |
| Date Completed   | 2026-07-14                                                                                                                                                                                                                                                                                                                                                                     |
| Notes            | Initial scaffold committed.                                                                                                                                                                                                                                                                                                                                                    |

---

## TASK-0002

| Field            | Value                                                                                                                                                                                                                                                                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Title            | OpenCode instruction files                                                                                                                                                                                                                                                                                                                                 |
| Description      | Create .opencode/ directory with AGENT.md, RULES.md, ARCHITECTURE.md, STACK.md, WORKFLOW.md, QUALITY.md, COMPONENT_TEMPLATE.md, COMMITS.md, TASKS.md, and PROMPTS/ directory with reusable prompts.                                                                                                                                                        |
| Priority         | HIGH                                                                                                                                                                                                                                                                                                                                                       |
| Status           | COMPLETED                                                                                                                                                                                                                                                                                                                                                  |
| Dependencies     | TASK-0001                                                                                                                                                                                                                                                                                                                                                  |
| Files affected   | .opencode/AGENT.md, .opencode/RULES.md, .opencode/STACK.md, .opencode/WORKFLOW.md, .opencode/QUALITY.md, .opencode/COMPONENT_TEMPLATE.md, .opencode/COMMITS.md, .opencode/TASKS.md, .opencode/PROMPTS/implement-component.md, .opencode/PROMPTS/review.md, .opencode/PROMPTS/refactor.md, .opencode/PROMPTS/testing.md, .opencode/PROMPTS/documentation.md |
| Estimated effort | 1h                                                                                                                                                                                                                                                                                                                                                         |
| Actual effort    | 1h                                                                                                                                                                                                                                                                                                                                                         |
| Owner            | hernando                                                                                                                                                                                                                                                                                                                                                   |
| Date Created     | 2026-07-14                                                                                                                                                                                                                                                                                                                                                 |
| Date Completed   | 2026-07-14                                                                                                                                                                                                                                                                                                                                                 |
| Notes            | Persistent instruction files for agent consistency.                                                                                                                                                                                                                                                                                                        |

---

## TASK-0003

| Field            | Value                                                                                                                                                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Title            | Task management & project documentation                                                                                                                                                                                                  |
| Description      | Create 06-docs/project/ directory with TASK_REGISTER.md, MILESTONES.md, DECISIONS.md, BUILD_SUMMARY.md, PROGRESS.md, and root CHANGELOG.md. Update WORKFLOW.md to include task management step.                                          |
| Priority         | HIGH                                                                                                                                                                                                                                     |
| Status           | COMPLETED                                                                                                                                                                                                                                |
| Dependencies     | TASK-0002                                                                                                                                                                                                                                |
| Files affected   | 06-docs/project/TASK_REGISTER.md, 06-docs/project/MILESTONES.md, 06-docs/project/DECISIONS.md, 06-docs/project/BUILD_SUMMARY.md, 06-docs/project/PROGRESS.md, CHANGELOG.md, .opencode/WORKFLOW.md, .opencode/PROMPTS/master-execution.md |
| Estimated effort | 1h                                                                                                                                                                                                                                       |
| Actual effort    | 1h                                                                                                                                                                                                                                       |
| Owner            | hernando                                                                                                                                                                                                                                 |
| Date Created     | 2026-07-14                                                                                                                                                                                                                               |
| Date Completed   | 2026-07-14                                                                                                                                                                                                                               |
| Notes            | Self-documenting project governance.                                                                                                                                                                                                     |

---

## TASK-0004

| Field            | Value                                                                                                                                                                                                                                                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Title            | Workspace tooling configuration                                                                                                                                                                                                                                                                                             |
| Description      | Configure pnpm workspace, root package.json, turbo.json, tsconfig, ESLint, Prettier, EditorConfig, .gitignore.                                                                                                                                                                                                              |
| Priority         | HIGH                                                                                                                                                                                                                                                                                                                        |
| Status           | COMPLETED                                                                                                                                                                                                                                                                                                                   |
| Dependencies     | TASK-0003                                                                                                                                                                                                                                                                                                                   |
| Files affected   | pnpm-workspace.yaml, package.json, turbo.json, tsconfig.json, tsconfig.base.json, eslint.config.mjs, .prettierrc, .editorconfig, .gitignore, .opencode/ARCHITECTURE.md                                                                                                                                                      |
| Estimated effort | 2h                                                                                                                                                                                                                                                                                                                          |
| Actual effort    | 1h                                                                                                                                                                                                                                                                                                                          |
| Owner            | hernando                                                                                                                                                                                                                                                                                                                    |
| Date Created     | 2026-07-14                                                                                                                                                                                                                                                                                                                  |
| Date Completed   | 2026-07-14                                                                                                                                                                                                                                                                                                                  |
| Notes            | Milestone 001 — Repository Bootstrap. pnpm workspace, Turbo 2, TypeScript 5, ESLint 10, Prettier 3 configured. Created AI-native workspace with PROJECT_STATE.md, NEXT_TASK.md, MEMORY.md, DEVELOPMENT_LOG.md, PROJECT_MANAGER.md, KNOWLEDGE_GRAPH.md, STANDARDS.md, ROADMAP.md, DECISION_LOG.md, and WORKFLOWS/ directory. |

---

## TASK-0005

| Field            | Value                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| Title            | Next.js application setup                                                                         |
| Description      | Create 01-apps/web with Next.js 15, React 19, TypeScript, Tailwind CSS. Verify dev server starts. |
| Priority         | HIGH                                                                                              |
| Status           | IN_PROGRESS                                                                                       |
| Dependencies     | TASK-0004                                                                                         |
| Files affected   | 01-apps/web/ (multiple)                                                                           |
| Estimated effort | 2h                                                                                                |
| Actual effort    | —                                                                                                 |
| Owner            | hernando                                                                                          |
| Date Created     | 2026-07-14                                                                                        |
| Date Completed   | —                                                                                                 |
| Notes            | Milestone 002 — Next.js Application. Using Next.js 16 + Tailwind v4.                              |

---

## TASK-0006

| Field            | Value                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------- |
| Title            | UI package scaffold                                                                          |
| Description      | Create 02-packages/ui with package exports, barrel exports, TypeScript, build configuration. |
| Priority         | HIGH                                                                                         |
| Status           | BACKLOG                                                                                      |
| Dependencies     | TASK-0004                                                                                    |
| Files affected   | 02-packages/ui/ (multiple)                                                                   |
| Estimated effort | 1h                                                                                           |
| Actual effort    | —                                                                                            |
| Owner            | —                                                                                            |
| Date Created     | 2026-07-14                                                                                   |
| Date Completed   | —                                                                                            |
| Notes            | Milestone 003 — UI Package.                                                                  |

---

## TASK-0007

| Field            | Value                                                                                               |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| Title            | Design tokens & theme system                                                                        |
| Description      | Implement colors, typography, spacing, radius, shadows, motion tokens, breakpoints, theme provider. |
| Priority         | HIGH                                                                                                |
| Status           | BACKLOG                                                                                             |
| Dependencies     | TASK-0006                                                                                           |
| Files affected   | 02-packages/ui/src/tokens/, 02-packages/ui/src/theme/                                               |
| Estimated effort | 3h                                                                                                  |
| Actual effort    | —                                                                                                   |
| Owner            | —                                                                                                   |
| Date Created     | 2026-07-14                                                                                          |
| Date Completed   | —                                                                                                   |
| Notes            | Milestone 004 — Foundation.                                                                         |

---

## TASK-0008

| Field            | Value                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Title            | Core UI components — Button, Card, Badge, Input                                                                           |
| Description      | Implement Button, Card, Badge, Input with component files, types, tests, Storybook, and README per COMPONENT_TEMPLATE.md. |
| Priority         | HIGH                                                                                                                      |
| Status           | BACKLOG                                                                                                                   |
| Dependencies     | TASK-0007                                                                                                                 |
| Files affected   | 02-packages/ui/src/components/Button/, Card/, Badge/, Input/                                                              |
| Estimated effort | 4h                                                                                                                        |
| Actual effort    | —                                                                                                                         |
| Owner            | —                                                                                                                         |
| Date Created     | 2026-07-14                                                                                                                |
| Date Completed   | —                                                                                                                         |
| Notes            | Milestone 005 — Core UI.                                                                                                  |

---

## TASK-0015

| Field            | Value                                                                                                                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Title            | Phoenix AI Software Factory — Repository Foundation                                                                                                                                          |
| Description      | Create .ai/ directory structure with prompts, workflows, agents, memory, validators, schemas, examples, templates. Add PULL_REQUEST_TEMPLATE.md, CODEOWNERS, phoenix-request issue template. |
| Priority         | HIGH                                                                                                                                                                                         |
| Status           | COMPLETED                                                                                                                                                                                    |
| Dependencies     | TASK-0014                                                                                                                                                                                    |
| Files affected   | .ai/ (entire directory), .github/PULL_REQUEST_TEMPLATE.md, .github/CODEOWNERS, .github/ISSUE_TEMPLATE/phoenix-request.yml                                                                    |
| Estimated effort | 2h                                                                                                                                                                                           |
| Actual effort    | 1h                                                                                                                                                                                           |
| Owner            | hernando                                                                                                                                                                                     |
| Date Created     | 2026-07-14                                                                                                                                                                                   |
| Date Completed   | 2026-07-14                                                                                                                                                                                   |
| Notes            | Milestone 001 — Phoenix AI Software Factory Foundation. 10 prompt templates, 9 workflows, 8 agents, issue template, PR template, CODEOWNERS created.                                         |

---

## TASK-0009

| Field            | Value                                                                                |
| ---------------- | ------------------------------------------------------------------------------------ |
| Title            | Remaining UI primitives                                                              |
| Description      | Implement Select, Checkbox, RadioGroup, Switch, Tabs, Dialog, Tooltip, DropdownMenu. |
| Priority         | HIGH                                                                                 |
| Status           | BACKLOG                                                                              |
| Dependencies     | TASK-0008                                                                            |
| Files affected   | 02-packages/ui/src/components/                                                       |
| Estimated effort | 8h                                                                                   |
| Actual effort    | —                                                                                    |
| Owner            | —                                                                                    |
| Date Created     | 2026-07-14                                                                           |
| Date Completed   | —                                                                                    |
| Notes            | Milestone 006 — UI Primitives.                                                       |

---

## TASK-0010

| Field            | Value                                                        |
| ---------------- | ------------------------------------------------------------ |
| Title            | Layout components                                            |
| Description      | Implement AppShell, Sidebar, Header, Container, Grid, Stack. |
| Priority         | HIGH                                                         |
| Status           | BACKLOG                                                      |
| Dependencies     | TASK-0009                                                    |
| Files affected   | 02-packages/ui/src/components/                               |
| Estimated effort | 4h                                                           |
| Actual effort    | —                                                            |
| Owner            | —                                                            |
| Date Created     | 2026-07-14                                                   |
| Date Completed   | —                                                            |
| Notes            | Milestone 007 — Layout Components.                           |

---

## TASK-0011

| Field            | Value                                                              |
| ---------------- | ------------------------------------------------------------------ |
| Title            | Chart components                                                   |
| Description      | Implement LineChart, BarChart, PieChart, AreaChart using Recharts. |
| Priority         | MEDIUM                                                             |
| Status           | BACKLOG                                                            |
| Dependencies     | TASK-0009                                                          |
| Files affected   | 02-packages/ui/src/components/                                     |
| Estimated effort | 4h                                                                 |
| Actual effort    | —                                                                  |
| Owner            | —                                                                  |
| Date Created     | 2026-07-14                                                         |
| Date Completed   | —                                                                  |
| Notes            | Milestone 008 — Charts.                                            |

---

## TASK-0012

| Field            | Value                                                             |
| ---------------- | ----------------------------------------------------------------- |
| Title            | Composite components                                              |
| Description      | Implement DataTable, Form, PageHeader, EmptyState, ConfirmDialog. |
| Priority         | MEDIUM                                                            |
| Status           | BACKLOG                                                           |
| Dependencies     | TASK-0010                                                         |
| Files affected   | 02-packages/ui/src/components/                                    |
| Estimated effort | 6h                                                                |
| Actual effort    | —                                                                 |
| Owner            | —                                                                 |
| Date Created     | 2026-07-14                                                        |
| Date Completed   | —                                                                 |
| Notes            | Milestone 009 — Composite Components.                             |

---

## TASK-0013

| Field            | Value                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------- |
| Title            | Phoenix feature modules                                                               |
| Description      | Implement feature-specific modules: Dashboard, Chat, Settings, Search, Notifications. |
| Priority         | MEDIUM                                                                                |
| Status           | BACKLOG                                                                               |
| Dependencies     | TASK-0012                                                                             |
| Files affected   | 01-apps/web/src/features/                                                             |
| Estimated effort | 8h                                                                                    |
| Actual effort    | —                                                                                     |
| Owner            | —                                                                                     |
| Date Created     | 2026-07-14                                                                            |
| Date Completed   | —                                                                                     |
| Notes            | Milestone 010 — Phoenix Features.                                                     |

---

## TASK-0014

| Field            | Value                                                                                                                                                     |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Title            | Phoenix CLI — repository control center                                                                                                                   |
| Description      | Build a TypeScript CLI (09-tools/phoenix) with Commander for repository status, health checks, task management, validation, and natural-language queries. |
| Priority         | HIGH                                                                                                                                                      |
| Status           | COMPLETED                                                                                                                                                 |
| Dependencies     | TASK-0004                                                                                                                                                 |
| Files affected   | 09-tools/phoenix/ (entire directory)                                                                                                                      |
| Estimated effort | 3h                                                                                                                                                        |
| Actual effort    | 1h                                                                                                                                                        |
| Owner            | hernando                                                                                                                                                  |
| Date Created     | 2026-07-14                                                                                                                                                |
| Date Completed   | 2026-07-14                                                                                                                                                |
| Notes            | Commands: status, doctor, progress, roadmap, task (list/next/start/done), build, lint, test, format, validate, commit, tokens, natural-language queries.  |
