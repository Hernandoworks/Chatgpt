"use client";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { cn, formatDate } from "@/lib/utils";
import { FileText, Download, Calendar, TrendingUp, BarChart3, FileSpreadsheet } from "lucide-react";
import { useMemo } from "react";

const MOCK_REPORTS = [
  {
    id: "r-001",
    title: "Weekly Portfolio Review",
    date: "2025-04-11",
    type: "weekly",
    summary: "Portfolio up 1.2% this week driven by iron ore rally. FEX contributed +3.2%. Cash position maintained at 7.4%.",
  },
  {
    id: "r-002",
    title: "Monthly Performance Report — March 2025",
    date: "2025-04-01",
    type: "monthly",
    summary: "March performance: +2.8%. YTD: +6.7%. Top performer: FEX (+8.5%). Dividend income: $4,200. Rebalancing considered for April.",
  },
  {
    id: "r-003",
    title: "Quarterly Investment Review — Q1 2025",
    date: "2025-04-01",
    type: "quarterly",
    summary: "Strong quarter for the portfolio. Iron ore exposure benefited from commodity price strength. FEX position size increased to 35.9%. Portfolio risk score remains low at 32. Cash yield optimisation initiated.",
  },
  {
    id: "r-004",
    title: "Sector Allocation Analysis",
    date: "2025-03-25",
    type: "custom",
    summary: "Materials sector concentration at 78% of portfolio. Iron ore sub-sector at 62%. Geographic concentration in Australia at 85%. Diversification opportunities identified in gold and copper.",
  },
  {
    id: "r-005",
    title: "Dividend Income Report — HY2025",
    date: "2025-03-15",
    type: "custom",
    summary: "Total dividend income for H1 FY25: $18,500. FEX contributed $9,800 (53%). Average portfolio yield: 5.2%. Franking credits: $4,200.",
  },
];

const TYPE_ICONS: Record<string, any> = {
  weekly: Calendar,
  monthly: TrendingUp,
  quarterly: BarChart3,
  custom: FileSpreadsheet,
};

function ReportsContent() {
  const reports = useMemo(() => MOCK_REPORTS, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Portfolio reports and analysis"
        actions={
          <button className="glass-card-hover flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-surface-200">
            <FileText className="h-4 w-4" />
            Generate Report
          </button>
        }
      />

      <div className="space-y-4">
        {reports.map((report) => {
          const Icon = TYPE_ICONS[report.type] ?? FileText;
          return (
            <div key={report.id} className="glass-card-hover p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10">
                  <Icon className="h-5 w-5 text-brand-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-surface-200">{report.title}</h3>
                      <div className="mt-1 flex items-center gap-3">
                        <span className="text-xs text-surface-500">{formatDate(report.date)}</span>
                        <div className={cn(
                          "rounded px-2 py-0.5 text-[10px] font-medium capitalize",
                          report.type === "weekly" ? "bg-brand-500/10 text-brand-400" :
                          report.type === "monthly" ? "bg-emerald-400/10 text-emerald-400" :
                          report.type === "quarterly" ? "bg-purple-400/10 text-purple-400" :
                          "bg-amber-400/10 text-amber-400",
                        )}>
                          {report.type}
                        </div>
                      </div>
                    </div>
                    <button className="flex shrink-0 items-center gap-2 rounded-lg border border-glass-border px-3 py-2 text-xs font-medium text-surface-400 transition-colors hover:bg-glass-hover hover:text-surface-200">
                      <Download className="h-3.5 w-3.5" />
                      PDF
                    </button>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-surface-400">{report.summary}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <AppShell>
      <ReportsContent />
    </AppShell>
  );
}
