"use client";

import { Sidebar } from "./Sidebar";
import { TopNavigation } from "./TopNavigation";
import type { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col pl-60 transition-all duration-300">
        <TopNavigation />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
