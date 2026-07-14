"use client";

import { ChartCard } from "@/components/charts/ChartCard";
import { PieChart } from "@/components/charts/PieChart";
import { usePortfolio } from "@/hooks/usePortfolio";
import { ChartSkeleton } from "@/components/shared/Skeleton";

export function PortfolioAllocation() {
  const { data, isLoading } = usePortfolio();

  if (isLoading) return <ChartSkeleton />;

  const chartData = data?.allocation
    .filter((a) => a.symbol !== "CASH")
    .map((a) => ({ name: a.symbol, value: a.value, color: a.color })) ?? [];

  return (
    <ChartCard title="Portfolio Allocation" subtitle="By holding">
      <PieChart data={chartData} formatValue={(v: number) => `$${(v / 1000000).toFixed(1)}M`} />
    </ChartCard>
  );
}
