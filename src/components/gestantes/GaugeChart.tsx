import React from 'react';

interface GaugeChartProps {
  label: string;
  done: number;
  total: number;
  color?: string;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({ label, done, total, color = 'hsl(var(--primary))' }) => {
  const remaining = total - done;
  const percentage = total > 0 ? Math.round((done / total) * 100) : 0;

  // SVG gauge arc
  const size = 120;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius; // semicircle
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size / 2 + 16} viewBox={`0 0 ${size} ${size / 2 + 16}`}>
        {/* Background arc */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2 + 4} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2 + 4}`}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Filled arc */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2 + 4} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2 + 4}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-all duration-700"
        />
        {/* Center text */}
        <text
          x={size / 2}
          y={size / 2 - 2}
          textAnchor="middle"
          className="fill-foreground text-lg font-bold"
          fontSize="20"
          fontWeight="700"
        >
          {percentage}%
        </text>
      </svg>
      <p className="text-[13px] font-medium text-foreground text-center">{label}</p>
      <div className="flex items-center gap-3 text-[13px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full" style={{ background: color }} />
          {done} realizadas
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-muted" />
          {remaining} pendentes
        </span>
      </div>
    </div>
  );
};
