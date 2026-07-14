"use client";

import { useQuery } from "@tanstack/react-query";
import { getJournal, getJournalBySymbol } from "@/services/journal";
import type { TradeJournalEntry } from "@/types";

export function useJournal(symbol?: string) {
  return useQuery<TradeJournalEntry[]>({
    queryKey: ["journal", symbol],
    queryFn: symbol ? () => getJournalBySymbol(symbol) : getJournal,
    staleTime: 60_000,
  });
}
