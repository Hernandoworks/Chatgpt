# Phoenix Prompt Library

Master index of all prompt templates used by the Phoenix AI Software Factory. Each prompt has YAML frontmatter with id, version, agents, output type, and required variables.

## Prompt Registry

### Engineering Prompts

| #   | Prompt                 | Version                     | Agents | Output                                                        | Used By             |
| --- | ---------------------- | --------------------------- | ------ | ------------------------------------------------------------- | ------------------- |
| 1   | Build Web App          | `build-web-app.md`          | 2.0.0  | solution-architect, ui-engineer, api-engineer                 | page-code           | Web App workflow      |
| 2   | Build UI Component     | `build-ui-component.md`     | 2.0.0  | ui-engineer, design-system-engineer, accessibility-specialist | component-files     | UI Component workflow |
| 3   | Build Dashboard        | `build-dashboard.md`        | 1.0.0  | ui-engineer, data-analyst, ux-designer                        | page-code           | Dashboard workflow    |
| 4   | Build API              | `build-api.md`              | 2.0.0  | api-engineer, integration-engineer                            | api-code            | API workflow          |
| 5   | Build SQL              | `build-sql.md`              | 2.0.0  | database-engineer                                             | sql-code            | SQL workflow          |
| 6   | Write Schema           | `write-schema.md`           | 1.0.0  | database-engineer, domain-modeler                             | schema-code         | SQL/Database workflow |
| 7   | Create Migration       | `create-migration.md`       | 1.0.0  | database-engineer                                             | migration-code      | Database workflow     |
| 8   | Generate Documentation | `generate-documentation.md` | 2.0.0  | documentation-engineer                                        | documentation       | Docs workflow         |
| 9   | Generate Tests         | `generate-tests.md`         | 2.0.0  | test-engineer                                                 | test-code           | Test workflow         |
| 10  | Review Code            | `review-code.md`            | 2.0.0  | quality-engineer, security-engineer                           | review-report       | Review workflow       |
| 11  | Refactor Code          | `refactor-code.md`          | 2.0.0  | quality-engineer                                              | refactored-code     | Refactor workflow     |
| 12  | Write Test Plan        | `write-test-plan.md`        | 1.0.0  | qa-engineer, test-engineer                                    | test-plan           | QA workflow           |
| 13  | Build Pipeline         | `build-pipeline.md`         | 1.0.0  | agent-orchestrator                                            | pipeline-config     | Orchestrator          |
| 14  | Triage Request         | `triage-request.md`         | 1.0.0  | agent-orchestrator                                            | pipeline-assignment | Orchestrator          |
| 15  | Conduct Security Audit | `conduct-security-audit.md` | 1.0.0  | security-engineer                                             | security-report     | Security workflow     |
| 16  | Write Release Notes    | `write-release-notes.md`    | 1.0.0  | release-manager, technical-writer                             | release-notes       | Release workflow      |

### Design Prompts

| #   | Prompt              | Version                  | Agents | Output                                                                       | Used By     |
| --- | ------------------- | ------------------------ | ------ | ---------------------------------------------------------------------------- | ----------- |
| 17  | Design Component    | `design-component.md`    | 1.0.0  | ux-designer, visual-designer, interaction-designer, accessibility-specialist | design-spec | Component Design workflow |
| 18  | Design System Token | `design-system-token.md` | 1.0.0  | design-system-engineer, visual-designer                                      | token-code  | Design System workflow    |

### Product Prompts

| #   | Prompt       | Version           | Agents | Output          | Used By      |
| --- | ------------ | ----------------- | ------ | --------------- | ------------ |
| 19  | Plan Feature | `plan-feature.md` | 1.0.0  | product-manager | feature-plan | Feature Planning workflow |

### Business Prompts

| #   | Prompt             | Version                 | Agents | Output               | Used By          |
| --- | ------------------ | ----------------------- | ------ | -------------------- | ---------------- |
| 20  | Build Google Sheet | `build-google-sheet.md` | 2.0.0  | workflow-engineer    | sheet-spec       | Google Sheet workflow |
| 21  | Build Apps Script  | `build-apps-script.md`  | 2.0.0  | integration-engineer | apps-script-code | Apps Script workflow  |

## Template Variables

Every prompt supports `{{variable}}` syntax. Required and optional variables are declared in each prompt's frontmatter.

| Variable            | Description                                          | Source                      |
| ------------------- | ---------------------------------------------------- | --------------------------- |
| `{{requirements}}`  | Task requirements from the issue body                | Issue body                  |
| `{{context}}`       | Project context (architecture, stack, existing code) | Auto-injected               |
| `{{code}}`          | Code block for review/refactor/test                  | PR diff or issue attachment |
| `{{domain-model}}`  | Domain model for schema/migration prompts            | Domain Modeler              |
| `{{token-changes}}` | Token change specification                           | Visual designer             |
| `{{feature-spec}}`  | Feature specification with user stories              | Product Manager             |

## Adding a New Prompt

1. Create a new `.md` file in this directory with YAML frontmatter
2. Follow the structure: Role, Mission, Standards, Requirements, Context/Input, Output
3. Use `{{variable}}` placeholders for dynamic content
4. Register in `.ai/agenda.json` under the appropriate agent(s)
5. Update this README registry table
