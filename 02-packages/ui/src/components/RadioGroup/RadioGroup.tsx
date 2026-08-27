import { cn } from "../../lib/cn";

export interface RadioOption { value: string; label: string; disabled?: boolean; }
export interface RadioGroupProps { name: string; options: RadioOption[]; value?: string; defaultValue?: string; onChange?: (value: string) => void; className?: string; }

export function RadioGroup({ name, options, value, defaultValue, onChange, className }: RadioGroupProps) {
  return <div role="radiogroup" className={cn("grid gap-2", className)}>
    {options.map((option) => <label key={option.value} className={cn("flex items-center gap-2 text-sm", option.disabled && "opacity-50")}>
      <input type="radio" name={name} value={option.value} checked={value !== undefined ? value === option.value : undefined} defaultChecked={defaultValue === option.value} disabled={option.disabled} onChange={() => onChange?.(option.value)} className="size-4 accent-black" />
      {option.label}
    </label>)}
  </div>;
}
