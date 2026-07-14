"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import { BarChart3, NotebookPen, Brain, FileText, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const ACTIONS = [
  { label: "View Reports", icon: BarChart3, href: ROUTES.REPORTS, color: "text-blue-400 bg-blue-400/10" },
  { label: "Trade Journal", icon: NotebookPen, href: ROUTES.TRADE_JOURNAL, color: "text-emerald-400 bg-emerald-400/10" },
  { label: "AI Committee", icon: Brain, href: ROUTES.AI_COMMITTEE, color: "text-purple-400 bg-purple-400/10" },
  { label: "Research", icon: FileText, href: ROUTES.RESEARCH, color: "text-amber-400 bg-amber-400/10" },
  { label: "Set Alert", icon: Bell, href: ROUTES.ALERTS, color: "text-rose-400 bg-rose-400/10" },
];

export function QuickActions() {
  const router = useRouter();

  return (
    <div className="glass-card p-5">
      <h3 className="mb-4 text-sm font-semibold text-surface-200">Quick Actions</h3>
      <div className="grid grid-cols-5 gap-2">
        {ACTIONS.map((action) => (
          <button
            key={action.label}
            onClick={() => router.push(action.href)}
            className="flex flex-col items-center gap-2 rounded-xl p-3 transition-all duration-200 hover:bg-glass-hover"
          >
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", action.color)}>
              <action.icon className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-medium text-surface-400">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
