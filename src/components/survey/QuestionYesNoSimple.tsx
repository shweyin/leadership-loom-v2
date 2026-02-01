import { useRef, useEffect, useCallback } from 'react';
import { Label } from '../ui/label';
import { cn } from '../../lib/utils';

interface QuestionYesNoSimpleProps {
  id: string;
  question: string;
  value?: boolean;
  onChange: (value: boolean) => void;
  className?: string;
  autoFocus?: boolean;
  onAdvance?: () => void;
}

export function QuestionYesNoSimple({
  id,
  question,
  value,
  onChange,
  className,
  autoFocus,
  onAdvance,
}: QuestionYesNoSimpleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus && containerRef.current) {
      containerRef.current.focus();
    }
  }, [autoFocus]);

  const handleSelect = useCallback((answer: boolean) => {
    onChange(answer);
    setTimeout(() => {
      onAdvance?.();
    }, 100);
  }, [onChange, onAdvance]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (key === 'y' || key === '1') {
      e.preventDefault();
      handleSelect(true);
    } else if (key === 'n' || key === '2') {
      e.preventDefault();
      handleSelect(false);
    }
  }, [handleSelect]);

  return (
    <>
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={cn(
          'pb-6 p-4 rounded-lg focus:outline-none focus:border focus:border-gray-400 dark:focus:border-gray-500',
          className
        )}
      >
        <div className="mb-4">
          <h4 className="font-semibold text-base">{question}</h4>
        </div>

        <div className="flex gap-6">
          <Label
            onClick={() => handleSelect(true)}
            className={cn(
              'flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border-2 transition-all',
              value === true
                ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-green-300'
            )}
          >
            <input
              type="radio"
              name={id}
              checked={value === true}
              onChange={() => handleSelect(true)}
              className="w-4 h-4"
              tabIndex={-1}
            />
            <span className={cn(
              'font-medium',
              value === true ? 'text-green-600 dark:text-green-400' : ''
            )}>
              <span className="text-gray-400 mr-1">1.</span>
              Yes
            </span>
          </Label>
          <Label
            onClick={() => handleSelect(false)}
            className={cn(
              'flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border-2 transition-all',
              value === false
                ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-red-300'
            )}
          >
            <input
              type="radio"
              name={id}
              checked={value === false}
              onChange={() => handleSelect(false)}
              className="w-4 h-4"
              tabIndex={-1}
            />
            <span className={cn(
              'font-medium',
              value === false ? 'text-red-600 dark:text-red-400' : ''
            )}>
              <span className="text-gray-400 mr-1">2.</span>
              No
            </span>
          </Label>
        </div>
      </div>
      <hr className="my-6 border-gray-200 dark:border-gray-700" />
    </>
  );
}
