import { useRef, useEffect, useCallback } from 'react';
import { Label } from '../ui/label';
import { cn } from '../../lib/utils';

interface QuestionYesNoProps {
  question: string;
  descriptor: string;
  criteria: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  autoFocus?: boolean;
  onAdvance?: () => void;
}

export function QuestionYesNo({
  question,
  descriptor,
  criteria,
  value,
  onChange,
  className,
  autoFocus,
  onAdvance,
}: QuestionYesNoProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus && containerRef.current) {
      containerRef.current.focus();
    }
  }, [autoFocus]);

  const handleSelect = useCallback((answer: 'Yes' | 'No') => {
    onChange(`${question}-${answer}`);
    // Auto-advance to next question after selection
    setTimeout(() => {
      onAdvance?.();
    }, 100);
  }, [question, onChange, onAdvance]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (key === 'y' || key === '1') {
      e.preventDefault();
      handleSelect('Yes');
    } else if (key === 'n' || key === '2') {
      e.preventDefault();
      handleSelect('No');
    }
  }, [handleSelect]);

  const isYesSelected = value === `${question}-Yes`;
  const isNoSelected = value === `${question}-No`;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={cn(
        'border-b border-gray-200 dark:border-gray-700 pb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2',
        className
      )}
    >
      <div className="mb-4">
        <h4 className="font-semibold text-base mb-2">{descriptor}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{criteria}</p>
      </div>

      {/* Keyboard hint */}
      <div className="mb-2 text-xs text-gray-400 dark:text-gray-500">
        Press Y or 1 for Yes, N or 2 for No
      </div>

      <div className="flex gap-6">
        <Label
          onClick={() => handleSelect('Yes')}
          className={cn(
            'flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border-2 transition-all',
            isYesSelected
              ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
              : 'border-transparent hover:border-green-300'
          )}
        >
          <input
            type="radio"
            name={question}
            value={`${question}-Yes`}
            checked={isYesSelected}
            onChange={() => handleSelect('Yes')}
            className="w-4 h-4"
            tabIndex={-1}
          />
          <span className="text-green-600 dark:text-green-400 font-medium">Yes</span>
        </Label>
        <Label
          onClick={() => handleSelect('No')}
          className={cn(
            'flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border-2 transition-all',
            isNoSelected
              ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
              : 'border-transparent hover:border-red-300'
          )}
        >
          <input
            type="radio"
            name={question}
            value={`${question}-No`}
            checked={isNoSelected}
            onChange={() => handleSelect('No')}
            className="w-4 h-4"
            tabIndex={-1}
          />
          <span className="text-red-600 dark:text-red-400 font-medium">No</span>
        </Label>
      </div>
    </div>
  );
}
