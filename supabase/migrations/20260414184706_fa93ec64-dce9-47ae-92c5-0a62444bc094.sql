DROP FUNCTION IF EXISTS public.get_public_materials(text);

CREATE OR REPLACE FUNCTION public.get_public_materials(p_section text DEFAULT NULL::text)
 RETURNS TABLE(id uuid, title text, description text, category text, image_url text, download_count integer, rating numeric, is_premium boolean, price integer, content_type text, publish_sections text[], tags text[], author text, youtube_url text, is_featured boolean, created_at timestamp with time zone, file_url text)
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
  SELECT
    m.id, m.title, m.description, m.category, m.image_url,
    m.download_count, m.rating, m.is_premium, m.price,
    m.content_type, m.publish_sections, m.tags, m.author,
    m.youtube_url, m.is_featured, m.created_at, m.file_url
  FROM public.materials m
  WHERE (p_section IS NULL OR p_section = ANY(m.publish_sections));
$function$;