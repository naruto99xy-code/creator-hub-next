import { useMemo } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

interface Supporter { name: string; amount: number; created_at: string; }
interface Material { content_type: string; category: string | null; is_premium: boolean; download_count?: number; }
interface AdminChartsProps { supporters: Supporter[]; materials: Material[]; }

const COLORS = ['#8b5cf6', '#06b6d4', '#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#a855f7', '#14b8a6'];

const tooltipStyle = {
  background: 'rgba(10,10,25,0.95)',
  border: '1px solid rgba(139,92,246,0.4)',
  borderRadius: 14,
  color: '#fff',
  boxShadow: '0 8px 32px rgba(139,92,246,0.15)',
  padding: '10px 14px',
  fontSize: 13,
};

export function AdminCharts({ supporters, materials }: AdminChartsProps) {
  // Revenue data - accumulate by month
  const revenueByMonth = useMemo(() => {
    if (supporters.length === 0) return [];
    const months: Record<string, number> = {};
    supporters.forEach((s) => {
      const d = new Date(s.created_at);
      const key = `${d.toLocaleString('default', { month: 'short' })} '${String(d.getFullYear()).slice(2)}`;
      months[key] = (months[key] || 0) + (s.amount || 0);
    });
    return Object.entries(months).map(([name, revenue]) => ({ name, revenue })).reverse();
  }, [supporters]);

  // Top supporters bar chart
  const topSupporters = useMemo(() => {
    return [...supporters].sort((a, b) => b.amount - a.amount).slice(0, 5).map((s) => ({ name: s.name, amount: s.amount }));
  }, [supporters]);

  // Materials by type
  const materialsByType = useMemo(() => {
    if (materials.length === 0) return [];
    const types: Record<string, number> = {};
    materials.forEach((m) => { types[m.content_type || 'Other'] = (types[m.content_type || 'Other'] || 0) + 1; });
    return Object.entries(types).map(([name, value]) => ({ name, value }));
  }, [materials]);

  // Content health radar
  const radarData = useMemo(() => {
    const total = materials.length || 1;
    const premium = materials.filter((m) => m.is_premium).length;
    const cats = new Set(materials.map((m) => m.category).filter(Boolean)).size;
    const types = new Set(materials.map((m) => m.content_type).filter(Boolean)).size;
    const downloads = materials.reduce((s, m) => s + (m.download_count || 0), 0);
    return [
      { metric: 'Total', value: Math.min(total * 20, 100), fullMark: 100 },
      { metric: 'Premium', value: Math.min((premium / total) * 100, 100), fullMark: 100 },
      { metric: 'Categories', value: Math.min(cats * 25, 100), fullMark: 100 },
      { metric: 'Types', value: Math.min(types * 25, 100), fullMark: 100 },
      { metric: 'Downloads', value: Math.min(downloads * 5, 100), fullMark: 100 },
    ];
  }, [materials]);

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {/* Revenue Over Time */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
        <GlassCard className="h-full">
          <h3 className="text-lg font-bold mb-1 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            💰 Revenue Timeline
          </h3>
          <p className="text-xs text-muted-foreground mb-4">Monthly revenue from supporters</p>
          {revenueByMonth.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueByMonth} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`₹${value}`, 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} fill="url(#revGrad)" dot={{ r: 5, fill: '#8b5cf6', stroke: '#1e1b4b', strokeWidth: 2 }} activeDot={{ r: 7, fill: '#a855f7', stroke: '#fff', strokeWidth: 2 }} animationDuration={1500} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[220px] text-muted-foreground text-sm">No revenue data yet</div>
          )}
        </GlassCard>
      </motion.div>

      {/* Top Supporters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
        <GlassCard className="h-full">
          <h3 className="text-lg font-bold mb-1 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            🏆 Top Supporters
          </h3>
          <p className="text-xs text-muted-foreground mb-4">Highest contribution amounts</p>
          {topSupporters.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topSupporters} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fill: '#e2e8f0', fontSize: 12, fontWeight: 600 }} width={70} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`₹${value}`, 'Amount']} />
                <Bar dataKey="amount" radius={[0, 8, 8, 0]} animationDuration={1200} animationEasing="ease-out">
                  {topSupporters.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[220px] text-muted-foreground text-sm">No supporters yet</div>
          )}
        </GlassCard>
      </motion.div>

      {/* Materials by Type - Donut */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
        <GlassCard className="h-full">
          <h3 className="text-lg font-bold mb-1 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            📦 Materials Breakdown
          </h3>
          <p className="text-xs text-muted-foreground mb-4">Content types distribution</p>
          {materialsByType.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={materialsByType} cx="50%" cy="50%" outerRadius={85} innerRadius={50} paddingAngle={5} dataKey="value"
                     label={({ name, value }) => `${name} (${value})`}
                     labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
                     animationBegin={200} animationDuration={1200}>
                  {materialsByType.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="rgba(0,0,0,0.3)" strokeWidth={1} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[220px] text-muted-foreground text-sm">No materials yet</div>
          )}
        </GlassCard>
      </motion.div>

      {/* Content Health Radar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
        <GlassCard className="h-full">
          <h3 className="text-lg font-bold mb-1 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            🎯 Content Health Score
          </h3>
          <p className="text-xs text-muted-foreground mb-4">Overall content quality metrics</p>
          {materials.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={75}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                <Radar dataKey="value" stroke="#a855f7" fill="#a855f7" fillOpacity={0.3} strokeWidth={2}
                       dot={{ r: 4, fill: '#a855f7', stroke: '#1e1b4b', strokeWidth: 2 }}
                       animationDuration={1500} />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[220px] text-muted-foreground text-sm">No materials yet</div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
