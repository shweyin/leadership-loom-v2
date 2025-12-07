import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface LeadershipBarChartProps {
  leadershipBreakdown: {
    leadership_potential_1: number;
    leadership_potential_2: number;
    leadership_potential_3: number;
    leadership_potential_4: number;
    leadership_potential_5: number;
    leadership_potential_6: number;
    leadership_potential_7: number;
  };
}

const DIMENSION_LABELS = [
  'Leading & Deciding',
  'Supporting & Cooperating',
  'Interacting & Presenting',
  'Analyzing & Interpreting',
  'Creating & Conceptualizing',
  'Organizing & Executing',
  'Adapting & Coping',
];

const COLORS = [
  '#ef4444', // red
  '#f97316', // orange
  '#f59e0b', // amber
  '#84cc16', // lime
  '#10b981', // emerald
  '#06b6d4', // cyan
  '#3b82f6', // blue
];

export function LeadershipBarChart({ leadershipBreakdown }: LeadershipBarChartProps) {
  const data = [
    {
      name: DIMENSION_LABELS[0],
      value: leadershipBreakdown.leadership_potential_1 || 0,
      max: 40,
    },
    {
      name: DIMENSION_LABELS[1],
      value: leadershipBreakdown.leadership_potential_2 || 0,
      max: 40,
    },
    {
      name: DIMENSION_LABELS[2],
      value: leadershipBreakdown.leadership_potential_3 || 0,
      max: 40,
    },
    {
      name: DIMENSION_LABELS[3],
      value: leadershipBreakdown.leadership_potential_4 || 0,
      max: 32,
    },
    {
      name: DIMENSION_LABELS[4],
      value: leadershipBreakdown.leadership_potential_5 || 0,
      max: 40,
    },
    {
      name: DIMENSION_LABELS[5],
      value: leadershipBreakdown.leadership_potential_6 || 0,
      max: 40,
    },
    {
      name: DIMENSION_LABELS[6],
      value: leadershipBreakdown.leadership_potential_7 || 0,
      max: 36,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 150, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
        <XAxis type="number" domain={[0, 40]} className="text-gray-600 dark:text-gray-400" />
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
                    Score: {data.value} / {data.max}
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
