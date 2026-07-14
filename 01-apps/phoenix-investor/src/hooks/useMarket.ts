"use client";

import { useQuery } from "@tanstack/react-query";
import { getMarketData } from "@/services/market";
import type { MarketData } from "@/types";

export function useMarket() {
  return useQuery<MarketData>({
    queryKey: ["market"],
    queryFn: getMarketData,
    staleTime: 30_000,
  });
}
