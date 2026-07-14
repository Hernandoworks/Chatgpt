# Component Catalog

## Legend

| Icon | Meaning     |
| ---- | ----------- |
| ✅   | Implemented |
| 🔜   | Planned     |
| 📝   | Documented  |
| 🧪   | Tested      |

---

## Core Components (Phase 1)

| Component | Status | Variants                                              | States                                    | Tests      | Stories      | Readme |
| --------- | ------ | ----------------------------------------------------- | ----------------------------------------- | ---------- | ------------ | ------ |
| Button    | ✅     | primary, secondary, outline, ghost, danger            | loading, disabled, focus, dark mode       | ✅ 8 tests | ✅ 9 stories | ✅     |
| Card      | ✅     | —                                                     | dark mode                                 | ✅ 3 tests | ✅ 1 story   | ✅     |
| Badge     | ✅     | default, secondary, outline, success, warning, danger | dark mode                                 | ✅ 4 tests | ✅ 6 stories | ✅     |
| Input     | ✅     | sm, md, lg sizes                                      | normal, error, disabled, focus, dark mode | ✅ 7 tests | ✅ 6 stories | ✅     |

## UI Primitives (Phase 2 — Planned)

| Component    | Status | Notes    |
| ------------ | ------ | -------- |
| Select       | 🔜     | Radix UI |
| Checkbox     | 🔜     | Radix UI |
| RadioGroup   | 🔜     | Radix UI |
| Switch       | 🔜     | Radix UI |
| Tabs         | 🔜     | Radix UI |
| Dialog       | 🔜     | Radix UI |
| Tooltip      | 🔜     | Radix UI |
| DropdownMenu | 🔜     | Radix UI |

## Layout Components (Phase 2 — Planned)

| Component | Status | Notes                                   |
| --------- | ------ | --------------------------------------- |
| AppShell  | 🔜     | Application shell with sidebar + header |
| Sidebar   | 🔜     | Navigation sidebar                      |
| Header    | 🔜     | Top navigation bar                      |
| Container | 🔜     | Max-width container                     |
| Grid      | 🔜     | CSS Grid wrapper                        |
| Stack     | 🔜     | Flexbox stack with gap                  |

## Charts (Phase 3 — Planned)

| Component | Status | Notes    |
| --------- | ------ | -------- |
| LineChart | 🔜     | Recharts |
| BarChart  | 🔜     | Recharts |
| PieChart  | 🔜     | Recharts |
| AreaChart | 🔜     | Recharts |

## Composite Components (Phase 3 — Planned)

| Component     | Status | Notes                         |
| ------------- | ------ | ----------------------------- |
| DataTable     | 🔜     | TanStack Table                |
| Form          | 🔜     | React Hook Form + Zod         |
| PageHeader    | 🔜     | Title + breadcrumbs + actions |
| EmptyState    | 🔜     | Icon + message + CTA          |
| ConfirmDialog | 🔜     | Dialog + confirm/cancel       |

---

## Usage

All components are exported from the `ui` package:

```tsx
import { Button, Card, Badge, Input } from "ui";
```

Each component is fully tree-shakeable and supports dark mode out of the box.
