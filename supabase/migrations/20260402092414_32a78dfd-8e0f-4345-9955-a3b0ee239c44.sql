
-- Fix: Restrict all admin policies from 'public' role to 'authenticated' role
-- This prevents unauthenticated (anon) requests from even evaluating admin policies

-- membership_plans
DROP POLICY IF EXISTS "Admins can manage plans" ON public.membership_plans;
CREATE POLICY "Admins can manage plans" ON public.membership_plans FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- newsletter_subscribers
DROP POLICY IF EXISTS "Admins can manage subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Admins can manage subscribers" ON public.newsletter_subscribers FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can view all subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Admins can view all subscribers" ON public.newsletter_subscribers FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- orders
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
CREATE POLICY "Admins can view all orders" ON public.orders FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- product_files
DROP POLICY IF EXISTS "Admins can manage product files" ON public.product_files;
CREATE POLICY "Admins can manage product files" ON public.product_files FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- user_roles
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- products
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
CREATE POLICY "Admins can manage products" ON public.products FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- purchases
DROP POLICY IF EXISTS "Service role can manage all purchases" ON public.purchases;
CREATE POLICY "Service role can manage all purchases" ON public.purchases FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- supporters
DROP POLICY IF EXISTS "Admins can view all supporters" ON public.supporters;
CREATE POLICY "Admins can view all supporters" ON public.supporters FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- inquiries
DROP POLICY IF EXISTS "Admins can view all inquiries" ON public.inquiries;
CREATE POLICY "Admins can view all inquiries" ON public.inquiries FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- memberships
DROP POLICY IF EXISTS "Admins can manage all memberships" ON public.memberships;
CREATE POLICY "Admins can manage all memberships" ON public.memberships FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
