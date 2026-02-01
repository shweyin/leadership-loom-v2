-- Create validation_study table for one-time demographic/validation questions
CREATE TABLE IF NOT EXISTS public.validation_study (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  role_level TEXT NOT NULL,
  years_experience TEXT NOT NULL,
  years_leadership TEXT NOT NULL,
  direct_reports TEXT NOT NULL,
  org_size TEXT NOT NULL,
  org_sector TEXT NOT NULL,
  geographic_region TEXT NOT NULL,
  education_level TEXT NOT NULL,
  previous_assessment BOOLEAN NOT NULL,
  primary_language BOOLEAN NOT NULL,
  voluntary_participation BOOLEAN NOT NULL,
  data_consent BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create index for user lookups
CREATE INDEX IF NOT EXISTS idx_validation_study_user_id ON public.validation_study(user_id);

-- Enable RLS
ALTER TABLE public.validation_study ENABLE ROW LEVEL SECURITY;

-- Users can read their own validation study data
CREATE POLICY "Users can read own validation study"
  ON public.validation_study
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own validation study data
CREATE POLICY "Users can insert own validation study"
  ON public.validation_study
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
