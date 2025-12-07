// Database types - will be generated from Supabase once project is set up
// For now, manual definitions based on schema

export interface User {
  id: string;
  name: string;
  email: string;
  organization_id: string | null;
  auth_provider: 'email' | 'google';
  roles: string[];
  created_at: string;
  updated_at: string;
}

export interface Organization {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface SurveyResult {
  id: string;
  user_id: string;
  emp_name: string;
  emp_id: string;
  emp_job_title: string;
  experience: string | null;
  licensing: string | null;
  other_experience: string | null;
  leadership_potential: Record<string, string> | null;
  adapt_respond: Record<string, string> | null;
  working_with_people: Record<string, string> | null;
  business_acumen: Record<string, string> | null;
  setting_goals: Record<string, string> | null;
  planning_organizing: Record<string, string> | null;
  strategic_thinking: Record<string, string> | null;
  personal_characteristics: Record<string, string> | null;
  past_performance: Record<string, string> | null;
  total_score: number | null;
  total_leadership_potential: number | null;
  total_personal_characteristics: number | null;
  total_learning: number | null;
  total_past_performance: number | null;
  leadership_breakdown: any | null;
  personal_breakdown: any | null;
  past_performance_breakdown: any | null;
  created_at: string;
  updated_at: string;
}
