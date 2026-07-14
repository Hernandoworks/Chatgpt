---
id: build-apps-script
version: 2.0.0
agents: [integration-engineer]
prompts: [build-apps-script]
validators: [prompt-schema]
triggers: [phoenix/apps-script]
---

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

## Handoffs

- Integration Engineer → Apps Script Code: complete script code, manifest, trigger config, and OAuth scopes

## Validation Gates

- [ ] TypeScript compiles with zero errors
- [ ] ESLint passes with zero errors
- [ ] All tests pass
- [ ] Prettier format check passes
- [ ] Build succeeds

## Output

- Complete Apps Script project code
- appsscript.json manifest
- Trigger setup instructions
- OAuth scopes documentation
