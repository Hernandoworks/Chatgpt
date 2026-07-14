---
id: design-component
version: 1.0.0
agents:
  [
    ux-designer,
    visual-designer,
    interaction-designer,
    accessibility-specialist,
    design-system-engineer,
  ]
prompts: [design-component, design-system-token]
validators: [prompt-schema, code-quality]
triggers: [phoenix/ui-component]
---

# Workflow: Design Component

## Trigger

A new UI component is requested. Runs before build-ui-component workflow to produce the design specification.

## Steps

1. Load prompt: `.ai/prompts/design-component.md`
2. UX Designer creates user flows, wireframes, and interaction models
3. Hand off wireframes and flows to Visual Designer
4. Visual Designer produces high-fidelity mockups with design token references
5. Hand off mockups to Interaction Designer
6. Interaction Designer specifies micro-interactions, transitions, and animations
7. Hand off interaction specs to Accessibility Specialist
8. Accessibility Specialist reviews against WCAG 2.2 AA and produces a11y spec
9. Hand off complete design spec to Design System Engineer
10. Design System Engineer updates tokens if needed and produces final spec
11. Output complete design specification package

## Handoffs

- UX Designer → Visual Designer: wireframes, user flows, interaction models
- Visual Designer → Interaction Designer: high-fidelity mockups
- Interaction Designer → Accessibility Specialist: interaction specifications
- Accessibility Specialist → Design System Engineer: a11y audit and remediation
- Design System Engineer → UI Engineer: complete design spec with token updates

## Validation Gates

- [ ] All user flows are documented
- [ ] Visual design references existing tokens (or proposes new ones)
- [ ] Interaction patterns include loading, empty, error, and edge case states
- [ ] WCAG 2.2 AA audit passes
- [ ] Dark mode variants are designed
- [ ] Responsive behavior is specified at all breakpoints
- [ ] New tokens (if any) follow naming conventions and include migration path

## Output

- Complete design specification package in `.ai/artifacts/{run-id}/design-spec/`
- Token update recommendations (if any)
- Accessibility compliance report
- Dark mode and responsive specifications
