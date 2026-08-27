"use client";
import { useState, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface DropdownMenuItem { id: string; label: string; disabled?: boolean; onSelect?: () => void; }
export interface DropdownMenuProps { trigger: ReactNode; items: DropdownMenuItem[]; className?: string; }

export function DropdownMenu({ trigger, items, className }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  return <div className="relative inline-block">
    <button type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>{trigger}</button>
    {open && <div role="menu" className={cn("absolute right-0 z-30 mt-2 min-w-44 rounded-md border border-gray-200 bg-white p-1 shadow-lg", className)}>
      {items.map((item) => <button key={item.id} type="button" role="menuitem" disabled={item.disabled} onClick={() => { item.onSelect?.(); setOpen(false); }} className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-gray-100 disabled:opacity-40">{item.label}</button>)}
    </div>}
  </div>;
}
