import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "./constants";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}
