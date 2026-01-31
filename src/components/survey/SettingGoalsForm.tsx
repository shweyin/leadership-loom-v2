import { useCallback } from 'react';
import { QuestionRadio } from './QuestionRadio';
import { category2x5Questions, category2x5Titles } from '../../constants/proprietary';

interface SettingGoalsFormProps {
  data: Record<string, string>;
  onChange: (questionId: string, value: string) => void;
}

export function SettingGoalsForm({ data, onChange }: SettingGoalsFormProps) {
  const totalQuestions = category2x5Questions.length;

  const advanceToNext = useCallback((index: number) => {
    if (index < totalQuestions - 1) {
      const nextElement = document.querySelector(`[data-question-index="${index + 1}"]`) as HTMLElement;
      nextElement?.focus();
    }
  }, [totalQuestions]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{category2x5Titles.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">
          {category2x5Titles.summary}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          Press 1-6 to select
        </p>
      </div>

      <div className="space-y-8 mt-8">
        {category2x5Questions.map((q, index) => (
          <div key={q.question} data-question-index={index}>
            <QuestionRadio
              question={q.question}
              effectiveBehavior={q.effectiveBehaviours}
              ineffectiveBehavior={q.ineffectiveBehaviours}
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
