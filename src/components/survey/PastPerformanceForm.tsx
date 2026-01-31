import { useCallback } from 'react';
import { QuestionYesNo } from './QuestionYesNo';
import { category4Questions, category4Titles } from '../../constants/proprietary';

interface PastPerformanceFormProps {
  data: Record<string, string>;
  onChange: (questionId: string, value: string) => void;
}

export function PastPerformanceForm({ data, onChange }: PastPerformanceFormProps) {
  const totalQuestions = category4Questions.length;

  const advanceToNext = useCallback((index: number) => {
    if (index < totalQuestions - 1) {
      const nextElement = document.querySelector(`[data-question-index="${index + 1}"]`) as HTMLElement;
      nextElement?.focus();
    }
  }, [totalQuestions]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{category4Titles.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Evaluate the employee's past performance and development.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          Press Y or 1 for Yes, N or 2 for No
        </p>
      </div>

      <div className="space-y-6">
        {category4Questions.map((q, index) => (
          <div key={q.question} data-question-index={index}>
            <QuestionYesNo
              question={q.question}
              descriptor={q.descriptor}
              criteria={q.criteria}
              value={data[q.question]}
              onChange={(value) => onChange(q.question, value)}
              autoFocus={index === 0}
              onAdvance={() => advanceToNext(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
