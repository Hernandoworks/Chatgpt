"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Calculator, TrendingUp, TrendingDown } from "lucide-react";

const valuationSchema = z.object({
  ironOrePrice: z.number().min(50).max(200),
  productionVolume: z.number().min(1000000).max(10000000),
  cashCost: z.number().min(30).max(150),
  audUsd: z.number().min(0.5).max(0.8),
  discountRate: z.number().min(5).max(20),
  terminalGrowth: z.number().min(0).max(5),
  years: z.number().min(3).max(20),
});

type ValuationInputs = z.infer<typeof valuationSchema>;

interface ValuationResult {
  fairValue: number;
  upside: number;
  bullCase: number;
  baseCase: number;
  bearCase: number;
}

function calculateValuation(data: ValuationInputs): ValuationResult {
  const sharesOutstanding = 645000000;
  const netCash = 72500000;
  const revenuePerYear = data.productionVolume * data.ironOrePrice * data.audUsd;
  const costPerYear = data.productionVolume * data.cashCost * data.audUsd;
  const fcfPerYear = revenuePerYear - costPerYear;
  const terminalValue = (fcfPerYear * (1 + data.terminalGrowth / 100)) / ((data.discountRate - data.terminalGrowth) / 100);
  let pv = 0;
  for (let y = 1; y <= data.years; y++) {
    pv += fcfPerYear / Math.pow(1 + data.discountRate / 100, y);
  }
  pv += terminalValue / Math.pow(1 + data.discountRate / 100, data.years);
  const enterpriseValue = pv;
  const equityValue = enterpriseValue + netCash;
  const fairValue = equityValue / sharesOutstanding;
  const upside = ((fairValue / 0.485 - 1) * 100);

  const bullFcf = fcfPerYear * 1.2;
  let bullPv = 0;
  for (let y = 1; y <= data.years; y++) {
    bullPv += bullFcf / Math.pow(1 + (data.discountRate - 2) / 100, y);
  }
  bullPv += (bullFcf * 1.03) / ((data.discountRate - 2 - 3) / 100) / Math.pow(1 + (data.discountRate - 2) / 100, data.years);
  const bullEquity = bullPv + netCash;
  const bullCase = bullEquity / sharesOutstanding;

  const bearFcf = fcfPerYear * 0.6;
  let bearPv = 0;
  for (let y = 1; y <= data.years; y++) {
    bearPv += bearFcf / Math.pow(1 + (data.discountRate + 3) / 100, y);
  }
  bearPv += (bearFcf * 1.0) / ((data.discountRate + 3 - 0) / 100) / Math.pow(1 + (data.discountRate + 3) / 100, data.years);
  const bearEquity = bearPv + netCash;
  const bearCase = bearEquity / sharesOutstanding;

  const baseFcf = fcfPerYear;
  let basePv = 0;
  for (let y = 1; y <= data.years; y++) {
    basePv += baseFcf / Math.pow(1 + data.discountRate / 100, y);
  }
  basePv += (baseFcf * (1 + data.terminalGrowth / 100)) / ((data.discountRate - data.terminalGrowth) / 100) / Math.pow(1 + data.discountRate / 100, data.years);
  const baseEquity = basePv + netCash;
  const baseCase = baseEquity / sharesOutstanding;

  return { fairValue, upside, bullCase, baseCase, bearCase };
}

const DEFAULT_VALUES: ValuationInputs = {
  ironOrePrice: 105,
  productionVolume: 4200000,
  cashCost: 68,
  audUsd: 0.65,
  discountRate: 10,
  terminalGrowth: 2,
  years: 8,
};

export function ValuationForm() {
  const [result, setResult] = useState<ValuationResult>(() => calculateValuation(DEFAULT_VALUES));

  const { register, watch } = useForm<ValuationInputs>({
    resolver: zodResolver(valuationSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const values = watch();

  useEffect(() => {
    const subscription = watch((data) => {
      try {
        const validated = valuationSchema.parse(data);
        setResult(calculateValuation(validated));
      } catch {
        // invalid inputs — keep last valid result
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const fields = [
    { key: "ironOrePrice", label: "Iron Ore Price (USD/t)", min: 50, max: 200, step: 1, suffix: "$" },
    { key: "productionVolume", label: "Production (Mt)", min: 1000000, max: 10000000, step: 100000, suffix: "t" },
    { key: "cashCost", label: "Cash Cost (USD/t)", min: 30, max: 150, step: 1, suffix: "$" },
    { key: "audUsd", label: "AUD/USD", min: 0.5, max: 0.8, step: 0.01, suffix: "" },
    { key: "discountRate", label: "Discount Rate (%)", min: 5, max: 20, step: 0.5, suffix: "%" },
    { key: "terminalGrowth", label: "Terminal Growth (%)", min: 0, max: 5, step: 0.25, suffix: "%" },
    { key: "years", label: "Projection Years", min: 3, max: 20, step: 1, suffix: "y" },
  ] as const;

  return (
    <div className="glass-card p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10">
          <Calculator className="h-4 w-4 text-brand-400" />
        </div>
        <h3 className="text-sm font-semibold text-surface-200">Valuation Calculator</h3>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-4">
          {fields.map(({ key, label, min, max, step, suffix }) => (
            <div key={key}>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-xs text-surface-400">{label}</label>
                <span className="font-mono text-xs font-medium text-surface-200">
                  {(values as any)[key]?.toLocaleString?.("en-AU") ?? values[key as keyof ValuationInputs]}
                  {suffix && <span className="text-surface-500 ml-0.5">{suffix}</span>}
                </span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                {...register(key, { valueAsNumber: true })}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-surface-800 accent-brand-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-brand-500/25"
              />
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="rounded-xl bg-glass p-4 text-center">
            <p className="text-xs text-surface-400 mb-1">Fair Value</p>
            <p className="font-mono text-3xl font-bold text-surface-100">
              ${result.fairValue.toFixed(3)}
            </p>
            <div className={cn(
              "mt-2 inline-flex items-center gap-1 rounded-lg px-3 py-1 text-sm font-semibold",
              result.upside > 20 ? "bg-emerald-400/10 text-emerald-400" :
              result.upside > 0 ? "bg-amber-400/10 text-amber-400" :
              "bg-red-400/10 text-red-400",
            )}>
              {result.upside > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {result.upside > 0 ? "+" : ""}{result.upside.toFixed(1)}% vs Current
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-emerald-400/5 p-3 text-center">
              <p className="text-xs text-emerald-400/70 mb-1">Bull Case</p>
              <p className="font-mono text-lg font-bold text-emerald-400">${result.bullCase.toFixed(3)}</p>
            </div>
            <div className="rounded-xl bg-brand-500/5 p-3 text-center">
              <p className="text-xs text-brand-400/70 mb-1">Base Case</p>
              <p className="font-mono text-lg font-bold text-brand-400">${result.baseCase.toFixed(3)}</p>
            </div>
            <div className="rounded-xl bg-red-400/5 p-3 text-center">
              <p className="text-xs text-red-400/70 mb-1">Bear Case</p>
              <p className="font-mono text-lg font-bold text-red-400">${result.bearCase.toFixed(3)}</p>
            </div>
          </div>

          <div className="rounded-xl bg-glass p-3 text-xs text-surface-400 space-y-1">
            <p>Current price: $0.485</p>
            <p>Shares: 645M | Net cash: $72.5M</p>
            <p>Scenarios adjust: Bull (+20% FCF, -2% disc.), Bear (-40% FCF, +3% disc., 0% growth)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
