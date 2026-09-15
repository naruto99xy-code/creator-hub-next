-- AI product catalog: every "AI assistant" card on the site becomes admin-editable
-- (price, title, badge, features, logo, banner, colors, coming-soon/active/featured flags)
-- instead of being hardcoded in the frontend.
CREATE TABLE public.ai_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'assistant',
  badge TEXT NOT NULL DEFAULT '',
  subtitle TEXT NOT NULL DEFAULT '',
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  original_price NUMERIC(10,2),
  features TEXT[] NOT NULL DEFAULT '{}',
  button_text TEXT NOT NULL DEFAULT 'Buy Now',
  gradient_from TEXT NOT NULL DEFAULT '#7c3aed',
  gradient_to TEXT NOT NULL DEFAULT '#a855f7',
  border_color TEXT NOT NULL DEFAULT 'border-primary/30',
  icon_name TEXT NOT NULL DEFAULT 'Sparkles',
  logo_url TEXT,
  banner_url TEXT,
  is_coming_soon BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active AI products"
  ON public.ai_products FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage AI products"
  ON public.ai_products FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_ai_products_updated_at
  BEFORE UPDATE ON public.ai_products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Promotions: a site-wide or AI-section banner + discount the admin can turn on/off
-- for an event or sale, without touching any product's base price.
CREATE TABLE public.promotions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  banner_url TEXT,
  message TEXT,
  scope TEXT NOT NULL DEFAULT 'global' CHECK (scope IN ('global', 'ai_products')),
  discount_type TEXT NOT NULL DEFAULT 'percentage' CHECK (discount_type IN ('percentage', 'flat')),
  discount_value NUMERIC(10,2) NOT NULL DEFAULT 0,
  product_ids UUID[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT false,
  starts_at TIMESTAMP WITH TIME ZONE,
  ends_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active promotions"
  ON public.promotions FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage promotions"
  ON public.promotions FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_promotions_updated_at
  BEFORE UPDATE ON public.promotions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for AI product logos/banners and promotion banners
INSERT INTO storage.buckets (id, name, public) VALUES ('ai-product-media', 'ai-product-media', true);

CREATE POLICY "Anyone can view AI product media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'ai-product-media');

CREATE POLICY "Admins can upload AI product media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'ai-product-media' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update AI product media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'ai-product-media' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete AI product media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'ai-product-media' AND public.has_role(auth.uid(), 'admin'::app_role));

-- Seed with the 8 products that were previously hardcoded in src/pages/AI.tsx, so
-- switching the frontend to read from this table changes nothing for existing buyers.
INSERT INTO public.ai_products
  (slug, name, category, badge, subtitle, price, original_price, features, button_text, gradient_from, gradient_to, border_color, icon_name, is_coming_soon, is_featured, display_order)
VALUES
  ('ariya-ai', 'Ariya AI ❤️', 'companion', 'NEW ARRIVAL', 'Your Caring AI Companion', 799, 899,
    ARRAY['Empathetic Conversations','Personalized Responses','Voice & Text Chat','Mood Detection','Daily Motivation'],
    'Get Ariya', '#e11d48', '#f43f5e', 'border-rose-500/30', 'Heart', false, false, 1),
  ('jarvis', 'Jarvis', 'assistant', 'SYSTEM AUTOMATION', 'AI System Assistant for Power Users', 799, 899,
    ARRAY['Voice Input (8 voices)','Full System Automation','Windows Management','WhatsApp Automation','PC Power Control'],
    'Buy Jarvis', '#0d9488', '#06b6d4', 'border-teal-500/30', 'Bot', false, true, 2),
  ('myra-2', 'Myra 2.0', 'assistant', 'PERSONAL ASSISTANT', 'AI Personal Voice Assistant', 799, 899,
    ARRAY['Human-like Voice','Daily Automation','Smart Task Manager','News Updates','Music Playback'],
    'Buy Myra', '#7c3aed', '#a855f7', 'border-violet-500/30', 'Sparkles', false, true, 3),
  ('jarvis-myra-combo', 'Jarvis + Myra Combo', 'bundle', 'COMBO PACK 🔥', 'Get Both AI Assistants at a Special Price', 1499, 1598,
    ARRAY['Everything in Jarvis','Everything in Myra 2.0','Save ₹100 on Bundle','Priority Support','Combo Activation Key'],
    'Buy Combo Pack', '#7c3aed', '#06b6d4', 'border-purple-500/30', 'Package', false, false, 4),
  ('zara-ai', 'Zara AI', 'companion', 'MOST POPULAR', 'Zara AI – Android App', 1599, NULL,
    ARRAY['Full AI Girlfriend Experience','Voice + Chat Support','Emotional Intelligence','24/7 Conversations','App-to-App Opening'],
    'Get Zara', '#ec4899', '#f472b6', 'border-pink-500/30', 'Heart', false, false, 5),
  ('ai-girlfriend', 'AI Girlfriend', 'companion', 'AI COMPANION', 'Realistic AI Companion Experience', 1799, NULL,
    ARRAY['Emotional Intelligence','Voice + Chat Interaction','Romantic Personality Modes','Daily Conversations','Memory Retention'],
    'Get AI Girlfriend', '#f43f5e', '#fb7185', 'border-rose-500/30', 'MessageCircleHeart', false, false, 6),
  ('nova-ai', 'Nova AI', 'productivity', 'COMING SOON', 'AI Developer Copilot', 1999, NULL,
    ARRAY['Code Suggestions','Bug Detection','Project Templates','AI Debug Assistant','GitHub Automation'],
    'Coming Soon', '#2563eb', '#3b82f6', 'border-blue-500/30', 'Code', true, false, 7),
  ('mj-ai', 'MJ AI', 'productivity', 'COMING SOON', 'Advanced Productivity Assistant', 1999, NULL,
    ARRAY['Task Automation','Reminder Engine','Smart Notes','Cross-App Assistance','Intelligent Suggestions'],
    'Coming Soon', '#f59e0b', '#fbbf24', 'border-amber-500/30', 'Zap', true, false, 8);
