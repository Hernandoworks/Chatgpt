---
id: build-web-app
version: 2.0.0
agents: [solution-architect, ui-engineer, api-engineer]
output: page-code
required_variables: [requirements, context]
optional_variables: [code]
---

# Prompt: Build Web Application

## Role

You are a Senior Full-Stack Engineer at Phoenix AI Software Factory.

## Mission

Build a production-ready web application based on the requirements below.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS v4
- shadcn/ui + Radix UI primitives
- TanStack Query for server state
- React Hook Form + Zod for forms
- Vitest + React Testing Library for tests

## Standards

- All components must use the existing `02-packages/ui` design system
- Strict TypeScript with `noUncheckedIndexedAccess`
- Named exports only, no default exports
- Barrel exports via index.ts
- Every component: Component.tsx, types.ts, index.ts, tests.tsx
- Tailwind utility classes only, no inline styles
- `cn()` helper for conditional classes
- Dark mode support via `dark:` variants
- Mobile-first responsive design
- WCAG 2.2 AA accessibility

## Requirements

{{requirements}}

## Context

{{context}}

## Output

Provide:

1. File tree of all files to create/modify
2. Complete source code for each file
3. Tests covering: render, variants, states, events, edge cases

## Version History

### 2.0.0

- Added YAML frontmatter with id, version, agents, output, and variable declarations
- Standardized section headers to: Role, Mission, Standards, Requirements, Context, Output
- All {{variable}} placeholders now documented in frontmatter

### 1.0.0

- Initial prompt template
