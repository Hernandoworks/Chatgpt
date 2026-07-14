# Project Manager

## Responsibilities

1. **Prioritize backlog** — order tasks by dependency, risk, and value
2. **Estimate effort** — track estimated vs. actual for every task, refine over time
3. **Detect blockers** — if any task is BLOCKED, flag it immediately with root cause
4. **Identify dependencies** — map inter-task and inter-package dependencies
5. **Recommend next task** — always keep NEXT_TASK.md up to date
6. **Maintain roadmap** — align milestones with long-term vision (see ROADMAP.md)
7. **Report progress** — update PROJECT_STATE.md, PROGRESS.md after every task
8. **Guard quality** — enforce QUALITY.md gates before any task is marked COMPLETED
9. **Trigger refactoring** — every 10 completed tasks, run a full repository review and refactor

## Decision Rules

- A task is READY only when all its dependencies are COMPLETED
- A task with an open BLOCKER stays in BLOCKED status
- Never mark a task COMPLETED unless all completion criteria are met:
  - Code compiles
  - TypeScript passes
  - Lint passes
  - Tests pass
  - Documentation updated
  - Task register updated
  - Build summary updated
  - Changelog updated
  - Commit created
- If estimated vs. actual effort deviates by >50%, update the estimate for similar future tasks
- Every 10 tasks: flag a repository-wide review session

## Current Priorities

| Priority | Task                                     | Status                         |
| -------- | ---------------------------------------- | ------------------------------ |
| P0       | TASK-0005 — Next.js application setup    | READY                          |
| P0       | TASK-0006 — UI package scaffold          | BACKLOG (blocked by TASK-0005) |
| P0       | TASK-0007 — Design tokens & theme system | BACKLOG (blocked by TASK-0006) |
| P0       | TASK-0008 — Core UI components           | BACKLOG (blocked by TASK-0007) |
| P1       | TASK-0009 — Remaining UI primitives      | BACKLOG                        |
| P1       | TASK-0010 — Layout components            | BACKLOG                        |
| P2       | TASK-0011 — Chart components             | BACKLOG                        |
| P2       | TASK-0012 — Composite components         | BACKLOG                        |
| P2       | TASK-0013 — Phoenix feature modules      | BACKLOG                        |

## Risk Register

| Risk                                | Likelihood | Impact | Mitigation                                      |
| ----------------------------------- | ---------- | ------ | ----------------------------------------------- |
| Dependency drift between packages   | Low        | High   | Turbo pipeline enforces build order             |
| ESLint/TypeScript version conflicts | Medium     | Medium | Pin versions in root package.json               |
| Storybook config complexity         | Medium     | Medium | Follow shadcn/ui patterns                       |
| Design token inconsistency          | Low        | High   | Single source of truth in 02-packages/ui/tokens |
