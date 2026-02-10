import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DimensionValue {
  name: string;
  value: number;
}

interface PersonalBarChartProps {
  personalBreakdown: {
    aspiration: DimensionValue;
    intent_to_stay: DimensionValue;
    discretionary_effort: DimensionValue;
    motivation: DimensionValue;
    learning: DimensionValue;
  };
}

const COLORS = [
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#f43f5e', // rose
  '#14b8a6', // teal
  '#06b6d4', // cyan
];

const DIMENSION_KEYS = [
  'aspiration',
  'intent_to_stay',
  'discretionary_effort',
  'motivation',
  'learning',
] as const;

export function PersonalBarChart({ personalBreakdown }: PersonalBarChartProps) {
  const data = DIMENSION_KEYS.map((key) => ({
    name: personalBreakdown[key].name,
    value: Math.round(personalBreakdown[key].value),
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 120, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
        <XAxis type="number" domain={[0, 100]} className="text-gray-600 dark:text-gray-400" />
        <YAxis
          type="category"
          dataKey="name"
          className="text-gray-600 dark:text-gray-400"
          width={110}
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
