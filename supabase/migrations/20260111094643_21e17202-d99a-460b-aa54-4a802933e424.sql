-- Drop the view that causes SECURITY DEFINER warning
DROP VIEW IF EXISTS public.products_public;

-- Update newsletter_subscribers policy to be more restrictive (fix permissive RLS)
-- First drop the existing overly permissive policy
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;

-- Create a more secure policy that still allows anonymous subscriptions but with rate limiting consideration
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscribers
  FOR INSERT
  WITH CHECK (
    -- Email must be provided and valid format
    email IS NOT NULL AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  );

-- For products table: Update the RLS policy to exclude file_url from public view
-- We'll create a function to get public product data without file_url
CREATE OR REPLACE FUNCTION public.get_public_products()
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  price INTEGER,
  category TEXT,
  image_url TEXT,
  is_active BOOLEAN,
  download_count INTEGER,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT 
    id, title, description, price, category, image_url, 
    is_active, download_count, created_at, updated_at
  FROM public.products
  WHERE is_active = true;
$$;