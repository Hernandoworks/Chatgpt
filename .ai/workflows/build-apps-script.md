# Workflow: Build Apps Script

## Trigger

Issue labeled `phoenix/apps-script`

## Steps

1. Load prompt: `.ai/prompts/build-apps-script.md`
2. Analyze requirements for script functionality
3. Design code structure, triggers, permissions
4. Call DeepSeek API
5. Output complete script code and configuration
6. Store in `03-services/apps-script/` or document for manual deploy

## Output

- Complete Apps Script project code
- appsscript.json manifest
- Trigger setup instructions
- OAuth scopes documentation
