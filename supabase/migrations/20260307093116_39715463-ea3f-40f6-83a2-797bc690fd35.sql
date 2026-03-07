-- Make user_id nullable for guest purchases
ALTER TABLE public.purchases ALTER COLUMN user_id DROP NOT NULL;

-- Update existing guest placeholder records to NULL
UPDATE public.purchases SET user_id = NULL WHERE user_id = '00000000-0000-0000-0000-000000000000';