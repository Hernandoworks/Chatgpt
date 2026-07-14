# Phoenix Workflow Definitions

Master index of all workflow definitions. Each workflow specifies the agent sequence, prompts, handoffs, validation gates, and expected output for a specific type of work.

## Workflow Registry

### Orchestration & Triage

| #   | Workflow       | Version             | Agents | Prompts            | Triggers       |
| --- | -------------- | ------------------- | ------ | ------------------ | -------------- |
| 1   | Triage Request | `triage-request.md` | 1.0.0  | agent-orchestrator | triage-request | phoenix/* |

### Product & Planning

| #   | Workflow     | Version           | Agents | Prompts                                                              | Triggers     |
| --- | ------------ | ----------------- | ------ | -------------------------------------------------------------------- | ------------ |
| 2   | Plan Feature | `plan-feature.md` | 1.0.0  | product-manager, user-researcher, solution-architect, domain-modeler | plan-feature | phoenix/feature |

### Design

| #   | Workflow         | Version               | Agents | Prompts                                                                                              | Triggers                              |
| --- | ---------------- | --------------------- | ------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------- |
| 3   | Design Component | `design-component.md` | 1.0.0  | ux-designer, visual-designer, interaction-designer, accessibility-specialist, design-system-engineer | design-component, design-system-token | phoenix/ui-component |

### Engineering — Build

| #   | Workflow           | Version                 | Agents | Prompts                                       | Triggers                                  |
| --- | ------------------ | ----------------------- | ------ | --------------------------------------------- | ----------------------------------------- |
| 4   | Build Web App      | `build-web-app.md`      | 2.0.0  | solution-architect, ui-engineer, api-engineer | build-web-app                             | phoenix/web-app      |
| 5   | Build UI Component | `build-ui-component.md` | 2.0.0  | ui-engineer                                   | build-ui-component, design-component      | phoenix/ui-component |
| 6   | Build Dashboard    | `build-dashboard.md`    | 2.0.0  | ui-engineer, data-analyst, ux-designer        | build-dashboard                           | phoenix/dashboard    |
| 7   | Build API          | `build-api.md`          | 2.0.0  | api-engineer, integration-engineer            | build-api                                 | phoenix/api          |
| 8   | Build SQL          | `build-sql.md`          | 2.0.0  | database-engineer, domain-modeler             | build-sql, write-schema, create-migration | phoenix/sql          |
| 9   | Build Google Sheet | `build-google-sheet.md` | 2.0.0  | workflow-engineer                             | build-google-sheet                        | phoenix/google-sheet |
| 10  | Build Apps Script  | `build-apps-script.md`  | 2.0.0  | integration-engineer                          | build-apps-script                         | phoenix/apps-script  |

### Engineering — Quality

| #   | Workflow               | Version                     | Agents | Prompts                                  | Triggers               |
| --- | ---------------------- | --------------------------- | ------ | ---------------------------------------- | ---------------------- |
| 11  | Review Code            | `review-code.md`            | 2.0.0  | quality-engineer, security-engineer      | review-code            | phoenix/review, pull_request |
| 12  | Refactor Code          | `refactor-code.md`          | 2.0.0  | quality-engineer, repository-engineer    | refactor-code          | phoenix/refactor             |
| 13  | Generate Documentation | `generate-documentation.md` | 2.0.0  | documentation-engineer, technical-writer | generate-documentation | phoenix/docs                 |

### Security & Release

| #   | Workflow         | Version               | Agents | Prompts                                            | Triggers               |
| --- | ---------------- | --------------------- | ------ | -------------------------------------------------- | ---------------------- |
| 14  | Audit Security   | `audit-security.md`   | 1.0.0  | security-engineer, devops-engineer                 | conduct-security-audit | phoenix/security, pre-release |
| 15  | Release Pipeline | `release-pipeline.md` | 1.0.0  | release-manager, quality-engineer, devops-engineer | write-release-notes    | phoenix/release               |

## Workflow Structure

Every workflow must contain these sections in order:

1. **Trigger** — What event starts this workflow (issue label, PR event, schedule)
2. **Steps** — Ordered list of steps, each with agent and action
3. **Handoffs** — What artifacts pass between agents at each transition
4. **Validation Gates** — Checklist of checks that must pass
5. **Output** — What the workflow produces

## Adding a New Workflow

1. Create a new `.md` file in this directory with YAML frontmatter
2. Define: id, version, agents (in order), prompts, validators, triggers
3. Write sections: Trigger, Steps, Handoffs, Validation Gates, Output
4. Register in `.ai/agenda.json` under the appropriate agent(s)
5. Update this README registry table
