import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { useActivePromotion } from '@/hooks/useActivePromotion';

interface PromoBannerProps {
  scope: 'global' | 'ai_products';
  className?: string;
}

/** Shows the currently active event/discount banner for the given scope, if any. Dismissible per page load. */
export function PromoBanner({ scope, className = '' }: PromoBannerProps) {
  const { promotion } = useActivePromotion(scope);
  const [dismissed, setDismissed] = useState(false);

  if (!promotion || dismissed) return null;

  const discountLabel = promotion.discount_value > 0
    ? `${promotion.discount_value}${promotion.discount_type === 'percentage' ? '%' : '₹'} OFF`
    : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`relative container mx-auto px-4 pt-4 ${className}`}
      >
        <div className="relative rounded-2xl overflow-hidden gradient-border">
          {promotion.banner_url ? (
            <div className="relative">
              <img src={promotion.banner_url} alt={promotion.title} className="w-full aspect-[21/6] md:aspect-[21/4] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-foreground text-sm md:text-base">{promotion.title}</p>
                  {promotion.message && <p className="text-xs md:text-sm text-foreground/80">{promotion.message}</p>}
                </div>
                {discountLabel && (
                  <span className="shrink-0 text-xs md:text-sm font-black px-3 py-1.5 rounded-full bg-primary text-primary-foreground">
                    {discountLabel}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="glass-card px-4 py-3 flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-primary shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="font-semibold text-sm">{promotion.title}</span>
                {promotion.message && <span className="text-sm text-muted-foreground"> — {promotion.message}</span>}
              </div>
              {discountLabel && (
                <span className="shrink-0 text-xs font-black px-2.5 py-1 rounded-full bg-primary text-primary-foreground">
                  {discountLabel}
                </span>
              )}
            </div>
          )}
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
