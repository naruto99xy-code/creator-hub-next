import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { MaterialsSection } from '@/components/admin/MaterialsSection';
import { AdminStatsCards } from '@/components/admin/AdminStatsCards';
import { AdminCharts } from '@/components/admin/AdminCharts';
import { AdminExport } from '@/components/admin/AdminExport';
import { Crown, MessageSquare, Calendar } from 'lucide-react';

export default function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [supporters, setSupporters] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate('/');
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin]);

  const fetchData = async () => {
    const [{ data: s }, { data: m }] = await Promise.all([
      supabase.from('supporters').select('*').order('created_at', { ascending: false }),
      supabase.from('materials').select('*').order('created_at', { ascending: false }),
    ]);
    setSupporters(s || []);
    setMaterials(m || []);
  };

  if (loading || !isAdmin) return <Layout><div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div></Layout>;

  const totalRevenue = supporters.reduce((sum, s) => sum + (s.amount || 0), 0);

  const getRankColor = (i: number) => {
    if (i === 0) return 'from-yellow-500/30 to-amber-500/10 border-yellow-500/40';
    if (i === 1) return 'from-slate-400/20 to-gray-500/10 border-slate-400/30';
    if (i === 2) return 'from-orange-600/20 to-amber-700/10 border-orange-600/30';
    return 'from-muted/30 to-muted/10 border-border/50';
  };

  const getRankEmoji = (i: number) => {
    if (i === 0) return '🥇';
    if (i === 1) return '🥈';
    if (i === 2) return '🥉';
    return `#${i + 1}`;
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground text-sm mt-1">Manage your content, analytics & exports</p>
              </div>
              <AdminExport supporters={supporters} materials={materials} />
            </div>

            <AdminStatsCards
              supportersCount={supporters.length}
              materialsCount={materials.length}
              totalRevenue={totalRevenue}
              supporters={supporters}
            />

            <AdminCharts supporters={supporters} materials={materials} />

            {/* Recent Supporters - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <GlassCard className="mb-8 overflow-hidden">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <Crown className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      Recent Supporters
                    </h2>
                    <p className="text-xs text-muted-foreground">{supporters.length} total supporters</p>
                  </div>
                </div>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  <AnimatePresence>
                    {supporters.map((s, i) => (
                      <motion.div
                        key={s.id}
                        initial={{ opacity: 0, x: -30, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                        whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.2 } }}
                        className={`relative p-4 rounded-xl border bg-gradient-to-r ${getRankColor(i)} backdrop-blur-sm cursor-default group`}
                      >
                        {/* Rank badge */}
                        <div className="absolute -left-1 -top-1 w-8 h-8 rounded-lg bg-background/80 backdrop-blur flex items-center justify-center text-sm font-bold shadow-lg border border-border/50">
                          {getRankEmoji(i)}
                        </div>

                        <div className="flex justify-between items-start ml-6">
                          <div className="flex-1">
                            <p className="font-bold text-base group-hover:text-primary transition-colors">{s.name}</p>
                            {s.message && (
                              <div className="flex items-start gap-1.5 mt-1.5">
                                <MessageSquare className="w-3 h-3 text-muted-foreground mt-0.5 shrink-0" />
                                <p className="text-sm text-muted-foreground italic">"{s.message}"</p>
                              </div>
                            )}
                            <div className="flex items-center gap-1.5 mt-2">
                              <Calendar className="w-3 h-3 text-muted-foreground" />
                              <p className="text-xs text-muted-foreground">
                                {new Date(s.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </p>
                              {s.is_monthly && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400 font-semibold ml-2">
                                  MONTHLY
                                </span>
                              )}
                            </div>
                          </div>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 + 0.3, type: 'spring', stiffness: 300 }}
                            className="text-right"
                          >
                            <p className="text-2xl font-black bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
                              ₹{s.amount}
                            </p>
                          </motion.div>
                        </div>

                        {/* Hover glow effect */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-primary/5 to-transparent" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {supporters.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground text-sm">No supporters yet</p>
                      <p className="text-muted-foreground/50 text-xs mt-1">Supporters will appear here when someone contributes</p>
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>

            <MaterialsSection />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
