export interface Portfolio {
  totalValue: number;
  todayPnL: number;
  todayPnLPercent: number;
  totalReturn: number;
  totalReturnPercent: number;
  cashBalance: number;
  allocation: Allocation[];
  performanceHistory: PerformancePoint[];
  riskScore: number;
  convictionScore: number;
}

export interface Allocation {
  name: string;
  symbol: string;
  value: number;
  percentage: number;
  color: string;
}

export interface PerformancePoint {
  date: string;
  value: number;
}

export interface Company {
  symbol: string;
  name: string;
  sector: string;
  industry: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  volume: number;
  avgVolume: number;
  dividend: Dividend | null;
  fundamentals: Fundamentals;
  production: Production;
  cashPosition: CashPosition;
  valuation: ValuationMetrics;
  technicals: TechnicalIndicators;
  investmentThesis: InvestmentThesis;
  quarterlyResults: QuarterlyResult[];
  researchNotes: ResearchNote[];
}

export interface Dividend {
  yield: number;
  amount: number;
  frequency: string;
  exDate: string;
  payDate: string;
  franking: number;
}

export interface Fundamentals {
  eps: number;
  pe: number;
  pb: number;
  evEbitda: number;
  revenue: number;
  netIncome: number;
  debt: number;
  equity: number;
  roe: number;
  roce: number;
  grossMargin: number;
  netMargin: number;
}

export interface Production {
  commodity: string;
  annualProduction: number;
  unit: string;
  cashCost: number;
  allInCost: number;
  realizedPrice: number;
  guidance: ProductionGuidance;
  mineLife: number;
  location: string;
}

export interface ProductionGuidance {
  low: number;
  high: number;
  unit: string;
}

export interface CashPosition {
  cash: number;
  debt: number;
  freeCashFlow: number;
  fcfYield: number;
  burnRate: number;
  runwayMonths: number;
}

export interface ValuationMetrics {
  fairValue: number;
  upside: number;
  dcf: DCFResult;
  comparables: Comparable[];
}

export interface DCFResult {
  bullCase: number;
  baseCase: number;
  bearCase: number;
  assumptions: DCFAssumptions;
}

export interface DCFAssumptions {
  ironOrePrice: number;
  productionVolume: number;
  cashCost: number;
  audUsd: number;
  discountRate: number;
  terminalGrowth: number;
  years: number;
}

export interface Comparable {
  symbol: string;
  name: string;
  evEbitda: number;
  pe: number;
  pb: number;
  dividendYield: number;
}

export interface TechnicalIndicators {
  ema20: number;
  ema50: number;
  ema200: number;
  rsi: number;
  macd: MACDValue;
  support: number;
  resistance: number;
  trendStrength: "strong" | "moderate" | "weak";
  trendDirection: "bullish" | "bearish" | "neutral";
}

export interface MACDValue {
  value: number;
  signal: number;
  histogram: number;
}

export interface InvestmentThesis {
  bullCase: string;
  baseCase: string;
  bearCase: string;
  catalysts: Catalyst[];
  risks: Risk[];
}

export interface Catalyst {
  date: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  probability: number;
}

export interface Risk {
  category: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  mitigation: string;
}

export interface QuarterlyResult {
  quarter: string;
  revenue: number;
  netIncome: number;
  production: number;
  cashCost: number;
  realizedPrice: number;
  eps: number;
}

export interface ResearchNote {
  id: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  rating: "buy" | "hold" | "sell" | "overweight" | "underweight";
  priceTarget: number;
}

export interface MarketData {
  indices: IndexData[];
  gainers: MarketMover[];
  losers: MarketMover[];
  sectors: SectorPerformance[];
}

export interface IndexData {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface MarketMover {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

export interface SectorPerformance {
  name: string;
  changePercent: number;
  color: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
  sentiment: "positive" | "negative" | "neutral";
  symbols: string[];
  category: string;
}

export interface AIRecommendation {
  id: string;
  symbol: string;
  action: "strong_buy" | "buy" | "hold" | "sell" | "strong_sell";
  confidence: number;
  reasoning: string;
  analysis: AnalystOpinion[];
  summary: string;
  timestamp: string;
}

export interface AnalystOpinion {
  role: AnalystRole;
  name: string;
  recommendation: string;
  confidence: number;
  reasoning: string;
  risks: string[];
  catalysts: string[];
}

export type AnalystRole =
  | "Mining Analyst"
  | "Technical Analyst"
  | "Macro Economist"
  | "Risk Manager"
  | "Portfolio Manager"
  | "Chairperson";

export interface TradeJournalEntry {
  id: string;
  symbol: string;
  type: "buy" | "sell";
  shares: number;
  price: number;
  total: number;
  date: string;
  strategy: string;
  thesis: string;
  outcome: "open" | "closed_win" | "closed_loss" | "closed_breakeven";
  exitPrice?: number;
  exitDate?: string;
  returnPercent?: number;
  notes: string;
}

export interface Alert {
  id: string;
  symbol: string;
  type: "price" | "volume" | "news" | "technical" | "dividend";
  condition: string;
  value: number;
  triggered: boolean;
  createdAt: string;
  triggeredAt?: string;
  read: boolean;
}

export interface Report {
  id: string;
  title: string;
  type: "weekly" | "monthly" | "quarterly" | "custom";
  date: string;
  summary: string;
  sections: ReportSection[];
}

export interface ReportSection {
  title: string;
  content: string;
  metrics?: { label: string; value: string; change?: string }[];
}

export interface UserSettings {
  theme: "dark" | "light";
  defaultPage: string;
  currency: string;
  notifications: boolean;
  emailReports: boolean;
  paperTrading: boolean;
  chartStyle: "candle" | "line" | "area";
  techIndicators: string[];
}
