# Input

A text input component with label and error message support.

## Usage

```tsx
import { Input } from "ui";

function Example() {
  return <Input label="Email" type="email" placeholder="you@example.com" />;
}
```

## Props

| Prop      | Type                   | Default | Description                             |
| --------- | ---------------------- | ------- | --------------------------------------- |
| label     | `string`               | —       | Label text displayed above the input    |
| error     | `string`               | —       | Error message displayed below the input |
| size      | `"sm" \| "md" \| "lg"` | `"md"`  | Input height and padding                |
| disabled  | `boolean`              | `false` | Disables the input                      |
| className | `string`               | —       | Additional CSS classes                  |

## States

- **Normal** — Default appearance with border
- **Error** — Red border and error message with `role="alert"`
- **Disabled** — Reduced opacity, cursor not-allowed
- **Focus** — Visible focus ring for keyboard navigation
- **Dark mode** — Automatically adjusts colors
