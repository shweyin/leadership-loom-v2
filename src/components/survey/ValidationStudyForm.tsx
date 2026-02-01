import { useCallback } from 'react';
import { QuestionSelect } from './QuestionSelect';
import { QuestionYesNoSimple } from './QuestionYesNoSimple';
import {
  validationStudyTitles,
  validationStudySelectQuestions,
  validationStudyYesNoQuestions,
} from '../../constants/validationStudy';
import type { ValidationStudyFormData } from '../../services/evaluate';

export type { ValidationStudyFormData as ValidationStudyFormData };

interface ValidationStudyFormProps {
  data: ValidationStudyFormData;
  onChange: <K extends keyof ValidationStudyFormData>(field: K, value: ValidationStudyFormData[K]) => void;
}

export function ValidationStudyForm({ data, onChange }: ValidationStudyFormProps) {
  const totalSelectQuestions = validationStudySelectQuestions.length;
  const totalYesNoQuestions = validationStudyYesNoQuestions.length;

  const advanceFromSelect = useCallback(
    (index: number) => {
      if (index < totalSelectQuestions - 1) {
        const nextElement = document.querySelector(
          `[data-select-index="${index + 1}"]`
        ) as HTMLElement;
        nextElement?.focus();
      } else if (totalYesNoQuestions > 0) {
        const nextElement = document.querySelector(
          `[data-yesno-index="0"]`
        ) as HTMLElement;
        nextElement?.focus();
      }
    },
    [totalSelectQuestions, totalYesNoQuestions]
  );

  const advanceFromYesNo = useCallback(
    (index: number) => {
      if (index < totalYesNoQuestions - 1) {
        const nextElement = document.querySelector(
          `[data-yesno-index="${index + 1}"]`
        ) as HTMLElement;
        nextElement?.focus();
      }
    },
    [totalYesNoQuestions]
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{validationStudyTitles.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">
          {validationStudyTitles.summary}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          Press number keys to select options
        </p>
      </div>

      <div className="space-y-2 mt-8">
        {validationStudySelectQuestions.map((q, index) => (
          <div key={q.id} data-select-index={index}>
            <QuestionSelect
              id={q.id}
              question={q.question}
              options={q.options}
              value={data[q.id as keyof ValidationStudyFormData] as string}
              onChange={(value) => onChange(q.id as keyof ValidationStudyFormData, value as any)}
              autoFocus={index === 0}
              onAdvance={() => advanceFromSelect(index)}
            />
          </div>
        ))}
      </div>

      <div className="space-y-2 mt-8">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Press Y or 1 for Yes, N or 2 for No
        </p>
        {validationStudyYesNoQuestions.map((q, index) => (
          <div key={q.id} data-yesno-index={index}>
            <QuestionYesNoSimple
              id={q.id}
              question={q.question}
              value={data[q.id as keyof ValidationStudyFormData] as boolean | undefined}
              onChange={(value) => onChange(q.id as keyof ValidationStudyFormData, value as any)}
              onAdvance={() => advanceFromYesNo(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
