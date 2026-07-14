# Decision Log

## DEC-001 — Numeric Monorepo Structure

| Field        | Value                                                                           |
| ------------ | ------------------------------------------------------------------------------- |
| Date         | 2026-07-14                                                                      |
| Decision     | Use numbered directories (01-apps, 02-packages, ...) for monorepo organization. |
| Reason       | Provides clear ordering, avoids alphabet soup, and scales predictably.          |
| Alternatives | Semantic folders (apps/, packages/); lerna/nx workspaces.                       |
| Impact       | Simpler navigation; manual ordering requires discipline.                        |
| Status       | Final                                                                           |

---

## DEC-002 — OpenCode Instruction Files

| Field        | Value                                                                    |
| ------------ | ------------------------------------------------------------------------ |
| Date         | 2026-07-14                                                               |
| Decision     | Store agent instructions in `.opencode/` instead of a monolithic prompt. |
| Reason       | Reusable, composable prompts; agent loads only what it needs per task.   |
| Alternatives | Single prompt file; project README; inline instructions.                 |
| Impact       | More consistent agent output; easier to update and review.               |
| Status       | Final                                                                    |

---

## DEC-003 — Self-Documenting Project Governance

| Field        | Value                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------ |
| Date         | 2026-07-14                                                                                 |
| Decision     | Maintain task register, milestones, decisions, build summary, progress, changelog in-repo. |
| Reason       | Repository becomes self-documenting; easy to resume, review, or hand over.                 |
| Alternatives | External PM tool; wiki; Notion.                                                            |
| Impact       | Slightly more overhead per task; significantly better traceability.                        |
| Status       | Final                                                                                      |

---

## DEC-004 — AI-Native Workspace with Repository Brain

| Field        | Value                                                                                                                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Date         | 2026-07-14                                                                                                                                                                                      |
| Decision     | Add PROJECT_STATE.md, NEXT_TASK.md, MEMORY.md, PROJECT_MANAGER.md, KNOWLEDGE_GRAPH.md, STANDARDS.md, ROADMAP.md, DECISION_LOG.md, DEVELOPMENT_LOG.md, WORKFLOWS/ to `.opencode/`.               |
| Reason       | Repository becomes an active participant in development — the AI reads its state, knows what to do next, learns from past work, and follows a managed plan instead of needing external prompts. |
| Alternatives | Keep static prompt files only.                                                                                                                                                                  |
| Impact       | Slightly more files to maintain; eliminates prompt engineering overhead. Agent can self-start with a single instruction.                                                                        |
| Status       | Final                                                                                                                                                                                           |

---

## DEC-005 — Turbo 2 `tasks` Over `pipeline`

| Field        | Value                                                                           |
| ------------ | ------------------------------------------------------------------------------- |
| Date         | 2026-07-14                                                                      |
| Decision     | Use `tasks` key in turbo.json instead of deprecated `pipeline`.                 |
| Reason       | Turbo 2.0+ renamed `pipeline` to `tasks`. Failing to update breaks `turbo run`. |
| Alternatives | Pin turbo to v1.x.                                                              |
| Impact       | Catches the upgrade during validation; prevented a broken build.                |
| Status       | Final                                                                           |

---

## DEC-006 — ESLint Flat Config

| Field        | Value                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------- |
| Date         | 2026-07-14                                                                                        |
| Decision     | Use `eslint.config.mjs` with `@eslint/eslintrc` FlatCompat for backward compatibility.            |
| Reason       | ESLint 10 defaults to flat config. FlatCompat bridges existing plugin configs until they migrate. |
| Alternatives | `.eslintrc.*` (deprecated in ESLint 10).                                                          |
| Impact       | Cleaner config, future-proof. Requires explicit `ignores` instead of `.eslintignore`.             |
| Status       | Final                                                                                             |
