import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { supabase } from '@/integrations/supabase/client';
import { Package, ShoppingCart, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string | null;
  category: string | null;
  download_count: number;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').eq('is_active', true);
    setProducts(data || []);
    setLoading(false);
  };

  const sampleProducts: Product[] = [
    { id: '1', title: 'React Dashboard Template', description: 'Modern admin dashboard with dark mode', price: 499, image_url: null, category: 'Templates', download_count: 150 },
    { id: '2', title: 'Landing Page Kit', description: 'Beautiful landing pages for startups', price: 299, image_url: null, category: 'Templates', download_count: 200 },
    { id: '3', title: 'API Starter Kit', description: 'Node.js API boilerplate with auth', price: 399, image_url: null, category: 'Backend', download_count: 100 },
  ];

  const displayProducts = products.length > 0 ? products : sampleProducts;

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Digital <span className="glow-text">Shop</span></h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Premium templates, UI kits, and developer tools</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <GlassCard hover className="h-full flex flex-col">
                  <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <Package className="w-12 h-12 text-muted-foreground" />
                  </div>
                  {product.category && <span className="text-xs text-primary font-medium mb-2">{product.category}</span>}
                  <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">₹{product.price}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground"><Download className="w-3 h-3" />{product.download_count}</div>
                  </div>
                  <GlowButton className="w-full mt-4"><ShoppingCart className="w-4 h-4" />Buy Now</GlowButton>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
