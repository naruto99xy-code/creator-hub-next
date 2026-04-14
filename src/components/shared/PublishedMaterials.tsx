import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { GlassCard } from '@/components/ui/GlassCard';
import { Package, Download, Star, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

interface Material {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  image_url: string | null;
  download_count: number;
  rating: number;
  is_premium: boolean;
  price: number;
  content_type: string;
}

interface PublishedMaterialsProps {
  section: string;
  title?: string;
  subtitle?: string;
}

export function PublishedMaterials({ section, title, subtitle }: PublishedMaterialsProps) {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('materials')
        .select('id, title, description, category, image_url, download_count, rating, is_premium, price, content_type')
        .contains('publish_sections', [section]);
      setMaterials((data as Material[]) || []);
      setLoading(false);
    };
    fetch();
  }, [section]);

  if (loading || materials.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            {title && <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>}
            {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
          </motion.div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {materials.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group"
            >
              <GlassCard hover className="h-full flex flex-col">
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                  {m.image_url ? (
                    <img src={m.image_url} alt={m.title} className="w-full h-full object-cover" />
                  ) : (
                    <Package className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                  {m.is_premium && (
                    <span className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                      <Crown className="w-3 h-3" /> Premium
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  {m.category && (
                    <span className="text-xs text-primary font-medium">{m.category}</span>
                  )}
                  <span className="text-xs text-muted-foreground">{m.content_type}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{m.title}</h3>
                {m.description && (
                  <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-2">{m.description}</p>
                )}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Download className="w-3 h-3" />{m.download_count}</span>
                    {m.rating > 0 && (
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500" />{Number(m.rating).toFixed(1)}</span>
                    )}
                  </div>
                  {m.is_premium && m.price > 0 ? (
                    <span className="text-lg font-bold">₹{m.price}</span>
                  ) : (
                    <span className="text-sm font-semibold text-green-400">Free</span>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
