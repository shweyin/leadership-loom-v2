import { useCallback } from "react";
import { QuestionRadio } from "./QuestionRadio";
import { QuestionYesNo } from "./QuestionYesNo";
import {
  category3Questions,
  category3Titles,
} from "../../constants/proprietary";

interface PersonalCharacteristicsFormProps {
  data: Record<string, string>;
  onChange: (questionId: string, value: string) => void;
}

export function PersonalCharacteristicsForm({
  data,
  onChange,
}: PersonalCharacteristicsFormProps) {
  const totalRadioQuestions = category3Questions.radioQuestions.length;
  const totalYesNoQuestions = category3Questions.yesNoQuestions.length;

  const advanceFromRadio = useCallback(
    (index: number) => {
      if (index < totalRadioQuestions - 1) {
        // Move to next radio question
        const nextElement = document.querySelector(
          `[data-radio-index="${index + 1}"]`,
        ) as HTMLElement;
        nextElement?.focus();
      } else if (totalYesNoQuestions > 0) {
        // Move to first yes/no question
        const nextElement = document.querySelector(
          `[data-yesno-index="0"]`,
        ) as HTMLElement;
        nextElement?.focus();
      }
    },
    [totalRadioQuestions, totalYesNoQuestions],
  );

  const advanceFromYesNo = useCallback(
    (index: number) => {
      if (index < totalYesNoQuestions - 1) {
        // Move to next yes/no question
        const nextElement = document.querySelector(
          `[data-yesno-index="${index + 1}"]`,
        ) as HTMLElement;
        nextElement?.focus();
      }
    },
    [totalYesNoQuestions],
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{category3Titles.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Assess the employee's learning capabilities and personal
          characteristics.
        </p>
      </div>

      {/* Radio Questions (Learning) */}
      <div className="space-y-8">
        <h3 className="text-lg font-semibold">Learning Ability</h3>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Press 1-6 to select
        </p>
        {category3Questions.radioQuestions.map((q, index) => (
          <div key={q.question} data-radio-index={index}>
            <QuestionRadio
              question={q.question}
              effectiveBehavior={q.effectiveBehaviours}
              ineffectiveBehavior={q.ineffectiveBehaviours}
              value={data[q.question]}
              onChange={(value) => onChange(q.question, value)}
              autoFocus={index === 0}
              onAdvance={() => advanceFromRadio(index)}
            />
          </div>
        ))}
      </div>

      {/* Yes/No Questions */}
      <div className="space-y-6 mt-12">
        <h3 className="text-lg font-semibold">Personal Attributes</h3>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Press Y or 1 for Yes, N or 2 for No
        </p>
        {category3Questions.yesNoQuestions.map((q, index) => (
          <div key={q.question} data-yesno-index={index}>
            <QuestionYesNo
              question={q.question}
              descriptor={q.descriptor}
              criteria={q.criteria}
              value={data[q.question]}
              onChange={(value) => onChange(q.question, value)}
              onAdvance={() => advanceFromYesNo(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
