import { useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

interface Supporter {
  name: string;
  amount: number;
  created_at: string;
}

interface Material {
  content_type: string;
  category: string | null;
  is_premium: boolean;
}

interface AdminChartsProps {
  supporters: Supporter[];
  materials: Material[];
}

const COLORS = ['#8b5cf6', '#06b6d4', '#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#ec4899'];

export function AdminCharts({ supporters, materials }: AdminChartsProps) {
  const revenueByMonth = useMemo(() => {
    const months: Record<string, number> = {};
    supporters.forEach((s) => {
      const d = new Date(s.created_at);
      const key = `${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}`;
      months[key] = (months[key] || 0) + (s.amount || 0);
    });
    return Object.entries(months).map(([name, revenue]) => ({ name, revenue }));
  }, [supporters]);

  const materialsByType = useMemo(() => {
    const types: Record<string, number> = {};
    materials.forEach((m) => {
      const t = m.content_type || 'Other';
      types[t] = (types[t] || 0) + 1;
    });
    return Object.entries(types).map(([name, value]) => ({ name, value }));
  }, [materials]);

  const premiumVsFree = useMemo(() => {
    let premium = 0, free = 0;
    materials.forEach((m) => m.is_premium ? premium++ : free++);
    return [
      { name: 'Premium', value: premium },
      { name: 'Free', value: free },
    ].filter((d) => d.value > 0);
  }, [materials]);

  const topSupporters = useMemo(() => {
    return [...supporters]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)
      .map((s) => ({ name: s.name, amount: s.amount }));
  }, [supporters]);

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {/* Revenue Over Time */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
        <GlassCard className="h-full">
          <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            💰 Revenue Over Time
          </h3>
          {revenueByMonth.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueByMonth}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip contentStyle={{ background: 'rgba(15,15,30,0.9)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 12, color: '#fff' }} />
                <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} fill="url(#revenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-sm text-center py-12">No revenue data yet</p>
          )}
        </GlassCard>
      </motion.div>

      {/* Top Supporters */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
        <GlassCard className="h-full">
          <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            🏆 Top Supporters
          </h3>
          {topSupporters.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topSupporters} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 12 }} width={80} />
                <Tooltip contentStyle={{ background: 'rgba(15,15,30,0.9)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 12, color: '#fff' }} />
                <Bar dataKey="amount" radius={[0, 8, 8, 0]}>
                  {topSupporters.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-sm text-center py-12">No supporters yet</p>
          )}
        </GlassCard>
      </motion.div>

      {/* Materials by Type */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
        <GlassCard className="h-full">
          <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            📦 Materials by Type
          </h3>
          {materialsByType.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={materialsByType} cx="50%" cy="50%" outerRadius={80} innerRadius={45} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {materialsByType.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'rgba(15,15,30,0.9)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 12, color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-sm text-center py-12">No materials yet</p>
          )}
        </GlassCard>
      </motion.div>

      {/* Premium vs Free */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
        <GlassCard className="h-full">
          <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
            👑 Premium vs Free
          </h3>
          {premiumVsFree.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={premiumVsFree} cx="50%" cy="50%" outerRadius={80} innerRadius={45} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  <Cell fill="#f59e0b" />
                  <Cell fill="#10b981" />
                </Pie>
                <Tooltip contentStyle={{ background: 'rgba(15,15,30,0.9)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 12, color: '#fff' }} />
                <Legend wrapperStyle={{ color: '#94a3b8' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-sm text-center py-12">No materials yet</p>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
