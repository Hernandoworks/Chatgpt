---
id: audit-security
version: 1.0.0
agents: [security-engineer, devops-engineer]
prompts: [conduct-security-audit]
validators: [security, code-quality]
triggers: [phoenix/security, release-prerelease]
---

# Workflow: Audit Security

## Trigger

Security review request or pre-release security gate. Runs before any release is approved.

## Steps

1. Load prompt: `.ai/prompts/conduct-security-audit.md`
2. Security Engineer scans dependencies for known vulnerabilities (npm audit)
3. Security Engineer reviews code for OWASP Top 10 patterns
4. Security Engineer checks for hardcoded secrets and credentials
5. Security Engineer reviews authentication and authorization logic
6. Security Engineer verifies proper error handling (no stack traces exposed)
7. Hand off audit findings to DevOps Engineer
8. DevOps Engineer remediates infrastructure-level findings
9. DevOps Engineer updates dependency versions if needed
10. Security Engineer produces final security report

## Handoffs

- Security Engineer → DevOps Engineer: audit findings requiring infrastructure changes
- DevOps Engineer → Security Engineer: remediation confirmation
- Security Engineer → Release Manager: security sign-off

## Validation Gates

- [ ] npm audit: zero critical and high vulnerabilities
- [ ] No secrets or credentials in source code
- [ ] OWASP Top 10 review completed
- [ ] Authentication and authorization verified
- [ ] Error handling does not expose stack traces or internal details
- [ ] Input validation is present on all external entry points
- [ ] Security Engineer signs off with verdict

## Output

- Security audit report in `.ai/artifacts/{run-id}/security-report.json`
- Vulnerability remediation log
- Security sign-off or change-request verdict
