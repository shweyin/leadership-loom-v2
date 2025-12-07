import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { category1Titles } from '../../constants/proprietary';

interface ExperienceFormProps {
  data: {
    experience: string;
    licensing: string;
    other: string;
  };
  onChange: (field: string, value: string) => void;
}

export function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Experience & Credentials</h2>
        <p className="text-gray-600 dark:text-gray-400">
          {category1Titles.summary}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="experience" className="text-base font-semibold">
            {category1Titles.experience1}
          </Label>
          <Textarea
            id="experience"
            placeholder="Describe relevant work experience..."
            value={data.experience}
            onChange={(e) => onChange('experience', e.target.value)}
            className="mt-2 min-h-[100px]"
          />
        </div>

        <div>
          <Label htmlFor="licensing" className="text-base font-semibold">
            {category1Titles.experience2}
          </Label>
          <Textarea
            id="licensing"
            placeholder="List any licenses, certifications, or credentials..."
            value={data.licensing}
            onChange={(e) => onChange('licensing', e.target.value)}
            className="mt-2 min-h-[100px]"
          />
        </div>

        <div>
          <Label htmlFor="other" className="text-base font-semibold">
            {category1Titles.experience3}
          </Label>
          <Textarea
            id="other"
            placeholder="Any other relevant information..."
            value={data.other}
            onChange={(e) => onChange('other', e.target.value)}
            className="mt-2 min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
}
