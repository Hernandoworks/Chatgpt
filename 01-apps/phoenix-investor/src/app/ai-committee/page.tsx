"use client";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { useAIRecommendation } from "@/hooks/useAI";
import { cn, formatDate } from "@/lib/utils";
import { ChartSkeleton } from "@/components/shared/Skeleton";
import { Brain, Pickaxe, ChartCandlestick, Globe, Shield, PieChart, Gavel, AlertTriangle, Zap, Target } from "lucide-react";

const ROLE_ICONS: Record<string, any> = {
  "Mining Analyst": Pickaxe,
  "Technical Analyst": ChartCandlestick,
  "Macro Economist": Globe,
  "Risk Manager": Shield,
  "Portfolio Manager": PieChart,
  Chairperson: Gavel,
};

function AICommitteeContent() {
  const { data, isLoading } = useAIRecommendation("FEX");

  if (isLoading) {
    return (
      <div>
        <PageHeader title="AI Investment Committee" description="AI-powered analysis for FEX" />
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartSkeleton /><ChartSkeleton /><ChartSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Investment Committee"
        description="AI-powered analysis and recommendations"
      />

      {/* Chairperson Summary */}
      {data && (
        <div className="glass-card-hover border border-brand-500/20 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/20">
              <Gavel className="h-6 w-6 text-brand-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-surface-100">Chairperson's Verdict</h3>
                  <p className="text-xs text-surface-500">{data.analysis[5]?.name} · {formatDate(data.timestamp)}</p>
                </div>
                <div className={cn(
                  "rounded-lg px-4 py-2 text-sm font-bold tracking-wide",
                  data.action === "strong_buy" ? "bg-emerald-400/10 text-emerald-400" :
                  "bg-brand-500/10 text-brand-400",
                )}>
                  {data.action.replace(/_/g, " ").toUpperCase()}
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-surface-300">{data.analysis[5]?.reasoning}</p>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-lg bg-glass px-3 py-1.5">
                  <span className="text-xs text-surface-500">Confidence</span>
                  <span className="text-sm font-bold text-surface-200">{data.confidence}%</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-glass px-3 py-1.5">
                  <Target className="h-3.5 w-3.5 text-brand-400" />
                  <span className="text-xs text-surface-500">Price Target</span>
                  <span className="text-sm font-bold text-surface-200">$0.72</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Risks & Catalysts from Chairperson */}
      {data && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card p-5">
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <h3 className="text-sm font-semibold text-surface-200">Key Risks</h3>
            </div>
            <div className="space-y-2">
              {data.analysis[5]?.risks.map((risk, i) => (
                <div key={i} className="rounded-xl bg-red-400/5 border border-red-400/10 px-4 py-3">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                    <p className="text-sm text-surface-300">{risk}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <div className="mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-surface-200">Catalysts</h3>
            </div>
            <div className="space-y-2">
              {data.analysis[5]?.catalysts.map((catalyst, i) => (
                <div key={i} className="rounded-xl bg-amber-400/5 border border-amber-400/10 px-4 py-3">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                    <p className="text-sm text-surface-300">{catalyst}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analyst Cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        {data?.analysis.filter(a => a.role !== "Chairperson").map((analyst) => {
          const Icon = ROLE_ICONS[analyst.role] ?? Brain;
          return (
            <div key={analyst.role} className="glass-card-hover p-5">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10">
                    <Icon className="h-5 w-5 text-brand-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-surface-200">{analyst.role}</h3>
                    <p className="text-xs text-surface-500">{analyst.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "rounded-lg px-3 py-1 text-xs font-semibold",
                    analyst.confidence >= 70 ? "bg-emerald-400/10 text-emerald-400" :
                    analyst.confidence >= 50 ? "bg-amber-400/10 text-amber-400" :
                    "bg-red-400/10 text-red-400",
                  )}>
                    {analyst.confidence}%
                  </div>
                  <div className="rounded-lg bg-surface-800/50 px-3 py-1 text-xs font-medium text-surface-300">
                    {analyst.recommendation}
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-surface-400 mb-4">{analyst.reasoning}</p>

              <div className="grid grid-cols-2 gap-3">
                {analyst.risks.length > 0 && (
                  <div>
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-red-400/70">Risks</p>
                    <div className="space-y-1">
                      {analyst.risks.map((risk, i) => (
                        <p key={i} className="flex items-start gap-1.5 text-xs text-surface-500">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-red-400/50" />
                          {risk}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
                {analyst.catalysts.length > 0 && (
                  <div>
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400/70">Catalysts</p>
                    <div className="space-y-1">
                      {analyst.catalysts.map((c, i) => (
                        <p key={i} className="flex items-start gap-1.5 text-xs text-surface-500">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-emerald-400/50" />
                          {c}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AICommitteePage() {
  return (
    <AppShell>
      <AICommitteeContent />
    </AppShell>
  );
}
