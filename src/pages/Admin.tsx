import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { MaterialsSection } from '@/components/admin/MaterialsSection';
import { AdminStatsCards } from '@/components/admin/AdminStatsCards';
import { AdminCharts } from '@/components/admin/AdminCharts';
import { AdminExport } from '@/components/admin/AdminExport';

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
            />

            <AdminCharts supporters={supporters} materials={materials} />

            {/* Recent Supporters */}
            <GlassCard className="mb-8">
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                🤝 Recent Supporters
              </h2>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {supporters.map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                  >
                    <div className="flex justify-between">
                      <p className="font-medium">{s.name}</p>
                      <p className="text-primary font-bold">₹{s.amount}</p>
                    </div>
                    {s.message && <p className="text-sm text-muted-foreground mt-1">{s.message}</p>}
                  </motion.div>
                ))}
                {supporters.length === 0 && <p className="text-muted-foreground text-sm">No supporters yet</p>}
              </div>
            </GlassCard>

            <MaterialsSection />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
