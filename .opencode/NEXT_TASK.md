TASK-0015

Phoenix AI Software Factory — Milestone 001: Repository Foundation

## Completed

- Created `.ai/` directory structure with prompts, workflows, agents, memory, validators, schemas, examples, templates
- Created 10 reusable prompt templates (build-web-app, build-ui-component, build-api, build-sql, build-google-sheet, build-apps-script, generate-documentation, review-code, refactor-code, generate-tests)
- Created 9 business workflow definitions
- Created 8 agent definitions (Project Manager, Solution Architect, Repository Engineer, UI Engineer, API Engineer, Test Engineer, Documentation Engineer, Release Manager)
- Created PULL_REQUEST_TEMPLATE.md
- Created CODEOWNERS file
- Created phoenix-request issue template for AI-assisted feature requests

## Next Task

TASK-0016 — Prompt Engine

## Requirements

1. Create `09-tools/phoenix-prompt-engine/` or extend `09-tools/phoenix`
2. Load prompt templates from `.ai/prompts/`
3. Inject project context, coding standards, task information
4. Build final request payload for the model
5. Support template variables and composition
6. No hard-coded prompts in GitHub Actions
7. Run validation
8. Update task register
9. Update build summary
10. Commit
11. Stop

## Standards

- Read `.opencode/` before starting
- Read `06-docs/project/TASK_REGISTER.md`
- Read `06-docs/project/BUILD_SUMMARY.md`
- Read `06-docs/project/MILESTONES.md`
- Follow WORKFLOW.md exactly
- Never skip testing
- Never commit failing code
