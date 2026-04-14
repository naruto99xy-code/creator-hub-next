import { useMemo } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, AreaChart, Area, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

interface Supporter { name: string; amount: number; created_at: string; }
interface Material { content_type: string; category: string | null; is_premium: boolean; download_count?: number; }
interface AdminChartsProps { supporters: Supporter[]; materials: Material[]; }

const COLORS = ['#8b5cf6', '#06b6d4', '#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#a855f7', '#14b8a6'];

const tooltipStyle = (borderColor: string) => ({
  background: 'rgba(10,10,25,0.95)',
  border: `1px solid ${borderColor}`,
  borderRadius: 14,
  color: '#fff',
  boxShadow: `0 8px 32px ${borderColor}33`,
  padding: '10px 14px',
  fontSize: 13,
});

const AnimatedBar = (props: any) => {
  const { x, y, width, height, fill } = props;
  return (
    <motion.rect
      x={x} y={y} width={width} rx={6}
      initial={{ height: 0, y: y + height }}
      animate={{ height, y }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      fill={fill}
    />
  );
};

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
    materials.forEach((m) => { types[m.content_type || 'Other'] = (types[m.content_type || 'Other'] || 0) + 1; });
    return Object.entries(types).map(([name, value]) => ({ name, value }));
  }, [materials]);

  const premiumVsFree = useMemo(() => {
    let premium = 0, free = 0;
    materials.forEach((m) => m.is_premium ? premium++ : free++);
    return [{ name: 'Premium', value: premium }, { name: 'Free', value: free }].filter((d) => d.value > 0);
  }, [materials]);

  const topSupporters = useMemo(() => {
    return [...supporters].sort((a, b) => b.amount - a.amount).slice(0, 5).map((s) => ({ name: s.name, amount: s.amount }));
  }, [supporters]);

  // Radar chart data for material health overview
  const radarData = useMemo(() => {
    const totalMats = materials.length || 1;
    const premiumCount = materials.filter((m) => m.is_premium).length;
    const categories = new Set(materials.map((m) => m.category).filter(Boolean)).size;
    const types = new Set(materials.map((m) => m.content_type).filter(Boolean)).size;
    const totalDownloads = materials.reduce((s, m) => s + (m.download_count || 0), 0);
    return [
      { metric: 'Total', value: Math.min(totalMats * 20, 100) },
      { metric: 'Premium', value: Math.min((premiumCount / totalMats) * 100, 100) },
      { metric: 'Categories', value: Math.min(categories * 25, 100) },
      { metric: 'Types', value: Math.min(types * 25, 100) },
      { metric: 'Downloads', value: Math.min(totalDownloads * 5, 100) },
    ];
  }, [materials]);

  const chartCard = (delay: number, direction: 'left' | 'right', children: React.ReactNode) => (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? -30 : 30, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 150, damping: 18 }}
    >
      <GlassCard className="h-full hover:shadow-lg hover:shadow-primary/5 transition-shadow duration-500">
        {children}
      </GlassCard>
    </motion.div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {/* Revenue Over Time */}
      {chartCard(0.2, 'left', <>
        <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          💰 Revenue Timeline
        </h3>
        {revenueByMonth.length > 0 ? (
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueByMonth}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.5} />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="revStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: 'rgba(255,255,255,0.08)' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: 'rgba(255,255,255,0.08)' }} />
              <Tooltip contentStyle={tooltipStyle('rgba(139,92,246,0.4)')} />
              <Area type="monotone" dataKey="revenue" stroke="url(#revStroke)" strokeWidth={3} fill="url(#revGrad)" animationDuration={1500} animationEasing="ease-out" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-muted-foreground text-sm text-center py-16">No revenue data yet</p>
        )}
      </>)}

      {/* Top Supporters */}
      {chartCard(0.3, 'right', <>
        <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
          🏆 Top Supporters
        </h3>
        {topSupporters.length > 0 ? (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={topSupporters} layout="vertical" barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: 'rgba(255,255,255,0.08)' }} />
              <YAxis dataKey="name" type="category" tick={{ fill: '#e2e8f0', fontSize: 12, fontWeight: 600 }} width={80} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle('rgba(245,158,11,0.4)')} />
              <Bar dataKey="amount" radius={[0, 10, 10, 0]} shape={<AnimatedBar />}>
                {topSupporters.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-muted-foreground text-sm text-center py-16">No supporters yet</p>
        )}
      </>)}

      {/* Materials by Type - Donut */}
      {chartCard(0.4, 'left', <>
        <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
          📦 Materials Breakdown
        </h3>
        {materialsByType.length > 0 ? (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <defs>
                {COLORS.map((c, i) => (
                  <linearGradient key={i} id={`pieGrad${i}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={c} stopOpacity={1} />
                    <stop offset="100%" stopColor={c} stopOpacity={0.6} />
                  </linearGradient>
                ))}
              </defs>
              <Pie data={materialsByType} cx="50%" cy="50%" outerRadius={85} innerRadius={50} paddingAngle={5} dataKey="value"
                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                   animationBegin={200} animationDuration={1200} animationEasing="ease-out">
                {materialsByType.map((_, i) => (
                  <Cell key={i} fill={`url(#pieGrad${i % COLORS.length})`} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle('rgba(16,185,129,0.4)')} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-muted-foreground text-sm text-center py-16">No materials yet</p>
        )}
      </>)}

      {/* Content Health Radar */}
      {chartCard(0.5, 'right', <>
        <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
          🎯 Content Health Score
        </h3>
        {materials.length > 0 ? (
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={80}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
              <Radar dataKey="value" stroke="#a855f7" fill="#a855f7" fillOpacity={0.25} strokeWidth={2}
                     animationBegin={400} animationDuration={1200} />
            </RadarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-muted-foreground text-sm text-center py-16">No materials yet</p>
        )}
      </>)}
    </div>
  );
}
