import { QuestionRadio } from './QuestionRadio';
import { category2x2Questions, category2x2Titles } from '../../constants/proprietary';

interface AdaptFormProps {
  data: Record<string, string>;
  onChange: (questionId: string, value: string) => void;
}

export function AdaptForm({ data, onChange }: AdaptFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{category2x2Titles.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">
          {category2x2Titles.summary}
        </p>
      </div>

      <div className="space-y-8 mt-8">
        {category2x2Questions.map((q) => (
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
    </div>
  );
}
