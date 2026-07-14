# Validators

Validation rules and configurations used by the Phoenix AI Software Factory pipelines. Each validator defines a set of checks that must pass at specific gates in the workflow.

## Validator Registry

| #   | Validator       | File                             | Purpose                                                                   | Enforced At                | Depends On             |
| --- | --------------- | -------------------------------- | ------------------------------------------------------------------------- | -------------------------- | ---------------------- |
| 1   | Prompt Schema   | `prompt-schema.validator.json`   | Validates prompt template structure against `prompt-template.schema.json` | Prompt creation / update   | —                      |
| 2   | Workflow Schema | `workflow-schema.validator.json` | Validates workflow definition against `workflow.schema.json`              | Workflow creation / update | —                      |
| 3   | Agent Schema    | `agent-schema.validator.json`    | Validates agent definition against `agent.schema.json`                    | Agent creation / update    | —                      |
| 4   | Code Quality    | `code-quality.validator.json`    | TypeScript, lint, test, format, build, coverage                           | PR review, pre-merge       | —                      |
| 5   | Security        | `security.validator.json`        | Vulnerability scan, secret detection, OWASP review                        | PR review, pre-release     | —                      |
| 6   | Release         | `release.validator.json`         | Version bump, changelog, SemVer, tag, quality/security gates              | Pre-release                | code-quality, security |

## Gate Order

```
Prompt/Workflow/Agent Creation
  → prompt-schema / workflow-schema / agent-schema

PR / Code Change
  → code-quality
  → security

Release
  → code-quality (must pass)
  → security (must pass)
  → release
```

## Adding a New Validator

1. Create a new `.json` file in this directory
2. List all checks with id, description, severity (error/warning/suggestion), and enforce flag
3. Register in `agenda.json` if referenced by a workflow
4. Update this README registry table
