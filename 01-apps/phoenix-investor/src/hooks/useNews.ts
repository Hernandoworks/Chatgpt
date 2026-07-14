"use client";

import { useQuery } from "@tanstack/react-query";
import { getNews, getNewsBySymbol } from "@/services/news";
import type { NewsItem } from "@/types";

export function useNews(symbol?: string) {
  return useQuery<NewsItem[]>({
    queryKey: ["news", symbol],
    queryFn: symbol ? () => getNewsBySymbol(symbol) : getNews,
    staleTime: 60_000,
  });
}
