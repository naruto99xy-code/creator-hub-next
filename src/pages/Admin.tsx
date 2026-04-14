import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { supabase } from '@/integrations/supabase/client';
import { Users, Package, Heart, DollarSign, Plus, Trash2, Upload, Image, Link } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MaterialsSection } from '@/components/admin/MaterialsSection';

export default function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [supporters, setSupporters] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price: 0, category: '', file_url: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [pricingType, setPricingType] = useState<'free' | 'premium'>('premium');
  const imageInputRef = useRef<HTMLInputElement>(null);

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

  const uploadFile = async (file: File, bucket: string): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const { error } = await supabase.storage.from(bucket).upload(fileName, file);
    if (error) {
      toast({ title: 'Upload failed', description: 'File upload failed. Please try again.', variant: 'destructive' });
      return null;
    }
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const addProduct = async () => {
    if (!newProduct.title || (pricingType === 'premium' && newProduct.price < 1)) {
      toast({ title: 'Fill required fields', variant: 'destructive' });
      return;
    }
    
    setUploading(true);
    let image_url: string | null = null;
    let file_url: string | null = null;

    try {
      if (imageFile) {
        image_url = await uploadFile(imageFile, 'product-images');
      }
      const { error } = await supabase.from('products').insert({
        title: newProduct.title,
        description: newProduct.description,
        price: pricingType === 'free' ? 0 : newProduct.price,
        category: newProduct.category,
        image_url,
        file_url: newProduct.file_url || null
      });
      
      if (error) {
        toast({ title: 'Error', description: 'Failed to add product. Please try again.', variant: 'destructive' });
      } else {
        toast({ title: 'Product added!' });
        setNewProduct({ title: '', description: '', price: 0, category: '', file_url: '' });
        setImageFile(null);
        setPricingType('premium');
        setShowAddProduct(false);
        fetchData();
      }
    } finally {
      setUploading(false);
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
                    <Input placeholder="Title *" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />
                    <Textarea placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                    <Input placeholder="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
                    
                    {/* Free / Premium Toggle */}
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Pricing Type</Label>
                      <RadioGroup value={pricingType} onValueChange={(v) => setPricingType(v as 'free' | 'premium')} className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="free" id="free" />
                          <Label htmlFor="free" className="cursor-pointer">Free</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="premium" id="premium" />
                          <Label htmlFor="premium" className="cursor-pointer">Premium</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {pricingType === 'premium' && (
                      <Input type="number" placeholder="Price (₹) *" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} />
                    )}
                    
                    {/* Product URL */}
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground flex items-center gap-2">
                        <Link className="w-4 h-4" /> Product URL (External link to file)
                      </Label>
                      <Input placeholder="https://example.com/file.zip" value={newProduct.file_url} onChange={(e) => setNewProduct({ ...newProduct, file_url: e.target.value })} />
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground flex items-center gap-2">
                        <Image className="w-4 h-4" /> Product Image
                      </Label>
                      <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      />
                      <div 
                        onClick={() => imageInputRef.current?.click()}
                        className="border-2 border-dashed border-border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors text-center"
                      >
                        {imageFile ? (
                          <p className="text-sm text-primary">{imageFile.name}</p>
                        ) : (
                          <p className="text-sm text-muted-foreground">Click to upload image</p>
                        )}
                      </div>
                    </div>

                    <GlowButton onClick={addProduct} className="w-full" disabled={uploading}>
                      {uploading ? (
                        <><Upload className="w-4 h-4 animate-spin" /> Uploading...</>
                      ) : (
                        'Save Product'
                      )}
                    </GlowButton>
                  </div>
                )}
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {products.map((p) => (
                    <div key={p.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {p.image_url ? (
                          <img src={p.image_url} alt={p.title} className="w-10 h-10 rounded object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                            <Package className="w-5 h-5 text-muted-foreground" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{p.title}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>₹{p.price}</span>
                         {p.file_url && <span className="text-green-500 flex items-center gap-1"><Link className="w-3 h-3" /> URL</span>}
                             {p.price === 0 && <span className="text-blue-400 text-xs font-medium">FREE</span>}
                          </div>
                        </div>
                      </div>
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
