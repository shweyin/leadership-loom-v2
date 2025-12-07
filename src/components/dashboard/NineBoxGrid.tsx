import { matrixData } from '../../constants/proprietary';
import type { SurveyResult } from '../../types/database';

interface NineBoxGridProps {
  surveys?: SurveyResult[];
}

export function NineBoxGrid({ surveys = [] }: NineBoxGridProps) {
  // Calculate position in 9-box grid based on scores
  const getGridPosition = (leadershipPotential: number, totalScore: number) => {
    // X-axis: Leadership Potential (0-280) -> Low (0-93), Medium (94-186), High (187-280)
    // Y-axis: Total Score (0-300) -> Low (0-100), Medium (101-200), High (201-300)

    let x = 0; // 0=Low, 1=Medium, 2=High
    if (leadershipPotential >= 187) x = 2;
    else if (leadershipPotential >= 94) x = 1;

    let y = 0; // 0=Low, 1=Medium, 2=High
    if (totalScore >= 201) y = 2;
    else if (totalScore >= 101) y = 1;

    return { x, y };
  };

  // Map grid positions to matrix data indices
  const gridMapping = [
    [6, 7, 8], // Bottom row (Low performance)
    [3, 4, 5], // Middle row (Medium performance)
    [0, 1, 2], // Top row (High performance)
  ];

  // Count employees in each box
  const boxCounts: number[][] = [[0,0,0], [0,0,0], [0,0,0]];
  surveys.forEach(survey => {
    const pos = getGridPosition(
      survey.total_leadership_potential || 0,
      survey.total_score || 0
    );
    boxCounts[2 - pos.y][pos.x]++; // Invert Y for display
  });

  return (
    <div className="w-full">
      {/* Axis Labels */}
      <div className="flex mb-2">
        <div className="w-24"></div>
        <div className="flex-1 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
          Leadership Potential →
        </div>
      </div>

      <div className="flex">
        {/* Y-axis label */}
        <div className="w-24 flex items-center justify-center">
          <div className="transform -rotate-90 text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
            Performance →
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 grid grid-cols-3 gap-2">
          {gridMapping.map((row, rowIndex) => (
            row.map((dataIndex, colIndex) => {
              const box = matrixData[dataIndex];
              const count = boxCounts[rowIndex][colIndex];

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors relative group"
                >
                  <div className="font-semibold text-sm mb-1">{box.title}</div>
                  {count > 0 && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {count}
                    </div>
                  )}
                  <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 group-hover:line-clamp-none">
                    {box.definition}
                  </div>
                </div>
              );
            })
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-gray-600 dark:text-gray-400">
        <div className="text-center">Low</div>
        <div className="text-center">Medium</div>
        <div className="text-center">High</div>
      </div>
    </div>
  );
}
