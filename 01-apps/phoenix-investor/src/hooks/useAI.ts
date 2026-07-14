"use client";

import { useQuery } from "@tanstack/react-query";
import { getAIRecommendation } from "@/services/ai-committee";
import type { AIRecommendation } from "@/types";

export function useAIRecommendation(symbol: string) {
  return useQuery<AIRecommendation>({
    queryKey: ["ai-recommendation", symbol],
    queryFn: () => getAIRecommendation(symbol),
    staleTime: 300_000,
  });
}
