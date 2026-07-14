import { simulateDelay } from "@/lib/utils";
import journalData from "@/data/journal.json";
import type { TradeJournalEntry } from "@/types";

const data = journalData as { entries: TradeJournalEntry[] };

export async function getJournal(): Promise<TradeJournalEntry[]> {
  await simulateDelay();
  return data.entries;
}

export async function getJournalBySymbol(symbol: string): Promise<TradeJournalEntry[]> {
  await simulateDelay();
  return data.entries.filter((e) => e.symbol === symbol);
}
