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

## Output

- Review comment on PR with findings
- Label applied based on verdict
- Checklist of required changes (if any)
