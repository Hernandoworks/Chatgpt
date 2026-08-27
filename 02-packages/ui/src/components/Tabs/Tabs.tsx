"use client";
import { useState, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface TabItem { id: string; label: string; content: ReactNode; disabled?: boolean; }
export interface TabsProps { items: TabItem[]; defaultValue?: string; className?: string; }

export function Tabs({ items, defaultValue, className }: TabsProps) {
  const [active, setActive] = useState(defaultValue ?? items[0]?.id);
  const current = items.find((item) => item.id === active) ?? items[0];
  if (!current) return null;
  return <div className={cn("grid gap-4", className)}>
    <div role="tablist" className="flex gap-1 border-b border-gray-200">
      {items.map((item) => <button key={item.id} role="tab" aria-selected={active === item.id} disabled={item.disabled} onClick={() => setActive(item.id)} className={cn("border-b-2 border-transparent px-3 py-2 text-sm font-medium text-gray-500", active === item.id && "border-black text-black", item.disabled && "cursor-not-allowed opacity-40")}>{item.label}</button>)}
    </div>
    <div role="tabpanel">{current.content}</div>
  </div>;
}
