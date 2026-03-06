import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { supabase } from '@/integrations/supabase/client';
import { Package, ShoppingCart, Download, Loader2, LayoutTemplate, Wrench, Zap, FolderOpen, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRazorpay } from '@/hooks/useRazorpay';
import { PaymentModal } from '@/components/shop/PaymentModal';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string | null;
  category: string | null;
  download_count: number;
  file_url: string | null;
}

const categories = [
  { label: 'All', value: 'all', icon: <FolderOpen className="w-4 h-4" /> },
  { label: 'Templates', value: 'Templates', icon: <LayoutTemplate className="w-4 h-4" /> },
  { label: 'Tools', value: 'Tools', icon: <Wrench className="w-4 h-4" /> },
  { label: 'Automation', value: 'Automation', icon: <Zap className="w-4 h-4" /> },
  { label: 'Resources', value: 'Resources', icon: <Package className="w-4 h-4" /> },
];

const sampleProducts: Product[] = [
  { id: '1', title: 'React Dashboard Template', description: 'Modern admin dashboard with dark mode, charts, and responsive layout.', price: 499, image_url: null, category: 'Templates', download_count: 150, file_url: null },
  { id: '2', title: 'Landing Page Kit', description: 'Beautiful landing pages for startups with animations and CTA sections.', price: 0, image_url: null, category: 'Templates', download_count: 200, file_url: 'https://example.com' },
  { id: '3', title: 'API Starter Kit', description: 'Node.js API boilerplate with auth, rate limiting, and database setup.', price: 399, image_url: null, category: 'Tools', download_count: 100, file_url: null },
  { id: '4', title: 'Social Media Automation', description: 'Auto-post scheduler for Instagram, Twitter, and LinkedIn.', price: 599, image_url: null, category: 'Automation', download_count: 80, file_url: null },
  { id: '5', title: 'Premium UI Component Pack', description: 'Hand-crafted UI components with dark mode and accessibility.', price: 349, image_url: null, category: 'Resources', download_count: 175, file_url: null },
  { id: '6', title: 'E-Commerce Website Kit', description: 'Full-stack e-commerce template with cart, payments, and admin panel.', price: 799, image_url: null, category: 'Templates', download_count: 120, file_url: null },
];

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const { handlePurchaseWithDetails, processing } = useRazorpay();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('id, title, description, price, image_url, category, download_count')
      .eq('is_active', true);
    setProducts(data || []);
    setLoading(false);
  };

  const displayProducts = products.length > 0 ? products : sampleProducts;
  const filtered = activeCategory === 'all' ? displayProducts : displayProducts.filter(p => p.category === activeCategory);

  const handleConfirmPurchase = (name: string, mobile: string) => {
    if (!selectedProduct) return;
    handlePurchaseWithDetails({
      productName: selectedProduct.title,
      price: selectedProduct.price,
      userName: name,
      userMobile: mobile,
    });
    setSelectedProduct(null);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-28 pb-10">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">
            Developer <span className="glow-text">Marketplace</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-muted-foreground max-w-2xl mx-auto">
            Premium Tools &amp; Digital Products
          </motion.p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <motion.button
                key={cat.value}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  activeCategory === cat.value
                    ? 'bg-primary/15 border-primary/50 text-primary'
                    : 'bg-card/50 border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
                }`}
              >
                {cat.icon}
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No products in this category yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.03, y: -6 }}
                  className="group"
                >
                  <GlassCard hover className="h-full flex flex-col">
                    <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                    </div>
                    {product.category && <span className="text-xs text-primary font-medium mb-2">{product.category}</span>}
                    <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">₹{product.price}</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground"><Download className="w-3 h-3" />{product.download_count}</div>
                    </div>
                    <GlowButton className="w-full mt-4" disabled={processing} onClick={() => setSelectedProduct(product)}>
                      {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
                      Buy Now
                    </GlowButton>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Payment Modal */}
      {selectedProduct && (
        <PaymentModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onConfirm={handleConfirmPurchase}
          productName={selectedProduct.title}
          price={selectedProduct.price}
          processing={processing}
        />
      )}
    </Layout>
  );
}
