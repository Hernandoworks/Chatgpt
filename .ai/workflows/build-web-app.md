---
id: build-web-app
version: 2.0.0
agents: [solution-architect, ui-engineer, api-engineer]
prompts: [build-web-app]
validators: [code-quality]
triggers: [phoenix/web-app]
---

# Workflow: Build Web Application

## Trigger

Issue labeled `phoenix/web-app`

## Steps

1. Load prompt: `.ai/prompts/build-web-app.md`
2. Inject context: repository structure, existing components, standards
3. Inject requirements: issue body, comments, labels
4. Call DeepSeek API with constructed prompt
5. Parse response into file operations
6. Create/modify files in the appropriate workspace package
7. Run validation: typecheck → lint → test → build
8. If validation fails, loop back to step 4 with error context
9. Create draft pull request with summary of changes

## Prompt Variables

- `{{requirements}}` — issue body
- `{{context}}` — repository structure, dependency info, existing code relevant to the request

## Handoffs

- Solution Architect → UI Engineer: page layout spec, component breakdown, navigation flow
- UI Engineer → API Engineer: required data shapes, mutation endpoints, auth requirements
- API Engineer → Solution Architect: API contract, rate limits, error responses

## Validation Gates

- [ ] TypeScript compiles with zero errors
- [ ] ESLint passes with zero errors
- [ ] All tests pass
- [ ] Prettier format check passes
- [ ] Build succeeds

## Output

- Pull request with code changes
- Validation results as PR comment
- Summary of what was built
