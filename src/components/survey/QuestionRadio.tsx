import { useRef, useEffect, useCallback } from 'react';
import { Label } from '../ui/label';
import { cn } from '../../lib/utils';

interface QuestionRadioProps {
  question: string;
  effectiveBehavior: string;
  ineffectiveBehavior: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  autoFocus?: boolean;
  onAdvance?: () => void;
}

export function QuestionRadio({
  question,
  effectiveBehavior,
  ineffectiveBehavior,
  value,
  onChange,
  className,
  autoFocus,
  onAdvance,
}: QuestionRadioProps) {
  const options = [1, 2, 3, 4, 5, 6];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus && containerRef.current) {
      containerRef.current.focus();
    }
  }, [autoFocus]);

  const handleSelect = useCallback((num: number) => {
    const optionValue = `${question}-${num}`;
    onChange(optionValue);
    // Auto-advance to next question after selection
    setTimeout(() => {
      onAdvance?.();
    }, 100);
  }, [question, onChange, onAdvance]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const num = parseInt(e.key, 10);
    if (num >= 1 && num <= 6) {
      e.preventDefault();
      handleSelect(num);
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
        {/* Question behaviors */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="text-red-600 dark:text-red-400">
            <span className="font-semibold">Ineffective: </span>
            {ineffectiveBehavior}
          </div>
          <div className="text-green-600 dark:text-green-400">
            <span className="font-semibold">Effective: </span>
            {effectiveBehavior}
          </div>
        </div>

        {/* Radio buttons */}
        <div className="flex items-center justify-center gap-4">
          {options.map((num) => {
            const optionValue = `${question}-${num}`;
            const isSelected = value === optionValue;

            return (
              <div key={num} className="flex flex-col items-center">
                <Label
                  htmlFor={optionValue}
                  onClick={() => handleSelect(num)}
                  className={cn(
                    'flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border-2 transition-all',
                    isSelected
                      ? 'border-orange-500 bg-orange-500 text-white shadow-lg scale-110'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-orange-400 hover:scale-105'
                  )}
                >
                  {num}
                </Label>
                <input
                  type="radio"
                  id={optionValue}
                  name={question}
                  value={optionValue}
                  checked={isSelected}
                  onChange={() => handleSelect(num)}
                  className="sr-only"
                  tabIndex={-1}
                />
              </div>
            );
          })}
        </div>

        {/* Scale labels */}
        <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Ineffective</span>
          <span>Effective</span>
        </div>
      </div>
      <hr className="my-6 border-gray-200 dark:border-gray-700" />
    </>
  );
}
