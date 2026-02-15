import { motion } from 'framer-motion';
import { Bot, Sparkles, Heart, Code, Brain, Check, Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useRazorpay } from '@/hooks/useRazorpay';

interface AIProduct {
  name: string;
  badge: string;
  subtitle: string;
  price: number;
  features: string[];
  buttonText: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  icon: React.ReactNode;
}

const aiProducts: AIProduct[] = [
  {
    name: 'Jarvis',
    badge: 'SYSTEM AUTOMATION',
    subtitle: 'AI System Assistant for Power Users',
    price: 899,
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
    price: 899,
    features: ['Human-like Voice', 'Daily Automation', 'Smart Task Manager', 'News Updates', 'Music Playback'],
    buttonText: 'Buy Myra',
    gradientFrom: '#7c3aed',
    gradientTo: '#a855f7',
    borderColor: 'border-violet-500/30',
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    name: 'Zara AI',
    badge: 'MOST POPULAR',
    subtitle: 'Zara AI – Android App',
    price: 1599,
    features: ['Full AI Girlfriend Experience', 'Voice + Chat Support', 'Emotional Intelligence', '24/7 Conversations', 'App-to-App Opening'],
    buttonText: 'Get Zara',
    gradientFrom: '#ec4899',
    gradientTo: '#f472b6',
    borderColor: 'border-pink-500/30',
    icon: <Heart className="w-5 h-5" />,
  },
  {
    name: 'Nova AI',
    badge: 'PRODUCTIVITY AI',
    subtitle: 'AI Developer Copilot',
    price: 1099,
    features: ['Code Suggestions', 'Bug Detection', 'Project Templates', 'AI Debug Assistant', 'GitHub Automation'],
    buttonText: 'Buy Nova',
    gradientFrom: '#2563eb',
    gradientTo: '#3b82f6',
    borderColor: 'border-blue-500/30',
    icon: <Code className="w-5 h-5" />,
  },
  {
    name: 'Aura AI',
    badge: 'SMART LIFESTYLE AI',
    subtitle: 'Emotional & Productivity Companion',
    price: 1299,
    features: ['Emotion-Aware Conversations', 'Personalized Daily Planning', 'Mood-Based Music Suggestions', 'Smart Reminder System', 'AI Growth Coaching'],
    buttonText: 'Buy Aura',
    gradientFrom: '#06b6d4',
    gradientTo: '#8b5cf6',
    borderColor: 'border-cyan-500/30',
    icon: <Brain className="w-5 h-5" />,
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

function AICard({ product, index, onPurchase, processing }: { product: AIProduct; index: number; onPurchase: (name: string, price: number) => void; processing: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.04, y: -8 }}
      className="relative group"
    >
      {/* Outer glow */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-30 blur-lg group-hover:opacity-60 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})` }}
      />

      <div
        className={`relative h-full flex flex-col rounded-2xl border ${product.borderColor} bg-card/60 backdrop-blur-xl p-6 overflow-hidden`}
      >
        {/* Top gradient line */}
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
          <span className="text-3xl font-extrabold text-foreground">₹{product.price}</span>
          <span className="text-xs text-muted-foreground ml-2">(one-time)</span>
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
          whileTap={{ scale: 0.96 }}
          disabled={processing}
          onClick={() => onPurchase(product.name, product.price)}
          className="w-full py-3 rounded-lg font-semibold text-sm text-white transition-shadow duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{
            background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})`,
            boxShadow: `0 0 20px ${product.gradientFrom}55`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 35px ${product.gradientFrom}88`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 20px ${product.gradientFrom}55`;
          }}
        >
          {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {product.buttonText}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function AIProductsSection() {
  const { handlePurchase, processing } = useRazorpay();

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background glows */}
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

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            AI <span className="glow-text">Power Collection</span>
          </h2>
          <p className="text-muted-foreground">Next Generation AI Assistants</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 max-w-6xl mx-auto">
          {aiProducts.map((product, i) => (
            <AICard key={product.name} product={product} index={i} onPurchase={handlePurchase} processing={processing} />
          ))}
        </div>
      </div>
    </section>
  );
}
