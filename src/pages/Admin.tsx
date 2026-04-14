import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { supabase } from '@/integrations/supabase/client';
import { Users, Heart, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { MaterialsSection } from '@/components/admin/MaterialsSection';

export default function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [supporters, setSupporters] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate('/');
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin]);

  const fetchData = async () => {
    const { data } = await supabase.from('supporters').select('*').order('created_at', { ascending: false });
    setSupporters(data || []);
  };

  if (loading || !isAdmin) return <Layout><div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div></Layout>;

  const totalRevenue = supporters.reduce((sum, s) => sum + (s.amount || 0), 0);

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { icon: Users, label: 'Supporters', value: supporters.length, color: 'text-blue-500' },
                { icon: Heart, label: 'Members', value: 0, color: 'text-pink-500' },
                { icon: DollarSign, label: 'Revenue', value: `₹${totalRevenue}`, color: 'text-yellow-500' },
              ].map((stat, i) => (
                <GlassCard key={i}>
                  <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </GlassCard>
              ))}
            </div>

            <GlassCard className="mb-8">
              <h2 className="text-xl font-bold mb-4">Recent Supporters</h2>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {supporters.map((s) => (
                  <div key={s.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex justify-between"><p className="font-medium">{s.name}</p><p className="text-primary font-bold">₹{s.amount}</p></div>
                    {s.message && <p className="text-sm text-muted-foreground mt-1">{s.message}</p>}
                  </div>
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
