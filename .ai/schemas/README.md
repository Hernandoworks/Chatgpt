# Schemas

JSON Schema definitions for validating all Phoenix AI Software Factory artifacts. Each schema defines the required structure, sections, and conventions for its target file type.

## Schema Registry

| #   | Schema              | File                          | Validates                                                         | Used By            |
| --- | ------------------- | ----------------------------- | ----------------------------------------------------------------- | ------------------ |
| 1   | Prompt Template     | `prompt-template.schema.json` | `.ai/prompts/*.md` — frontmatter, sections, variables             | Prompt validator   |
| 2   | Workflow Definition | `workflow.schema.json`        | `.ai/workflows/*.md` — frontmatter, steps, handoffs, gates        | Workflow validator |
| 3   | Agent Definition    | `agent.schema.json`           | `.ai/agents/*.md` — mission, scope, inputs, outputs, rules        | Agent validator    |
| 4   | Issue Request       | `issue-request.schema.json`   | Incoming GitHub issue structure from phoenix-request.yml          | Agent Orchestrator |
| 5   | Pipeline Config     | `pipeline-config.schema.json` | Pipeline run definitions with agent sequence, prompts, validators | Pipeline engine    |

## Validation

Schemas are validated by the corresponding validators in `.ai/validators/`:

```
prompt-template.schema.json   ← prompt-schema.validator.json
workflow.schema.json           ← workflow-schema.validator.json
agent.schema.json              ← agent-schema.validator.json
```

## Adding a New Schema

1. Create a new `.json` file in this directory
2. Use JSON Schema draft-07
3. Define all required and optional properties
4. Add a corresponding validator in `.ai/validators/`
5. Register in `agenda.json` if used by an agent
6. Update this README registry table
