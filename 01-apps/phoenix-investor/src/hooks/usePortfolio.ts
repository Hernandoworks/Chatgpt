"use client";

import { useQuery } from "@tanstack/react-query";
import { getPortfolio } from "@/services/portfolio";
import type { Portfolio } from "@/types";

export function usePortfolio() {
  return useQuery<Portfolio>({
    queryKey: ["portfolio"],
    queryFn: getPortfolio,
    staleTime: 30_000,
  });
}
