"use client";

import { AppShell } from "@/components/layout/AppShell";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center py-24">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-400/10">
          <AlertTriangle className="h-8 w-8 text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-surface-100 mb-2">Something went wrong</h2>
        <p className="text-sm text-surface-400 mb-6 max-w-md text-center">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-600"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </AppShell>
  );
}
