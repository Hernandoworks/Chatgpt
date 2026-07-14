import { simulateDelay } from "@/lib/utils";
import newsData from "@/data/news.json";
import type { NewsItem } from "@/types";

const data = newsData as { articles: NewsItem[] };

export async function getNews(): Promise<NewsItem[]> {
  await simulateDelay();
  return data.articles;
}

export async function getNewsBySymbol(symbol: string): Promise<NewsItem[]> {
  await simulateDelay();
  return data.articles.filter((a) => a.symbols.includes(symbol));
}
