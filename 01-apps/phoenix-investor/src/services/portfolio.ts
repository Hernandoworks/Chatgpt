import { simulateDelay } from "@/lib/utils";
import portfolioData from "@/data/portfolio.json";
import type { Portfolio } from "@/types";

const data = portfolioData as Portfolio;

export async function getPortfolio(): Promise<Portfolio> {
  await simulateDelay();
  return data;
}
