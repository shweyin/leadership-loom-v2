import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { SurveyResult } from "../../types/database";

interface ScatterPlotProps {
  surveys: SurveyResult[];
  onEmployeeClick?: (id: string) => void;
}

export function ScatterPlot({ surveys, onEmployeeClick }: ScatterPlotProps) {
  const data = surveys.map((survey) => ({
    id: survey.id,
    name: new Date(survey.created_at).toLocaleDateString(),
    x: survey.total_leadership_potential || 0,
    y: survey.total_score || 0,
  }));

  // Define colors based on position
  const getColor = (x: number, y: number) => {
    if (x >= 186 && y >= 200) return "#10b981"; // Green - High potential, high performance
    if (x >= 186) return "#3b82f6"; // Blue - High potential
    if (y >= 200) return "#f59e0b"; // Orange - High performance
    return "#6b7280"; // Gray - Developing
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          className="stroke-gray-300 dark:stroke-gray-700"
        />
        <XAxis
          type="number"
          dataKey="x"
          name="Leadership Potential"
          domain={[0, 280]}
          label={{
            value: "Leadership Potential",
            position: "insideBottom",
            offset: -10,
          }}
          className="text-gray-600 dark:text-gray-400"
        />
        <YAxis
          type="number"
          dataKey="y"
          name="Total Score"
          domain={[0, 300]}
          label={{ value: "Total Score", angle: -90, position: "insideLeft" }}
          className="text-gray-600 dark:text-gray-400"
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-lg">
                  <p className="text-md font-semibold">{data.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Leadership: {data.x}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Score: {data.y}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Scatter
          data={data}
          onClick={(data) => onEmployeeClick && onEmployeeClick(data.id)}
          className="cursor-pointer"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.x, entry.y)} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}
