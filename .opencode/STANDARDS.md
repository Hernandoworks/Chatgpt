# Coding Standards

## TypeScript

- Strict mode enabled (`strict: true`)
- `noUncheckedIndexedAccess` — never assume object access is safe
- `noUnusedLocals` and `noUnusedParameters` — dead code is an error
- `noFallthroughCasesInSwitch` and `noImplicitOverride` enforced
- Prefer `interface` over `type` for object shapes
- Use `type` for unions, intersections, and utility types
- Avoid `any` — use `unknown` and narrow with type guards
- All function return types must be explicit
- All component props must have a dedicated `types.ts` file

## Components

- Use `forwardRef` where the component wraps a native element
- Support dark mode via Tailwind `dark:` variants or Theme context
- Support loading state — skeleton or spinner
- Support disabled state — `aria-disabled` + reduced opacity
- Support variants — `variant` prop with well-defined union type
- Support responsive layout — mobile-first with Tailwind breakpoints
- Support accessibility — proper ARIA attributes, keyboard navigation, focus management
- Never exceed 300 lines per file; extract subcomponents or hooks
- No duplicated code — extract shared logic into hooks or utils
- No inline styles — Tailwind utility classes only
- Keep business logic outside UI components — use hooks or services
- Use barrel exports (`index.ts`) for every component and package
- Every component needs: Component.tsx, types.ts, index.ts, tests.tsx, stories.tsx, README.md
- Optional: constants.ts, hooks.ts, utils.ts

## Naming

- Components: PascalCase (`Button.tsx`)
- Hooks: camelCase with `use` prefix (`useTheme.ts`)
- Utils: camelCase (`formatDate.ts`)
- Types: PascalCase (`ButtonProps`)
- Constants: SCREAMING_SNAKE_CASE (`MAX_FILE_SIZE`)
- Files: match the export name

## Imports

- Group: external → internal → relative
- No default exports — use named exports everywhere
- Absolute imports within a package (use TypeScript path aliases)

## State Management

- Local state: `useState` / `useReducer`
- Server state: TanStack Query
- Shared UI state: React Context (sparingly, prefer composition)
- Form state: React Hook Form + Zod
- Avoid prop drilling past 3 levels

## CSS

- Tailwind utility classes only
- `cn()` helper for conditional classes (from `clsx` + `tailwind-merge`)
- Component variants via `cva` (class-variance-authority)
- No CSS modules, no styled-components, no inline styles
