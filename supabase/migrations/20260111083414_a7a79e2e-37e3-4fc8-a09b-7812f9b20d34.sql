-- Fix Function Search Path Mutable warning
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Fix overly permissive RLS policy for supporters insert
DROP POLICY IF EXISTS "Anyone can create support" ON public.supporters;

-- More restrictive policy: allow authenticated users or include email for anonymous
CREATE POLICY "Authenticated users can create support" ON public.supporters
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL OR 
    (email IS NOT NULL AND name IS NOT NULL)
  );