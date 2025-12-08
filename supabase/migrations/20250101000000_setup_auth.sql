-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Service role can insert users" ON users;
DROP POLICY IF EXISTS "Users can read own survey results" ON survey_results;
DROP POLICY IF EXISTS "Users can insert own survey results" ON survey_results;
DROP POLICY IF EXISTS "Users can update own survey results" ON survey_results;
DROP POLICY IF EXISTS "Users can read their organization" ON organizations;

-- Users table policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE
  USING (auth.uid() = id);

-- Allow the trigger (using service role) to insert users
CREATE POLICY "Service role can insert users" ON users
  FOR INSERT
  WITH CHECK (true);

-- Survey results policies
CREATE POLICY "Users can read own survey results" ON survey_results
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own survey results" ON survey_results
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own survey results" ON survey_results
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Organizations policies
CREATE POLICY "Users can read their organization" ON organizations
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.organization_id = organizations.id
      AND users.id = auth.uid()
    )
  );

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert new user into public.users table
  -- NEW contains the auth.users record that was just inserted
  INSERT INTO public.users (id, email, name, auth_provider, roles, organization_id)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'name',
      NEW.raw_user_meta_data->>'full_name',
      split_part(NEW.email, '@', 1)
    ),
    CASE
      WHEN NEW.raw_app_meta_data->>'provider' = 'google' THEN 'google'::text
      ELSE 'email'::text
    END,
    ARRAY['user']::text[],
    NULL
  );

  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Log error but don't fail the auth.users insert
    RAISE WARNING 'Error creating user profile: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
