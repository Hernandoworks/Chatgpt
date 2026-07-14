import { AIChatAgent } from "@cloudflare/ai-chat";
import { streamText, convertToModelMessages, tool } from "ai";
import { createWorkersAI } from "workers-ai-provider";
import { z } from "zod";

export class ChatAgent extends AIChatAgent<Env> {
  maxPersistedMessages = 50;

  async onChatMessage(
    onFinish: Parameters<AIChatAgent<Env>["onChatMessage"]>[0],
    options?: Parameters<AIChatAgent<Env>["onChatMessage"]>[1],
  ) {
    const workersai = createWorkersAI({ binding: this.env.AI });

    const result = streamText({
      model: workersai("@cf/meta/llama-4-scout-17b-16e-instruct"),
      system: `You are Phoenix AI, an investment analyst assistant for the Phoenix Investor OS.
You help users analyze portfolios, research companies, track market data, and generate reports.
Use the available tools when relevant. Be concise and data-driven.`,
      messages: await convertToModelMessages(this.messages),
      tools: {
        getPortfolioSummary: tool({
          description: "Get the user's portfolio summary including total value, top holdings, and allocation",
          inputSchema: z.object({}),
          execute: async () => {
            return { totalValue: 2485000, cash: 350000, holdings: 5, topSectors: ["Mining", "Energy", "Tech"] };
          },
        }),
        getStockPrice: tool({
          description: "Get the current stock price for a given symbol",
          inputSchema: z.object({ symbol: z.string() }),
          execute: async ({ symbol }) => {
            return { symbol, price: 42.50, change: 1.25, changePercent: 3.02 };
          },
        }),
        getCompanyInfo: tool({
          description: "Get company information for a given symbol",
          inputSchema: z.object({ symbol: z.string() }),
          execute: async ({ symbol }) => {
            return { symbol, name: `${symbol} Corp`, sector: "Technology", marketCap: "1.2B", pe: 15.4 };
          },
        }),
        getMarketNews: tool({
          description: "Get latest market news",
          inputSchema: z.object({ limit: z.number().optional() }),
          execute: async ({ limit = 5 }) => {
            return Array.from({ length: limit }, (_, i) => ({
              id: i + 1,
              title: `Market update ${i + 1}`,
              summary: "Markets showed mixed results in today's trading session.",
              date: new Date().toISOString(),
            }));
          },
        }),
        calculateDiversification: tool({
          description: "Analyze portfolio diversification based on current holdings",
          inputSchema: z.object({}),
          execute: async () => {
            return {
              score: 72,
              recommendations: [
                "Consider adding fixed income exposure",
                "Reduce concentration in mining sector",
                "Add international equity exposure",
              ],
            };
          },
        }),
      },
      abortSignal: options?.abortSignal,
      onFinish,
    });

    return result.toUIMessageStreamResponse();
  }
}
