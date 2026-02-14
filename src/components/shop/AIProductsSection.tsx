import { motion } from 'framer-motion';
import { Bot, Sparkles, Heart, Code, Check } from 'lucide-react';
import { toast } from 'sonner';

interface AIProduct {
  name: string;
  badge: string;
  subtitle: string;
  price: number;
  features: string[];
  buttonText: string;
  glowColor: string;
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
    glowColor: '180 100% 50%',
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
    glowColor: '270 80% 60%',
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
    glowColor: '330 80% 60%',
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
    glowColor: '217 91% 60%',
    gradientFrom: '#2563eb',
    gradientTo: '#3b82f6',
    borderColor: 'border-blue-500/30',
    icon: <Code className="w-5 h-5" />,
  },
];

function handlePurchase(productName: string) {
  toast.info(`Purchase flow for ${productName} coming soon!`);
}

function AICard({ product, index }: { product: AIProduct; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -6 }}
      className="relative group"
    >
      {/* Outer glow */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-40 blur-md group-hover:opacity-70 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})` }}
      />

      <div
        className={`relative h-full flex flex-col rounded-2xl border ${product.borderColor} bg-card/60 backdrop-blur-xl p-6 overflow-hidden`}
      >
        {/* Subtle top gradient line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${product.gradientFrom}, ${product.gradientTo}, transparent)` }}
        />

        {/* Badge */}
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

        {/* Icon + Title */}
        <div className="flex items-center gap-2 mb-1">
          <span style={{ color: product.gradientTo }}>{product.icon}</span>
          <h3 className="text-2xl font-bold text-foreground">{product.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-5">{product.subtitle}</p>

        {/* Price */}
        <div className="mb-5">
          <span className="text-3xl font-extrabold text-foreground">₹{product.price}</span>
          <span className="text-xs text-muted-foreground ml-2">(one-time)</span>
        </div>

        {/* Features */}
        <ul className="space-y-2.5 mb-6 flex-1">
          {product.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 flex-shrink-0" style={{ color: product.gradientTo }} />
              {f}
            </li>
          ))}
        </ul>

        {/* Button */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => handlePurchase(product.name)}
          className="w-full py-3 rounded-lg font-semibold text-sm text-white transition-shadow duration-300"
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
          {product.buttonText}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function AIProductsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-[100px]" />
      </div>

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

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {aiProducts.map((product, i) => (
            <AICard key={product.name} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
