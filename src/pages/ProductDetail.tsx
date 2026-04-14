import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Play, Check, Crown, Globe, Loader2, ShieldCheck, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRazorpay } from '@/hooks/useRazorpay';
import { PaymentModal } from '@/components/shop/PaymentModal';

interface MaterialDetail {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  image_url: string | null;
  youtube_url: string | null;
  price: number;
  original_price: number;
  live_site_price: number;
  live_site_original_price: number;
  file_url: string | null;
  live_site_file_url: string | null;
  whats_included: string[] | null;
  premium_features: string[] | null;
  live_site_features: string[] | null;
  premium_note: string | null;
  live_site_note: string | null;
  download_count: number;
  is_premium: boolean;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/);
  return match?.[1] || null;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [material, setMaterial] = useState<MaterialDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [hovering, setHovering] = useState(false);
  const { handlePurchaseWithDetails, processing } = useRazorpay();
  const [paymentTier, setPaymentTier] = useState<'premium' | 'live' | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data } = await supabase.rpc('get_public_materials');
      const found = (data || []).find((m: any) => m.id === id);
      if (found) setMaterial(found as MaterialDetail);
      setLoading(false);
    })();
  }, [id]);

  const handleOrder = useCallback((tier: 'premium' | 'live') => {
    setPaymentTier(tier);
  }, []);

  const selectedPrice = paymentTier === 'live' ? (material?.live_site_price || 0) : (material?.price || 0);
  const selectedFileUrl = paymentTier === 'live' ? material?.live_site_file_url : material?.file_url;

  const handleConfirmPurchase = (name: string, mobile: string) => {
    if (!material || !paymentTier) return;
    if (selectedPrice === 0) {
      if (selectedFileUrl) {
        window.location.href = selectedFileUrl;
      } else {
        window.location.href = `/success?product=${encodeURIComponent(material.title)}&amount=0&name=${encodeURIComponent(name)}&mobile=${encodeURIComponent(mobile)}`;
      }
      setPaymentTier(null);
      return;
    }
    handlePurchaseWithDetails({
      productName: material.title + (paymentTier === 'live' ? ' (Live Site)' : ' (Premium Code)'),
      price: selectedPrice,
      userName: name,
      userMobile: mobile,
      fileUrl: selectedFileUrl || undefined,
    });
    setPaymentTier(null);
  };

  const youtubeId = material?.youtube_url ? getYouTubeId(material.youtube_url) : null;

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!material) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-muted-foreground text-lg">Product not found</p>
          <button onClick={() => navigate('/shop')} className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </button>
        </div>
      </Layout>
    );
  }

  const premiumSaving = material.original_price > material.price ? material.original_price - material.price : 0;
  const liveSaving = material.live_site_original_price > material.live_site_price ? material.live_site_original_price - material.live_site_price : 0;

  const defaultPremiumFeatures = ['Complete source code', 'Easily editable content', 'Setup instructions included', 'Ongoing support'];
  const defaultLiveFeatures = ['Fully deployed website', 'Personalized text & content', 'Ready to use website', 'Shareable live link & QR'];

  const premiumFeatures = material.premium_features?.length ? material.premium_features : defaultPremiumFeatures;
  const liveFeatures = material.live_site_features?.length ? material.live_site_features : defaultLiveFeatures;

  const whatsIncluded = material.whats_included?.length ? material.whats_included : [
    'Responsive design', 'Modern UI components', 'Clean code structure', 'Documentation'
  ];

  return (
    <Layout>
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/shop')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </motion.button>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* LEFT: Image/Video Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div
                className="relative aspect-video rounded-2xl overflow-hidden border border-border/50 bg-muted/30 cursor-pointer group"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                {hovering && youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0`}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <>
                    {material.image_url ? (
                      <img src={material.image_url} alt={material.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <Crown className="w-16 h-16 opacity-20" />
                      </div>
                    )}
                    {youtubeId && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-xl">
                          <Play className="w-7 h-7 text-primary-foreground ml-1" />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Live Demo Button */}
              {youtubeId && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setHovering(true)}
                  className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all text-sm font-medium"
                >
                  <Play className="w-4 h-4" /> Live Demo
                </motion.button>
              )}

              {/* What's Included */}
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4">What's Included</h3>
                <div className="grid grid-cols-2 gap-3">
                  {whatsIncluded.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Info + Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Category badge */}
              {material.category && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {material.category}
                </span>
              )}

              <h1 className="text-2xl md:text-3xl font-bold">{material.title}</h1>
              {material.description && (
                <p className="text-muted-foreground leading-relaxed">{material.description}</p>
              )}

              <h3 className="text-xl font-bold italic text-primary pt-2">Choose Your Option</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Premium Code Card */}
                <div className="group rounded-2xl border-2 border-red-500/30 bg-gradient-to-b from-red-500/10 via-primary/5 to-transparent p-5 space-y-4 relative overflow-hidden transition-all duration-500 hover:border-red-500/60 hover:shadow-[0_0_30px_-5px] hover:shadow-red-500/20 hover:scale-[1.02]">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-all duration-700" />
                  <div className="flex items-center gap-2">
                    <span className="text-red-400 font-mono text-lg group-hover:animate-[pulse_1.5s_ease-in-out_infinite]">&lt;/&gt;</span>
                    <h4 className="font-bold text-lg">Premium Code</h4>
                  </div>

                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-3xl font-black text-red-400 group-hover:text-red-300 transition-colors duration-300">₹{material.price}</span>
                    {material.original_price > 0 && material.original_price > material.price && (
                      <span className="text-lg text-muted-foreground line-through">₹{material.original_price}</span>
                    )}
                    {premiumSaving > 0 && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 flex items-center gap-1 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]">
                        <Tag className="w-3 h-3" /> Limited Offer
                      </span>
                    )}
                  </div>

                  {premiumSaving > 0 && (
                    <p className="text-sm text-green-400 font-semibold">Save ₹{premiumSaving}</p>
                  )}

                  {material.premium_note && (
                    <p className="text-xs text-amber-300/80 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
                      {material.premium_note}
                    </p>
                  )}

                  <ul className="space-y-2">
                    {premiumFeatures.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-red-400 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleOrder('premium')}
                    disabled={processing}
                    className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 flex items-center justify-center gap-2 border border-red-400/40"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    {material.price === 0 ? 'Get Free' : 'Order Premium Code'}
                  </button>
                </div>

                {/* Live Site Card */}
                {(material.live_site_price > 0 || material.live_site_file_url) && (
                  <div className="group rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent p-5 space-y-4 relative overflow-hidden transition-all duration-500 hover:border-emerald-500/60 hover:shadow-[0_0_30px_-5px] hover:shadow-emerald-500/20 hover:scale-[1.02]">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all duration-700" />
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-emerald-400 group-hover:animate-[pulse_1.5s_ease-in-out_infinite]" />
                      <h4 className="font-bold text-lg">Live Site</h4>
                    </div>

                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="text-3xl font-black text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">₹{material.live_site_price}</span>
                      {material.live_site_original_price > 0 && material.live_site_original_price > material.live_site_price && (
                        <span className="text-lg text-muted-foreground line-through">₹{material.live_site_original_price}</span>
                      )}
                      {liveSaving > 0 && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]">
                          <Tag className="w-3 h-3" /> Limited Offer
                        </span>
                      )}
                    </div>

                    {liveSaving > 0 && (
                      <p className="text-sm text-green-400 font-semibold">Save ₹{liveSaving}</p>
                    )}

                    {material.live_site_note && (
                      <p className="text-xs text-amber-300/80 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
                        {material.live_site_note}
                      </p>
                    )}

                    <ul className="space-y-2">
                      {liveFeatures.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleOrder('live')}
                      disabled={processing}
                      className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 flex items-center justify-center gap-2 border border-emerald-400/40"
                    >
                      <Globe className="w-4 h-4" />
                      Order Live Site
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {paymentTier && material && (
        <PaymentModal
          isOpen={!!paymentTier}
          onClose={() => setPaymentTier(null)}
          onConfirm={handleConfirmPurchase}
          productName={material.title}
          price={selectedPrice}
          processing={processing}
          gradientFrom={paymentTier === 'live' ? '#10b981' : '#7c3aed'}
          gradientTo={paymentTier === 'live' ? '#34d399' : '#a855f7'}
        />
      )}
    </Layout>
  );
}
