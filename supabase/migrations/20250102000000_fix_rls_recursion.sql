-- Fix infinite recursion in RLS policies
-- The organizations policy was querying users table which has RLS, causing a loop

-- Drop the problematic policy
DROP POLICY IF EXISTS "Users can read their organization" ON organizations;

-- Create a new policy that uses auth.uid() directly without querying users table
-- This checks if the user's JWT contains the organization_id claim
-- Or we can use a security definer function to bypass RLS

-- Option 1: Create a security definer function that bypasses RLS
CREATE OR REPLACE FUNCTION public.get_user_organization_id()
RETURNS UUID AS $$
  SELECT organization_id FROM public.users WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Recreate the organizations policy using the function
CREATE POLICY "Users can read their organization" ON organizations
  FOR SELECT
  USING (id = public.get_user_organization_id());

-- Also ensure users table policy is simple and doesn't cause issues
DROP POLICY IF EXISTS "Users can read own data" ON users;
CREATE POLICY "Users can read own data" ON users
  FOR SELECT
  USING (auth.uid() = id);
