"use client";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { useJournal } from "@/hooks/useJournal";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { TableSkeleton } from "@/components/shared/Skeleton";
import { NotebookPen, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

function TradeJournalContent() {
  const { data, isLoading } = useJournal();
  const [filter, setFilter] = useState<string>("all");

  if (isLoading) return <TableSkeleton rows={5} />;

  const filtered = data?.filter((entry) => {
    if (filter === "open") return entry.outcome === "open";
    if (filter === "closed") return entry.outcome !== "open";
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trade Journal"
        description="Your trading history and notes"
        actions={
          <div className="flex gap-1 rounded-xl bg-glass p-1">
            {["all", "open", "closed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  filter === f
                    ? "bg-surface-800 text-surface-200 shadow-sm"
                    : "text-surface-500 hover:text-surface-300",
                )}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        }
      />

      <div className="space-y-4">
        {filtered?.map((entry) => (
          <div key={entry.id} className="glass-card-hover p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  entry.type === "buy" ? "bg-emerald-400/10" : "bg-red-400/10",
                )}>
                  {entry.type === "buy" ? (
                    <TrendingUp className={cn("h-5 w-5", entry.type === "buy" ? "text-emerald-400" : "text-red-400")} />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-surface-200">{entry.symbol}</span>
                    <div className={cn(
                      "rounded px-2 py-0.5 text-[10px] font-semibold",
                      entry.type === "buy" ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400",
                    )}>
                      {entry.type.toUpperCase()}
                    </div>
                  </div>
                  <p className="text-xs text-surface-500">{formatDate(entry.date)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-lg font-bold text-surface-200">
                  {entry.shares.toLocaleString("en-AU")} @ ${entry.price.toFixed(3)}
                </p>
                <p className="font-mono text-sm text-surface-400">
                  Total: {formatCurrency(entry.total)}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-glass p-4 mb-3">
              <p className="text-xs font-semibold text-surface-400 mb-1">{entry.strategy}</p>
              <p className="text-sm text-surface-300 leading-relaxed">{entry.thesis}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "rounded-lg px-3 py-1 text-xs font-semibold",
                  entry.outcome === "open" ? "bg-surface-700/50 text-surface-400" :
                  entry.outcome === "closed_win" ? "bg-emerald-400/10 text-emerald-400" :
                  entry.outcome === "closed_loss" ? "bg-red-400/10 text-red-400" :
                  "bg-amber-400/10 text-amber-400",
                )}>
                  {entry.outcome.replace(/_/g, " ").toUpperCase()}
                </div>
                {entry.returnPercent && (
                  <div className={cn(
                    "rounded-lg px-3 py-1 text-xs font-semibold",
                    entry.returnPercent > 0 ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400",
                  )}>
                    {entry.returnPercent > 0 ? "+" : ""}{entry.returnPercent.toFixed(1)}%
                  </div>
                )}
              </div>
              {entry.notes && (
                <p className="text-xs text-surface-500 italic">{entry.notes}</p>
              )}
            </div>
          </div>
        ))}

        {filtered?.length === 0 && (
          <div className="glass-card flex flex-col items-center justify-center py-16">
            <NotebookPen className="mb-4 h-8 w-8 text-surface-600" />
            <p className="text-sm text-surface-500">No trade entries found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TradeJournalPage() {
  return (
    <AppShell>
      <TradeJournalContent />
    </AppShell>
  );
}
