"use client";

import { ChartCard } from "./ChartCard";
import { cn } from "@/lib/utils";
import type { TechnicalIndicators } from "@/types";

interface TechnicalChartProps {
  data: TechnicalIndicators;
  className?: string;
}

export function TechnicalPanel({ data, className }: TechnicalChartProps) {
  const trendColor = data.trendDirection === "bullish" ? "text-emerald-400" : data.trendDirection === "bearish" ? "text-red-400" : "text-amber-400";
  const trendBg = data.trendDirection === "bullish" ? "bg-emerald-400/10" : data.trendDirection === "bearish" ? "bg-red-400/10" : "bg-amber-400/10";

  const indicators = [
    { label: "EMA 20", value: data.ema20.toFixed(3), signal: data.ema20 > data.ema50 ? "bullish" : "bearish" },
    { label: "EMA 50", value: data.ema50.toFixed(3), signal: data.ema50 > data.ema200 ? "bullish" : "bearish" },
    { label: "EMA 200", value: data.ema200.toFixed(3), signal: "neutral" },
    { label: "RSI (14)", value: data.rsi.toFixed(1), signal: data.rsi > 70 ? "overbought" : data.rsi < 30 ? "oversold" : "neutral" },
    { label: "MACD", value: data.macd.value.toFixed(4), signal: data.macd.histogram > 0 ? "bullish" : "bearish" },
    { label: "Signal", value: data.macd.signal.toFixed(4), signal: "neutral" },
  ];

  return (
    <ChartCard title="Technical Analysis" subtitle="Indicators & signals" className={className}>
      <div className="space-y-4">
        <div className={cn("flex items-center justify-between rounded-xl px-4 py-3", trendBg)}>
          <span className="text-sm font-medium text-surface-300">Trend</span>
          <div className="flex items-center gap-2">
            <span className={cn("text-sm font-bold capitalize", trendColor)}>
              {data.trendDirection}
            </span>
            <span className={cn(
              "rounded px-2 py-0.5 text-[10px] font-medium",
              data.trendStrength === "strong" ? "bg-emerald-400/10 text-emerald-400" :
              "bg-amber-400/10 text-amber-400",
            )}>
              {data.trendStrength}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {indicators.map((ind) => (
            <div key={ind.label} className="rounded-xl bg-glass px-3 py-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-surface-500">{ind.label}</span>
                <span className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  ind.signal === "bullish" ? "bg-emerald-400" :
                  ind.signal === "bearish" ? "bg-red-400" :
                  "bg-surface-500",
                )} />
              </div>
              <p className="mt-0.5 font-mono text-sm font-medium text-surface-200">{ind.value}</p>
              <p className={cn(
                "text-[10px] capitalize",
                ind.signal === "bullish" ? "text-emerald-400" :
                ind.signal === "bearish" ? "text-red-400" :
                "text-surface-500",
              )}>{ind.signal}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-xl bg-glass p-3">
          <div>
            <p className="text-xs text-surface-500">Support</p>
            <p className="font-mono text-sm font-medium text-surface-200">${data.support.toFixed(3)}</p>
          </div>
          <div>
            <p className="text-xs text-surface-500">Resistance</p>
            <p className="font-mono text-sm font-medium text-surface-200">${data.resistance.toFixed(3)}</p>
          </div>
        </div>
      </div>
    </ChartCard>
  );
}

// Simulated candlestick data for the price chart
export function generateCandleData(basePrice: number, days: number) {
  const data = [];
  let price = basePrice;
  for (let i = days; i >= 0; i--) {
    const change = (Math.random() - 0.48) * 0.03;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * 0.01;
    const low = Math.min(open, close) - Math.random() * 0.01;
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split("T")[0],
      open: parseFloat(open.toFixed(3)),
      high: parseFloat(high.toFixed(3)),
      low: parseFloat(low.toFixed(3)),
      close: parseFloat(close.toFixed(3)),
      volume: Math.floor(Math.random() * 5000000) + 1000000,
    });
    price = close;
  }
  return data;
}

export function PriceChart({ data: candleData }: { candleData: ReturnType<typeof generateCandleData> }) {
  return (
    <ChartCard title="Price Chart" subtitle="FEX.AX | Last 90 days">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div>
            <p className="kpi-label">Current</p>
            <p className="font-mono text-2xl font-bold text-surface-100">${candleData[candleData.length - 1]?.close.toFixed(3)}</p>
          </div>
          <div className="flex gap-4">
            <div>
              <p className="text-[10px] text-surface-500">High</p>
              <p className="font-mono text-xs font-medium text-emerald-400">${Math.max(...candleData.map(d => d.high)).toFixed(3)}</p>
            </div>
            <div>
              <p className="text-[10px] text-surface-500">Low</p>
              <p className="font-mono text-xs font-medium text-red-400">${Math.min(...candleData.map(d => d.low)).toFixed(3)}</p>
            </div>
            <div>
              <p className="text-[10px] text-surface-500">Volume</p>
              <p className="font-mono text-xs font-medium text-surface-200">
                {(candleData[candleData.length - 1]?.volume ?? 0 / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>
        </div>

        {/* Simple OHLC visualization using bars */}
        <div className="flex items-end gap-px h-48">
          {candleData.slice(-60).map((d, i) => {
            const isUp = d.close >= d.open;
            const maxPrice = Math.max(...candleData.map(x => x.high));
            const minPrice = Math.min(...candleData.map(x => x.low));
            const range = maxPrice - minPrice || 0.01;
            const bodyHeight = Math.abs(d.close - d.open) / range * 160;
            const topWick = (d.high - Math.max(d.open, d.close)) / range * 160;
            const bottomWick = (Math.min(d.open, d.close) - d.low) / range * 160;

            return (
              <div key={i} className="flex-1 flex flex-col items-center justify-end relative" style={{ height: "100%" }}>
                {/* Wick */}
                <div
                  className={cn("w-px", isUp ? "bg-emerald-400/60" : "bg-red-400/60")}
                  style={{
                    height: `${topWick + bodyHeight + bottomWick}px`,
                    position: "absolute",
                    bottom: 0,
                  }}
                />
                {/* Body */}
                <div
                  className={cn("w-full rounded-sm", isUp ? "bg-emerald-400" : "bg-red-400")}
                  style={{
                    height: `${Math.max(bodyHeight, 1)}px`,
                    position: "absolute",
                    bottom: `${bottomWick}px`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </ChartCard>
  );
}
