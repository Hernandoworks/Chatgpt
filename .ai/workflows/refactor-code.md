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

## Output

- Refactored code
- Validation results
- Summary of improvements made
- Before/after comparison
