"use client";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { useResearch } from "@/hooks/useResearch";
import { cn, formatDate } from "@/lib/utils";
import { TableSkeleton } from "@/components/shared/Skeleton";
import { FileText, Download, ExternalLink } from "lucide-react";

function ResearchContent() {
  const { data, isLoading } = useResearch();

  if (isLoading) return <TableSkeleton rows={5} />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Research"
        description="Investment research & analysis"
      />

      <div className="space-y-4">
        {data?.map((report) => (
          <div key={report.id} className="glass-card-hover p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10">
                <FileText className="h-5 w-5 text-brand-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-surface-200">{report.title}</h3>
                    <div className="mt-1 flex items-center gap-3">
                      <span className="text-xs text-surface-500">{report.author}</span>
                      <span className="text-[10px] text-surface-600">•</span>
                      <span className="text-xs text-surface-500">{formatDate(report.date)}</span>
                      <div className={cn(
                        "rounded px-2 py-0.5 text-[10px] font-medium capitalize",
                        report.type === "monthly" ? "bg-brand-500/10 text-brand-400" :
                        report.type === "initiation" ? "bg-emerald-400/10 text-emerald-400" :
                        "bg-surface-700/50 text-surface-400",
                      )}>
                        {report.type}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button className="rounded-lg border border-glass-border p-2 text-surface-400 transition-colors hover:bg-glass-hover hover:text-surface-200">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg border border-glass-border p-2 text-surface-400 transition-colors hover:bg-glass-hover hover:text-surface-200">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-surface-400">{report.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResearchPage() {
  return (
    <AppShell>
      <ResearchContent />
    </AppShell>
  );
}
