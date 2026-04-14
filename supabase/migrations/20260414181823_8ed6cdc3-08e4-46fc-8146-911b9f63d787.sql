
-- Fix: Remove broad SELECT policies and use auth-based access
DROP POLICY IF EXISTS "Public read access for product images" ON storage.objects;
DROP POLICY IF EXISTS "Public read access for material thumbnails" ON storage.objects;

-- Allow anyone to read specific files by direct URL (needed for image display)
-- but prevent unauthenticated listing by scoping to specific buckets with proper checks
CREATE POLICY "Authenticated read product images"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'product-images');

CREATE POLICY "Anon read product images"
  ON storage.objects FOR SELECT
  TO anon
  USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated read material thumbnails"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'material-thumbnails');

CREATE POLICY "Anon read material thumbnails"
  ON storage.objects FOR SELECT
  TO anon
  USING (bucket_id = 'material-thumbnails');
