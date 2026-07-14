"use client";

import { Search, Bell, Command } from "lucide-react";
import { useState } from "react";
import { CommandPalette } from "./CommandPalette";
import { cn } from "@/lib/utils";

export function TopNavigation() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-glass-border bg-surface-950/60 px-6 backdrop-blur-2xl">
        <button
          onClick={() => setCommandOpen(true)}
          className={cn(
            "flex items-center gap-2 rounded-xl border border-glass-border bg-glass px-3 py-1.5 text-sm text-surface-400 transition-all duration-200",
            "hover:border-glass-border-hover hover:text-surface-300",
            "w-64 sm:w-80",
          )}
        >
          <Search className="h-4 w-4" />
          <span>Search companies, pages...</span>
          <div className="ml-auto flex items-center gap-1 rounded-md border border-glass-border bg-surface-800/50 px-1.5 py-0.5 text-[10px] text-surface-500">
            <Command className="h-3 w-3" />
            <span>K</span>
          </div>
        </button>

        <div className="flex items-center gap-3">
          <button className="relative rounded-xl p-2 text-surface-400 transition-colors hover:bg-glass-hover hover:text-surface-200">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-surface-950" />
          </button>
          <div className="flex items-center gap-2 rounded-xl border border-glass-border bg-glass px-3 py-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500/20 text-xs font-semibold text-brand-400">
              HC
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-medium text-surface-200">Hernando C.</p>
              <p className="text-[10px] text-surface-500">Pro Plan</p>
            </div>
          </div>
        </div>
      </header>

      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
}
