import { useRef, useEffect, useCallback } from 'react';
import { Label } from '../ui/label';
import { cn } from '../../lib/utils';

interface QuestionSelectProps {
  id: string;
  question: string;
  options: string[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  autoFocus?: boolean;
  onAdvance?: () => void;
}

export function QuestionSelect({
  id,
  question,
  options,
  value,
  onChange,
  className,
  autoFocus,
  onAdvance,
}: QuestionSelectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus && containerRef.current) {
      containerRef.current.focus();
    }
  }, [autoFocus]);

  const handleSelect = useCallback((option: string) => {
    onChange(option);
    setTimeout(() => {
      onAdvance?.();
    }, 100);
  }, [onChange, onAdvance]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const key = e.key;
    const num = parseInt(key, 10);
    if (num >= 1 && num <= options.length) {
      e.preventDefault();
      handleSelect(options[num - 1]);
    }
  }, [options, handleSelect]);

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

        <div className="flex flex-wrap gap-3">
          {options.map((option, index) => {
            const isSelected = value === option;
            return (
              <Label
                key={option}
                onClick={() => handleSelect(option)}
                className={cn(
                  'flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border-2 transition-all',
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                )}
              >
                <input
                  type="radio"
                  name={id}
                  value={option}
                  checked={isSelected}
                  onChange={() => handleSelect(option)}
                  className="w-4 h-4"
                  tabIndex={-1}
                />
                <span className={cn(
                  'font-medium',
                  isSelected ? 'text-blue-600 dark:text-blue-400' : ''
                )}>
                  <span className="text-gray-400 mr-1">{index + 1}.</span>
                  {option}
                </span>
              </Label>
            );
          })}
        </div>
      </div>
      <hr className="my-6 border-gray-200 dark:border-gray-700" />
    </>
  );
}
