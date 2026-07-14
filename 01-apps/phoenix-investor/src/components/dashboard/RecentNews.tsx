"use client";

import { useNews } from "@/hooks/useNews";
import { Newspaper, ExternalLink } from "lucide-react";
import { cn, formatShortDate } from "@/lib/utils";
import { ChartSkeleton } from "@/components/shared/Skeleton";

export function RecentNews() {
  const { data, isLoading } = useNews();

  if (isLoading) return <ChartSkeleton />;

  return (
    <div className="glass-card p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-800/50">
          <Newspaper className="h-4 w-4 text-surface-400" />
        </div>
        <h3 className="text-sm font-semibold text-surface-200">Recent News</h3>
      </div>
      <div className="space-y-3">
        {data?.slice(0, 4).map((article) => (
          <div key={article.id} className="group rounded-xl p-3 transition-colors hover:bg-glass-hover">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="text-sm font-medium text-surface-200 group-hover:text-brand-400 transition-colors">
                  {article.title}
                </p>
                <div className="mt-1.5 flex items-center gap-3">
                  <span className="text-xs text-surface-500">{article.source}</span>
                  <span className="text-[10px] text-surface-600">•</span>
                  <span className="text-xs text-surface-500">{formatShortDate(article.date)}</span>
                  <div className={cn(
                    "rounded px-1.5 py-0.5 text-[10px] font-medium",
                    article.sentiment === "positive" ? "bg-emerald-400/10 text-emerald-400" :
                    article.sentiment === "negative" ? "bg-red-400/10 text-red-400" :
                    "bg-surface-700/50 text-surface-400",
                  )}>
                    {article.sentiment}
                  </div>
                </div>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-surface-600 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
