
ALTER TABLE public.materials
  ADD COLUMN IF NOT EXISTS original_price integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS live_site_price integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS live_site_original_price integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS live_site_file_url text,
  ADD COLUMN IF NOT EXISTS whats_included text[],
  ADD COLUMN IF NOT EXISTS premium_features text[],
  ADD COLUMN IF NOT EXISTS live_site_features text[],
  ADD COLUMN IF NOT EXISTS premium_note text,
  ADD COLUMN IF NOT EXISTS live_site_note text;

DROP FUNCTION IF EXISTS public.get_public_materials(text);

CREATE FUNCTION public.get_public_materials(p_section text DEFAULT NULL::text)
 RETURNS TABLE(
   id uuid, title text, description text, category text, image_url text,
   download_count integer, rating numeric, is_premium boolean, price integer,
   content_type text, publish_sections text[], tags text[], author text,
   youtube_url text, is_featured boolean, created_at timestamp with time zone,
   file_url text, original_price integer, live_site_price integer,
   live_site_original_price integer, live_site_file_url text,
   whats_included text[], premium_features text[], live_site_features text[],
   premium_note text, live_site_note text
 )
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
  SELECT
    m.id, m.title, m.description, m.category, m.image_url,
    m.download_count, m.rating, m.is_premium, m.price,
    m.content_type, m.publish_sections, m.tags, m.author,
    m.youtube_url, m.is_featured, m.created_at, m.file_url,
    m.original_price, m.live_site_price, m.live_site_original_price,
    m.live_site_file_url, m.whats_included, m.premium_features,
    m.live_site_features, m.premium_note, m.live_site_note
  FROM public.materials m
  WHERE (p_section IS NULL OR p_section = ANY(m.publish_sections));
$function$;
