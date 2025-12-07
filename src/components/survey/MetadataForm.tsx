import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface MetadataFormProps {
  data: {
    empname: string;
    empid: string;
    empjobtitle: string;
  };
  onChange: (field: string, value: string) => void;
}

export function MetadataForm({ data, onChange }: MetadataFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Employee Information</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please provide the basic information for the employee being evaluated.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="empname">Employee Name *</Label>
          <Input
            id="empname"
            type="text"
            placeholder="Full Name"
            value={data.empname}
            onChange={(e) => onChange('empname', e.target.value)}
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="empid">Employee ID *</Label>
          <Input
            id="empid"
            type="text"
            placeholder="Employee ID"
            value={data.empid}
            onChange={(e) => onChange('empid', e.target.value)}
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="empjobtitle">Job Title *</Label>
          <Input
            id="empjobtitle"
            type="text"
            placeholder="Current Position"
            value={data.empjobtitle}
            onChange={(e) => onChange('empjobtitle', e.target.value)}
            className="mt-1"
            required
          />
        </div>
      </div>
    </div>
  );
}
