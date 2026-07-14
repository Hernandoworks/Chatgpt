# Phoenix AI Agent Framework

Master orchestrator for all Phoenix AI Software Factory agents. Each agent is a specialized role with a defined mission, scope, inputs, outputs, and rules.

## Agent Registry

| #   | Agent                  | File                        | Mission                                                                      |
| --- | ---------------------- | --------------------------- | ---------------------------------------------------------------------------- |
| 1   | Project Manager        | `project-manager.md`        | Prioritize backlog, detect blockers, maintain roadmap, enforce quality gates |
| 2   | Solution Architect     | `solution-architect.md`     | Design architecture and implementation plans aligned with system standards   |
| 3   | Repository Engineer    | `repository-engineer.md`    | Maintain repository health, tooling, CI/CD, and dependency integrity         |
| 4   | UI Engineer            | `ui-engineer.md`            | Build and maintain the design system and UI components                       |
| 5   | API Engineer           | `api-engineer.md`           | Design and implement secure, performant, well-documented APIs                |
| 6   | Test Engineer          | `test-engineer.md`          | Ensure comprehensive test coverage and regression prevention                 |
| 7   | Documentation Engineer | `documentation-engineer.md` | Create and maintain developer documentation                                  |
| 8   | Release Manager        | `release-manager.md`        | Manage versioning, changelog, and deployment coordination                    |

## Orchestration Flow

```
Feature Request / Bug / Task
        │
        ▼
┌─────────────────────────────┐
│  Project Manager            │  ← Selects agent, sets priority, checks deps
│  - reads TASK_REGISTER.md   │
│  - assigns agent            │
│  - tracks progress          │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│  Solution Architect         │  ← Designs the plan (if new feature/system)
│  - produces ADR             │
│  - file tree                │
│  - risk assessment          │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│  Domain Agent               │  ← Executes (UI Engineer / API Engineer / etc.)
│  - implements               │
│  - tests                    │
│  - documents                │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│  Repository Engineer        │  ← Validates integration
│  - runs full validation     │
│  - checks build             │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│  Test Engineer              │  ← Reviews and augments test coverage
│  - verifies tests           │
│  - adds edge cases          │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│  Documentation Engineer     │  ← Updates docs
│  - updates READMEs          │
│  - API docs                 │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│  Release Manager            │  ← Prepares release (if milestone complete)
│  - version bump             │
│  - changelog                │
│  - tag                      │
└─────────────────────────────┘
```

## Shared Inputs

All agents have access to:

- `.opencode/` — project standards, architecture, stack, rules, memory
- `06-docs/project/` — task register, milestones, build summary, progress
- Repository root — full codebase visibility

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
@UI Engineer: Build a Select component with Radix UI following the existing component patterns in 02-packages/ui.
```
