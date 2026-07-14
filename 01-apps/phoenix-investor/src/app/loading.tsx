import { AppShell } from "@/components/layout/AppShell";
import { CardSkeleton, ChartSkeleton } from "@/components/shared/Skeleton";

export default function LoadingPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="mb-1 h-7 w-48 rounded-lg bg-surface-800/50" />
          <div className="h-4 w-72 rounded-lg bg-surface-800/30" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
        <ChartSkeleton />
      </div>
    </AppShell>
  );
}
