"use client";

import { useCompany } from "@/hooks/useCompany";
import { Calendar, Zap } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { ChartSkeleton } from "@/components/shared/Skeleton";

export function UpcomingCatalysts() {
  const { data, isLoading } = useCompany("FEX");

  if (isLoading) return <ChartSkeleton />;
  if (!data) return null;

  return (
    <div className="glass-card p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/10">
          <Zap className="h-4 w-4 text-amber-400" />
        </div>
        <h3 className="text-sm font-semibold text-surface-200">Upcoming Catalysts</h3>
      </div>
      <div className="space-y-2">
        {data.investmentThesis.catalysts.map((catalyst, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-glass-hover">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-800/50">
              <Calendar className="h-4 w-4 text-surface-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-surface-200">{catalyst.title}</p>
              <p className="mt-0.5 text-xs text-surface-500 line-clamp-2">{catalyst.description}</p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-[10px] text-surface-500">{formatDate(catalyst.date)}</span>
                <span className={cn(
                  "rounded px-1.5 py-0.5 text-[10px] font-medium",
                  catalyst.impact === "high" ? "bg-emerald-400/10 text-emerald-400" :
                  catalyst.impact === "medium" ? "bg-amber-400/10 text-amber-400" :
                  "bg-surface-700/50 text-surface-400",
                )}>
                  {catalyst.impact} impact
                </span>
                <span className="text-[10px] text-surface-500">{(catalyst.probability * 100).toFixed(0)}% prob.</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
