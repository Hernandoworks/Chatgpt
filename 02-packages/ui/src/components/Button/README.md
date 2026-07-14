# Button

A versatile button component with variant and size support.

## Usage

```tsx
import { Button } from "ui";

function Example() {
  return (
    <Button variant="primary" size="md" onClick={() => alert("Clicked!")}>
      Click me
    </Button>
  );
}
```

## Props

| Prop      | Type                                                           | Default     | Description                              |
| --------- | -------------------------------------------------------------- | ----------- | ---------------------------------------- |
| variant   | `"primary" \| "secondary" \| "outline" \| "ghost" \| "danger"` | `"primary"` | Visual style                             |
| size      | `"sm" \| "md" \| "lg"`                                         | `"md"`      | Button size                              |
| loading   | `boolean`                                                      | `false`     | Shows a spinner and disables interaction |
| disabled  | `boolean`                                                      | `false`     | Disables the button                      |
| className | `string`                                                       | —           | Additional CSS classes                   |

## Variants

- **primary** — Blue background, white text
- **secondary** — Gray background, dark text
- **outline** — Bordered, transparent background
- **ghost** — No background or border
- **danger** — Red background, white text

## States

- **Loading**: Shows a spinning indicator, button is disabled
- **Disabled**: Reduced opacity, pointer events disabled
- **Focus**: Visible focus ring for keyboard navigation
- **Dark mode**: Automatically adjusts colors via Tailwind `dark:` variants
