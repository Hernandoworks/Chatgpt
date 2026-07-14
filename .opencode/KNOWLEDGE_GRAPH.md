# Knowledge Graph

```
TASK-0001 (Repository Scaffold)
  └── provides: directory structure

TASK-0002 (OpenCode Instructions)
  └── provides: standards, workflow, prompts

TASK-0003 (Project Governance)
  └── provides: task tracking, milestones, decisions, progress

TASK-0004 (Workspace Tooling)
  ├── depends on: TASK-0003
  └── provides: pnpm workspace, turbo, tsconfig, eslint, prettier

TASK-0005 (Next.js Application)
  ├── depends on: TASK-0004
  └── provides: 01-apps/web — app shell, routing, Tailwind

TASK-0006 (UI Package)
  │ depends on: TASK-0004
  ├── depends on: TASK-0005 (for consuming the UI in dev mode)
  └── provides: 02-packages/ui — build config, exports

TASK-0007 (Design Tokens)
  ├── depends on: TASK-0006
  └── provides: colors, typography, spacing, radius, shadows, motion, theme

TASK-0008 (Core UI — Button, Card, Badge, Input)
  ├── depends on: TASK-0007
  └── provides: reusable component primitives

TASK-0009 (UI Primitives — Select, Checkbox, Dialog, etc.)
  ├── depends on: TASK-0008
  └── provides: remaining Radix-based primitives

TASK-0010 (Layout — AppShell, Sidebar, Header, Grid, Stack)
  ├── depends on: TASK-0009
  └── provides: page structure components

TASK-0011 (Charts — Line, Bar, Pie, Area)
  ├── depends on: TASK-0009
  └── provides: Recharts-based chart components

TASK-0012 (Composite — DataTable, Form, EmptyState, etc.)
  ├── depends on: TASK-0010
  └── provides: higher-order composite components

TASK-0013 (Feature Modules — Dashboard, Chat, Settings, etc.)
  ├── depends on: TASK-0012
  └── provides: application-level feature modules
```

## Component Dependency Graph

```
Tokens
  └── Theme
       └── Button
            └── Card (reuses Button loading spinner)
       └── Badge
       └── Input
       └── Select
       └── Dialog
            └── ConfirmDialog
       └── Form
            └── PageHeader
       └── DataTable
       └── EmptyState
       └── Sidebar
       └── Header
            └── AppShell
       └── Dashboard (feature)
       └── Chat (feature)
       └── Settings (feature)
```

## Rules

- Never change a component lower in the graph without checking all dependents
- When updating tokens, verify all consuming components render correctly
- A change to Theme affects every component — run full test suite
