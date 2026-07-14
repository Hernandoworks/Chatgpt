"use client";

import { useParams } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/shared/KpiCard";
import { ChartCard } from "@/components/charts/ChartCard";
import { BarChart } from "@/components/charts/BarChart";
import { TechnicalPanel, PriceChart, generateCandleData } from "@/components/charts/TechnicalChart";
import { ValuationForm } from "@/components/forms/ValuationForm";
import { useCompany } from "@/hooks/useCompany";
import { useNews } from "@/hooks/useNews";
import { useJournal } from "@/hooks/useJournal";
import { useAIRecommendation } from "@/hooks/useAI";
import { cn, formatDate, formatCompactCurrency } from "@/lib/utils";
import { CardSkeleton, ChartSkeleton } from "@/components/shared/Skeleton";
import {
  BarChart3, TrendingUp, Pickaxe, Gift, Target,
  BookOpen, FileText, Newspaper, NotebookPen, Brain, Database,
  AlertTriangle, Activity, Factory, Shield, Gauge,
} from "lucide-react";
import { useState } from "react";

type Tab = "overview" | "valuation" | "fundamentals" | "production" | "technicals" | "research" | "journal";

function CompanyContent({ symbol }: { symbol: string }) {
  const [tab, setTab] = useState<Tab>("overview");
  const { data: company, isLoading } = useCompany(symbol);
  const { data: news } = useNews(symbol);
  const { data: journal } = useJournal(symbol);
  const { data: ai } = useAIRecommendation(symbol);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title={symbol} description="Loading company data..." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
        <ChartSkeleton />
      </div>
    );
  }

  if (!company) {
    return (
      <AppShell>
        <PageHeader title="Company Not Found" description={`No data available for ${symbol}`} />
      </AppShell>
    );
  }

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "overview", label: "Overview", icon: BarChart3 },
    { key: "valuation", label: "Valuation", icon: DollarSign },
    { key: "fundamentals", label: "Fundamentals", icon: Database },
    { key: "production", label: "Production", icon: Factory },
    { key: "technicals", label: "Technical", icon: Activity },
    { key: "research", label: "Research", icon: FileText },
    { key: "journal", label: "Trade Journal", icon: NotebookPen },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${company.name} (${company.symbol})`}
        description={`${company.sector} | ${company.industry} | ${company.location}`}
        actions={
          <div className="flex items-center gap-3">
            <div className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-semibold",
              company.changePercent >= 0 ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400",
            )}>
              {company.changePercent >= 0 ? "+" : ""}{company.changePercent.toFixed(2)}%
            </div>
            <div className="rounded-lg bg-surface-800/50 px-3 py-1.5 text-xs font-mono text-surface-400">
              Vol: {company.volume.toLocaleString("en-AU")}
            </div>
          </div>
        }
      />

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto rounded-xl bg-glass p-1">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap",
              tab === key
                ? "bg-brand-500/20 text-brand-400 shadow-sm"
                : "text-surface-400 hover:text-surface-200 hover:bg-glass-hover",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === "overview" && (
        <OverviewTab company={company} ai={ai} news={news ?? []} />
      )}
      {tab === "valuation" && (
        <ValuationTab company={company} />
      )}
      {tab === "fundamentals" && (
        <FundamentalsTab company={company} />
      )}
      {tab === "production" && (
        <ProductionTab company={company} />
      )}
      {tab === "technicals" && (
        <TechnicalTab company={company} />
      )}
      {tab === "research" && (
        <ResearchTab company={company} />
      )}
      {tab === "journal" && (
        <JournalTab journal={journal ?? []} />
      )}
    </div>
  );
}

function OverviewTab({ company, ai, news }: { company: any; ai: any; news: any[] }) {
  const candleData = generateCandleData(company.price, 90);

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Market Cap" value={company.marketCap} format="currency" icon={<BarChart3 className="h-5 w-5" />} delay={0} />
        <KpiCard label="Dividend Yield" value={`${company.dividend.yield.toFixed(2)}%`} format="none" icon={<Gift className="h-5 w-5" />} delay={1} />
        <KpiCard label="P/E Ratio" value={company.fundamentals.pe.toFixed(1)} format="none" icon={<Activity className="h-5 w-5" />} delay={2} />
        <KpiCard label="EV/EBITDA" value={company.fundamentals.evEbitda.toFixed(1)} format="none" icon={<Gauge className="h-5 w-5" />} delay={3} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <PriceChart data={candleData} />

          {/* Investment Thesis */}
          <div className="glass-card p-5">
            <div className="mb-4 flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-surface-400" />
              <h3 className="text-sm font-semibold text-surface-200">Investment Thesis</h3>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl bg-emerald-400/5 border border-emerald-400/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-400">Bull Case</span>
                </div>
                <p className="text-sm leading-relaxed text-surface-300">{company.investmentThesis.bullCase}</p>
              </div>
              <div className="rounded-xl bg-brand-500/5 border border-brand-500/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-brand-400" />
                  <span className="text-sm font-semibold text-brand-400">Base Case</span>
                </div>
                <p className="text-sm leading-relaxed text-surface-300">{company.investmentThesis.baseCase}</p>
              </div>
              <div className="rounded-xl bg-red-400/5 border border-red-400/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <span className="text-sm font-semibold text-red-400">Bear Case</span>
                </div>
                <p className="text-sm leading-relaxed text-surface-300">{company.investmentThesis.bearCase}</p>
              </div>
            </div>
          </div>

          {/* Risks */}
          <div className="glass-card p-5">
            <div className="mb-4 flex items-center gap-3">
              <Shield className="h-4 w-4 text-surface-400" />
              <h3 className="text-sm font-semibold text-surface-200">Risk Assessment</h3>
            </div>
            <div className="space-y-3">
              {company.investmentThesis.risks.map((risk: any, i: number) => (
                <div key={i} className="rounded-xl bg-glass p-4">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <span className="text-xs text-surface-500">{risk.category}</span>
                      <h4 className="text-sm font-medium text-surface-200">{risk.title}</h4>
                    </div>
                    <div className={cn(
                      "rounded px-2 py-0.5 text-[10px] font-medium",
                      risk.severity === "high" ? "bg-red-400/10 text-red-400" :
                      risk.severity === "medium" ? "bg-amber-400/10 text-amber-400" :
                      "bg-surface-700/50 text-surface-400",
                    )}>
                      {risk.severity}
                    </div>
                  </div>
                  <p className="text-xs text-surface-400">{risk.description}</p>
                  <p className="mt-1.5 text-xs text-surface-500">
                    <span className="font-medium text-surface-400">Mitigation:</span> {risk.mitigation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <TechnicalPanel data={company.technicals} />

          {/* AI Summary */}
          {ai && (
            <div className="glass-card p-5">
              <div className="mb-3 flex items-center gap-2">
                <Brain className="h-4 w-4 text-brand-400" />
                <h3 className="text-sm font-semibold text-surface-200">AI Committee</h3>
              </div>
              <div className="rounded-xl bg-brand-500/5 p-3 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-surface-400">Recommendation</span>
                  <span className="text-xs font-semibold text-emerald-400">{ai.action.replace(/_/g, " ").toUpperCase()}</span>
                </div>
                <p className="mt-1 text-xs text-surface-500">{ai.summary}</p>
              </div>
              <div className="space-y-2">
                {ai.analysis.slice(0, 3).map((a: any) => (
                  <div key={a.role} className="flex items-center justify-between rounded-lg bg-glass px-3 py-2">
                    <span className="text-xs text-surface-400">{a.role}</span>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-xs font-medium",
                        a.confidence >= 70 ? "text-emerald-400" : "text-amber-400",
                      )}>{a.confidence}%</span>
                      <span className="text-[10px] text-surface-500">{a.recommendation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent News */}
          <div className="glass-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <Newspaper className="h-4 w-4 text-surface-400" />
              <h3 className="text-sm font-semibold text-surface-200">News</h3>
            </div>
            <div className="space-y-2">
              {news.slice(0, 3).map((article: any) => (
                <div key={article.id} className="rounded-lg bg-glass p-3">
                  <p className="text-xs font-medium text-surface-200">{article.title}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[10px] text-surface-500">{article.source}</span>
                    <span className={cn(
                      "rounded px-1 py-0.5 text-[10px]",
                      article.sentiment === "positive" ? "bg-emerald-400/10 text-emerald-400" :
                      "bg-surface-700/50 text-surface-400",
                    )}>{article.sentiment}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ValuationTab({ company }: { company: any }) {
  return (
    <div className="space-y-6">
      <ValuationForm />

      {/* Comparables */}
      <ChartCard title="Comparable Company Analysis" subtitle="EV/EBITDA multiples">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-glass-border">
                <th className="px-3 py-2 text-left text-xs font-medium text-surface-500">Company</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-surface-500">EV/EBITDA</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-surface-500">P/E</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-surface-500">P/B</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-surface-500">Div. Yield</th>
              </tr>
            </thead>
            <tbody>
              {company.valuation.comparables.map((comp: any) => (
                <tr key={comp.symbol} className="border-b border-glass-border transition-colors hover:bg-glass-hover">
                  <td className="px-3 py-2.5">
                    <span className="font-medium text-surface-200">{comp.symbol}</span>
                    <span className="ml-2 text-xs text-surface-500">{comp.name}</span>
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-surface-200">{comp.evEbitda.toFixed(1)}x</td>
                  <td className="px-3 py-2.5 text-right font-mono text-surface-200">{comp.pe.toFixed(1)}x</td>
                  <td className="px-3 py-2.5 text-right font-mono text-surface-200">{comp.pb.toFixed(1)}x</td>
                  <td className="px-3 py-2.5 text-right font-mono text-surface-200">{comp.dividendYield.toFixed(1)}%</td>
                </tr>
              ))}
              <tr className="bg-brand-500/5">
                <td className="px-3 py-2.5">
                  <span className="font-medium text-brand-400">{company.symbol}</span>
                  <span className="ml-2 text-xs text-brand-400/70">Current</span>
                </td>
                <td className="px-3 py-2.5 text-right font-mono font-semibold text-brand-400">{company.fundamentals.evEbitda.toFixed(1)}x</td>
                <td className="px-3 py-2.5 text-right font-mono font-semibold text-brand-400">{company.fundamentals.pe.toFixed(1)}x</td>
                <td className="px-3 py-2.5 text-right font-mono font-semibold text-brand-400">{company.fundamentals.pb.toFixed(1)}x</td>
                <td className="px-3 py-2.5 text-right font-mono font-semibold text-brand-400">{company.dividend.yield.toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}

function FundamentalsTab({ company }: { company: any }) {
  const metrics = [
    { label: "Revenue", value: formatCompactCurrency(company.fundamentals.revenue) },
    { label: "Net Income", value: formatCompactCurrency(company.fundamentals.netIncome) },
    { label: "EPS", value: `$${company.fundamentals.eps.toFixed(3)}` },
    { label: "P/E Ratio", value: `${company.fundamentals.pe.toFixed(1)}x` },
    { label: "P/B Ratio", value: `${company.fundamentals.pb.toFixed(1)}x` },
    { label: "EV/EBITDA", value: `${company.fundamentals.evEbitda.toFixed(1)}x` },
    { label: "ROE", value: formatPercent(company.fundamentals.roe) },
    { label: "ROCE", value: formatPercent(company.fundamentals.roce) },
    { label: "Gross Margin", value: formatPercent(company.fundamentals.grossMargin * 100) },
    { label: "Net Margin", value: formatPercent(company.fundamentals.netMargin * 100) },
    { label: "Total Debt", value: formatCompactCurrency(company.fundamentals.debt) },
    { label: "Equity", value: formatCompactCurrency(company.fundamentals.equity) },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((m) => (
        <div key={m.label} className="glass-card p-4">
          <p className="kpi-label">{m.label}</p>
          <p className="mt-1 font-mono text-lg font-semibold text-surface-200">{m.value}</p>
        </div>
      ))}
    </div>
  );
}

function ProductionTab({ company }: { company: any }) {
  const prod = company.production;

  const quarterlyData = company.quarterlyResults.map((q: any) => ({
    name: q.quarter,
    value: q.production,
  }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Annual Production" value={`${(prod.annualProduction / 1000000).toFixed(2)}Mt`} format="none" icon={<Pickaxe className="h-5 w-5" />} />
        <KpiCard label="Cash Cost" value={`$${prod.cashCost}/t`} format="none" icon={<Drill className="h-5 w-5" />} />
        <KpiCard label="All-In Cost" value={`$${prod.allInCost}/t`} format="none" icon={<Drill className="h-5 w-5" />} />
        <KpiCard label="Realized Price" value={`$${prod.realizedPrice}/t`} format="none" icon={<DollarSign className="h-5 w-5" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Quarterly Production" subtitle="Wet metric tonnes">
          <BarChart data={quarterlyData} formatValue={(v: number) => `${(v / 1000000).toFixed(2)}Mt`} />
        </ChartCard>

        <ChartCard title="Cash Position" subtitle="Net cash, debt & FCF">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-glass p-4">
                <p className="text-xs text-surface-500">Cash</p>
                <p className="font-mono text-lg font-semibold text-emerald-400">
                  {formatCompactCurrency(company.cashPosition.cash)}
                </p>
              </div>
              <div className="rounded-xl bg-glass p-4">
                <p className="text-xs text-surface-500">Debt</p>
                <p className="font-mono text-lg font-semibold text-red-400">
                  {formatCompactCurrency(company.cashPosition.debt)}
                </p>
              </div>
              <div className="rounded-xl bg-glass p-4">
                <p className="text-xs text-surface-500">Free Cash Flow</p>
                <p className="font-mono text-lg font-semibold text-brand-400">
                  {formatCompactCurrency(company.cashPosition.freeCashFlow)}
                </p>
              </div>
              <div className="rounded-xl bg-glass p-4">
                <p className="text-xs text-surface-500">FCF Yield</p>
                <p className="font-mono text-lg font-semibold text-surface-200">
                  {formatPercent(company.cashPosition.fcfYield * 100)}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-glass p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-surface-500">Guidance FY26</span>
                <span className="text-xs text-surface-400">
                  {prod.guidance.low.toLocaleString("en-AU")} - {prod.guidance.high.toLocaleString("en-AU")} {prod.guidance.unit}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-800">
                <div
                  className="h-full rounded-full bg-brand-500"
                  style={{ width: `${(prod.annualProduction / prod.guidance.high) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Quarterly Results Table */}
      <div className="glass-card p-5">
        <h3 className="mb-4 text-sm font-semibold text-surface-200">Quarterly Results</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-glass-border">
                <th className="px-3 py-2 text-left text-xs font-medium text-surface-500">Quarter</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-surface-500">Revenue</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-surface-500">Net Income</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-surface-500">Production</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-surface-500">Cash Cost</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-surface-500">Realized Price</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-surface-500">EPS</th>
              </tr>
            </thead>
            <tbody>
              {company.quarterlyResults.map((q: any) => (
                <tr key={q.quarter} className="border-b border-glass-border transition-colors hover:bg-glass-hover">
                  <td className="px-3 py-2.5 font-medium text-surface-200">{q.quarter}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-surface-200">{formatCompactCurrency(q.revenue)}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-surface-200">{formatCompactCurrency(q.netIncome)}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-surface-200">{(q.production / 1000000).toFixed(2)}Mt</td>
                  <td className="px-3 py-2.5 text-right font-mono text-surface-200">${q.cashCost}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-surface-200">${q.realizedPrice}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-surface-200">${q.eps.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TechnicalTab({ company }: { company: any }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <TechnicalPanel data={company.technicals} />
      <div className="glass-card p-5">
        <h3 className="mb-4 text-sm font-semibold text-surface-200">Price Statistics</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Current", value: `$${company.price.toFixed(3)}` },
              { label: "Support", value: `$${company.technicals.support.toFixed(3)}` },
              { label: "Resistance", value: `$${company.technicals.resistance.toFixed(3)}` },
              { label: "52W High", value: "$0.52" },
              { label: "52W Low", value: "$0.32" },
              { label: "Avg Volume", value: `${(company.avgVolume / 1000000).toFixed(1)}M` },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-glass p-3">
                <p className="text-xs text-surface-500">{stat.label}</p>
                <p className="font-mono text-sm font-semibold text-surface-200">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-glass p-4">
            <p className="text-xs text-surface-500 mb-2">Trend Analysis</p>
            <div className="flex items-center gap-2">
              <span className={cn(
                "rounded-lg px-3 py-1 text-xs font-semibold",
                company.technicals.trendDirection === "bullish" ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400",
              )}>
                {company.technicals.trendDirection.toUpperCase()}
              </span>
              <span className={cn(
                "rounded-lg px-3 py-1 text-xs font-semibold",
                company.technicals.trendStrength === "strong" ? "bg-emerald-400/10 text-emerald-400" : "bg-amber-400/10 text-amber-400",
              )}>
                {company.technicals.trendStrength.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResearchTab({ company }: { company: any }) {
  return (
    <div className="space-y-4">
      {company.researchNotes.map((note: any) => (
        <div key={note.id} className="glass-card-hover p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-sm font-semibold text-surface-200">{note.title}</h3>
              <p className="text-xs text-surface-500">{note.author} · {formatDate(note.date)}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className={cn(
                "rounded-lg px-3 py-1 text-xs font-semibold",
                note.rating === "buy" ? "bg-emerald-400/10 text-emerald-400" :
                note.rating === "hold" ? "bg-amber-400/10 text-amber-400" :
                "bg-red-400/10 text-red-400",
              )}>
                {note.rating.toUpperCase()}
              </div>
              <div className="rounded-lg bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-400">
                PT: ${note.priceTarget.toFixed(2)}
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-surface-400">{note.summary}</p>
        </div>
      ))}
    </div>
  );
}

function JournalTab({ journal }: { journal: any[] }) {
  return (
    <div className="space-y-4">
      {journal.length === 0 ? (
        <div className="glass-card flex flex-col items-center justify-center py-16">
          <NotebookPen className="mb-4 h-8 w-8 text-surface-600" />
          <p className="text-sm text-surface-500">No trade journal entries for this company</p>
        </div>
      ) : (
        journal.map((entry: any) => (
          <div key={entry.id} className="glass-card-hover p-5">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "rounded-lg px-3 py-1 text-xs font-semibold",
                  entry.type === "buy" ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400",
                )}>
                  {entry.type.toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-surface-200">
                    {entry.shares.toLocaleString("en-AU")} shares @ ${entry.price.toFixed(3)}
                  </p>
                  <p className="text-xs text-surface-500">{formatDate(entry.date)} · Total: ${entry.total.toLocaleString("en-AU")}</p>
                </div>
              </div>
              <div className={cn(
                "rounded-lg px-3 py-1 text-xs font-semibold",
                entry.outcome === "open" ? "bg-surface-700/50 text-surface-400" :
                entry.outcome === "closed_win" ? "bg-emerald-400/10 text-emerald-400" :
                "bg-red-400/10 text-red-400",
              )}>
                {entry.outcome.replace("_", " ").toUpperCase()}
              </div>
            </div>
            <p className="text-sm text-surface-400 mb-2">{entry.strategy}</p>
            <p className="text-xs text-surface-500 leading-relaxed">{entry.thesis}</p>
            {entry.notes && (
              <p className="mt-2 text-xs text-surface-400 italic">{entry.notes}</p>
            )}
            {entry.returnPercent && (
              <div className={cn(
                "mt-2 inline-flex items-center rounded-lg px-2 py-1 text-xs font-semibold",
                entry.returnPercent > 0 ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400",
              )}>
                Return: {entry.returnPercent > 0 ? "+" : ""}{entry.returnPercent.toFixed(1)}%
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default function CompanyPage() {
  const params = useParams();
  const symbol = params.symbol as string;

  return (
    <AppShell>
      <CompanyContent symbol={symbol} />
    </AppShell>
  );
}
