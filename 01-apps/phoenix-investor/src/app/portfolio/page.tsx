"use client";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/shared/KpiCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { PortfolioAllocation } from "@/components/dashboard/PortfolioAllocation";
import { usePortfolio } from "@/hooks/usePortfolio";
import { formatCurrency } from "@/lib/utils";
import { CardSkeleton } from "@/components/shared/Skeleton";
import { Briefcase, TrendingUp, DollarSign, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";

function PortfolioContent() {
  const { data, isLoading } = usePortfolio();
  const router = useRouter();

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Portfolio" description="Your investment portfolio" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Portfolio"
        description="Your investment portfolio"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Portfolio Value" value={data?.totalValue ?? 0} format="currency" change={data?.totalReturnPercent} icon={<Briefcase className="h-5 w-5" />} />
        <KpiCard label="Total Return" value={data?.totalReturn ?? 0} format="currency" change={data?.totalReturnPercent} icon={<TrendingUp className="h-5 w-5" />} />
        <KpiCard label="Cash Balance" value={data?.cashBalance ?? 0} format="currency" icon={<DollarSign className="h-5 w-5" />} />
        <KpiCard label="Conviction Score" value={`${data?.convictionScore ?? 0}%`} format="none" icon={<Target className="h-5 w-5" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <PortfolioAllocation />
      </div>

      {/* Holdings Table */}
      <div className="glass-card p-5">
        <h3 className="mb-4 text-sm font-semibold text-surface-200">Holdings</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-glass-border">
                <th className="px-3 py-2 text-left text-xs font-medium text-surface-500">Holding</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-surface-500">Value</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-surface-500">Allocation</th>
              </tr>
            </thead>
            <tbody>
              {data?.allocation.map((item) => (
                <tr
                  key={item.symbol}
                  className="border-b border-glass-border transition-colors hover:bg-glass-hover cursor-pointer"
                  onClick={() => item.symbol !== "CASH" && router.push(ROUTES.COMPANY(item.symbol))}
                >
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg" style={{ backgroundColor: item.color + "20" }}>
                        <div className="flex h-full w-full items-center justify-center">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-surface-200">{item.symbol}</p>
                        <p className="text-xs text-surface-500">{item.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right font-mono font-medium text-surface-200">
                    {formatCurrency(item.value)}
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-800">
                        <div className="h-full rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
                      </div>
                      <span className="font-mono text-xs text-surface-400">{item.percentage.toFixed(1)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <AppShell>
      <PortfolioContent />
    </AppShell>
  );
}
