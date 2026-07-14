# Card

A simple container component with a border, shadow, and padding.

## Usage

```tsx
import { Card } from "ui";

function Example() {
  return (
    <Card>
      <h2>Title</h2>
      <p>Content goes here.</p>
    </Card>
  );
}
```

## Props

| Prop      | Type        | Default  | Description            |
| --------- | ----------- | -------- | ---------------------- |
| children  | `ReactNode` | required | Card content           |
| className | `string`    | —        | Additional CSS classes |
