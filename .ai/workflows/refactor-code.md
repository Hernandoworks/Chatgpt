---
id: refactor-code
version: 2.0.0
agents: [quality-engineer, repository-engineer]
prompts: [refactor-code]
validators: [code-quality]
triggers: [phoenix/refactor]
---

# Workflow: Refactor Code

## Trigger

Issue labeled `phoenix/refactor`

## Steps

1. Load prompt: `.ai/prompts/refactor-code.md`
2. Extract code or file paths from issue
3. Analyze code for: duplication, complexity, type safety, naming, structure
4. Call DeepSeek API with refactoring instructions
5. Apply refactoring changes
6. Run full validation: typecheck → lint → test → build
7. Ensure no behavior change (test pass rate identical)
8. Create draft pull request

## Handoffs

- Quality Engineer → Repository Engineer: refactoring plan and validation results
- Repository Engineer → PR: refactored code diff and before/after comparison

## Validation Gates

- [ ] TypeScript compiles with zero errors
- [ ] ESLint passes with zero errors
- [ ] All tests pass
- [ ] Prettier format check passes
- [ ] Build succeeds

## Output

- Refactored code
- Validation results
- Summary of improvements made
- Before/after comparison
