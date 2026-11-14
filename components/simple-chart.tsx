export interface ChartPoint {
  label: string;
  value: number;
}

export function SimpleBarChart({
  title,
  points,
  color = "var(--brand-blue)",
}: {
  title: string;
  points: ChartPoint[];
  color?: string;
}) {
  const width = 720;
  const height = 270;
  const left = 38;
  const right = 18;
  const top = 18;
  const bottom = 75;
  const chartHeight = height - top - bottom;
  const chartWidth = width - left - right;
  const maximum = Math.max(1, ...points.map((point) => point.value));
  const slot = chartWidth / Math.max(points.length, 1);
  const barWidth = Math.min(42, slot * 0.58);

  return (
    <figure className="min-w-0">
      <figcaption className="mb-4 text-sm font-bold text-[var(--navy)]">
        {title}
      </figcaption>
      <svg
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label={title}
        viewBox={`0 0 ${width} ${height}`}
      >
        <line
          x1={left}
          y1={top + chartHeight}
          x2={width - right}
          y2={top + chartHeight}
          stroke="#dbe2ea"
          strokeWidth="1"
        />
        {points.map((point, index) => {
          const barHeight = (point.value / maximum) * chartHeight;
          const x = left + index * slot + (slot - barWidth) / 2;
          const y = top + chartHeight - barHeight;
          const label =
            point.label.length > 18 ? `${point.label.slice(0, 17)}…` : point.label;
          return (
            <g key={`${point.label}-${index}`}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={Math.max(barHeight, point.value ? 2 : 0)}
                rx="6"
                fill={color}
                opacity="0.9"
              />
              <text
                x={x + barWidth / 2}
                y={Math.max(y - 7, top + 8)}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="#334155"
              >
                {point.value}
              </text>
              <text
                x={x + barWidth / 2}
                y={top + chartHeight + 20}
                textAnchor="middle"
                fontSize="9"
                fill="#64748b"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
