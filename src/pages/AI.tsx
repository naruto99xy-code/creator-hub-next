import { Layout } from '@/components/layout/Layout';
import { Myra2FeaturesSection } from '@/components/ai/Myra2FeaturesSection';
import { PublishedMaterials } from '@/components/shared/PublishedMaterials';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Heart, Code, Brain, MessageCircleHeart, Zap, Check, Loader2, Lock, Package } from 'lucide-react';
import { useRazorpay } from '@/hooks/useRazorpay';
import { useEffect, useRef, useState } from 'react';
import { PaymentModal } from '@/components/shop/PaymentModal';

interface AIProduct {
  name: string;
  badge: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  offerLabel?: string;
  offerEnd?: Date;
  features: string[];
  buttonText: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
}

const HOLI_OFFER_END = new Date('2025-03-05T23:59:59+05:30');

const aiProducts: AIProduct[] = [
  {
    name: 'Ariya AI ❤️',
    badge: 'NEW ARRIVAL',
    subtitle: 'Your Caring AI Companion',
    price: 799,
    originalPrice: 899,
    features: ['Empathetic Conversations', 'Personalized Responses', 'Voice & Text Chat', 'Mood Detection', 'Daily Motivation'],
    buttonText: 'Get Ariya',
    gradientFrom: '#e11d48',
    gradientTo: '#f43f5e',
    borderColor: 'border-rose-500/30',
    icon: <Heart className="w-5 h-5" />,
  },
  {
    name: 'Jarvis',
    badge: 'SYSTEM AUTOMATION',
    subtitle: 'AI System Assistant for Power Users',
    price: 799,
    originalPrice: 899,
    features: ['Voice Input (8 voices)', 'Full System Automation', 'Windows Management', 'WhatsApp Automation', 'PC Power Control'],
    buttonText: 'Buy Jarvis',
    gradientFrom: '#0d9488',
    gradientTo: '#06b6d4',
    borderColor: 'border-teal-500/30',
    icon: <Bot className="w-5 h-5" />,
  },
  {
    name: 'Myra 2.0',
    badge: 'PERSONAL ASSISTANT',
    subtitle: 'AI Personal Voice Assistant',
    price: 799,
    originalPrice: 899,
    features: ['Human-like Voice', 'Daily Automation', 'Smart Task Manager', 'News Updates', 'Music Playback'],
    buttonText: 'Buy Myra',
    gradientFrom: '#7c3aed',
    gradientTo: '#a855f7',
    borderColor: 'border-violet-500/30',
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    name: 'Jarvis + Myra Combo',
    badge: 'COMBO PACK 🔥',
    subtitle: 'Get Both AI Assistants at a Special Price',
    price: 1499,
    originalPrice: 1598,
    features: ['Everything in Jarvis', 'Everything in Myra 2.0', 'Save ₹100 on Bundle', 'Priority Support', 'Combo Activation Key'],
    buttonText: 'Buy Combo Pack',
    gradientFrom: '#7c3aed',
    gradientTo: '#06b6d4',
    borderColor: 'border-purple-500/30',
    icon: <Package className="w-5 h-5" />,
  },
  {
    name: 'Zara AI',
    badge: 'MOST POPULAR',
    subtitle: 'Zara AI – Android App',
    price: 1499,
    originalPrice: 1599,
    features: ['Full AI Girlfriend Experience', 'Voice + Chat Support', 'Emotional Intelligence', '24/7 Conversations', 'App-to-App Opening'],
    buttonText: 'Get Zara',
    gradientFrom: '#ec4899',
    gradientTo: '#f472b6',
    borderColor: 'border-pink-500/30',
    icon: <Heart className="w-5 h-5" />,
  },
  {
    name: 'AI Girlfriend',
    badge: 'AI COMPANION',
    subtitle: 'Realistic AI Companion Experience',
    price: 1699,
    originalPrice: 1799,
    features: ['Emotional Intelligence', 'Voice + Chat Interaction', 'Romantic Personality Modes', 'Daily Conversations', 'Memory Retention'],
    buttonText: 'Get AI Girlfriend',
    gradientFrom: '#f43f5e',
    gradientTo: '#fb7185',
    borderColor: 'border-rose-500/30',
    icon: <MessageCircleHeart className="w-5 h-5" />,
  },
  {
    name: 'Nova AI',
    badge: 'COMING SOON',
    subtitle: 'AI Developer Copilot',
    price: 1999,
    features: ['Code Suggestions', 'Bug Detection', 'Project Templates', 'AI Debug Assistant', 'GitHub Automation'],
    buttonText: 'Coming Soon',
    gradientFrom: '#2563eb',
    gradientTo: '#3b82f6',
    borderColor: 'border-blue-500/30',
    icon: <Code className="w-5 h-5" />,
    comingSoon: true,
  },
  {
    name: 'MJ AI',
    badge: 'COMING SOON',
    subtitle: 'Advanced Productivity Assistant',
    price: 1999,
    features: ['Task Automation', 'Reminder Engine', 'Smart Notes', 'Cross-App Assistance', 'Intelligent Suggestions'],
    buttonText: 'Coming Soon',
    gradientFrom: '#f59e0b',
    gradientTo: '#fbbf24',
    borderColor: 'border-amber-500/30',
    icon: <Zap className="w-5 h-5" />,
    comingSoon: true,
  },
];

function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; r: number; dx: number; dy: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,200,255,${p.alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

function AICard({ product, index, onBuy, processing }: { product: AIProduct; index: number; onBuy: (product: AIProduct) => void; processing: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={product.comingSoon ? {} : { scale: 1.04, y: -8 }}
      className="relative group"
    >
      <div
        className={`absolute -inset-0.5 rounded-2xl blur-lg transition-opacity duration-500 ${product.comingSoon ? 'opacity-20 animate-pulse' : 'opacity-30 group-hover:opacity-60'}`}
        style={{ background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})` }}
      />
      <div
        className={`relative h-full flex flex-col rounded-2xl border ${product.borderColor} bg-card/60 backdrop-blur-xl p-6 overflow-hidden ${product.comingSoon ? 'opacity-70' : ''}`}
        style={product.comingSoon ? { filter: 'blur(0.5px)' } : {}}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${product.gradientFrom}, ${product.gradientTo}, transparent)` }}
        />
        <span
          className="self-start text-[10px] font-bold tracking-widest px-3 py-1 rounded-full mb-4"
          style={{
            background: `linear-gradient(135deg, ${product.gradientFrom}22, ${product.gradientTo}22)`,
            color: product.gradientTo,
            border: `1px solid ${product.gradientFrom}44`,
          }}
        >
          {product.badge}
        </span>
        <div className="flex items-center gap-2 mb-1">
          <span style={{ color: product.gradientTo }}>{product.icon}</span>
          <h3 className="text-2xl font-bold text-foreground">{product.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-5">{product.subtitle}</p>
        <div className="mb-5">
          {product.originalPrice && (!product.offerEnd || new Date() < product.offerEnd) ? (
            <>
              <span className="text-lg text-muted-foreground line-through mr-2">₹{product.originalPrice}</span>
              <span className="text-3xl font-extrabold text-foreground">₹{product.price}</span>
              <span className="text-xs text-muted-foreground ml-2">(one-time)</span>
              {product.offerLabel && (
                <div className="mt-1.5 inline-flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide bg-green-500/20 text-green-400 border border-green-500/30">
                  {product.offerLabel}
                </div>
              )}
            </>
          ) : (
            <>
              <span className="text-3xl font-extrabold text-foreground">₹{product.price}</span>
              <span className="text-xs text-muted-foreground ml-2">(one-time)</span>
            </>
          )}
        </div>
        <ul className="space-y-2.5 mb-6 flex-1">
          {product.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 flex-shrink-0" style={{ color: product.gradientTo }} />
              {f}
            </li>
          ))}
        </ul>
        <motion.button
          whileTap={product.comingSoon ? {} : { scale: 0.96 }}
          disabled={processing || product.comingSoon}
          onClick={() => !product.comingSoon && onBuy(product)}
          className="w-full py-3 rounded-lg font-semibold text-sm text-white transition-shadow duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{
            background: product.comingSoon
              ? `linear-gradient(135deg, ${product.gradientFrom}88, ${product.gradientTo}88)`
              : `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})`,
            boxShadow: `0 0 20px ${product.gradientFrom}55`,
          }}
          onMouseEnter={(e) => {
            if (!product.comingSoon) (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 35px ${product.gradientFrom}88`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 20px ${product.gradientFrom}55`;
          }}
        >
          {product.comingSoon ? <Lock className="w-4 h-4" /> : processing ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {product.buttonText}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function AI() {
  const { handlePurchaseWithDetails, processing } = useRazorpay();
  // No auth required - direct purchase flow
  const [selectedProduct, setSelectedProduct] = useState<AIProduct | null>(null);

  const handleBuy = (product: AIProduct) => {
    setSelectedProduct(product);
  };

  const handleConfirmPurchase = (name: string, mobile: string) => {
    if (!selectedProduct) return;
    handlePurchaseWithDetails({
      productName: selectedProduct.name,
      price: selectedProduct.price,
      userName: name,
      userMobile: mobile,
      themeColor: selectedProduct.gradientFrom,
    });
    setSelectedProduct(null);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary blur-[150px]"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.07, 0.03] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary blur-[130px]"
          />
        </div>
        <FloatingParticles />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            AI <span className="glow-text">Ecosystem</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto"
          >
            Next Generation Intelligent Assistants
          </motion.p>
        </div>
      </section>

      {/* Intro */}
      <section className="pb-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold mb-4"
          >
            The Future of Personal AI Starts Here
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground leading-relaxed"
          >
            Explore our intelligent AI assistants designed to automate your life, enhance productivity, and deliver next-generation conversational experiences.
          </motion.p>
        </div>
      </section>

      {/* AI Products */}
      <section className="pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-14 text-center"
          >
            Choose Your <span className="glow-text">AI Assistant</span>
          </motion.h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 max-w-6xl mx-auto">
            {aiProducts.map((product, i) => (
              <AICard key={product.name} product={product} index={i} onBuy={handleBuy} processing={processing} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Deep Breakdown */}
      <Myra2FeaturesSection />

      {/* Payment Modal */}
      {selectedProduct && (
        <PaymentModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onConfirm={handleConfirmPurchase}
          productName={selectedProduct.name}
          price={selectedProduct.price}
          gradientFrom={selectedProduct.gradientFrom}
          gradientTo={selectedProduct.gradientTo}
          processing={processing}
        />
      )}
      <PublishedMaterials section="AI" title="AI Resources" subtitle="Tools and materials for AI development" />
    </Layout>
  );
}
