"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import {
  LayoutDashboard,
  Briefcase,
  Building2,
  TrendingUp,
  FileText,
  Brain,
  NotebookPen,
  Bell,
  BarChart3,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";

const ICON_MAP: Record<string, ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="h-4 w-4" />,
  Briefcase: <Briefcase className="h-4 w-4" />,
  Building2: <Building2 className="h-4 w-4" />,
  TrendingUp: <TrendingUp className="h-4 w-4" />,
  FileText: <FileText className="h-4 w-4" />,
  Brain: <Brain className="h-4 w-4" />,
  NotebookPen: <NotebookPen className="h-4 w-4" />,
  Bell: <Bell className="h-4 w-4" />,
  BarChart3: <BarChart3 className="h-4 w-4" />,
  Settings: <Settings className="h-4 w-4" />,
};

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-glass-border bg-surface-950/80 backdrop-blur-2xl transition-all duration-300",
        collapsed ? "w-16" : "w-60",
      )}
    >
      <div className={cn("flex items-center border-b border-glass-border px-4 py-4", collapsed ? "justify-center" : "gap-3")}>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/20">
          <TrendingUp className="h-4 w-4 text-brand-400" />
        </div>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <span className="text-sm font-semibold text-surface-100">Phoenix</span>
            <span className="ml-1.5 text-xs text-surface-400">OS</span>
          </motion.div>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-brand-500/10 text-brand-400"
                  : "text-surface-400 hover:bg-glass-hover hover:text-surface-200",
                collapsed && "justify-center px-2",
              )}
            >
              {ICON_MAP[item.icon]}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-glass-border p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-xl px-3 py-2 text-surface-500 transition-colors hover:bg-glass-hover hover:text-surface-300"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform duration-200", collapsed && "rotate-180")} />
        </button>
      </div>
    </aside>
  );
}
