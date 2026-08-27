import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
}

export function Checkbox({ label, description, className, id, ...props }: CheckboxProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <label htmlFor={inputId} className={cn("flex cursor-pointer items-start gap-3", props.disabled && "cursor-not-allowed opacity-50", className)}>
      <input id={inputId} type="checkbox" className="mt-1 size-4 rounded border-gray-300 accent-black" {...props} />
      {(label || description) && <span className="grid gap-0.5"><span className="text-sm font-medium">{label}</span>{description && <span className="text-xs text-gray-500">{description}</span>}</span>}
    </label>
  );
}
