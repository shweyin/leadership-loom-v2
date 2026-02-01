import { supabase } from '../lib/supabase';
import type { SurveyResult } from '../types/database';

export async function getAllSurveyResults(): Promise<SurveyResult[]> {
  const { data, error } = await supabase
    .from('survey_results')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getSurveyById(id: string): Promise<(SurveyResult & { user: { name: string; email: string } | null }) | null> {
  const { data, error } = await supabase
    .from('survey_results')
    .select('*, user:users!user_id(name, email)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function getUserSurveys(userId: string): Promise<SurveyResult[]> {
  const { data, error } = await supabase
    .from('survey_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function deleteSurvey(id: string): Promise<void> {
  const { error } = await supabase
    .from('survey_results')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
