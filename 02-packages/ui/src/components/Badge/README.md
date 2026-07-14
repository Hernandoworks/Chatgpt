# Badge

A small label component for statuses, tags, or counts.

## Usage

```tsx
import { Badge } from "ui";

function Example() {
  return <Badge variant="success">Active</Badge>;
}
```

## Props

| Prop      | Type                                                                          | Default     | Description            |
| --------- | ----------------------------------------------------------------------------- | ----------- | ---------------------- |
| variant   | `"default" \| "secondary" \| "outline" \| "success" \| "warning" \| "danger"` | `"default"` | Visual style           |
| size      | `"sm" \| "md"`                                                                | `"sm"`      | Badge size             |
| className | `string`                                                                      | —           | Additional CSS classes |

## Variants

- **default** — Blue tones
- **secondary** — Gray tones
- **outline** — Bordered, no background fill
- **success** — Green tones
- **warning** — Yellow tones
- **danger** — Red tones
