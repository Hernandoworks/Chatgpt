"use client";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/shared/KpiCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { PortfolioAllocation } from "@/components/dashboard/PortfolioAllocation";
import { MarketOverview } from "@/components/dashboard/MarketOverview";
import { AIRecommendationCard } from "@/components/dashboard/AIRecommendation";
import { RecentNews } from "@/components/dashboard/RecentNews";
import { UpcomingCatalysts } from "@/components/dashboard/UpcomingCatalysts";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useCompany } from "@/hooks/useCompany";
import { Briefcase, TrendingUp, BarChart3, Shield, Target } from "lucide-react";
import { CardSkeleton } from "@/components/shared/Skeleton";
import { cn } from "@/lib/utils";

function DashboardContent() {
  const { data: portfolio, isLoading: portfolioLoading } = usePortfolio();
  const { data: fex } = useCompany("FEX");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Your portfolio at a glance"
      />

      {/* KPI Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {portfolioLoading ? (
          <>
            <CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton />
          </>
        ) : (
          <>
            <KpiCard
              label="Portfolio Value"
              value={portfolio?.totalValue ?? 0}
              format="currency"
              change={portfolio?.totalReturnPercent}
              icon={<Briefcase className="h-5 w-5" />}
              delay={0}
            />
            <KpiCard
              label="Today's P&L"
              value={portfolio?.todayPnL ?? 0}
              format="currency"
              change={portfolio?.todayPnLPercent}
              icon={<TrendingUp className="h-5 w-5" />}
              delay={1}
            />
            <KpiCard
              label="Cash Balance"
              value={portfolio?.cashBalance ?? 0}
              format="currency"
              icon={<Wallet className="h-5 w-5" />}
              delay={2}
            />
            <KpiCard
              label="FEX Price"
              value={fex?.price ?? 0}
              format="none"
              change={fex?.changePercent}
              icon={<BarChart3 className="h-5 w-5" />}
              delay={3}
            />
          </>
        )}
      </div>

      {/* Risk & Conviction Row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="glass-card p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-surface-400" />
              <span className="text-sm font-semibold text-surface-200">Risk Score</span>
            </div>
            <span className={cn(
              "font-mono text-lg font-bold",
              (portfolio?.riskScore ?? 0) < 30 ? "text-emerald-400" :
              (portfolio?.riskScore ?? 0) < 50 ? "text-amber-400" : "text-red-400",
            )}>
              {portfolio?.riskScore ?? "—"}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-800">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                (portfolio?.riskScore ?? 0) < 30 ? "bg-emerald-400" :
                (portfolio?.riskScore ?? 0) < 50 ? "bg-amber-400" : "bg-red-400",
              )}
              style={{ width: `${portfolio?.riskScore ?? 0}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-surface-500">
            {(portfolio?.riskScore ?? 0) < 30 ? "Low risk — well diversified portfolio" :
             (portfolio?.riskScore ?? 0) < 50 ? "Moderate risk — monitor concentration" :
             "High risk — consider rebalancing"}
          </p>
        </div>

        <div className="glass-card p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-surface-400" />
              <span className="text-sm font-semibold text-surface-200">Conviction Score</span>
            </div>
            <span className="font-mono text-lg font-bold text-brand-400">
              {portfolio?.convictionScore ?? "—"}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-800">
            <div
              className="h-full rounded-full bg-brand-500 transition-all duration-500"
              style={{ width: `${portfolio?.convictionScore ?? 0}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-surface-500">
            High conviction — aligned with investment thesis
          </p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <PortfolioAllocation />
      </div>

      {/* Market + AI Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <MarketOverview />
        <AIRecommendationCard />
      </div>

      {/* News + Catalysts + Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentNews />
        </div>
        <div className="space-y-4">
          <UpcomingCatalysts />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AppShell>
      <DashboardContent />
    </AppShell>
  );
}
