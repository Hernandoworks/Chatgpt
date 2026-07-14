"use client";

import { useMarket } from "@/hooks/useMarket";
import { cn } from "@/lib/utils";
import { ChartSkeleton } from "@/components/shared/Skeleton";

export function MarketOverview() {
  const { data, isLoading } = useMarket();

  if (isLoading) return <ChartSkeleton />;

  return (
    <div className="glass-card p-5">
      <h3 className="mb-4 text-sm font-semibold text-surface-200">Market Indices</h3>
      <div className="space-y-2">
        {data?.indices.map((index) => (
          <div key={index.name} className="flex items-center justify-between rounded-xl px-3 py-2 transition-colors hover:bg-glass-hover">
            <span className="text-sm text-surface-300">{index.name}</span>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-medium text-surface-200">{index.value.toLocaleString("en-AU")}</span>
              <span className={cn(
                "font-mono text-xs font-medium",
                index.change >= 0 ? "text-emerald-400" : "text-red-400",
              )}>
                {index.change >= 0 ? "+" : ""}{index.changePercent.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
