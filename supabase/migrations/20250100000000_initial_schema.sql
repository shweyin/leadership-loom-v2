-- Create organizations table
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  auth_provider TEXT NOT NULL CHECK (auth_provider IN ('email', 'google')),
  roles TEXT[] NOT NULL DEFAULT ARRAY['user']::TEXT[],
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create survey_results table
CREATE TABLE IF NOT EXISTS public.survey_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  emp_name TEXT NOT NULL,
  emp_id TEXT NOT NULL,
  emp_job_title TEXT NOT NULL,
  experience TEXT,
  licensing TEXT,
  other_experience TEXT,
  leadership_potential JSONB,
  adapt_respond JSONB,
  working_with_people JSONB,
  business_acumen JSONB,
  setting_goals JSONB,
  planning_organizing JSONB,
  strategic_thinking JSONB,
  personal_characteristics JSONB,
  past_performance JSONB,
  total_score INTEGER,
  total_leadership_potential INTEGER,
  total_personal_characteristics INTEGER,
  total_learning INTEGER,
  total_past_performance INTEGER,
  leadership_breakdown JSONB,
  personal_breakdown JSONB,
  past_performance_breakdown JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_organization_id ON public.users(organization_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_survey_results_user_id ON public.survey_results(user_id);
CREATE INDEX IF NOT EXISTS idx_survey_results_emp_id ON public.survey_results(emp_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
DROP TRIGGER IF EXISTS set_updated_at ON public.users;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at ON public.organizations;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at ON public.survey_results;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.survey_results
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
