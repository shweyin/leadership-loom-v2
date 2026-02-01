-- Remove employee columns from survey_results table
-- These fields are no longer used

-- Drop the index on emp_id first
DROP INDEX IF EXISTS idx_survey_results_emp_id;

-- Remove the columns
ALTER TABLE public.survey_results
  DROP COLUMN IF EXISTS emp_name,
  DROP COLUMN IF EXISTS emp_id,
  DROP COLUMN IF EXISTS emp_job_title;
