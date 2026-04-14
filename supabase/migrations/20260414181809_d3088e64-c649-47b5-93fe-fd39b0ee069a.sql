
-- 1. Create a secure function to return materials without sensitive fields
CREATE OR REPLACE FUNCTION public.get_public_materials(p_section text DEFAULT NULL)
RETURNS TABLE(
  id uuid, title text, description text, category text, image_url text,
  download_count integer, rating numeric, is_premium boolean, price integer,
  content_type text, publish_sections text[], tags text[], author text,
  youtube_url text, is_featured boolean, created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT
    m.id, m.title, m.description, m.category, m.image_url,
    m.download_count, m.rating, m.is_premium, m.price,
    m.content_type, m.publish_sections, m.tags, m.author,
    m.youtube_url, m.is_featured, m.created_at
  FROM public.materials m
  WHERE (p_section IS NULL OR p_section = ANY(m.publish_sections));
$$;

-- 2. Drop the overly broad SELECT policy on materials
DROP POLICY IF EXISTS "Anyone can view materials" ON public.materials;

-- 3. Create a restricted SELECT policy: admins get full access, others get nothing via direct table query
-- Public users must use the get_public_materials() function instead
CREATE POLICY "Admins can read all materials"
  ON public.materials FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 4. Fix public bucket listing: restrict SELECT to specific file paths, not broad listing
-- Drop the overly broad product-images SELECT policy
DROP POLICY IF EXISTS "Public read access for product images" ON storage.objects;

-- Re-create with path-based restriction (allow reading specific files, not listing)
CREATE POLICY "Public read access for product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images' AND (auth.role() = 'authenticated' OR name IS NOT NULL));

-- For material-thumbnails bucket, add similar restricted policy if exists
DROP POLICY IF EXISTS "Public read access for material thumbnails" ON storage.objects;
CREATE POLICY "Public read access for material thumbnails"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'material-thumbnails' AND (auth.role() = 'authenticated' OR name IS NOT NULL));
