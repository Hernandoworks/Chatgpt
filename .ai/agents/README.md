# Phoenix AI Agent Framework

Master orchestrator for all Phoenix AI Software Factory agents. Organized into four layers: Product, Design, Business, Engineering.

## Full Agent Registry

### Product Layer — Strategy & Requirements

| #   | Agent            | File                          | Mission                                                                                     |
| --- | ---------------- | ----------------------------- | ------------------------------------------------------------------------------------------- |
| 1   | Product Manager  | `product/product-manager.md`  | Define feature requirements, user stories, and acceptance criteria. Prioritize the roadmap. |
| 2   | User Researcher  | `product/user-researcher.md`  | Conduct user research, usability tests, and feedback analysis. Produce actionable insights. |
| 3   | Technical Writer | `product/technical-writer.md` | Write end-user documentation, release notes, onboarding guides, and help center content.    |

### Design Layer — Experience & Visual

| #   | Agent                    | File                                 | Mission                                                                                            |
| --- | ------------------------ | ------------------------------------ | -------------------------------------------------------------------------------------------------- |
| 4   | UX Designer              | `design/ux-designer.md`              | Create user flows, wireframes, and prototypes. Ensure intuitive, user-centered experiences.        |
| 5   | Visual Designer          | `design/visual-designer.md`          | Own the look and feel: color, typography, spacing, iconography, motion. Ensure visual consistency. |
| 6   | Interaction Designer     | `design/interaction-designer.md`     | Design micro-interactions, transitions, animations, and gesture controls. Make UI feel polished.   |
| 7   | Accessibility Specialist | `design/accessibility-specialist.md` | Audit and enforce WCAG 2.2 AA compliance. Ensure keyboard, screen reader, and contrast standards.  |
| 8   | Design System Engineer   | `design/design-system-engineer.md`   | Maintain tokens, Figma-code sync, component library, and design-to-code tooling.                   |

### Business Layer — Domain & Workflow

| #   | Agent                | File                               | Mission                                                                                            |
| --- | -------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------- |
| 9   | Domain Modeler       | `business/domain-modeler.md`       | Produce domain models, entity relationships, bounded contexts, and business rules.                 |
| 10  | Workflow Engineer    | `business/workflow-engineer.md`    | Design multi-step business workflows, state machines, approval chains, and automation.             |
| 11  | Integration Engineer | `business/integration-engineer.md` | Own third-party integrations: payments, email, webhooks, OAuth, external APIs.                     |
| 12  | Data Analyst         | `business/data-analyst.md`         | Define metrics, KPIs, dashboards, and reporting. Ensure accurate data collection and presentation. |

### Engineering Layer — Implementation & Quality

| #   | Agent                  | File                                    | Mission                                                                                             |
| --- | ---------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 13  | Agent Orchestrator     | `engineering/agent-orchestrator.md`     | Route requests to correct agents, sequence multi-agent workflows, manage handoffs.                  |
| 14  | Project Manager        | `engineering/project-manager.md`        | Prioritize backlog, track tasks, detect blockers, enforce quality gates.                            |
| 15  | Solution Architect     | `engineering/solution-architect.md`     | Design architecture, produce ADRs, create implementation plans with risk assessment.                |
| 16  | Repository Engineer    | `engineering/repository-engineer.md`    | Maintain monorepo health, tooling configuration, CI/CD, and dependency integrity.                   |
| 17  | UI Engineer            | `engineering/ui-engineer.md`            | Build and maintain design system components. Accessible, responsive, themeable, tested.             |
| 18  | API Engineer           | `engineering/api-engineer.md`           | Design and implement secure, performant, well-documented APIs and serverless functions.             |
| 19  | Database Engineer      | `engineering/database-engineer.md`      | Design schemas, write migrations, optimize queries, ensure data integrity.                          |
| 20  | DevOps Engineer        | `engineering/devops-engineer.md`        | Own infrastructure, deployment, CI/CD pipelines, monitoring, and environment management.            |
| 21  | Security Engineer      | `engineering/security-engineer.md`      | Scan vulns, enforce best practices, audit compliance, manage secrets.                               |
| 22  | Test Engineer          | `engineering/test-engineer.md`          | Write unit and component tests. Ensure coverage and regression prevention.                          |
| 23  | QA Engineer            | `engineering/qa-engineer.md`            | Plan and execute E2E tests, manual testing, regression. Sign off on releases from user perspective. |
| 24  | Quality Engineer       | `engineering/quality-engineer.md`       | Define and enforce quality standards, coverage thresholds, performance budgets.                     |
| 25  | Documentation Engineer | `engineering/documentation-engineer.md` | Create developer docs, API references, READMEs, and architecture documentation.                     |
| 26  | Prompt Engineer        | `engineering/prompt-engineer.md`        | Curate prompt library, validate templates, maintain prompt quality and versioning.                  |
| 27  | Release Manager        | `engineering/release-manager.md`        | Manage versioning, changelog generation, release artifacts, and deployment coordination.            |

## Orchestration Flow

```
Incoming Request (Issue / CLI / Web)
        │
        ▼
┌─────────────────────────────────────┐
│ Agent Orchestrator                  │
│ - classifies request type           │
│ - selects agents from registry      │
│ - sequences workflow across layers  │
└──────┬──────────────────────────────┘
       │
       ├── PRODUCT TRACK ──────────────────────────┐
       │  Product Manager → User Researcher         │
       │  → Technical Writer (if user-facing)       │
       └────────────────────────────────────────────┘
       │
       ├── DESIGN TRACK ────────────────────────────┐
       │  UX Designer → Visual Designer             │
       │  → Interaction Designer                    │
       │  → Accessibility Specialist                │
       │  → Design System Engineer                  │
       └────────────────────────────────────────────┘
       │
       ├── BUSINESS TRACK ──────────────────────────┐
       │  Domain Modeler → Workflow Engineer        │
       │  → Integration Engineer                    │
       │  → Data Analyst                            │
       └────────────────────────────────────────────┘
       │
       └── ENGINEERING TRACK ───────────────────────┐
          Solution Architect                         │
          → Domain Engineer(s)                       │
          → Repository Engineer (validate)           │
          → Test Engineer + QA Engineer              │
          → Quality Engineer (gate)                  │
          → Security Engineer (gate)                 │
          → Documentation Engineer                   │
          → Prompt Engineer (if AI-enabled)          │
          → DevOps Engineer (deploy)                 │
          → Release Manager (if milestone)           │
          → Project Manager (close task)             │
          └──────────────────────────────────────────┘
```

## Classification Matrix

| Request Type    | Product          | Design          | Business             | Engineering            |
| --------------- | ---------------- | --------------- | -------------------- | ---------------------- |
| New feature     | Product Manager  | UX Designer     | Domain Modeler       | Solution Architect     |
| UI component    | —                | Visual Designer | —                    | UI Engineer            |
| API endpoint    | —                | —               | Integration Engineer | API Engineer           |
| Database change | —                | —               | Domain Modeler       | Database Engineer      |
| Bug fix         | Product Manager  | —               | —                    | Domain Engineer        |
| Security issue  | —                | —               | —                    | Security Engineer      |
| Performance     | —                | —               | Data Analyst         | DevOps Engineer        |
| Documentation   | Technical Writer | —               | —                    | Documentation Engineer |
| Refactoring     | —                | —               | —                    | Quality Engineer       |
| Release         | Product Manager  | —               | —                    | Release Manager        |

## Shared Inputs

All agents have access to:

- `.opencode/` — project standards, architecture, stack, rules, memory
- `06-docs/project/` — task register, milestones, build summary, progress
- Repository root — full codebase visibility
- `.ai/` — prompts, workflows, agent definitions

## Quality Gates

Before any agent marks work as complete, these checks must pass:

- [ ] TypeScript compiles without errors
- [ ] ESLint passes with zero errors
- [ ] Tests pass (existing + new)
- [ ] Format check passes (Prettier)
- [ ] No regressions in unchanged code
- [ ] Documentation updated
- [ ] Task register updated

## Agent Invocation

Use the agent name as the reference when assigning work:

```
@{AgentName}: <task description>
```

Example:

```
@UI Engineer: Build a Select component with Radix UI
@Accessibility Specialist: Audit the Select component for WCAG 2.2 AA
```
