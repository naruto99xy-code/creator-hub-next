
-- Make supporters.user_id NOT NULL to prevent anonymous rows that could leak data
-- First delete any rows with NULL user_id (shouldn't exist per INSERT policy)
DELETE FROM public.supporters WHERE user_id IS NULL;

-- Make the column NOT NULL
ALTER TABLE public.supporters ALTER COLUMN user_id SET NOT NULL;
