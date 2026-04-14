import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ShoppingCart, Sparkles, Zap, Package, Star } from 'lucide-react';

const floatingItems = [
  { icon: ShoppingCart, label: 'Cart', x: '10%', y: '20%', delay: 0, color: 'from-primary to-secondary' },
  { icon: Sparkles, label: 'Premium', x: '80%', y: '15%', delay: 0.3, color: 'from-pink-500 to-rose-500' },
  { icon: Zap, label: 'Fast', x: '70%', y: '70%', delay: 0.6, color: 'from-amber-500 to-orange-500' },
  { icon: Package, label: 'Products', x: '15%', y: '65%', delay: 0.9, color: 'from-blue-500 to-cyan-500' },
  { icon: Star, label: 'Top', x: '50%', y: '80%', delay: 1.2, color: 'from-green-500 to-emerald-500' },
];

export function ShopHero3D() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -120]), { stiffness: 80, damping: 20 });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), { stiffness: 80, damping: 20 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.85]), { stiffness: 80, damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, 15]), { stiffness: 80, damping: 20 });

  return (
    <div ref={ref} className="relative h-[50vh] min-h-[360px] overflow-hidden">
      {/* Background orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-secondary/20 blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-accent/10 blur-[120px]" />
      </motion.div>

      {/* Particle grid */}
      <div className="absolute inset-0 particle-grid opacity-30" />

      {/* 3D floating icons */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + item.delay, type: 'spring', stiffness: 200 }}
          style={{ left: item.x, top: item.y, y: y1 }}
          className="absolute z-10"
        >
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotateY: [0, 180, 360],
            }}
            transition={{
              y: { duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' },
              rotateY: { duration: 6 + i, repeat: Infinity, ease: 'linear' },
            }}
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg shadow-primary/20`}
            style={{ perspective: 800 }}
          >
            <item.icon className="w-5 h-5 text-primary-foreground" />
          </motion.div>
        </motion.div>
      ))}

      {/* Main 3D text content */}
      <motion.div
        style={{ y: y2, scale, opacity, rotateX, perspective: 1200 }}
        className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 pt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-5"
        >
          <Sparkles className="w-4 h-4" />
          Developer Marketplace
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-4xl md:text-6xl font-black mb-4 leading-tight"
        >
          <span className="glow-text">Premium Digital</span>
          <br />
          <span className="text-foreground">Products & Tools</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-muted-foreground text-base md:text-lg max-w-lg mb-6"
        >
          Explore hand-crafted templates, tools & resources to supercharge your development workflow.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary/40 flex items-start justify-center p-1.5"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
