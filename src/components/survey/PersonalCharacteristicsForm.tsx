import { QuestionRadio } from './QuestionRadio';
import { Label } from '../ui/label';
import { category3Questions, category3Titles } from '../../constants/proprietary';

interface PersonalCharacteristicsFormProps {
  data: Record<string, string>;
  onChange: (questionId: string, value: string) => void;
}

export function PersonalCharacteristicsForm({ data, onChange }: PersonalCharacteristicsFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{category3Titles.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Assess the employee's learning capabilities and personal characteristics.
        </p>
      </div>

      {/* Radio Questions (Learning) */}
      <div className="space-y-8">
        <h3 className="text-lg font-semibold">Learning Ability</h3>
        {category3Questions.radioQuestions.map((q) => (
          <QuestionRadio
            key={q.question}
            question={q.question}
            effectiveBehavior={q.effectiveBehaviours}
            ineffectiveBehavior={q.ineffectiveBehaviours}
            value={data[q.question]}
            onChange={(value) => onChange(q.question, value)}
          />
        ))}
      </div>

      {/* Yes/No Questions */}
      <div className="space-y-6 mt-12">
        <h3 className="text-lg font-semibold">Personal Attributes</h3>
        {category3Questions.yesNoQuestions.map((q) => (
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
