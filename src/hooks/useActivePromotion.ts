import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Promotion {
  id: string;
  title: string;
  banner_url: string | null;
  message: string | null;
  scope: 'global' | 'ai_products';
  discount_type: 'percentage' | 'flat';
  discount_value: number;
  product_ids: string[];
  is_active: boolean;
  starts_at: string | null;
  ends_at: string | null;
}

const inWindow = (p: Promotion) => {
  const now = Date.now();
  if (p.starts_at && now < new Date(p.starts_at).getTime()) return false;
  if (p.ends_at && now > new Date(p.ends_at).getTime()) return false;
  return true;
};

/** The currently-active promotion for a given scope, if any (respects start/end dates client-side). */
export function useActivePromotion(scope: 'global' | 'ai_products') {
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPromotion = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('promotions')
      .select('*')
      .eq('is_active', true)
      .in('scope', scope === 'ai_products' ? ['global', 'ai_products'] : ['global'])
      .order('updated_at', { ascending: false });
    const rows = ((data as Promotion[]) || []).filter(inWindow);
    setPromotion(rows[0] ?? null);
    setLoading(false);
  }, [scope]);

  useEffect(() => { fetchPromotion(); }, [fetchPromotion]);

  return { promotion, loading, refetch: fetchPromotion };
}

/** Applies a promotion's discount to a price, respecting product_ids scoping when set. */
export function applyDiscount(price: number, promotion: Promotion | null, productId?: string): number {
  if (!promotion) return price;
  if (promotion.product_ids.length > 0 && productId && !promotion.product_ids.includes(productId)) return price;
  const discounted = promotion.discount_type === 'percentage'
    ? price * (1 - promotion.discount_value / 100)
    : price - promotion.discount_value;
  return Math.max(0, Math.round(discounted));
}
