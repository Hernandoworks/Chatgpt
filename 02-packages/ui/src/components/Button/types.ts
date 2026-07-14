import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "./constants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean;
}
