import { simulateDelay } from "@/lib/utils";
import fexData from "@/data/fex.json";
import type { Company } from "@/types";

const companies: Record<string, Company> = {
  FEX: fexData as unknown as Company,
};

export async function getCompany(symbol: string): Promise<Company | null> {
  await simulateDelay();
  return companies[symbol] ?? null;
}

export async function getCompanies(): Promise<Company[]> {
  await simulateDelay();
  return Object.values(companies);
}
