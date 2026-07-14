"use client";

import { useRouter } from "next/navigation";
import { Search, Command } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const COMMANDS = [
  ...NAV_ITEMS.map((item) => ({ label: item.label, href: item.href, category: "Pages" })),
  { label: "FEX (Fenix Resources)", href: ROUTES.COMPANY("FEX"), category: "Companies" },
];

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = COMMANDS.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
        setQuery("");
      }
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    setSelectedIndex(0);
  }, [open]);

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
    setQuery("");
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex]!.href);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-[15vh] backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-lg rounded-2xl border border-glass-border bg-surface-900/95 shadow-2xl shadow-black/40 backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-glass-border px-4 py-3">
              <Search className="h-4 w-4 text-surface-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, companies..."
                className="flex-1 bg-transparent text-sm text-surface-100 outline-none placeholder:text-surface-500"
              />
              <kbd className="flex items-center gap-1 rounded-md border border-glass-border bg-surface-800/50 px-1.5 py-0.5 text-[10px] text-surface-500">
                <Command className="h-3 w-3" />K
              </kbd>
            </div>
            <div className="max-h-72 overflow-y-auto p-2">
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.href}
                  onClick={() => handleSelect(cmd.href)}
                  onMouseEnter={() => setSelectedIndex(i)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                    i === selectedIndex
                      ? "bg-brand-500/10 text-brand-400"
                      : "text-surface-300 hover:bg-glass-hover",
                  )}
                >
                  <span className="flex-1">{cmd.label}</span>
                  <span className="text-[10px] text-surface-500">{cmd.category}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-surface-500">No results found</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
