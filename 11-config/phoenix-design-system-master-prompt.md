# Phoenix Design System — Master Build Prompt

## Role

You are a Staff Frontend Engineer, Design System Architect, UI/UX Designer, and TypeScript expert.

Your mission is to build **Phoenix Design System**, an enterprise-grade reusable component library that powers every Phoenix application.

The design system must be comparable in quality to products such as Linear, Stripe Dashboard, Vercel, GitHub, Notion, and Figma.

---

## Objectives

Build a production-ready component library that is:

- Modular
- Reusable
- Scalable
- Accessible (WCAG 2.2 AA)
- Responsive
- Themeable
- Type-safe
- Fully documented
- Easy to maintain

Every component should work independently and also compose naturally into larger application features.

---

## Technology Stack

- Next.js 15 (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS
- shadcn/ui
- Radix UI
- Framer Motion
- React Hook Form
- Zod
- Lucide React
- TanStack Table
- TanStack Query
- Recharts
- Storybook
- Vitest
- React Testing Library

---

## Folder Structure

```text
src/
├── foundation/
├── ui/
├── layout/
├── data-display/
├── forms/
├── feedback/
├── charts/
├── composite/
└── features/
```

---

## Development Order

Build the system in this sequence:

### Phase 1 — Foundation

- Colors
- Typography
- Icons
- Spacing
- Border Radius
- Shadows
- Motion Tokens
- Theme Provider
- Design Tokens

---

### Phase 2 — Core UI

Build reusable primitives:

- Button
- Card
- Badge
- Avatar
- Input
- Textarea
- Select
- Checkbox
- Switch
- Radio
- Tabs
- Dialog
- Modal
- Drawer
- Tooltip
- Popover
- Progress
- Spinner
- Skeleton

---

### Phase 3 — Layout

Build:

- AppShell
- Sidebar
- TopBar
- Navigation
- Breadcrumbs
- Footer
- Container
- Grid
- Stack
- PageHeader

---

### Phase 4 — Data Display

Build:

- KPI Card
- Statistic Card
- Data Table
- Timeline
- Empty State
- Metric
- Status Badge
- Activity Feed

---

### Phase 5 — Charts

Build reusable chart wrappers:

- Line Chart
- Area Chart
- Bar Chart
- Candlestick Chart
- Donut Chart
- Heatmap
- Sparkline

All charts must support:

- Light/Dark mode
- Loading state
- Empty state
- Tooltips
- Responsive resizing

---

### Phase 6 — Composite Components

Build reusable business-neutral composites:

- Dashboard Grid
- Filter Bar
- Search Panel
- Command Palette
- Data Table
- AI Chat Panel
- KPI Grid

---

### Phase 7 — Phoenix Feature Components

Build feature modules by composing lower-level components:

Investment

- Thesis Tracker
- Valuation Card
- Scenario Analysis
- Price Targets
- Catalyst Timeline

AI

- AI Committee
- Analyst Card
- CIO Recommendation
- Debate Panel
- Daily Briefing

Market

- Commodity Card
- News Card
- Macro Card
- Watchlist

Journal

- Trade Journal
- Reflection Card
- Lesson Card

These components must never duplicate UI primitives.

---

## Every Component Must Include

Generate:

- Component.tsx
- index.ts
- types.ts
- constants.ts
- hooks.ts (if required)
- utils.ts (if required)
- README.md
- Storybook story
- Unit tests
- Example usage

---

## Component Requirements

Every component must support:

- Variants
- Sizes
- Icons
- Loading state
- Disabled state
- Error state
- Empty state
- Keyboard navigation
- ARIA attributes
- Dark mode
- Responsive layouts
- Custom styling through className
- Composition with children
- Forward refs where appropriate

---

## Code Quality Standards

- Functional components only
- Strict TypeScript
- No duplicated code
- Composition over inheritance
- Clean architecture
- Tree-shakeable exports
- Barrel exports
- Minimal dependencies
- Memoize only where beneficial

---

## Documentation

For every component provide:

1. Purpose
2. Props
3. Examples
4. Accessibility guidance
5. Performance notes
6. Best practices
7. Common mistakes
8. Extension points

---

## Testing

Create tests for:

- Rendering
- Variants
- User interactions
- Keyboard accessibility
- Responsive behavior where applicable
- Edge cases

---

## Output Rules

Implement **one component at a time**.

For each component, output:

1. Folder structure
2. Complete source code
3. Supporting files
4. Tests
5. Storybook story
6. README
7. Example usage

Do not use placeholders or pseudocode. Generate production-ready code suitable for direct inclusion in the Phoenix repository.
