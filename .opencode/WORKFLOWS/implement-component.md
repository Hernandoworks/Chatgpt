# Workflow: Component Implementation

Use when implementing a new component per COMPONENT_TEMPLATE.md.

## Steps

1. Read STANDARDS.md — component rules
2. Read COMPONENT_TEMPLATE.md — required files
3. Read KNOWLEDGE_GRAPH.md — verify no circular dependencies
4. Read MEMORY.md — learn from past component work
5. Create folder: `02-packages/ui/src/components/{ComponentName}/`
6. Create files in order:
   - `types.ts` — props interface, variant types, constants types
   - `constants.ts` — variant maps, default values, size maps
   - `hooks.ts` — if component needs internal state logic
   - `utils.ts` — if component needs formatting/calculation helpers
   - `ComponentName.tsx` — main component implementation
   - `index.ts` — barrel export
   - `stories.tsx` — Storybook stories for every variant and state
   - `tests.tsx` — Vitest tests (render, props, variants, states, events, edge cases)
   - `README.md` — usage documentation
7. Run TypeScript check
8. Run lint
9. Run tests
10. Fix all issues
11. Update MEMORY.md
12. Commit
