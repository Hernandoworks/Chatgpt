import { simulateDelay } from "@/lib/utils";
import marketData from "@/data/market.json";
import type { MarketData } from "@/types";

const data = marketData as MarketData;

export async function getMarketData(): Promise<MarketData> {
  await simulateDelay();
  return data;
}
