import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { ValidationStudyFormData } from '../services/evaluate';

export function useValidationStudyStatus() {
  const { user } = useAuth();
  const [isCompleted, setIsCompleted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkStatus() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      // Reset loading state when user becomes available (handles race condition
      // where user was initially null during auth loading)
      setIsLoading(true);

      try {
        const { data, error } = await supabase
          .from('validation_study')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error checking validation study status:', error);
          setIsCompleted(false);
        } else {
          setIsCompleted(data !== null);
        }
      } catch (err) {
        console.error('Error checking validation study status:', err);
        setIsCompleted(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkStatus();
  }, [user]);

  const submitValidationStudy = async (data: ValidationStudyFormData): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await supabase.from('validation_study').insert({
        user_id: user.id,
        role_level: data.role_level,
        years_experience: data.years_experience,
        years_leadership: data.years_leadership,
        direct_reports: data.direct_reports,
        org_size: data.org_size,
        org_sector: data.org_sector,
        geographic_region: data.geographic_region,
        education_level: data.education_level,
        previous_assessment: data.previous_assessment,
        primary_language: data.primary_language,
        voluntary_participation: data.voluntary_participation,
        data_consent: data.data_consent,
      });

      if (error) {
        console.error('Error submitting validation study:', error);
        return false;
      }

      setIsCompleted(true);
      return true;
    } catch (err) {
      console.error('Error submitting validation study:', err);
      return false;
    }
  };

  return {
    isCompleted,
    isLoading,
    submitValidationStudy,
  };
}
