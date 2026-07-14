"use client";

import { useAIRecommendation } from "@/hooks/useAI";
import { Brain, TrendingUp, Shield, AlertTriangle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChartSkeleton } from "@/components/shared/Skeleton";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export function AIRecommendationCard() {
  const { data, isLoading } = useAIRecommendation("FEX");
  const router = useRouter();

  if (isLoading) return <ChartSkeleton />;
  if (!data) return null;

  const actionColors: Record<string, string> = {
    strong_buy: "text-emerald-400 bg-emerald-400/10",
    buy: "text-brand-400 bg-brand-500/10",
    hold: "text-amber-400 bg-amber-400/10",
    sell: "text-red-400 bg-red-400/10",
    strong_sell: "text-red-500 bg-red-500/10",
  };

  return (
    <div className="glass-card-hover p-5" onClick={() => router.push(ROUTES.AI_COMMITTEE)}>
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10">
            <Brain className="h-5 w-5 text-brand-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-surface-200">AI Committee</h3>
            <p className="text-xs text-surface-500">{data.symbol} Recommendation</p>
          </div>
        </div>
        <div className={cn("rounded-lg px-3 py-1 text-xs font-semibold", actionColors[data.action])}>
          {data.action.replace("_", " ").toUpperCase()}
        </div>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-surface-400 line-clamp-3">
        {data.summary}
      </p>

      <div className="grid grid-cols-3 gap-3">
        {data.analysis.slice(0, 3).map((analyst) => (
          <div key={analyst.role} className="rounded-xl bg-glass p-3">
            <div className="flex items-center gap-2">
              {analyst.role === "Risk Manager" ? (
                <Shield className="h-3.5 w-3.5 text-surface-500" />
              ) : analyst.role === "Technical Analyst" ? (
                <TrendingUp className="h-3.5 w-3.5 text-surface-500" />
              ) : (
                <AlertTriangle className="h-3.5 w-3.5 text-surface-500" />
              )}
              <span className="text-xs text-surface-500">{analyst.role}</span>
            </div>
            <p className="mt-1 flex items-center gap-1 text-sm">
              <span className={cn(
                "font-medium",
                analyst.confidence >= 70 ? "text-emerald-400" : analyst.confidence >= 50 ? "text-amber-400" : "text-red-400",
              )}>
                {analyst.confidence}%
              </span>
              <span className="text-xs text-surface-500">confidence</span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-glass-border pt-3">
        <span className="text-xs text-surface-500">{new Date(data.timestamp).toLocaleString("en-AU")}</span>
        <div className="flex items-center gap-1 text-xs font-medium text-brand-400">
          <span>View full analysis</span>
          <ChevronRight className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
}
