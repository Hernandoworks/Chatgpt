"use client";

import { useQuery } from "@tanstack/react-query";
import { getCompany, getCompanies } from "@/services/companies";
import type { Company } from "@/types";

export function useCompany(symbol: string) {
  return useQuery<Company | null>({
    queryKey: ["company", symbol],
    queryFn: () => getCompany(symbol),
    staleTime: 30_000,
  });
}

export function useCompanies() {
  return useQuery<Company[]>({
    queryKey: ["companies"],
    queryFn: getCompanies,
    staleTime: 60_000,
  });
}
