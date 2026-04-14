import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { supabase } from '@/integrations/supabase/client';
import { Package, ShoppingCart, Download, Loader2, LayoutTemplate, Wrench, Zap, FolderOpen, Sparkles, Crown, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRazorpay } from '@/hooks/useRazorpay';
import { PaymentModal } from '@/components/shop/PaymentModal';
import { ShopHero3D } from '@/components/shop/ShopHero3D';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string | null;
  category: string | null;
  download_count: number;
  file_url?: string | null;
  source?: 'product' | 'material';
}

const categories = [
  { label: 'All', value: 'all', icon: <FolderOpen className="w-4 h-4" />, color: 'from-purple-500 to-pink-500' },
  { label: 'Templates', value: 'Templates', icon: <LayoutTemplate className="w-4 h-4" />, color: 'from-blue-500 to-cyan-500' },
  { label: 'Tools', value: 'Tools', icon: <Wrench className="w-4 h-4" />, color: 'from-green-500 to-emerald-500' },
  { label: 'Automation', value: 'Automation', icon: <Zap className="w-4 h-4" />, color: 'from-amber-500 to-orange-500' },
  { label: 'Resources', value: 'Resources', icon: <Package className="w-4 h-4" />, color: 'from-pink-500 to-rose-500' },
];

const sampleProducts: Product[] = [
  { id: '1', title: 'React Dashboard Template', description: 'Modern admin dashboard with dark mode, charts, and responsive layout.', price: 499, image_url: null, category: 'Templates', download_count: 150 },
  { id: '2', title: 'Landing Page Kit', description: 'Beautiful landing pages for startups with animations and CTA sections.', price: 0, image_url: null, category: 'Templates', download_count: 200 },
  { id: '3', title: 'API Starter Kit', description: 'Node.js API boilerplate with auth, rate limiting, and database setup.', price: 399, image_url: null, category: 'Tools', download_count: 100 },
  { id: '4', title: 'Social Media Automation', description: 'Auto-post scheduler for Instagram, Twitter, and LinkedIn.', price: 599, image_url: null, category: 'Automation', download_count: 80 },
  { id: '5', title: 'Premium UI Component Pack', description: 'Hand-crafted UI components with dark mode and accessibility.', price: 349, image_url: null, category: 'Resources', download_count: 175 },
  { id: '6', title: 'E-Commerce Website Kit', description: 'Full-stack e-commerce template with cart, payments, and admin panel.', price: 799, image_url: null, category: 'Templates', download_count: 120 },
];

const getCategoryGradient = (cat: string | null) => {
  switch (cat) {
    case 'Templates': return 'from-blue-500/15 to-cyan-500/5';
    case 'Tools': return 'from-green-500/15 to-emerald-500/5';
    case 'Automation': return 'from-amber-500/15 to-orange-500/5';
    case 'Resources': return 'from-pink-500/15 to-rose-500/5';
    default: return 'from-primary/10 to-transparent';
  }
};

const getCategoryBorder = (cat: string | null) => {
  switch (cat) {
    case 'Templates': return 'border-blue-500/20 hover:border-blue-500/40';
    case 'Tools': return 'border-green-500/20 hover:border-green-500/40';
    case 'Automation': return 'border-amber-500/20 hover:border-amber-500/40';
    case 'Resources': return 'border-pink-500/20 hover:border-pink-500/40';
    default: return 'border-primary/20 hover:border-primary/40';
  }
};

const getCategoryColor = (cat: string | null) => {
  switch (cat) {
    case 'Templates': return '#3b82f6';
    case 'Tools': return '#10b981';
    case 'Automation': return '#f59e0b';
    case 'Resources': return '#ec4899';
    default: return '#a855f7';
  }
};

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
    const { data: productsData } = await supabase
      .from('products')
      .select('id, title, description, price, image_url, category, download_count, file_url')
      .eq('is_active', true);

    const { data: materialsData } = await supabase
      .rpc('get_public_materials', { p_section: 'Shop' });

    const productItems: Product[] = (productsData || []).map(p => ({ ...p, source: 'product' as const }));
    const materialItems: Product[] = (materialsData || []).map(m => ({
      id: m.id,
      title: m.title,
      description: m.description || '',
      price: m.price || 0,
      image_url: m.image_url,
      category: m.category,
      download_count: m.download_count || 0,
      file_url: m.file_url || null,
      source: 'material' as const,
    }));

    setProducts([...productItems, ...materialItems]);
    setLoading(false);
  };

  const displayProducts = products.length > 0 ? products : sampleProducts;
  const filtered = activeCategory === 'all' ? displayProducts : displayProducts.filter(p => p.category === activeCategory);

  const handleConfirmPurchase = (name: string, mobile: string) => {
    if (!selectedProduct) return;
    const fileUrl = selectedProduct.file_url;
    if (selectedProduct.price === 0) {
      if (fileUrl) {
        window.location.href = fileUrl;
      } else {
        window.location.href = `/success?product=${encodeURIComponent(selectedProduct.title)}&amount=0&name=${encodeURIComponent(name)}&mobile=${encodeURIComponent(mobile)}`;
      }
      setSelectedProduct(null);
      return;
    }
    handlePurchaseWithDetails({
      productName: selectedProduct.title,
      price: selectedProduct.price,
      userName: name,
      userMobile: mobile,
      fileUrl: fileUrl || undefined,
    });
    setSelectedProduct(null);
  };

  return (
    <Layout>
      <ShopHero3D />

      {/* Category Filters */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                whileTap={{ scale: 0.95 }}
                whileHover={{ y: -2 }}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
                  activeCategory === cat.value
                    ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-lg`
                    : 'bg-card/50 border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30'
                }`}
              >
                {cat.icon}
                {cat.label}
                {activeCategory === cat.value && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 rounded-full bg-white/80"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No products in this category yet.</p>
              <p className="text-muted-foreground/60 text-sm mt-1">Check back soon for new additions!</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, type: 'spring', stiffness: 150 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative"
                >
                  {/* Card border glow on hover */}
                  <div className={`h-full rounded-2xl border ${getCategoryBorder(product.category)} bg-gradient-to-b ${getCategoryGradient(product.category)} backdrop-blur-xl p-5 transition-all duration-500 overflow-hidden relative`}>
                    {/* Background orb */}
                    <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
                      style={{ background: getCategoryColor(product.category) }}
                    />

                    {/* Image */}
                    <div className="aspect-video bg-muted/50 rounded-xl mb-4 flex items-center justify-center overflow-hidden relative">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Package className="w-10 h-10 text-muted-foreground/40 group-hover:text-primary/60 transition-colors duration-300" />
                        </div>
                      )}

                      {/* Price badge overlay */}
                      {product.price === 0 ? (
                        <span className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-green-500/90 text-white text-xs font-bold shadow-lg">
                          FREE
                        </span>
                      ) : (
                        <span className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-primary/90 text-white text-xs font-bold shadow-lg flex items-center gap-1">
                          <Crown className="w-3 h-3" /> Premium
                        </span>
                      )}
                    </div>

                    {/* Category tag */}
                    {product.category && (
                      <span
                        className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mb-2"
                        style={{
                          background: `${getCategoryColor(product.category)}15`,
                          color: getCategoryColor(product.category),
                        }}
                      >
                        {product.category}
                      </span>
                    )}

                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300">{product.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-2">{product.description}</p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/30 mb-4">
                      <div>
                        {product.price === 0 ? (
                          <span className="text-xl font-black text-green-400">FREE</span>
                        ) : (
                          <span className="text-2xl font-black bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
                            ₹{product.price}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Download className="w-3.5 h-3.5" />
                          {product.download_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-yellow-500" />
                          4.9
                        </span>
                      </div>
                    </div>

                    <GlowButton
                      className="w-full font-semibold"
                      disabled={processing}
                      onClick={() => setSelectedProduct(product)}
                    >
                      {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
                      {product.price === 0 ? '🎁 Get Free' : '🛒 Buy Now'}
                    </GlowButton>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { icon: TrendingUp, label: 'Quality Code', desc: 'Production-ready', color: 'text-blue-400' },
              { icon: Download, label: 'Instant Download', desc: 'Access immediately', color: 'text-green-400' },
              { icon: Zap, label: 'Regular Updates', desc: 'Free lifetime updates', color: 'text-amber-400' },
              { icon: Star, label: 'Top Rated', desc: '4.9/5 average', color: 'text-pink-400' },
            ].map((perk, i) => (
              <motion.div
                key={perk.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-muted/20 border border-border/30"
              >
                <perk.icon className={`w-6 h-6 ${perk.color} mb-2`} />
                <p className="text-sm font-bold">{perk.label}</p>
                <p className="text-xs text-muted-foreground">{perk.desc}</p>
              </motion.div>
            ))}
          </motion.div>
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
