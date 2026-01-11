-- Create a protected table for product files (file URLs hidden from public view)
CREATE TABLE public.product_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.product_files ENABLE ROW LEVEL SECURITY;

-- Only admins can manage product files
CREATE POLICY "Admins can manage product files"
  ON public.product_files
  FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Users can only view file URLs for products they have purchased (with completed payment)
CREATE POLICY "Users can view files for purchased products"
  ON public.product_files
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.product_id = product_files.product_id
        AND orders.user_id = auth.uid()
        AND orders.payment_status = 'completed'
    )
  );

-- Migrate existing file_url data from products to product_files
INSERT INTO public.product_files (product_id, file_url)
SELECT id, file_url FROM public.products WHERE file_url IS NOT NULL;

-- Create a view for public product listing that excludes file_url
CREATE OR REPLACE VIEW public.products_public AS
SELECT 
  id,
  title,
  description,
  price,
  category,
  image_url,
  is_active,
  download_count,
  created_at,
  updated_at
FROM public.products
WHERE is_active = true;