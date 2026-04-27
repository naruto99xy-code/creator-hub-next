import { motion, AnimatePresence } from 'framer-motion';
import { Code, Package, Sparkles, Heart, Bot, Check, Loader2, Download, Flame, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRazorpay } from '@/hooks/useRazorpay';
import { PaymentModal } from '@/components/shop/PaymentModal';

// Flash sale: ₹3,500 for 24 hours, then auto-revert to ₹4,500
const SALE_END = new Date('2026-04-28T07:03:36.556Z').getTime();
const SALE_PRICE = 3500;
const DEFAULT_PRICE = 4500;

function useSaleCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, SALE_END - now);
  const active = diff > 0;
  const totalSec = Math.floor(diff / 1000);
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  return { active, hours, minutes, seconds };
}

function DigitBlock({ value, label }: { value: number; label: string }) {
  const padded = value.toString().padStart(2, '0');
  return (
    <div className="flex flex-col items-center">
      <div className="relative min-w-[58px] sm:min-w-[68px] px-3 py-2 rounded-xl border border-cyan-400/40 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-md overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={padded}
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="block text-2xl sm:text-3xl font-extrabold text-center tabular-nums bg-gradient-to-b from-cyan-300 to-purple-400 bg-clip-text text-transparent"
            style={{ filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.5))' }}
          >
            {padded}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1.5 text-[9px] sm:text-[10px] font-bold tracking-widest text-muted-foreground uppercase">{label}</span>
    </div>
  );
}

function FlashSaleBanner({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="relative max-w-2xl mx-auto mb-8"
    >
      {/* Outer pulsing glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.02, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-1 rounded-3xl blur-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
      />
      <div className="relative rounded-3xl border border-white/15 bg-card/85 backdrop-blur-2xl p-5 sm:p-6 overflow-hidden">
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        {/* Animated flame icon */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <motion.div
              animate={{ rotate: [-8, 8, -8], scale: [1, 1.1, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-orange-500/30 to-red-500/30 border border-orange-400/40"
              style={{ boxShadow: '0 0 20px rgba(251,146,60,0.4)' }}
            >
              <Flame className="w-6 h-6 text-orange-400" />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-[0.2em] text-orange-400 uppercase">Flash Sale</span>
                <span className="text-[10px] font-bold tracking-wide text-green-400 px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/30">SAVE ₹1,000</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-foreground mt-0.5">
                All Source Codes <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">₹3,500</span>
              </h3>
              <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5 justify-center sm:justify-start">
                <Clock className="w-3 h-3" /> Resets to ₹4,500 after timer ends
              </p>
            </div>
          </div>
          {/* Countdown */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <DigitBlock value={hours} label="Hrs" />
            <span className="text-2xl font-bold text-cyan-400/60 -mt-4">:</span>
            <DigitBlock value={minutes} label="Min" />
            <span className="text-2xl font-bold text-cyan-400/60 -mt-4">:</span>
            <DigitBlock value={seconds} label="Sec" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

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
            {product.originalPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through mr-2 opacity-60">₹{product.originalPrice.toLocaleString()}</span>
            )}
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
            {product.savings && (
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
            )}
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
  const sale = useSaleCountdown();

  // Apply flash sale pricing to individual products only
  const individualDisplay: SourceCodeProduct[] = individualProducts.map((p) => {
    if (sale.active) {
      return { ...p, price: SALE_PRICE, originalPrice: DEFAULT_PRICE, savings: 'Save ₹1,000' };
    }
    return { ...p, price: DEFAULT_PRICE, originalPrice: DEFAULT_PRICE, savings: '' };
  });
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
            className="text-center mb-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold">
              Or Buy <span className="glow-text">Individual</span> Source Code
            </h3>
          </motion.div>

          {sale.active && (
            <FlashSaleBanner hours={sale.hours} minutes={sale.minutes} seconds={sale.seconds} />
          )}

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 max-w-5xl mx-auto mb-16">
            {individualDisplay.map((product) => (
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
