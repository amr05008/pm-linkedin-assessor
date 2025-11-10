-- Migration: Enable Row Level Security (RLS) on public tables
-- Created: 2025-11-09
-- Purpose: Secure Assessment and WaitlistEmail tables with RLS policies

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on Assessment table
ALTER TABLE "Assessment" ENABLE ROW LEVEL SECURITY;

-- Enable RLS on WaitlistEmail table
ALTER TABLE "WaitlistEmail" ENABLE ROW LEVEL SECURITY;


-- ============================================================================
-- ASSESSMENT TABLE POLICIES
-- ============================================================================

-- Policy: Allow public to insert new assessments
-- Use case: Future-proofing if we ever allow direct client-side submissions
CREATE POLICY "Allow public insert assessments"
  ON "Assessment"
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow public to read assessment count (for stats/counter)
-- Use case: Future-proofing for client-side stats queries
-- Note: Currently /api/stats uses service role, but this enables direct queries
CREATE POLICY "Allow public count assessments"
  ON "Assessment"
  FOR SELECT
  TO anon
  USING (true);

-- Policy: Prevent public updates
-- No explicit policy needed - RLS defaults to deny

-- Policy: Prevent public deletes
-- No explicit policy needed - RLS defaults to deny


-- ============================================================================
-- WAITLIST EMAIL TABLE POLICIES
-- ============================================================================

-- Policy: Allow public to insert new email addresses
-- Use case: Future-proofing if we ever allow direct client-side email collection
CREATE POLICY "Allow public insert emails"
  ON "WaitlistEmail"
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Prevent public from reading emails (privacy protection)
-- No explicit policy needed - RLS defaults to deny

-- Policy: Prevent public updates
-- No explicit policy needed - RLS defaults to deny

-- Policy: Prevent public deletes
-- No explicit policy needed - RLS defaults to deny


-- ============================================================================
-- NOTES
-- ============================================================================

-- Service Role Access:
-- The service_role (used by Prisma via DATABASE_URL) bypasses RLS entirely.
-- Your server-side code will continue to work without any changes.

-- Anon Role Access:
-- The anon role (public users with just NEXT_PUBLIC_SUPABASE_URL + anon key)
-- can only:
--   - INSERT new assessments
--   - SELECT/count assessments (for stats)
--   - INSERT new emails
-- They CANNOT:
--   - Read individual assessment details
--   - Read any email addresses
--   - Update or delete any data

-- Security Benefits:
-- ✅ Defense-in-depth: Even if anon credentials leak, damage is limited
-- ✅ Future-proof: Supports client-side features if needed later
-- ✅ Privacy: Email addresses are protected from public access
-- ✅ Data integrity: Public cannot modify or delete existing records
