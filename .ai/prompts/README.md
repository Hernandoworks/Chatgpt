# Phoenix Prompt Library

Master index of all prompt templates used by the Phoenix AI Software Factory prompts.

## Prompt Registry

| #   | Prompt                 | File                        | Purpose                                          | Used By               |
| --- | ---------------------- | --------------------------- | ------------------------------------------------ | --------------------- |
| 1   | Build Web App          | `build-web-app.md`          | Full web application from requirements           | Web App workflow      |
| 2   | Build UI Component     | `build-ui-component.md`     | Single UI component for the design system        | UI Component workflow |
| 3   | Build API              | `build-api.md`              | Backend API endpoint or service                  | API workflow          |
| 4   | Build SQL              | `build-sql.md`              | Database schema, queries, and migrations         | SQL workflow          |
| 5   | Build Google Sheet     | `build-google-sheet.md`     | Google Sheets workbook with formulas             | Google Sheet workflow |
| 6   | Build Apps Script      | `build-apps-script.md`      | Google Apps Script project                       | Apps Script workflow  |
| 7   | Generate Documentation | `generate-documentation.md` | Technical documentation                          | Docs workflow         |
| 8   | Review Code            | `review-code.md`            | Code review against Phoenix standards            | Review workflow       |
| 9   | Refactor Code          | `refactor-code.md`          | Code quality improvement without behavior change | Refactor workflow     |
| 10  | Generate Tests         | `generate-tests.md`         | Test suite for existing code                     | Test workflow         |

## Template Variables

Every prompt supports these template variables via `{{variable}}` syntax:

| Variable           | Description                                          | Source                      |
| ------------------ | ---------------------------------------------------- | --------------------------- |
| `{{requirements}}` | Task requirements from the issue body                | Issue body                  |
| `{{context}}`      | Project context (architecture, stack, existing code) | Auto-injected               |
| `{{code}}`         | Code block for review/refactor/test                  | PR diff or issue attachment |

## Adding a New Prompt

1. Create a new `.md` file in this directory
2. Follow the structure: Role, Mission, Standards, Requirements, Context, Output
3. Use `{{variable}}` placeholders for dynamic content
4. Register it in the workflow that triggers it
5. Update this README index
