# Supabase Setup Instructions

## Database Migration

You need to run the SQL migrations in your Supabase database. There are two ways to do this:

### Option 1: Using Supabase CLI (Recommended)

If you have Supabase CLI installed:

```bash
# Initialize Supabase (if not already done)
supabase init

# Link to your Supabase project
supabase link --project-ref your-project-ref

# Push migrations to your database
supabase db push
```

### Option 2: Manual SQL Execution

1. Go to your Supabase Dashboard
2. Navigate to the SQL Editor
3. Run the migrations in order:

#### Step 1: Run Initial Schema (do this first)
Copy and paste the contents of `supabase/migrations/20250100000000_initial_schema.sql` and execute it.

#### Step 2: Run Auth Setup (do this second)
Copy and paste the contents of `supabase/migrations/20250101000000_setup_auth.sql` and execute it.

## What These Migrations Do

### Initial Schema (`20250100000000_initial_schema.sql`)
- Creates the `organizations`, `users`, and `survey_results` tables
- Sets up proper foreign key relationships
- Creates indexes for better performance
- Adds automatic `updated_at` timestamp triggers

### Auth Setup (`20250101000000_setup_auth.sql`)
- Enables Row Level Security (RLS) on all tables
- Creates RLS policies:
  - Users can read/update their own data
  - Users can manage their own survey results
  - Users can view their organization
- Creates a database trigger that automatically creates a user profile when someone signs up
- This trigger bypasses RLS using `SECURITY DEFINER` so it runs with elevated permissions

## Testing

After running the migrations, test the signup flow:

1. Sign up with a new email address
2. You should NOT see the "new row violates row-level security policy" error
3. After signup, you should be able to sign in immediately
4. Check your Supabase database - you should see the user in both `auth.users` and `public.users` tables

## Troubleshooting

If you still get errors:

1. Check the Supabase logs in your dashboard (Logs & Analytics section)
2. Make sure both migrations ran successfully
3. Verify the trigger was created: Run `SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';`
4. Check for any warning messages in the Supabase logs that might indicate what went wrong
