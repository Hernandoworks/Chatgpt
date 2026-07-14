import { cn } from "../../lib/cn";
import { badgeVariants } from "./constants";
import type { BadgeProps } from "./types";

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}
