import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Package, Crown, Heart, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  if (loading) return <Layout><div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div></Layout>;

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="text-muted-foreground mb-8">{user?.email}</p>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[
                { icon: Crown, label: 'Membership', value: 'Free', color: 'text-yellow-500' },
                { icon: Package, label: 'Products', value: '0', color: 'text-primary' },
                { icon: Heart, label: 'Supported', value: '₹0', color: 'text-pink-500' },
                { icon: Download, label: 'Downloads', value: '0', color: 'text-secondary' },
              ].map((stat, i) => (
                <GlassCard key={i}>
                  <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </GlassCard>
              ))}
            </div>

            <GlassCard>
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              <p className="text-muted-foreground">No recent activity. Start exploring our products and membership plans!</p>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
