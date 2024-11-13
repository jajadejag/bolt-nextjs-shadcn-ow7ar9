"use client";

import { XAxis as RechartsXAxis, YAxis as RechartsYAxis } from 'recharts';

interface AxisProps {
  dataKey?: string;
  stroke?: string;
  tick?: {
    fill: string;
  };
  tickLine?: boolean;
  axisLine?: boolean;
  domain?: [number | 'auto', number | 'auto'];
  orientation?: 'left' | 'right';
}

export function CustomXAxis({ 
  dataKey = "", 
  stroke = "hsl(var(--muted-foreground))",
  tick = { fill: "hsl(var(--muted-foreground))" },
  tickLine = false,
  axisLine = true,
  ...props 
}: AxisProps) {
  return (
    <RechartsXAxis
      dataKey={dataKey}
      stroke={stroke}
      tick={tick}
      tickLine={tickLine}
      axisLine={axisLine}
      {...props}
    />
  );
}

export function CustomYAxis({ 
  stroke = "hsl(var(--muted-foreground))",
  tick = { fill: "hsl(var(--muted-foreground))" },
  tickLine = false,
  axisLine = true,
  orientation = 'left',
  domain = [0, 'auto'],
  ...props 
}: AxisProps) {
  return (
    <RechartsYAxis
      stroke={stroke}
      tick={tick}
      tickLine={tickLine}
      axisLine={axisLine}
      orientation={orientation}
      domain={domain}
      {...props}
    />
  );
}