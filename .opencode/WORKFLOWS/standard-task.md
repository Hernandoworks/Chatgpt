# Workflow: Standard Task Execution

## Steps

1. **Read** `.opencode/PROJECT_STATE.md` to understand current state
2. **Read** `.opencode/NEXT_TASK.md` to learn the immediate task
3. **Read** `.opencode/MEMORY.md` to learn from past lessons
4. **Read** `.opencode/KNOWLEDGE_GRAPH.md` to understand dependencies
5. **Read** `.opencode/` — all remaining instruction files
6. **Read** `06-docs/project/` — task register, milestones, build summary
7. **Read** repository to understand what already exists
8. **Plan** implementation — identify files to create/modify
9. **Implement** exactly ONE task (from NEXT_TASK.md)
10. **Install** dependencies if needed
11. **Run TypeScript** — `pnpm typecheck` or `npx tsc --noEmit`
12. **Run Lint** — `pnpm lint`
13. **Run Tests** — `pnpm test`
14. **Fix** all errors before proceeding
15. **Review** — answer the Continuous Review questions (see below)
16. **Update** `.opencode/MEMORY.md` with new lessons
17. **Update** `.opencode/PROJECT_STATE.md` — advance state
18. **Update** `.opencode/NEXT_TASK.md` — set the next task
19. **Update** `06-docs/project/TASK_REGISTER.md` — mark task status
20. **Update** `06-docs/project/BUILD_SUMMARY.md` — new iteration
21. **Update** `06-docs/project/PROGRESS.md` — recalculate
22. **Update** `06-docs/project/MILESTONES.md` — if milestone completed
23. **Update** `CHANGELOG.md` — add entry
24. **Write** iteration summary in DEVELOPMENT_LOG.md
25. **Commit** using format from COMMITS.md
26. **Stop** — wait for approval

## Continuous Review

After every task, answer:

- Did I improve the architecture?
- Did I reduce complexity?
- Did I duplicate any code?
- Did I introduce technical debt?
- Should I refactor before continuing?
- Can another component reuse what I just built?

If any answer is unsatisfactory, fix it before committing.

## Automatic Refactoring

Every 10 COMPLETED tasks:

1. Review the entire repository
2. Find: dead code, duplication, large files, unused dependencies, poor naming, architecture drift
3. Refactor safely
4. Run all validation
5. Commit with message: `refactor(repo): milestone N housekeeping`

## Quality Gates

Before marking any task COMPLETED:

- [ ] TypeScript passes
- [ ] ESLint passes
- [ ] Tests pass
- [ ] Storybook builds (when applicable)
- [ ] Responsive (when UI)
- [ ] Accessible (when UI)
- [ ] Keyboard navigation (when UI)
- [ ] Dark mode (when UI)
- [ ] Mobile support (when UI)
- [ ] No duplicated code
- [ ] Documentation updated
- [ ] Task register updated
- [ ] Build summary updated
- [ ] Changelog updated
- [ ] Project state updated
- [ ] Memory updated
