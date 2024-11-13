"use client";

import { XAxis as RechartsXAxis, YAxis as RechartsYAxis } from 'recharts';

interface AxisProps {
  dataKey?: string;
  tickFormatter?: (value: any) => string;
  domain?: [number, number];
  scale?: "auto" | "linear" | "pow" | "sqrt" | "log" | "identity" | "time" | "band" | "point" | "ordinal" | "quantile" | "quantize" | "utc" | "sequential" | "threshold";
  type?: "number" | "category";
  allowDataOverflow?: boolean;
  padding?: { left?: number; right?: number };
  xAxisId?: string;
  yAxisId?: string;
}

export function XAxis({
  dataKey = "",
  scale = "point",
  type = "category",
  allowDataOverflow = false,
  padding = { left: 10, right: 10 },
  xAxisId = "main",
  ...props
}: AxisProps) {
  return (
    <RechartsXAxis
      dataKey={dataKey}
      scale={scale}
      type={type}
      allowDataOverflow={allowDataOverflow}
      padding={padding}
      xAxisId={xAxisId}
      stroke="hsl(var(--muted-foreground))"
      fill="hsl(var(--muted-foreground))"
      axisLine={{ stroke: "hsl(var(--border))" }}
      tickLine={{ stroke: "hsl(var(--border))" }}
      {...props}
    />
  );
}

export function YAxis({
  tickFormatter = (value) => `${value}`,
  domain = [0, 100],
  scale = "linear",
  type = "number",
  allowDataOverflow = false,
  yAxisId = "main",
  ...props
}: AxisProps) {
  return (
    <RechartsYAxis
      tickFormatter={tickFormatter}
      domain={domain}
      scale={scale}
      type={type}
      allowDataOverflow={allowDataOverflow}
      yAxisId={yAxisId}
      stroke="hsl(var(--muted-foreground))"
      fill="hsl(var(--muted-foreground))"
      axisLine={{ stroke: "hsl(var(--border))" }}
      tickLine={{ stroke: "hsl(var(--border))" }}
      {...props}
    />
  );
}