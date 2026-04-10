-- Fix: Supporters INSERT policy allows unauthenticated inserts via OR clause
-- Drop the overly permissive policy and replace with auth-required version

DROP POLICY IF EXISTS "Authenticated users can create support" ON public.supporters;

CREATE POLICY "Authenticated users can create support"
  ON public.supporters
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);
