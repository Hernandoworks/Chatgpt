"use client";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { cn, formatDate } from "@/lib/utils";
import { Bell, BellOff, BellRing, Activity, TrendingUp, Newspaper } from "lucide-react";
import { useMemo } from "react";
import type { Alert } from "@/types";

const MOCK_ALERTS: Alert[] = [
  { id: "a-001", symbol: "FEX", type: "price", condition: "above $0.50", value: 0.5, triggered: true, createdAt: "2025-03-15T10:00:00Z", triggeredAt: "2025-04-10T14:32:00Z", read: false },
  { id: "a-002", symbol: "FEX", type: "price", condition: "below $0.42", value: 0.42, triggered: false, createdAt: "2025-03-15T10:00:00Z", read: false },
  { id: "a-003", symbol: "FEX", type: "volume", condition: "above 5M", value: 5000000, triggered: true, createdAt: "2025-04-01T09:00:00Z", triggeredAt: "2025-04-12T11:15:00Z", read: true },
  { id: "a-004", symbol: "FEX", type: "technical", condition: "RSI > 70", value: 70, triggered: false, createdAt: "2025-04-01T09:00:00Z", read: false },
  { id: "a-005", symbol: "FEX", type: "dividend", condition: "ex-date approaching", value: 0, triggered: true, createdAt: "2025-02-20T08:00:00Z", triggeredAt: "2025-03-08T09:00:00Z", read: true },
  { id: "a-006", symbol: "BHP", type: "news", condition: "material announcement", value: 0, triggered: false, createdAt: "2025-04-05T12:00:00Z", read: false },
];

const ALERT_ICONS: Record<string, any> = {
  price: TrendingUp,
  volume: Activity,
  technical: Activity,
  dividend: Bell,
  news: Newspaper,
};

function getAlertTypeColor(type: string): string {
  switch (type) {
    case "price": return "bg-emerald-400/10 text-emerald-400";
    case "volume": return "bg-blue-400/10 text-blue-400";
    case "technical": return "bg-purple-400/10 text-purple-400";
    case "dividend": return "bg-amber-400/10 text-amber-400";
    case "news": return "bg-rose-400/10 text-rose-400";
    default: return "bg-surface-700/50 text-surface-400";
  }
}

function AlertsContent() {
  const alerts = useMemo(() => MOCK_ALERTS, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Alerts"
        description="Monitor price movements, news, and events"
        actions={
          <button className="glass-card-hover flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-surface-200">
            <Bell className="h-4 w-4" />
            Create Alert
          </button>
        }
      />

      <div className="space-y-3">
        {alerts.map((alert) => {
          const Icon = ALERT_ICONS[alert.type] ?? Bell;
          return (
            <div key={alert.id} className={cn(
              "glass-card-hover p-4",
              !alert.read && !alert.triggered && "border-l-2 border-l-brand-500",
              alert.triggered && "opacity-60",
            )}>
              <div className="flex items-start gap-4">
                <div className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  getAlertTypeColor(alert.type),
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-surface-200">{alert.symbol}</span>
                        <div className={cn(
                          "rounded px-2 py-0.5 text-[10px] font-medium capitalize",
                          getAlertTypeColor(alert.type),
                        )}>
                          {alert.type}
                        </div>
                      </div>
                      <p className="mt-0.5 text-sm text-surface-400">
                        {alert.type === "price" ? `Price ${alert.condition}` :
                         alert.type === "volume" ? `Volume ${alert.condition}` :
                         alert.type === "technical" ? `Technical: ${alert.condition}` :
                         alert.type === "dividend" ? `Dividend: ${alert.condition}` :
                         `News: ${alert.condition}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {alert.triggered ? (
                        <div className="flex items-center gap-1 rounded-lg bg-surface-700/50 px-2 py-1 text-[10px] text-surface-400">
                          <BellRing className="h-3 w-3" />
                          Triggered
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 rounded-lg bg-surface-700/50 px-2 py-1 text-[10px] text-surface-500">
                          <BellOff className="h-3 w-3" />
                          Active
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-surface-500">
                    <span>Created: {formatDate(alert.createdAt)}</span>
                    {alert.triggeredAt && (
                      <>
                        <span className="text-surface-600">•</span>
                        <span>Triggered: {formatDate(alert.triggeredAt)}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AlertsPage() {
  return (
    <AppShell>
      <AlertsContent />
    </AppShell>
  );
}
