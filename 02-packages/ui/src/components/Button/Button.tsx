import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { buttonVariants, SPINNER_CLASSES } from "./constants";
import type { ButtonProps } from "./types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <span className={SPINNER_CLASSES} aria-hidden="true" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
