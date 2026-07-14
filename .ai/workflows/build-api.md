---
id: build-api
version: 2.0.0
agents: [api-engineer, integration-engineer]
prompts: [build-api]
validators: [code-quality]
triggers: [phoenix/api]
---

# Workflow: Build API

## Trigger

Issue labeled `phoenix/api`

## Steps

1. Load prompt: `.ai/prompts/build-api.md`
2. Inject context: repository structure, existing API patterns
3. Design API endpoints, request/response schemas
4. Call DeepSeek API with constructed prompt
5. Create/modify files: route handlers, validation schemas, types
6. Write integration tests
7. Run validation: typecheck → lint → test → build
8. If validation fails, loop back to step 4 with error context
9. Create draft pull request with summary of changes

## Handoffs

- API Engineer → Integration Engineer: endpoint specs, request/response schemas, auth requirements
- Integration Engineer → API Engineer: integration test results, edge case findings

## Validation Gates

- [ ] TypeScript compiles with zero errors
- [ ] ESLint passes with zero errors
- [ ] All tests pass
- [ ] Prettier format check passes
- [ ] Build succeeds
