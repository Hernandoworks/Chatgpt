"use client";

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  formatValue?: (v: number) => string;
}

export function PieChart({ data, height = 200, innerRadius = 50, outerRadius = 80, formatValue }: PieChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              backdropFilter: "blur(16px)",
              fontSize: "12px",
            }}
            formatter={(value: number) => [
              formatValue?.(value) ?? `${((value / total) * 100).toFixed(1)}%`,
              "",
            ]}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="text-lg font-bold text-surface-100">
            {formatValue?.(total) ?? `$${(total / 1000000).toFixed(1)}M`}
          </p>
          <p className="text-[10px] text-surface-500">Total</p>
        </div>
      </div>
    </div>
  );
}
