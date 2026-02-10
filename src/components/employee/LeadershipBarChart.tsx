import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DimensionValue {
  name: string;
  value: number;
}

interface LeadershipBarChartProps {
  leadershipBreakdown: {
    leadership: DimensionValue;
    adapt: DimensionValue;
    working_with_people: DimensionValue;
    business_acumen: DimensionValue;
    setting_goals_and_deliver_results: DimensionValue;
    planning_and_organizing: DimensionValue;
    strategic_thinking_and_action: DimensionValue;
  };
}

const COLORS = [
  '#ef4444', // red
  '#f97316', // orange
  '#f59e0b', // amber
  '#84cc16', // lime
  '#10b981', // emerald
  '#06b6d4', // cyan
  '#3b82f6', // blue
];

const DIMENSION_KEYS = [
  'leadership',
  'adapt',
  'working_with_people',
  'business_acumen',
  'setting_goals_and_deliver_results',
  'planning_and_organizing',
  'strategic_thinking_and_action',
] as const;

export function LeadershipBarChart({ leadershipBreakdown }: LeadershipBarChartProps) {
  const data = DIMENSION_KEYS.map((key) => ({
    name: leadershipBreakdown[key].name,
    value: Math.round(leadershipBreakdown[key].value),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 150, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
        <XAxis type="number" domain={[0, 100]} className="text-gray-600 dark:text-gray-400" />
        <YAxis
          type="category"
          dataKey="name"
          className="text-gray-600 dark:text-gray-400"
          width={140}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-lg">
                  <p className="font-semibold">{data.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Score: {data.value}%
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
