import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { supabase } from '@/integrations/supabase/client';
import { Users, Package, Heart, DollarSign, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export default function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [supporters, setSupporters] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price: 0, category: '' });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate('/');
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    const [{ data: s }, { data: p }] = await Promise.all([
      supabase.from('supporters').select('*').order('created_at', { ascending: false }),
      supabase.from('products').select('*').order('created_at', { ascending: false })
    ]);
    setSupporters(s || []);
    setProducts(p || []);
  };

  const addProduct = async () => {
    if (!newProduct.title || newProduct.price < 1) {
      toast({ title: 'Fill required fields', variant: 'destructive' });
      return;
    }
    const { error } = await supabase.from('products').insert(newProduct);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Product added!' });
      setNewProduct({ title: '', description: '', price: 0, category: '' });
      setShowAddProduct(false);
      fetchData();
    }
  };

  const deleteProduct = async (id: string) => {
    await supabase.from('products').delete().eq('id', id);
    fetchData();
  };

  if (loading || !isAdmin) return <Layout><div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div></Layout>;

  const totalRevenue = supporters.reduce((sum, s) => sum + (s.amount || 0), 0);

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[
                { icon: Users, label: 'Supporters', value: supporters.length, color: 'text-blue-500' },
                { icon: Package, label: 'Products', value: products.length, color: 'text-green-500' },
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

            <div className="grid lg:grid-cols-2 gap-8">
              <GlassCard>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Products</h2>
                  <GlowButton size="sm" onClick={() => setShowAddProduct(!showAddProduct)}><Plus className="w-4 h-4" />Add</GlowButton>
                </div>
                {showAddProduct && (
                  <div className="space-y-3 mb-4 p-4 border border-border rounded-lg">
                    <Input placeholder="Title" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />
                    <Textarea placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                    <div className="grid grid-cols-2 gap-3">
                      <Input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} />
                      <Input placeholder="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
                    </div>
                    <GlowButton onClick={addProduct} className="w-full">Save Product</GlowButton>
                  </div>
                )}
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {products.map((p) => (
                    <div key={p.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div><p className="font-medium">{p.title}</p><p className="text-sm text-muted-foreground">₹{p.price}</p></div>
                      <button onClick={() => deleteProduct(p.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                  {products.length === 0 && <p className="text-muted-foreground text-sm">No products yet</p>}
                </div>
              </GlassCard>

              <GlassCard>
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
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
