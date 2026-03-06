
-- Fix: Storage policy for product-files should verify specific product purchase
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Purchasers can download product files" ON storage.objects;

-- Create a policy that verifies the user purchased the specific product
CREATE POLICY "Purchasers can download product files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'product-files'
    AND EXISTS (
      SELECT 1 FROM public.orders o
      JOIN public.product_files pf ON o.product_id = pf.product_id
      WHERE o.user_id = auth.uid()
        AND o.payment_status = 'completed'
        AND pf.file_url = storage.objects.name
    )
  );
