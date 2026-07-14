---
id: plan-feature
version: 1.0.0
agents: [product-manager, user-researcher, solution-architect, domain-modeler]
prompts: [plan-feature, triage-request]
validators: [prompt-schema]
triggers: [phoenix/web-app, phoenix/dashboard, phoenix/api]
---

# Workflow: Plan Feature

## Trigger

Feature request that requires product definition, research, architecture, and domain modeling before engineering begins.

## Steps

1. Load prompt: `.ai/prompts/plan-feature.md`
2. Product Manager analyzes requirements and produces user stories with acceptance criteria
3. Hand off user stories to User Researcher for validation
4. User Researcher validates assumptions and produces research insights
5. Hand off validated requirements to Solution Architect
6. Solution Architect designs architecture and produces ADR
7. Hand off architecture to Domain Modeler
8. Domain Modeler produces domain model, entities, and bounded contexts
9. Aggregate all outputs into feature specification
10. Hand off complete spec to engineering agents for implementation

## Handoffs

- Product Manager → User Researcher: user stories with assumptions to validate
- User Researcher → Solution Architect: validated requirements with research insights
- Solution Architect → Domain Modeler: ADR with architecture decisions
- Domain Modeler → Engineering Pipeline: domain model, entity definitions, business rules

## Validation Gates

- [ ] All user stories have acceptance criteria
- [ ] Architecture decision record is documented
- [ ] Domain model covers all entities and relationships
- [ ] No conflicts with existing architecture

## Output

- Feature specification with user stories and acceptance criteria
- Architecture decision record
- Domain model documentation
- Handoff package for engineering pipeline
