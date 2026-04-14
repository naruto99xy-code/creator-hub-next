
-- Create materials table
CREATE TABLE public.materials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT '',
  description TEXT,
  category TEXT,
  author TEXT,
  file_url TEXT,
  youtube_url TEXT,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  software_compatibility TEXT[] DEFAULT '{}',
  is_premium BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  html_code TEXT,
  css_code TEXT,
  js_code TEXT,
  html_intro TEXT,
  css_intro TEXT,
  js_intro TEXT,
  download_count INTEGER NOT NULL DEFAULT 0,
  rating NUMERIC(3,2) NOT NULL DEFAULT 0,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

-- Public can view all materials
CREATE POLICY "Anyone can view materials"
  ON public.materials FOR SELECT
  TO public
  USING (true);

-- Admins can do everything
CREATE POLICY "Admins can manage materials"
  ON public.materials FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_materials_updated_at
  BEFORE UPDATE ON public.materials
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for thumbnails
INSERT INTO storage.buckets (id, name, public) VALUES ('material-thumbnails', 'material-thumbnails', true);

-- Storage policies
CREATE POLICY "Anyone can view material thumbnails"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'material-thumbnails');

CREATE POLICY "Admins can upload material thumbnails"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'material-thumbnails' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update material thumbnails"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'material-thumbnails' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete material thumbnails"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'material-thumbnails' AND public.has_role(auth.uid(), 'admin'::app_role));
