# Workflow: Full Repository Review

Triggered: Every 10 completed tasks, or on demand.

## Steps

1. Read entire `.opencode/` — re-familiarize with standards and memory
2. Read entire `06-docs/project/` — re-familiarize with state
3. Scan every `*.ts`, `*.tsx`, `*.js`, `*.mjs` for:
   - Dead code (unused exports, orphan functions)
   - Code duplication (DRY violations)
   - Files exceeding 300 lines
   - Unused dependencies in package.json
   - Poor naming (unclear abbreviations, misleading names)
   - Architecture drift (code in wrong layer/location)
4. Check `TODO`, `FIXME`, `HACK`, `XXX` comments — resolve or track
5. Check dependency graph (KNOWLEDGE_GRAPH.md) — verify accuracy
6. Refactor safely — one change at a time
7. Run full validation after each change:
   - TypeScript
   - ESLint
   - Tests
8. Update MEMORY.md with findings
9. Update DECISION_LOG.md if new architectural decisions were made
10. Commit with message: `refactor(repo): milestone N housekeeping`
