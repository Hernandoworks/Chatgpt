import { simulateDelay } from "@/lib/utils";
import type { AIRecommendation, AnalystOpinion, AnalystRole } from "@/types";

const ANALYSTS: { role: AnalystRole; name: string }[] = [
  { role: "Mining Analyst", name: "Dr. Sarah Chen" },
  { role: "Technical Analyst", name: "Marcus Webb" },
  { role: "Macro Economist", name: "Prof. James Wright" },
  { role: "Risk Manager", name: "Elena Rodriguez" },
  { role: "Portfolio Manager", name: "David Kim" },
  { role: "Chairperson", name: "Alexandra Moore" },
];

const ANALYST_RESPONSES: Record<AnalystRole, (symbol: string) => Omit<AnalystOpinion, "role" | "name">> = {
  "Mining Analyst": (symbol: string) => ({
    recommendation: "Strong Buy",
    confidence: 88,
    reasoning: `${symbol} demonstrates exceptional operational execution with industry-leading cost control. The Iron Ridge asset continues to outperform guidance with consistent grade outperformance. Cash costs of $68/wmt position the company in the second quartile of the global cost curve, providing margin resilience even in a falling price environment. The 8-year mine life provides visibility, and the potential for resource extension upside is not reflected in the current valuation.`,
    risks: ["Single asset concentration risk", "Grade variability over remaining mine life"],
    catalysts: ["Q3 production report due April 20", "Potential Iron Ridge resource extension study"],
  }),
  "Technical Analyst": () => ({
    recommendation: "Buy",
    confidence: 72,
    reasoning: "Price is trading above all major EMAs (20/50/200) with a bullish alignment. RSI at 62 shows room to run before overbought. MACD histogram is positive and expanding. The recent breakout above $0.46 resistance with above-average volume is a constructive signal. Next resistance at $0.52 with support at $0.435. The trend is strong and well-established.",
    risks: ["RSI approaching overbought on the daily", "Potential for mean reversion after 15% rally"],
    catalysts: ["Breakout above $0.52 would open path to $0.60", "Golden cross on 50/200 EMA confirmed"],
  }),
  "Macro Economist": () => ({
    recommendation: "Buy",
    confidence: 65,
    reasoning: "The macroeconomic environment remains supportive for iron ore. Chinese stimulus measures are gaining traction with infrastructure spending accelerating. Supply-side constraints from Vale and declining grades at Australian operations support prices above $100/t. The weak AUD (0.65) provides a significant tailwind for Australian dollar revenues. Risks include a sharper-than-expected Chinese slowdown and potential trade tensions.",
    risks: ["China property sector remains weak", "Potential US tariff impacts on global trade", "RBA rate trajectory uncertain"],
    catalysts: ["Chinese infrastructure stimulus rollout", "AUD remaining weak supports Australian exporters"],
  }),
  "Risk Manager": () => ({
    recommendation: "Hold",
    confidence: 60,
    reasoning: "The risk/reward is balanced at current levels. While the fundamental story is intact, the single-asset nature of Fenix presents concentration risk that cannot be hedged perfectly. The 32% position size in a model portfolio is high for a single-asset miner. Iron ore price risk is the dominant factor — a 20% fall in iron ore would reduce FCF by approximately 40%. Recommend maintaining position but not adding until a better risk/reward entry presents itself.",
    risks: ["Iron ore price volatility remains elevated", "Single asset concentration", "Portfolio concentration (32% of holdings)"],
    catalysts: ["Position sizing rebalancing opportunity", "stop-loss at $0.38 (-12% from current)"],
  }),
  "Portfolio Manager": () => ({
    recommendation: "Buy",
    confidence: 82,
    reasoning: "FEX offers the best risk-adjusted return in the iron ore space. At 3.8x EV/EBITDA and an 8.25% dividend yield, it is significantly undervalued compared to peers trading at 5-6x. The net cash balance sheet eliminates financing risk. The dividend is well-covered (50% payout ratio) with room for growth. Position sizing at 35% of portfolio is appropriate given the asymmetric upside. Maintain buy with a price target of $0.72.",
    risks: ["Illiquidity risk in stressed markets", "Sector rotation out of resources"],
    catalysts: ["FY25 results in July likely to drive re-rating", "Potential index inclusion as market cap grows"],
  }),
  Chairperson: () => ({
    recommendation: "Strong Buy",
    confidence: 75,
    reasoning: "After reviewing all analyst inputs, the committee is aligned on a positive outlook for FEX. The mining analyst's operational enthusiasm, the portfolio manager's valuation case, and the macro economist's supportive backdrop outweigh the risk manager's caution. The technical analyst confirms the timing is favourable. The key risk — iron ore price — is partially mitigated by the low cost base and net cash position. We recommend accumulating FEX as a core holding with a 12-month price target of $0.72, representing ~48% upside from current levels.",
    risks: ["Consensus vulnerability to iron ore price shock", "Single-asset execution risk"],
    catalysts: ["Q3 production report (next week)", "FY25 full-year results (July)", "Potential resource upgrade"],
  }),
};

export async function getAIRecommendation(symbol: string): Promise<AIRecommendation> {
  await simulateDelay(800, 1500);

  const analysis: AnalystOpinion[] = ANALYSTS.map(({ role, name }) => ({
    role,
    name,
    ...ANALYST_RESPONSES[role](symbol),
  }));

  return {
    id: `ai-${Date.now()}`,
    symbol,
    action: "strong_buy",
    confidence: 75,
    reasoning: analysis[5]!.reasoning,
    analysis,
    summary: `AI Committee recommendation for ${symbol}: STRONG BUY with 75% confidence. All analysts are bullish to neutral, with no sell recommendations. The committee sees 48% upside to fair value of $0.72.`,
    timestamp: new Date().toISOString(),
  };
}
