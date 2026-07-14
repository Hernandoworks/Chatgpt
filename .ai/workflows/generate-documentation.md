---
id: generate-documentation
version: 2.0.0
agents: [documentation-engineer, technical-writer]
prompts: [generate-documentation]
validators: [prompt-schema]
triggers: [phoenix/docs]
---

# Workflow: Generate Documentation

## Trigger

Issue labeled `phoenix/docs`

## Steps

1. Load prompt: `.ai/prompts/generate-documentation.md`
2. Extract code or feature to document from issue
3. Analyze code for public APIs, types, usage patterns
4. Call DeepSeek API
5. Create documentation file in appropriate location
6. Update any index/table-of-contents files
7. Validate markdown formatting

## Handoffs

- Documentation Engineer → Technical Writer: code analysis and API reference draft for final polish

## Validation Gates

- [ ] TypeScript compiles with zero errors
- [ ] ESLint passes with zero errors
- [ ] All tests pass
- [ ] Prettier format check passes
- [ ] Build succeeds

## Output

- Documentation markdown file
- Code examples
- API reference
- Cross-links to related docs
