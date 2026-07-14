"use client";

import { useQuery } from "@tanstack/react-query";
import { getResearchReports } from "@/services/research";

export function useResearch() {
  return useQuery({
    queryKey: ["research"],
    queryFn: getResearchReports,
    staleTime: 120_000,
  });
}
