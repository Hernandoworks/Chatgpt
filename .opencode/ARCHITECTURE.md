# Architecture

## Monorepo Structure

```
01-apps/         — Application entry points (Next.js)
02-packages/     — Shared libraries (ui, config, utils)
03-services/     — Backend services
04-database/     — Schema, migrations, seeds
05-infra/        — Infrastructure as code
06-docs/         — Project documentation
07-tests/        — Integration & e2e tests
08-scripts/      — Build & dev scripts
09-tools/        — Internal tooling
10-assets/       — Static assets (images, fonts)
11-config/       — Shared configuration
12-templates/    — Code generation templates
13-examples/     — Usage examples
14-monitoring/   — Observability config
15-security/     — Security policies
16-experiments/  — Experimental features
99-archive/     — Deprecated code
```

## Design Principles

- **Composition over inheritance** — components compose behavior via props and slots
- **Minimal dependencies** — scrutinize every addition to package.json
- **Business logic outside UI** — React components are presentation only
- **Type safety everywhere** — strict TypeScript with noUncheckedIndexedAccess
- **Design system driven** — all UI comes from 02-packages/ui, never inline
