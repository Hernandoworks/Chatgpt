---
id: review-code
version: 2.0.0
agents: [quality-engineer, security-engineer]
prompts: [review-code]
validators: [code-quality, security]
triggers: [phoenix/review, pull_request]
---

# Workflow: Review Code

## Trigger

Issue labeled `phoenix/review` or pull request opened

## Steps

1. Load prompt: `.ai/prompts/review-code.md`
2. Extract code from PR diff or issue attachment
3. Inject project standards and architecture context
4. Call DeepSeek API
5. Post review results as PR comment
6. Set labels based on verdict (approved/changes-requested)

## Handoffs

- Quality Engineer → Security Engineer: code diff and project context for security review
- Security Engineer → PR: security findings merged into final review comment

## Validation Gates

- [ ] TypeScript compiles with zero errors
- [ ] ESLint passes with zero errors
- [ ] All tests pass
- [ ] Prettier format check passes
- [ ] Build succeeds

## Output

- Review comment on PR with findings
- Label applied based on verdict
- Checklist of required changes (if any)
