# Workflow: Build UI Component

## Trigger

Issue labeled `phoenix/ui-component`

## Steps

1. Load prompt: `.ai/prompts/build-ui-component.md`
2. Inject component requirements from issue
3. Determine target package (`02-packages/ui/src/components/{ComponentName}/`)
4. Call DeepSeek API
5. Create component files: types.ts, Component.tsx, index.ts, tests.tsx, README.md
6. Update barrel export in parent index.ts
7. Run validation: typecheck → lint → test → build
8. If validation fails, loop back to step 4 with error details
9. Create draft pull request

## File Structure

```
02-packages/ui/src/components/{ComponentName}/
├── types.ts
├── ComponentName.tsx
├── index.ts
├── tests.tsx
└── README.md
```

## Output

- New component in the UI library
- Tests passing
- Barrel export updated
- Component catalog (COMPONENTS.md) updated
