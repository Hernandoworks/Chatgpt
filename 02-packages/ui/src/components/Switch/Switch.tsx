import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> { label?: string; }

export function Switch({ label, className, ...props }: SwitchProps) {
  return <label className={cn("flex cursor-pointer items-center gap-3", props.disabled && "cursor-not-allowed opacity-50", className)}>
    <span className="relative inline-flex h-6 w-11 shrink-0 rounded-full bg-gray-300 transition has-[:checked]:bg-black has-[:checked]:after:translate-x-5">
      <input type="checkbox" role="switch" className="peer sr-only" {...props} />
      <span className="pointer-events-none absolute left-1 top-1 size-4 rounded-full bg-white transition peer-checked:translate-x-5" />
    </span>
    {label && <span className="text-sm font-medium">{label}</span>}
  </label>;
}
