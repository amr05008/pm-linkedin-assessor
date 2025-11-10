# Supabase Migrations

This directory contains SQL migrations for the Supabase database.

## How to Apply Migrations

### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project: https://supabase.com/dashboard/project/YOUR_PROJECT_ID
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the contents of the migration file (e.g., `001_enable_rls.sql`)
5. Paste into the SQL editor
6. Click **Run** (or press Cmd/Ctrl + Enter)
7. Verify success message appears

### Option 2: Supabase CLI

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_ID

# Apply migrations
supabase db push
```

## Migration History

| # | Date | Description | Status |
|---|------|-------------|--------|
| 001 | 2025-11-09 | Enable RLS on Assessment and WaitlistEmail tables | ⏳ Pending |

## After Applying Migrations

1. Check Supabase Dashboard → Database → Tables
2. Click on `Assessment` table → RLS should show as "Enabled"
3. Click on `WaitlistEmail` table → RLS should show as "Enabled"
4. Security warnings should disappear from dashboard
5. Test app functionality to ensure nothing broke

## Rollback (if needed)

If you need to rollback the RLS migration:

```sql
-- Disable RLS on both tables
ALTER TABLE "Assessment" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "WaitlistEmail" DISABLE ROW LEVEL SECURITY;

-- Drop policies
DROP POLICY IF EXISTS "Allow public insert assessments" ON "Assessment";
DROP POLICY IF EXISTS "Allow public count assessments" ON "Assessment";
DROP POLICY IF EXISTS "Allow public insert emails" ON "WaitlistEmail";
```
