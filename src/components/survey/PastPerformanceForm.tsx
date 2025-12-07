import { Label } from '../ui/label';
import { category4Questions, category4Titles } from '../../constants/proprietary';

interface PastPerformanceFormProps {
  data: Record<string, string>;
  onChange: (questionId: string, value: string) => void;
}

export function PastPerformanceForm({ data, onChange }: PastPerformanceFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{category4Titles.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Evaluate the employee's past performance and development.
        </p>
      </div>

      <div className="space-y-6">
        {category4Questions.map((q) => (
          <div key={q.question} className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <div className="mb-4">
              <h4 className="font-semibold text-base mb-2">{q.descriptor}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{q.criteria}</p>
            </div>
            <div className="flex gap-6">
              <Label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={q.question}
                  value={`${q.question}-Yes`}
                  checked={data[q.question] === `${q.question}-Yes`}
                  onChange={() => onChange(q.question, `${q.question}-Yes`)}
                  className="w-4 h-4"
                />
                <span className="text-green-600 dark:text-green-400 font-medium">Yes</span>
              </Label>
              <Label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={q.question}
                  value={`${q.question}-No`}
                  checked={data[q.question] === `${q.question}-No`}
                  onChange={() => onChange(q.question, `${q.question}-No`)}
                  className="w-4 h-4"
                />
                <span className="text-red-600 dark:text-red-400 font-medium">No</span>
              </Label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
