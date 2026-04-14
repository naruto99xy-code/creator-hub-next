
ALTER TABLE public.materials
ADD COLUMN publish_sections text[] NOT NULL DEFAULT '{}'::text[],
ADD COLUMN price integer NOT NULL DEFAULT 0;
