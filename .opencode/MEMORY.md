# AI Memory

Lessons learned during development. Updated after every task.

---

## Architecture

- Numeric monorepo structure (01-apps, 02-packages) provides clear ordering
- Turbo 2 uses `tasks` not `pipeline` — caught during validation, fixed
- ESLint flat config (eslint.config.mjs) is the standard for ESLint 10
- pnpm 11.1.3 works well; avoid pnpm self-update mid-sprint
- tsconfig `references` require child tsconfig files to exist — must create project tsconfigs first

## Next.js 16

- **No `next lint` command** — removed in v16. Use `eslint src/` directly instead
- Client components need `"use client"` directive at the top when using hooks (useState, useEffect, useContext)
- Server Components can't import modules that use client hooks
- `transpilePackages: ["ui"]` in next.config.ts required for workspace package imports
- Next.js 16 requires React 19 — verified compatible

## Tailwind CSS v4

- No `tailwind.config.js` needed — all config is CSS-based via `@import "tailwindcss"`
- PostCSS plugin is `@tailwindcss/postcss` (different from v3's `tailwindcss` plugin)
- Dark mode uses `dark:` variants — works identically to v3

## Design Tokens

- Stored in `02-packages/ui/src/tokens/` — single source of truth
- Exported as const objects for type safety and tree-shaking
- ThemeProvider + useTheme in `02-packages/ui/src/theme/`
- Barrel export from `02-packages/ui/src/index.ts`

## Components

- **cva + cn() pattern** works well for variant-based components
- `class-variance-authority`: variant props must be boolean for boolean variants (`hasError`, not `error`) — string props like `error?: string` conflict with cva boolean variants
- **Button**: 8 tests covering render, variants, sizes, loading, disabled, ref forwarding, className
- **Card**: Simple composition-based component — no variants needed
- **Badge**: 6 color variants + 2 sizes — all tested
- **Input**: Proper label + error message with `aria-invalid` and `role="alert"` for accessibility
- Every component supports dark mode via Tailwind `dark:` variants
- All components use `forwardRef` where the component wraps a native element

## Hooks

- Prefer composition over custom hooks when possible
- Extract logic into hooks only when reused across 3+ components

## Testing

- 22 tests total across 4 components — all passing
- Vitest + React Testing Library + jsdom
- Setup: `@testing-library/jest-dom/vitest` in `vitest.setup.ts` for matchers like `toBeDisabled`, `toHaveTextContent`, `toHaveAttribute`
- Vitest config needs `jsdom` environment and `globals: true`

## Validation

- Three-phase: TypeScript → ESLint → Tests → Prettier (format)
- Build validation: `next build` must succeed
- `pnpm format:check` before every commit

## Technical Debt

- ESLint config for web app is minimal — no `next/core-web-vitals` extending (not compatible with ESLint 10 flat config + Next.js 16)
- No Storybook installed yet — stories files exist but aren't rendered
- `skipLibCheck: true` in ui/tsconfig.json to work around pnpm hoisting issues with @types/react

## Package Management Lessons

- Always pin exact `@types/react` and `@types/react-dom` versions in child package.json, not just root
- `pnpm approve-builds` required for `sharp` and `unrs-resolver` in this environment
- `ERR_PNPM_NO_MATCHING_VERSION` happens if you guess a version that doesn't exist — always verify with `npm view`
