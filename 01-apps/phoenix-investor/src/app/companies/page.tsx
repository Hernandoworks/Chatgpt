"use client";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { useCompanies } from "@/hooks/useCompany";
import { cn, formatCompactCurrency } from "@/lib/utils";
import { TableSkeleton } from "@/components/shared/Skeleton";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import { Building2, TrendingUp, TrendingDown, Minus } from "lucide-react";

function CompaniesContent() {
  const { data, isLoading } = useCompanies();
  const router = useRouter();

  if (isLoading) return <TableSkeleton rows={5} />;

  return (
    <div className="space-y-6">
      <PageHeader title="Companies" description="Tracked companies" />

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-glass-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500">Company</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-surface-500">Price</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-surface-500">Change</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-surface-500">Market Cap</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-surface-500">P/E</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-surface-500">EV/EBITDA</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-surface-500">Div. Yield</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((company) => (
                <tr
                  key={company.symbol}
                  className="border-b border-glass-border transition-colors hover:bg-glass-hover cursor-pointer"
                  onClick={() => router.push(ROUTES.COMPANY(company.symbol))}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10">
                        <Building2 className="h-4 w-4 text-brand-400" />
                      </div>
                      <div>
                        <p className="font-medium text-surface-200">{company.symbol}</p>
                        <p className="text-xs text-surface-500">{company.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-medium text-surface-200">
                    ${company.price.toFixed(3)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className={cn(
                      "inline-flex items-center gap-1 rounded-lg px-2 py-1 font-mono text-xs font-semibold",
                      company.changePercent > 0 ? "bg-emerald-400/10 text-emerald-400" :
                      company.changePercent < 0 ? "bg-red-400/10 text-red-400" :
                      "bg-surface-700/50 text-surface-400",
                    )}>
                      {company.changePercent > 0 ? <TrendingUp className="h-3 w-3" /> : company.changePercent < 0 ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                      {company.changePercent >= 0 ? "+" : ""}{company.changePercent.toFixed(2)}%
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-surface-300">
                    {formatCompactCurrency(company.marketCap)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-surface-300">
                    {company.fundamentals.pe.toFixed(1)}x
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-surface-300">
                    {company.fundamentals.evEbitda.toFixed(1)}x
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-emerald-400">
                    {company.dividend?.yield.toFixed(1)}%
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

export default function CompaniesPage() {
  return (
    <AppShell>
      <CompaniesContent />
    </AppShell>
  );
}
