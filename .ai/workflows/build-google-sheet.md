# Workflow: Build Google Sheet

## Trigger

Issue labeled `phoenix/google-sheet`

## Steps

1. Load prompt: `.ai/prompts/build-google-sheet.md`
2. Analyze business requirements for sheet structure
3. Design sheets, columns, formulas, validation, formatting
4. Call DeepSeek API
5. Output structured sheet specification
6. Create documentation in `06-docs/sheets/`

## Output

- Sheet specification document
- Formula definitions
- Data validation rules
- Conditional formatting rules
- Usage instructions
