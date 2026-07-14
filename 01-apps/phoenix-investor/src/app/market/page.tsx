"use client";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { ChartCard } from "@/components/charts/ChartCard";
import { useMarket } from "@/hooks/useMarket";
import { ChartSkeleton } from "@/components/shared/Skeleton";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

function MarketContent() {
  const { data, isLoading } = useMarket();

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Market" description="Market overview" />
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartSkeleton /><ChartSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Market" description="Market overview" />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Indices */}
        <ChartCard title="Market Indices" subtitle="Global markets">
          <div className="space-y-2">
            {data?.indices.map((index) => (
              <div key={index.name} className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-glass-hover">
                <span className="text-sm font-medium text-surface-200">{index.name}</span>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-surface-200">{index.value.toLocaleString("en-AU")}</span>
                  <div className={cn(
                    "inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold",
                    index.changePercent > 0 ? "bg-emerald-400/10 text-emerald-400" :
                    index.changePercent < 0 ? "bg-red-400/10 text-red-400" :
                    "bg-surface-700/50 text-surface-400",
                  )}>
                    {index.changePercent > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {index.changePercent > 0 ? "+" : ""}{index.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Sector Performance */}
        <ChartCard title="Sector Performance" subtitle="Today">
          <div className="space-y-2">
            {data?.sectors.map((sector) => (
              <div key={sector.name} className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-glass-hover">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: sector.color }} />
                <span className="flex-1 text-sm text-surface-300">{sector.name}</span>
                <span className={cn(
                  "font-mono text-sm font-medium",
                  sector.changePercent > 0 ? "text-emerald-400" : "text-red-400",
                )}>
                  {sector.changePercent > 0 ? "+" : ""}{sector.changePercent.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Gainers & Losers */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Top Gainers" subtitle="Today">
          <div className="space-y-1">
            {data?.gainers.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-glass-hover">
                <div>
                  <p className="text-sm font-medium text-surface-200">{stock.symbol}</p>
                  <p className="text-xs text-surface-500">{stock.name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-surface-200">${stock.price.toFixed(2)}</span>
                  <div className="inline-flex items-center gap-1 rounded-lg bg-emerald-400/10 px-2 py-1 text-xs font-semibold text-emerald-400">
                    <TrendingUp className="h-3 w-3" />
                    +{stock.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Top Losers" subtitle="Today">
          <div className="space-y-1">
            {data?.losers.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-glass-hover">
                <div>
                  <p className="text-sm font-medium text-surface-200">{stock.symbol}</p>
                  <p className="text-xs text-surface-500">{stock.name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-surface-200">${stock.price.toFixed(2)}</span>
                  <div className="inline-flex items-center gap-1 rounded-lg bg-red-400/10 px-2 py-1 text-xs font-semibold text-red-400">
                    <TrendingDown className="h-3 w-3" />
                    {stock.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

export default function MarketPage() {
  return (
    <AppShell>
      <MarketContent />
    </AppShell>
  );
}
