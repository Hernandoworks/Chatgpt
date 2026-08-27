"use client";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface DialogProps { open: boolean; onClose: () => void; title?: string; children: ReactNode; className?: string; }

export function Dialog({ open, onClose, title, children, className }: DialogProps) {
  if (!open) return null;
  return <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onMouseDown={onClose}>
    <section className={cn("w-full max-w-lg rounded-xl bg-white p-6 shadow-xl", className)} onMouseDown={(event) => event.stopPropagation()}>
      <div className="mb-4 flex items-center justify-between gap-4">{title && <h2 className="text-lg font-semibold">{title}</h2>}<button type="button" aria-label="Close dialog" onClick={onClose} className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100">×</button></div>
      {children}
    </section>
  </div>;
}
