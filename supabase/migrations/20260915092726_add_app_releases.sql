-- App releases: lets the admin publish downloadable app builds (Android APK, Windows installer, etc.)
-- straight from the Admin panel, independent of the "materials" content library.
CREATE TABLE public.app_releases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  app_name TEXT NOT NULL,
  platform TEXT NOT NULL DEFAULT 'android',
  version_name TEXT NOT NULL,
  version_code INTEGER,
  release_notes TEXT,
  download_url TEXT NOT NULL,
  file_size_mb NUMERIC(10,2),
  icon_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.app_releases ENABLE ROW LEVEL SECURITY;

-- Public can only see releases the admin has marked published
CREATE POLICY "Anyone can view published app releases"
  ON public.app_releases FOR SELECT
  TO public
  USING (is_published = true);

-- Admins can view, create, update and delete every release (published or not)
CREATE POLICY "Admins can manage app releases"
  ON public.app_releases FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_app_releases_updated_at
  BEFORE UPDATE ON public.app_releases
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for the actual app files (APK / EXE), public so download links work directly
INSERT INTO storage.buckets (id, name, public) VALUES ('app-releases', 'app-releases', true);

CREATE POLICY "Anyone can download app release files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'app-releases');

CREATE POLICY "Admins can upload app release files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'app-releases' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update app release files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'app-releases' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete app release files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'app-releases' AND public.has_role(auth.uid(), 'admin'::app_role));
