"use client";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { cn } from "@/lib/utils";
import { Palette, Bell, Activity, User } from "lucide-react";
import { useState } from "react";

function SettingsContent() {
  const [paperTrading, setPaperTrading] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [emailReports, setEmailReports] = useState(false);

  const sections = [
    {
      title: "Preferences",
      icon: Palette,
      items: [
        { label: "Currency", description: "Default display currency", value: "AUD ($)", type: "select" },
        { label: "Chart Style", description: "Default chart appearance", value: "Candlestick", type: "select" },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        { label: "Push Notifications", description: "Receive alerts in-app", value: notifications, type: "toggle", onChange: () => setNotifications(!notifications) },
        { label: "Email Reports", description: "Weekly portfolio summary by email", value: emailReports, type: "toggle", onChange: () => setEmailReports(!emailReports) },
      ],
    },
    {
      title: "Trading",
      icon: Activity,
      items: [
        { label: "Paper Trading Mode", description: "Simulate trades without real execution", value: paperTrading, type: "toggle", onChange: () => setPaperTrading(!paperTrading) },
        { label: "Default Order Size", description: "Default trade size for quick entry", value: "Market", type: "select" },
      ],
    },
    {
      title: "Account",
      icon: User,
      items: [
        { label: "Plan", description: "Current subscription plan", value: "Pro Plan", type: "badge" },
        { label: "Data Refresh", description: "Auto-refresh market data", value: "30 seconds", type: "select" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Configure your investment OS" />

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="glass-card p-5">
            <div className="mb-4 flex items-center gap-2">
              <section.icon className="h-4 w-4 text-surface-400" />
              <h3 className="text-sm font-semibold text-surface-200">{section.title}</h3>
            </div>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-glass-hover">
                  <div>
                    <p className="text-sm font-medium text-surface-200">{item.label}</p>
                    <p className="text-xs text-surface-500">{item.description}</p>
                  </div>
                  <div>
                    {item.type === "toggle" && (
                      <button
                        onClick={item.onChange}
                        className={cn(
                          "relative h-6 w-11 rounded-full transition-colors",
                          item.value ? "bg-brand-500" : "bg-surface-700",
                        )}
                      >
                        <div className={cn(
                          "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
                          item.value && "translate-x-5",
                        )} />
                      </button>
                    )}
                    {item.type === "select" && (
                      <div className="flex items-center gap-2 rounded-lg border border-glass-border bg-glass px-3 py-1.5 text-xs font-medium text-surface-300">
                        {item.value}
                      </div>
                    )}
                    {item.type === "badge" && (
                      <div className="rounded-lg bg-brand-500/10 px-3 py-1.5 text-xs font-semibold text-brand-400">
                        {item.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <AppShell>
      <SettingsContent />
    </AppShell>
  );
}
