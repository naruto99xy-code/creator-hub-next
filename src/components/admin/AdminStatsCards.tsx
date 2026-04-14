import { useEffect, useState, useRef } from 'react';
import { Users, Heart, DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface AdminStatsCardsProps {
  supportersCount: number;
  materialsCount: number;
  totalRevenue: number;
  supporters?: { amount: number; created_at: string }[];
}

function AnimatedCounter({ target, prefix = '', duration = 1200 }: { target: number; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = Math.max(0, Math.floor(target * 0.7));
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + (target - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}</span>;
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const chartData = data.map((v, i) => ({ v, i }));
  return (
    <div className="absolute bottom-0 right-0 w-24 h-12 opacity-40">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const statsDef = [
  {
    key: 'supporters',
    icon: Users,
    label: 'Supporters',
    gradient: 'from-blue-500/20 via-blue-600/10 to-cyan-500/20',
    border: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    sparkColor: '#3b82f6',
  },
  {
    key: 'materials',
    icon: TrendingUp,
    label: 'Materials',
    gradient: 'from-green-500/20 via-emerald-600/10 to-teal-500/20',
    border: 'border-green-500/30',
    iconColor: 'text-green-400',
    iconBg: 'bg-green-500/10',
    sparkColor: '#10b981',
  },
  {
    key: 'members',
    icon: Heart,
    label: 'Members',
    gradient: 'from-pink-500/20 via-rose-600/10 to-fuchsia-500/20',
    border: 'border-pink-500/30',
    iconColor: 'text-pink-400',
    iconBg: 'bg-pink-500/10',
    sparkColor: '#ec4899',
  },
  {
    key: 'revenue',
    icon: DollarSign,
    label: 'Revenue',
    gradient: 'from-yellow-500/20 via-amber-600/10 to-orange-500/20',
    border: 'border-yellow-500/30',
    iconColor: 'text-yellow-400',
    iconBg: 'bg-yellow-500/10',
    sparkColor: '#f59e0b',
  },
];

export function AdminStatsCards({ supportersCount, materialsCount, totalRevenue, supporters = [] }: AdminStatsCardsProps) {
  const numericValues: Record<string, number> = {
    supporters: supportersCount,
    materials: materialsCount,
    members: 0,
    revenue: totalRevenue,
  };

  // Generate sparkline data from supporters
  const sparkData: Record<string, number[]> = {
    supporters: supporters.length > 0 ? supporters.slice(0, 7).map((_, i) => i + 1).reverse() : [1, 2, 3, 2, 4, 3, 5],
    materials: [2, 3, 1, 4, 3, 5, 4],
    members: [0, 0, 1, 0, 1, 0, 0],
    revenue: supporters.length > 0 ? supporters.slice(0, 7).map((s) => s.amount).reverse() : [100, 200, 150, 300, 250, 400],
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {statsDef.map((stat, i) => (
        <motion.div
          key={stat.key}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: i * 0.12, type: 'spring', stiffness: 180, damping: 15 }}
          whileHover={{ scale: 1.06, y: -6, transition: { type: 'spring', stiffness: 300 } }}
          className={`relative overflow-hidden rounded-2xl border ${stat.border} bg-gradient-to-br ${stat.gradient} backdrop-blur-xl p-5 shadow-xl cursor-default group`}
        >
          {/* Animated background orb */}
          <motion.div
            className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-white/5 to-transparent"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-tr from-white/3 to-transparent"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          
          <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
            <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
          </div>
          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">{stat.label}</p>
          <p className="text-2xl font-black mt-1 tabular-nums">
            {stat.key === 'revenue' ? (
              <AnimatedCounter target={numericValues[stat.key]} prefix="₹" />
            ) : (
              <AnimatedCounter target={numericValues[stat.key]} />
            )}
          </p>

          <MiniSparkline data={sparkData[stat.key]} color={stat.sparkColor} />
        </motion.div>
      ))}
    </div>
  );
}
