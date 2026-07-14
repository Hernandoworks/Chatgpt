---
id: triage-request
version: 1.0.0
agents: [agent-orchestrator]
prompts: [triage-request]
validators: [prompt-schema]
triggers: [phoenix/*, issues]
---

# Workflow: Triage Request

## Trigger

Any new issue labeled `phoenix/*` or any request submitted through the phoenix-request.yml template.

## Steps

1. Load prompt: `.ai/prompts/triage-request.md`
2. Extract request metadata: type, description, labels, priority, area
3. Classify request type against classification matrix
4. Determine primary agent and supporting agents
5. Build pipeline configuration with ordered steps
6. Assign agents and create pipeline run
7. Log triage decision and rationale
8. If request type is unrecognized, escalate to human operator

## Handoffs

- Agent Orchestrator → Primary Agent: hands off pipeline config with requirements
- Agent Orchestrator → Project Manager: updates task register with new entry

## Validation Gates

- [ ] Request type is recognized and mapped to agent(s)
- [ ] Pipeline configuration is valid per pipeline-config.schema.json
- [ ] All referenced agents exist in index.json
- [ ] All referenced prompts exist in .ai/prompts/

## Output

- Pipeline configuration in `.ai/artifacts/{run-id}/pipeline.json`
- Task register updated with new task entry
- Agents assigned and notified
