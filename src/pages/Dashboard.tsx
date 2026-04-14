import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Package, Crown, Heart, Download, Camera, Mail, User, Calendar,
  Shield, Sparkles, LogOut, Edit3, Check, X, ShoppingCart, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Profile {
  full_name: string | null;
  avatar_url: string | null;
  email: string | null;
  created_at: string | null;
}

interface Purchase {
  id: string;
  product_name: string;
  amount: number;
  payment_status: string;
  created_at: string;
}

interface SupportEntry {
  id: string;
  amount: number;
  created_at: string;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4, type: 'spring' as const, stiffness: 120 },
});

export default function Dashboard() {
  const { user, loading, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [totalSupported, setTotalSupported] = useState(0);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchPurchases();
      fetchSupportTotal();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('full_name, avatar_url, email, created_at')
      .eq('id', user!.id)
      .maybeSingle();
    if (data) {
      setProfile(data);
      setNewName(data.full_name || '');
    }
  };

  const fetchPurchases = async () => {
    const { data } = await supabase
      .from('purchases')
      .select('id, product_name, amount, payment_status, created_at')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false })
      .limit(5);
    if (data) setPurchases(data);
  };

  const fetchSupportTotal = async () => {
    const { data } = await supabase
      .from('supporters')
      .select('amount')
      .eq('user_id', user!.id)
      .eq('payment_status', 'completed');
    if (data) setTotalSupported(data.reduce((sum, s) => sum + s.amount, 0));
  };

  const handleAvatarUpload = async (file: File) => {
    if (!file || !user) return;
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const path = `${user.id}/avatar.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(path);

      const avatarUrl = `${urlData.publicUrl}?t=${Date.now()}`;

      await supabase
        .from('profiles')
        .update({ avatar_url: avatarUrl })
        .eq('id', user.id);

      setProfile((p) => p ? { ...p, avatar_url: avatarUrl } : p);
      toast({ title: 'Profile picture updated!' });
    } catch (err: any) {
      toast({ title: 'Upload failed', description: err.message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const handleNameSave = async () => {
    if (!user || !newName.trim()) return;
    await supabase.from('profiles').update({ full_name: newName.trim() }).eq('id', user.id);
    setProfile((p) => p ? { ...p, full_name: newName.trim() } : p);
    setEditingName(false);
    toast({ title: 'Name updated!' });
  };

  const handleAvatarRemove = async () => {
    if (!user) return;
    setUploading(true);
    try {
      // Remove from storage
      const { data: files } = await supabase.storage.from('avatars').list(user.id);
      if (files && files.length > 0) {
        await supabase.storage.from('avatars').remove(files.map(f => `${user.id}/${f.name}`));
      }
      // Clear in profile
      await supabase.from('profiles').update({ avatar_url: null }).eq('id', user.id);
      setProfile((p) => p ? { ...p, avatar_url: null } : p);
      toast({ title: 'Profile picture removed!' });
    } catch (err: any) {
      toast({ title: 'Remove failed', description: err.message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    : '';

  const stats = [
    { icon: Crown, label: 'Membership', value: 'Free', color: 'text-amber-400', bg: 'from-amber-500/10 to-amber-500/5' },
    { icon: Package, label: 'Purchases', value: String(purchases.length), color: 'text-primary', bg: 'from-primary/10 to-primary/5' },
    { icon: Heart, label: 'Supported', value: `₹${totalSupported}`, color: 'text-pink-500', bg: 'from-pink-500/10 to-pink-500/5' },
    { icon: Download, label: 'Downloads', value: '0', color: 'text-secondary', bg: 'from-secondary/10 to-secondary/5' },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative py-12 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-[15%] w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-[pulse_5s_ease-in-out_infinite]" />
          <div className="absolute bottom-20 right-[10%] w-72 h-72 bg-pink-500/8 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite_2s]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          {/* Profile Header Card */}
          <motion.div {...fadeUp(0)}>
            <GlassCard className="relative overflow-hidden mb-8">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-pink-500 to-secondary" />

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="relative group">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-24 rounded-full overflow-hidden border-3 border-primary/40 shadow-xl shadow-primary/10 bg-muted flex items-center justify-center"
                  >
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-muted-foreground" />
                    )}
                  </motion.div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    {uploading ? (
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </button>
                  {profile?.avatar_url && (
                    <button
                      onClick={handleAvatarRemove}
                      disabled={uploading}
                      className="absolute top-0 right-0 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleAvatarUpload(e.target.files[0])}
                  />
                </div>

                {/* User Info */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                    {editingName ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="h-8 w-48 text-sm bg-muted/50"
                          autoFocus
                        />
                        <button onClick={handleNameSave} className="text-emerald-400 hover:scale-110 transition-transform">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => setEditingName(false)} className="text-muted-foreground hover:scale-110 transition-transform">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <h1 className="text-2xl font-bold">
                          {profile?.full_name || 'Welcome!'}
                        </h1>
                        <button onClick={() => setEditingName(true)} className="text-muted-foreground hover:text-primary transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap justify-center sm:justify-start">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> {user?.email}
                    </span>
                    {memberSince && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> Joined {memberSince}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-3 justify-center sm:justify-start">
                    {isAdmin && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Admin
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Free Plan
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <GlowButton variant="secondary" size="sm" onClick={() => navigate('/shop')}>
                    <ShoppingCart className="w-4 h-4" /> Shop
                  </GlowButton>
                  <GlowButton variant="outline" size="sm" onClick={signOut}>
                    <LogOut className="w-4 h-4" /> Sign Out
                  </GlowButton>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08, type: 'spring' as const, stiffness: 150 }}
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <GlassCard className={`text-center bg-gradient-to-b ${stat.bg} border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_-5px] hover:shadow-primary/15`}>
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-2xl font-black">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          <motion.div {...fadeUp(0.4)}>
            <GlassCard className="relative overflow-hidden">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Recent Activity</h2>
              </div>

              {purchases.length > 0 ? (
                <div className="space-y-3">
                  {purchases.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.08 }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-muted/20 border border-border/30 hover:border-primary/20 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{p.product_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-sm">₹{p.amount}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          p.payment_status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {p.payment_status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                  <p className="text-muted-foreground">No purchases yet</p>
                  <GlowButton size="sm" className="mt-4" onClick={() => navigate('/shop')}>
                    <Sparkles className="w-4 h-4" /> Explore Shop
                  </GlowButton>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
