"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BarChartProps {
  data: { name: string; value: number; color?: string }[];
  height?: number;
  formatValue?: (v: number) => string;
}

export function BarChart({ data, height = 200, formatValue }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 10, fill: "rgba(255,255,255,0.25)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: "rgba(255,255,255,0.25)" }} axisLine={false} tickLine={false} tickFormatter={(v) => formatValue?.(v) ?? `${v}%`} width={35} />
        <Tooltip
          contentStyle={{
            background: "rgba(15, 23, 42, 0.95)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            backdropFilter: "blur(16px)",
            fontSize: "12px",
          }}
          labelStyle={{ color: "rgba(255,255,255,0.5)" }}
          formatter={(value: number) => [formatValue?.(value) ?? `${value.toFixed(1)}%`, ""]}
        />
        {data.map((entry, index) => (
          <Bar
            key={index}
            dataKey="value"
            data={[entry]}
            fill={entry.color ?? "#6366f1"}
            radius={[4, 4, 0, 0]}
            barSize={24}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
