"use client";

import { cn, formatCurrency, formatPercent } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface KpiCardProps {
  label: string;
  value: string | number;
  format?: "currency" | "percent" | "number" | "none";
  change?: number;
  changeLabel?: string;
  icon: ReactNode;
  className?: string;
  delay?: number;
}

export function KpiCard({ label, value, format = "none", change, changeLabel, icon, className, delay = 0 }: KpiCardProps) {
  const displayValue = (() => {
    if (typeof value === "string") return value;
    switch (format) {
      case "currency": return formatCurrency(value, 0);
      case "percent": return formatPercent(value);
      default: return value.toLocaleString("en-AU");
    }
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.05 }}
      className={cn("glass-card-hover flex items-start gap-4 p-5", className)}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
        {icon}
      </div>
      <div className="flex-1">
        <p className="kpi-label">{label}</p>
        <p className="kpi-value mt-0.5">{displayValue}</p>
        {change !== undefined && (
          <p className={cn("mt-1 flex items-center gap-1 text-xs", change >= 0 ? "text-emerald-400" : "text-red-400")}>
            {changeLabel && <span className="text-surface-500">{changeLabel}</span>}
            <span className="font-medium">{formatPercent(change)}</span>
          </p>
        )}
      </div>
    </motion.div>
  );
}
