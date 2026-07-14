# Decision Log

---

## DEC-001 — Numeric Monorepo Structure

| Field        | Value                                                                           |
| ------------ | ------------------------------------------------------------------------------- |
| Date         | 2026-07-14                                                                      |
| Decision     | Use numbered directories (01-apps, 02-packages, ...) for monorepo organization. |
| Reason       | Provides clear ordering, avoids alphabet soup, and scales predictably.          |
| Alternatives | Semantic folders (apps/, packages/); lerna/nx workspaces.                       |
| Impact       | Simpler navigation; manual ordering requires discipline.                        |

---

## DEC-002 — OpenCode Instruction Files

| Field        | Value                                                                          |
| ------------ | ------------------------------------------------------------------------------ |
| Date         | 2026-07-14                                                                     |
| Decision     | Store agent instructions in .opencode/ instead of a monolithic master prompt.  |
| Reason       | Enables reusable, composable prompts; agent loads only what it needs per task. |
| Alternatives | Single prompt file; project README; inline instructions.                       |
| Impact       | More consistent agent output; easier to update and review.                     |

---

## DEC-003 — Self-Documenting Project Governance

| Field        | Value                                                                                                                        |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| Date         | 2026-07-14                                                                                                                   |
| Decision     | Maintain TASK_REGISTER.md, MILESTONES.md, DECISIONS.md, BUILD_SUMMARY.md, PROGRESS.md, and CHANGELOG.md in 06-docs/project/. |
| Reason       | Repository becomes self-documenting; easy to resume, review, or hand over.                                                   |
| Alternatives | External project management tool; wiki; Notion.                                                                              |
| Impact       | Slightly more overhead per task; significantly better traceability and continuity.                                           |
