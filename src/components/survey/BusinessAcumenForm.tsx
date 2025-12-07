import { QuestionRadio } from './QuestionRadio';
import { category2x4Questions, category2x4Titles } from '../../constants/proprietary';

interface BusinessAcumenFormProps {
  data: Record<string, string>;
  onChange: (questionId: string, value: string) => void;
}

export function BusinessAcumenForm({ data, onChange }: BusinessAcumenFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{category2x4Titles.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">
          {category2x4Titles.summary}
        </p>
      </div>

      <div className="space-y-8 mt-8">
        {category2x4Questions.map((q) => (
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
