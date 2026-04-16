import { motion } from 'framer-motion';
import { Code, Package, Sparkles, Heart, Bot, Check, Loader2, Download } from 'lucide-react';
import { useState } from 'react';
import { useRazorpay } from '@/hooks/useRazorpay';
import { PaymentModal } from '@/components/shop/PaymentModal';

interface SourceCodeProduct {
  name: string;
  badge: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  savings: string;
  features: string[];
  buttonText: string;
  gradientFrom: string;
  gradientTo: string;
  icon: React.ReactNode;
  isCombo?: boolean;
}

const comboProduct: SourceCodeProduct = {
  name: 'Jarvis 2.0 + MYRA 2.0',
  badge: '🔥 COMBO OFFER',
  subtitle: 'Source Code Bundle',
  price: 6999,
  originalPrice: 9000,
  savings: 'Save ₹2,001',
  features: [
    'Complete Jarvis 2.0 Source Code',
    'Complete Myra 2.0 Source Code',
    'Full Python Codebase',
    'Voice Recognition Module',
    'System Automation Scripts',
    'WhatsApp Automation Code',
    'Installation Guide & Docs',
    'Lifetime Updates',
  ],
  buttonText: 'Get Source Code',
  gradientFrom: '#f59e0b',
  gradientTo: '#ef4444',
  icon: <Package className="w-8 h-8" />,
  isCombo: true,
};

const allThreeBundle: SourceCodeProduct = {
  name: 'All 3 AI Source Codes',
  badge: '⚡ BEST VALUE',
  subtitle: 'Jarvis + Myra + Ariya',
  price: 9999,
  originalPrice: 13500,
  savings: 'Save ₹3,501',
  features: [
    'Complete Jarvis 2.0 Source Code',
    'Complete Myra 2.0 Source Code',
    'Complete Ariya 1.0 Source Code',
    'All Python Codebases & Modules',
    'Voice + AI Conversation Engine',
    'System & WhatsApp Automation',
    'Installation Guides & Full Docs',
    'Priority Support & Lifetime Updates',
  ],
  buttonText: 'Get Source Code',
  gradientFrom: '#06b6d4',
  gradientTo: '#8b5cf6',
  icon: <Code className="w-8 h-8" />,
  isCombo: true,
};

const individualProducts: SourceCodeProduct[] = [
  {
    name: 'Jarvis 2.0',
    badge: 'SOURCE CODE',
    subtitle: 'System AI Assistant',
    price: 4500,
    originalPrice: 5500,
    savings: 'Save ₹1,000',
    features: [
      'Full Python Source Code',
      'Voice Recognition & 8 TTS Voices',
      'System Automation Scripts',
      'WhatsApp Automation Module',
      'PC Power Control',
      'Installation Guide',
    ],
    buttonText: 'Get Source Code',
    gradientFrom: '#0d9488',
    gradientTo: '#06b6d4',
    icon: <Bot className="w-6 h-6" />,
  },
  {
    name: 'MYRA 2.0',
    badge: 'SOURCE CODE',
    subtitle: 'Personal Voice Assistant',
    price: 4500,
    originalPrice: 5500,
    savings: 'Save ₹1,000',
    features: [
      'Full Python Source Code',
      'Human-like Voice Engine',
      'Daily Automation Scripts',
      'Smart Task Manager Module',
      'News & Music Integration',
      'Installation Guide',
    ],
    buttonText: 'Get Source Code',
    gradientFrom: '#7c3aed',
    gradientTo: '#a855f7',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    name: 'ARIYA 1.0',
    badge: 'SOURCE CODE',
    subtitle: 'AI Companion',
    price: 4500,
    originalPrice: 5500,
    savings: 'Save ₹1,000',
    features: [
      'Full Python Source Code',
      'Empathetic Conversation Engine',
      'Mood Detection Module',
      'Personalized Response System',
      'Voice & Text Chat',
      'Installation Guide',
    ],
    buttonText: 'Get Source Code',
    gradientFrom: '#e11d48',
    gradientTo: '#f43f5e',
    icon: <Heart className="w-6 h-6" />,
  },
];

const whatsIncluded = [
  { title: 'Full Source Code', desc: 'Complete codebase with all modules' },
  { title: 'Install & Setup Guide', desc: 'Step-by-step setup instructions' },
  { title: 'Lifetime Updates', desc: 'Get updates with new features' },
  { title: '24/7 Support', desc: 'Dedicated support via Telegram' },
];

function SourceCodeCard({ product, onBuy, processing }: { product: SourceCodeProduct; onBuy: (p: SourceCodeProduct) => void; processing: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.03, y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Animated outer glow */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.7 : 0.25,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.4 }}
        className="absolute -inset-1 rounded-3xl blur-xl"
        style={{ background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})` }}
      />

      {/* Rotating border beam */}
      <div className="absolute -inset-[1px] rounded-3xl overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-50%] origin-center"
          style={{
            background: `conic-gradient(from 0deg, transparent 60%, ${product.gradientFrom}, ${product.gradientTo}, transparent 100%)`,
          }}
        />
      </div>

      <div className="relative h-full flex flex-col rounded-3xl border border-white/10 bg-card/80 backdrop-blur-2xl p-7 overflow-hidden">
        {/* Animated top gradient line */}
        <motion.div
          animate={{ backgroundPosition: isHovered ? '200% 0' : '0% 0' }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            backgroundSize: '200% 100%',
            backgroundImage: `linear-gradient(90deg, transparent, ${product.gradientFrom}, ${product.gradientTo}, transparent, ${product.gradientFrom}, ${product.gradientTo}, transparent)`,
          }}
        />

        {/* Corner accent dots */}
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full animate-pulse" style={{ background: product.gradientTo, boxShadow: `0 0 8px ${product.gradientTo}` }} />
        <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: product.gradientFrom, boxShadow: `0 0 6px ${product.gradientFrom}`, animationDelay: '1s' }} />

        {/* Badge */}
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="self-start text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full mb-5 backdrop-blur-sm"
          style={{
            background: `linear-gradient(135deg, ${product.gradientFrom}25, ${product.gradientTo}15)`,
            color: product.gradientTo,
            border: `1px solid ${product.gradientFrom}55`,
            boxShadow: `0 0 12px ${product.gradientFrom}20`,
          }}
        >
          {product.badge}
        </motion.span>

        {/* Icon + Name */}
        <div className="flex flex-col items-center text-center mb-5">
          <motion.div
            animate={isHovered ? { rotateY: 360 } : { rotateY: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="w-18 h-18 rounded-2xl flex items-center justify-center mb-3 relative"
            style={{
              background: `linear-gradient(145deg, ${product.gradientFrom}30, ${product.gradientTo}20)`,
              border: `1px solid ${product.gradientTo}30`,
              boxShadow: `0 8px 32px ${product.gradientFrom}25, inset 0 1px 0 ${product.gradientTo}20`,
              width: '72px',
              height: '72px',
            }}
          >
            <span style={{ color: product.gradientTo, filter: `drop-shadow(0 0 6px ${product.gradientTo}66)` }}>{product.icon}</span>
          </motion.div>
          <h3 className="text-xl font-bold text-foreground tracking-tight">{product.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{product.subtitle}</p>
        </div>

        {/* Price with animated highlight */}
        <div className="text-center mb-5 relative">
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 rounded-xl -m-2"
            style={{ background: `radial-gradient(ellipse at center, ${product.gradientFrom}10 0%, transparent 70%)` }}
          />
          <div className="relative">
            <span className="text-sm text-muted-foreground line-through mr-2 opacity-60">₹{product.originalPrice.toLocaleString()}</span>
            <span
              className="text-3xl font-extrabold"
              style={{
                background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: `drop-shadow(0 0 8px ${product.gradientFrom}40)`,
              }}
            >
              ₹{product.price.toLocaleString()}
            </span>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide ml-2"
              style={{
                background: `linear-gradient(135deg, rgba(34,197,94,0.2), rgba(34,197,94,0.1))`,
                color: '#4ade80',
                border: '1px solid rgba(34,197,94,0.3)',
                boxShadow: '0 0 10px rgba(34,197,94,0.15)',
              }}
            >
              {product.savings}
            </motion.div>
          </div>
        </div>

        {/* Payment badge */}
        <div className="flex items-center justify-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-muted/30 border border-border/50 w-fit mx-auto">
          <span className="text-[10px]">💳</span>
          <span className="text-[10px] text-muted-foreground font-medium tracking-wide">Razorpay • UPI • Cards</span>
        </div>

        {/* Features with staggered animation */}
        <ul className="space-y-2.5 mb-7 flex-1">
          {product.features.map((f, i) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2.5 text-sm text-muted-foreground group/item"
            >
              <div
                className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover/item:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${product.gradientFrom}20, ${product.gradientTo}15)`,
                  border: `1px solid ${product.gradientTo}25`,
                }}
              >
                <Check className="w-3 h-3" style={{ color: product.gradientTo }} />
              </div>
              <span className="transition-colors duration-200 group-hover/item:text-foreground">{f}</span>
            </motion.li>
          ))}
        </ul>

        {/* Enhanced Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ boxShadow: `0 0 40px ${product.gradientFrom}66, 0 0 80px ${product.gradientFrom}22` }}
          disabled={processing}
          onClick={() => onBuy(product)}
          className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})`,
            boxShadow: `0 0 25px ${product.gradientFrom}44, 0 4px 15px ${product.gradientFrom}33`,
          }}
        >
          {/* Button shine effect */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
          />
          <span className="relative flex items-center gap-2">
            {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {product.buttonText}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}

export function AISourceCodeSection() {
  const { handlePurchaseWithDetails, processing } = useRazorpay();
  const [selectedProduct, setSelectedProduct] = useState<SourceCodeProduct | null>(null);

  const handleBuy = (product: SourceCodeProduct) => {
    setSelectedProduct(product);
  };

  const handleConfirmPurchase = (name: string, mobile: string) => {
    if (!selectedProduct) return;
    handlePurchaseWithDetails({
      productName: `${selectedProduct.name} - Source Code`,
      price: selectedProduct.price,
      userName: name,
      userMobile: mobile,
      themeColor: selectedProduct.gradientFrom,
    });
    setSelectedProduct(null);
  };

  return (
    <>
      <section className="py-20 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500 blur-[150px]"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-purple-500 blur-[130px]"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">
              <Code className="w-4 h-4" /> For Developers
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Want to <span className="glow-text">Build Your Own?</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Get the complete AI source code and customize it to your needs
            </p>
          </motion.div>

          {/* Combo Pack - Featured */}
          <div className="max-w-xl mx-auto mb-12">
            <SourceCodeCard product={comboProduct} onBuy={handleBuy} processing={processing} />
          </div>

          {/* All 3 Bundle */}
          <div className="max-w-xl mx-auto mb-16">
            <SourceCodeCard product={allThreeBundle} onBuy={handleBuy} processing={processing} />
          </div>

          {/* Individual Source Codes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h3 className="text-2xl md:text-3xl font-bold">
              Or Buy <span className="glow-text">Individual</span> Source Code
            </h3>
          </motion.div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 max-w-5xl mx-auto mb-16">
            {individualProducts.map((product) => (
              <SourceCodeCard key={product.name} product={product} onBuy={handleBuy} processing={processing} />
            ))}
          </div>

          {/* What's Included */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
              What's <span className="glow-text">Included</span>
            </h3>
            <p className="text-center text-muted-foreground mb-8">Everything you need to get started</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {whatsIncluded.map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-card/50 backdrop-blur-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Payment Modal */}
      {selectedProduct && (
        <PaymentModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onConfirm={handleConfirmPurchase}
          productName={`${selectedProduct.name} - Source Code`}
          price={selectedProduct.price}
          gradientFrom={selectedProduct.gradientFrom}
          gradientTo={selectedProduct.gradientTo}
          processing={processing}
        />
      )}
    </>
  );
}
