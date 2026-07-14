import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-800/50 text-surface-500">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-surface-300">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-surface-500">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
