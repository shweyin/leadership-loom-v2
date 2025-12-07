import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PersonalBarChartProps {
  personalBreakdown: {
    personal_1: number;
    personal_2: number;
    personal_3: number;
    personal_4: number;
    personal_5: number;
    personal_6: number;
    personal_yes_no: number;
  };
}

const PERSONAL_LABELS = [
  'Persuasive',
  'Conscientious',
  'Self-Confident',
  'Outgoing',
  'Data Rational',
  'Emotional Control',
  'Learning Agility',
];

const COLORS = [
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#f43f5e', // rose
  '#14b8a6', // teal
  '#06b6d4', // cyan
  '#6366f1', // indigo
  '#a855f7', // purple
];

export function PersonalBarChart({ personalBreakdown }: PersonalBarChartProps) {
  const data = [
    {
      name: PERSONAL_LABELS[0],
      value: personalBreakdown.personal_1 || 0,
      max: 24,
    },
    {
      name: PERSONAL_LABELS[1],
      value: personalBreakdown.personal_2 || 0,
      max: 24,
    },
    {
      name: PERSONAL_LABELS[2],
      value: personalBreakdown.personal_3 || 0,
      max: 24,
    },
    {
      name: PERSONAL_LABELS[3],
      value: personalBreakdown.personal_4 || 0,
      max: 24,
    },
    {
      name: PERSONAL_LABELS[4],
      value: personalBreakdown.personal_5 || 0,
      max: 24,
    },
    {
      name: PERSONAL_LABELS[5],
      value: personalBreakdown.personal_6 || 0,
      max: 24,
    },
    {
      name: PERSONAL_LABELS[6],
      value: personalBreakdown.personal_yes_no || 0,
      max: 50,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 120, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
        <XAxis type="number" domain={[0, 50]} className="text-gray-600 dark:text-gray-400" />
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
