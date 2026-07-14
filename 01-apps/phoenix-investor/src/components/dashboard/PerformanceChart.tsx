"use client";

import { ChartCard } from "@/components/charts/ChartCard";
import { AreaChart } from "@/components/charts/AreaChart";
import { usePortfolio } from "@/hooks/usePortfolio";
import { ChartSkeleton } from "@/components/shared/Skeleton";

export function PerformanceChart() {
  const { data, isLoading } = usePortfolio();

  if (isLoading) return <ChartSkeleton />;

  return (
    <ChartCard title="Portfolio Performance" subtitle="Total value over time">
      <AreaChart
        data={data?.performanceHistory ?? []}
        formatValue={(v: number) => `$${(v / 1000000).toFixed(2)}M`}
        height={250}
      />
    </ChartCard>
  );
}
