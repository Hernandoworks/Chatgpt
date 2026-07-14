"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  height?: number;
}

export function ChartCard({ title, subtitle, action, children, className, height }: ChartCardProps) {
  return (
    <div className={cn("glass-card p-5", className)}>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-surface-200">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-surface-500">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div style={height ? { height } : undefined}>{children}</div>
    </div>
  );
}
