import { useState, useEffect } from 'react';
import { defaultState } from '../services/evaluate';

interface SurveyDraft {
  step: number;
  surveyData: any;
  timestamp: number;
}

const STORAGE_KEY = 'survey-draft';
const DRAFT_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export function useSurveyProgress() {
  const [step, setStep] = useState(0);
  const [surveyData, setSurveyData] = useState(defaultState);
  const [completion, setCompletion] = useState(0);

  // Restore from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const draft: SurveyDraft = JSON.parse(saved);

        // Only restore if less than 24 hours old
        if (Date.now() - draft.timestamp < DRAFT_EXPIRY) {
          setSurveyData(draft.surveyData);
          setStep(draft.step);
        } else {
          // Clear expired draft
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        console.error('Error restoring survey draft:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Auto-save to localStorage whenever data changes
  useEffect(() => {
    const draft: SurveyDraft = {
      step,
      surveyData,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [step, surveyData]);

  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateSurveyData = (updates: Partial<typeof defaultState>) => {
    setSurveyData((prev: any) => ({
      ...prev,
      ...updates,
    }));
  };

  return {
    step,
    setStep,
    surveyData,
    setSurveyData,
    updateSurveyData,
    completion,
    setCompletion,
    clearDraft,
  };
}
