---
id: release-pipeline
version: 1.0.0
agents: [release-manager, quality-engineer, devops-engineer]
prompts: [write-release-notes]
validators: [release, code-quality, security]
triggers: [phoenix/release]
---

# Workflow: Release Pipeline

## Trigger

Milestone completion or manual release trigger. Runs end-to-end release process from validation through deployment.

## Steps

1. Verify all milestone tasks are COMPLETED in TASK_REGISTER.md
2. Run code-quality validators: typecheck → lint → test → format → build
3. Run security validators: npm audit → secret scan → OWASP review
4. Quality Engineer reviews coverage thresholds and performance budgets
5. If any gate fails, halt release and report to team
6. Release Manager bumps version across all packages (SemVer)
7. Release Manager updates CHANGELOG.md with cumulative changes
8. Load prompt: `.ai/prompts/write-release-notes.md`
9. Generate release notes from changelog
10. DevOps Engineer creates git tag (v{version})
11. DevOps Engineer triggers deployment pipeline
12. DevOps Engineer verifies deployment health
13. Release Manager creates GitHub Release with release notes
14. Release Manager notifies stakeholders

## Handoffs

- Release Manager → Quality Engineer: release candidate for validation
- Quality Engineer → Release Manager: validation pass/fail report
- Release Manager → DevOps Engineer: approved version for deployment
- DevOps Engineer → Release Manager: deployment confirmation

## Validation Gates

- [ ] All milestone tasks are COMPLETED
- [ ] TypeScript compiles with zero errors
- [ ] ESLint passes with zero errors
- [ ] All tests pass
- [ ] Prettier format check passes
- [ ] Build succeeds
- [ ] npm audit: zero critical vulnerabilities
- [ ] No secrets in code
- [ ] Coverage meets threshold
- [ ] Version follows SemVer
- [ ] CHANGELOG.md is updated
- [ ] Git tag exists matching version
- [ ] Deployment health check passes
- [ ] Release notes are generated

## Output

- Version bump commit
- Updated CHANGELOG.md
- Git tag v{version}
- GitHub Release with release notes
- Deployment artifacts
- Stakeholder notification
