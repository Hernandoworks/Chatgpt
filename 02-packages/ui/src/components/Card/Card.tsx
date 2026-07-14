import { cn } from "../../lib/cn";
import { CARD_BASE_CLASSES } from "./constants";
import type { CardProps } from "./types";

export function Card({ children, className }: CardProps) {
  return <div className={cn(CARD_BASE_CLASSES, className)}>{children}</div>;
}
