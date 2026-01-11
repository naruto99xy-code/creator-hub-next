-- Create storage bucket for product images (public for display)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);

-- Create storage bucket for product files (private for downloads)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-files', 'product-files', false);

-- RLS policies for product images bucket
CREATE POLICY "Anyone can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Admins can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update product images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete product images"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images' AND has_role(auth.uid(), 'admin'));

-- RLS policies for product files bucket
CREATE POLICY "Admins can upload product files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-files' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update product files"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-files' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete product files"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-files' AND has_role(auth.uid(), 'admin'));

-- Users who purchased can download (we'll implement this check in code for now)
CREATE POLICY "Authenticated users can download product files"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-files' AND auth.uid() IS NOT NULL);