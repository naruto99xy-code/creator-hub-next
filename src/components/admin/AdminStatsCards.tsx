import { Users, Heart, DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminStatsCardsProps {
  supportersCount: number;
  materialsCount: number;
  totalRevenue: number;
}

const stats = [
  {
    key: 'supporters',
    icon: Users,
    label: 'Supporters',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    glow: 'shadow-blue-500/10',
  },
  {
    key: 'materials',
    icon: TrendingUp,
    label: 'Materials',
    gradient: 'from-green-500/20 to-emerald-500/20',
    border: 'border-green-500/30',
    iconColor: 'text-green-400',
    glow: 'shadow-green-500/10',
  },
  {
    key: 'members',
    icon: Heart,
    label: 'Members',
    gradient: 'from-pink-500/20 to-rose-500/20',
    border: 'border-pink-500/30',
    iconColor: 'text-pink-400',
    glow: 'shadow-pink-500/10',
  },
  {
    key: 'revenue',
    icon: DollarSign,
    label: 'Revenue',
    gradient: 'from-yellow-500/20 to-amber-500/20',
    border: 'border-yellow-500/30',
    iconColor: 'text-yellow-400',
    glow: 'shadow-yellow-500/10',
  },
];

export function AdminStatsCards({ supportersCount, materialsCount, totalRevenue }: AdminStatsCardsProps) {
  const values: Record<string, string | number> = {
    supporters: supportersCount,
    materials: materialsCount,
    members: 0,
    revenue: `₹${totalRevenue.toLocaleString()}`,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.key}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.04, y: -4 }}
          className={`relative overflow-hidden rounded-xl border ${stat.border} bg-gradient-to-br ${stat.gradient} backdrop-blur-xl p-5 shadow-lg ${stat.glow} cursor-default`}
        >
          <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-white/5 to-transparent" />
          <stat.icon className={`w-7 h-7 ${stat.iconColor} mb-3`} />
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
          <p className="text-2xl font-extrabold mt-1">{values[stat.key]}</p>
        </motion.div>
      ))}
    </div>
  );
}
