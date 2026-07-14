# Phoenix Agent Management Guide

How to manage, invoke, and operate the 26 agents in the Phoenix AI Software Factory.

---

## 1. Quick Start — Invoke an Agent

### Via GitHub Issue

Open an issue using `phoenix-request.yml` template. The Agent Orchestrator reads the issue, classifies the `request-type`, and invokes the correct agent(s).

```
Labels: phoenix, ai-assisted
Request Type: UI Component
Description: Build a Select component with search...
```

The orchestrator routes to: `@UX Designer → @Visual Designer → @UI Engineer → @Accessibility Specialist`

### Via CLI (future)

```bash
phoenix agent invoke --agent ui-engineer --prompt build-ui-component --input ./spec.md
```

### Via Direct Reference

In any conversation, reference an agent by `@`:

```
@Solution Architect: Design the architecture for a real-time notifications system.
@Database Engineer: Write the migration for the notifications schema.
```

---

## 2. Agent Lifecycle

```
REQUESTED → ASSIGNED → IN_PROGRESS → REVIEW → COMPLETED
                                            ↓
                                         FAILED
```

| State         | Description                                  |
| ------------- | -------------------------------------------- |
| `REQUESTED`   | Issue or task created, waiting for triage    |
| `ASSIGNED`    | Agent Orchestrator assigned the agent(s)     |
| `IN_PROGRESS` | Agent is executing its prompt+workflow       |
| `REVIEW`      | Output produced, awaiting human review       |
| `COMPLETED`   | Approved and merged                          |
| `FAILED`      | Agent could not complete (retry or reassign) |

---

## 3. Agent → Prompt → Workflow → Validator Mapping

Every agent invocation follows this chain:

```
1. TRIGGER  — Issue label, CLI command, or manual request
       │
2. AGENT    — Selected from classification matrix (see README.md)
       │
3. PROMPT   — Loaded from .ai/prompts/{id}.md
       │        Variables injected: {{requirements}}, {{context}}, {{code}}
       │
4. WORKFLOW — Loaded from .ai/workflows/{id}.md
       │        Defines steps, handoffs, gates
       │
5. VALIDATE — Validators run from .ai/validators/{id}.json
       │
6. OUTPUT   — PR, artifact, report, or release
```

### Mapping file: `.ai/agenda.json`

This file contains the complete cross-reference so tools can look up the chain automatically.

```json
{
  "agent": "ui-engineer",
  "prompts": ["build-ui-component", "design-component"],
  "workflows": ["build-ui-component", "design-component"],
  "validators": ["prompt-schema", "code-quality"],
  "triggers": ["phoenix/ui-component"]
}
```

---

## 4. Classification Matrix

| If you need...    | Start with...                                      | Then...                                |
| ----------------- | -------------------------------------------------- | -------------------------------------- |
| A new feature     | Product Manager → UX Designer → Solution Architect | Domain Engineer(s)                     |
| A UI component    | UX Designer → Visual Designer                      | UI Engineer + Accessibility Specialist |
| An API endpoint   | Solution Architect                                 | API Engineer + Integration Engineer    |
| A database change | Domain Modeler                                     | Database Engineer                      |
| A bug fix         | Quality Engineer                                   | Domain Engineer that owns the code     |
| Security audit    | Security Engineer                                  | DevOps Engineer                        |
| Documentation     | Technical Writer                                   | Documentation Engineer                 |
| A refactor        | Quality Engineer                                   | Repository Engineer                    |
| A release         | Release Manager → Quality Engineer                 | DevOps Engineer                        |

---

## 5. Multi-Agent Orchestration

For complex requests, the Agent Orchestrator sequences agents across layers:

```
                                 ┌─────────────────────┐
                                 │ Agent Orchestrator   │
                                 │ - classifies request │
                                 │ - builds pipeline    │
                                 └──────┬──────────────┘
                                        │
  ┌─────────────────────────────────────┼─────────────────────────────────────┐
  │              PRODUCT                │              DESIGN                │          BUSINESS                    ENGINEERING
  ▼                                     ▼                                     ▼                                      ▼
Product Manager                UX Designer                        Domain Modeler                  Solution Architect
  │                               │                                    │                              │
  ▼                               ▼                                    ▼                              ▼
User Researcher            Visual Designer                       Workflow Engineer              UI / API / DB Engineer
  │                               │                                    │                              │
  ▼                               ▼                                    ▼                              ▼
Technical Writer          Interaction Designer                Integration Engineer            Test / QA Engineer
                          Accessibility. Specialist                  │                              │
                          Design System Engineer              Data Analyst                  Documentation Engineer
                                                                                                  │
                                                                                            Quality Engineer
                                                                                                  │
                                                                                            DevOps Engineer
                                                                                                  │
                                                                                            Release Manager
```

Each arrow represents a handoff. The handoff artifact (what gets passed) is defined in the workflow file.

---

## 6. Handoff Protocol

When Agent A completes and hands off to Agent B:

```
Agent A output → Artifact file in .ai/artifacts/{run-id}/ → Agent B picks up
```

| Field        | Description                 |
| ------------ | --------------------------- |
| `from`       | Agent ID of the sender      |
| `to`         | Agent ID of the receiver    |
| `artifact`   | Path to the output artifact |
| `prompt`     | Prompt template used        |
| `validation` | Validator results           |
| `status`     | Pass / Fail                 |

Handoff artifacts are stored in `.ai/artifacts/{pipeline-id}/{step-order}/`.

---

## 7. Quality Gates

Every agent invocation runs through these gates before the output is accepted:

### Pre-flight (before agent starts)

- [ ] Input requirements are clear and complete
- [ ] Dependencies are satisfied
- [ ] No conflicting work in progress

### Post-flight (after agent completes)

- [ ] Prompt template validated against schema
- [ ] Workflow steps all completed
- [ ] Validator checks pass (typecheck, lint, test, format, security)
- [ ] Output artifact is well-formed
- [ ] Handoff artifact documented

### Release gates

- [ ] All validators pass
- [ ] Version bumped (SemVer)
- [ ] Changelog updated
- [ ] Tag created
- [ ] Release notes generated

---

## 8. Adding a New Agent

```
1. Create .ai/agents/{layer}/{agent-name}.md
2. Add entry to .ai/agents/index.json (with runbook)
3. Register in .ai/agenda.json (map to prompts, workflows, validators)
4. Update .ai/agents/README.md registry table
5. If needed, add new prompt template in .ai/prompts/
6. If needed, add new workflow definition in .ai/workflows/
7. If needed, update classification matrix in README.md
```

---

## 9. Monitoring Agent Activity

Each agent invocation should be traceable:

| What                | Where                                                |
| ------------------- | ---------------------------------------------------- |
| Active agent runs   | `.ai/artifacts/{pipeline-id}/status.json`            |
| Agent output logs   | `.ai/artifacts/{pipeline-id}/{step}/output.md`       |
| Validation results  | `.ai/artifacts/{pipeline-id}/{step}/validation.json` |
| Handoff history     | `.ai/artifacts/{pipeline-id}/handoffs.json`          |
| Pipeline completion | `.ai/artifacts/{pipeline-id}/summary.json`           |

---

## 10. Troubleshooting

| Symptom                   | Likely cause                         | Fix                                        |
| ------------------------- | ------------------------------------ | ------------------------------------------ |
| Agent produces bad output | Prompt template is wrong or outdated | Update the prompt in `.ai/prompts/`        |
| Agent fails validation    | Code quality gate not met            | Fix code or update validators              |
| Wrong agent assigned      | Classification matrix is wrong       | Update matrix in README.md                 |
| Workflow gets stuck       | Handoff artifact missing             | Check `.ai/artifacts/` for the failed step |
| Agent not found           | Not registered in index.json         | Add entry to `index.json`                  |
