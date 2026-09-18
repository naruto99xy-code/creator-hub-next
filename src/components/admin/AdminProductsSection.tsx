import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Plus, X, Pencil, Trash2, Package, Download } from 'lucide-react';
import { AdminProductForm, ProductFormState, EMPTY_PRODUCT_FORM, rowToForm } from './AdminProductForm';

export interface ProductRow {
  id: string;
  title: string;
  description: string | null;
  price: number;
  image_url: string | null;
  file_url: string | null;
  category: string | null;
  download_count: number;
  is_active: boolean;
}

export function AdminProductsSection() {
  const { toast } = useToast();
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ProductFormState>(EMPTY_PRODUCT_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchProducts = useCallback(async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setProducts(data as ProductRow[]);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const resetForm = () => { setForm(EMPTY_PRODUCT_FORM); setEditingId(null); setShowForm(false); };
  const startEdit = (p: ProductRow) => { setForm(rowToForm(p)); setEditingId(p.id); setShowForm(true); };

  const handleSubmit = async () => {
    if (!form.title.trim()) { toast({ title: 'Title is required', variant: 'destructive' }); return; }
    if (form.price === '' || Number(form.price) < 0) { toast({ title: 'Valid price is required', variant: 'destructive' }); return; }

    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        price: Number(form.price),
        category: form.category,
        image_url: form.image_url || null,
        file_url: form.file_url || null,
        download_count: Number(form.download_count) || 0,
        is_active: form.is_active,
      };

      const { error } = editingId
        ? await supabase.from('products').update(payload).eq('id', editingId)
        : await supabase.from('products').insert(payload);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: editingId ? 'Product updated!' : 'Product created!' });
        resetForm();
        fetchProducts();
      }
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) toast({ title: 'Error', description: 'Failed to delete.', variant: 'destructive' });
    else { toast({ title: 'Product deleted' }); fetchProducts(); }
  };

  const toggleActive = async (p: ProductRow) => {
    const { error } = await supabase.from('products').update({ is_active: !p.is_active }).eq('id', p.id);
    if (!error) fetchProducts();
  };

  return (
    <GlassCard>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold">Shop Products</h2>
          <p className="text-xs text-muted-foreground mt-1">Every product card on the Shop page — price, cover image, downloadable file, and visibility.</p>
        </div>
        <GlowButton size="sm" onClick={() => { setShowForm(!showForm); if (showForm) resetForm(); }}>
          {showForm ? <><X className="w-4 h-4" /> Close</> : <><Plus className="w-4 h-4" /> Add Product</>}
        </GlowButton>
      </div>

      {showForm && (
        <div className="mb-6 p-4 border border-border rounded-lg bg-muted/20">
          <AdminProductForm form={form} onChange={setForm} onSubmit={handleSubmit} onCancel={resetForm} saving={saving} isEditing={!!editingId} />
        </div>
      )}

      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-muted/10">
            {p.image_url ? (
              <img src={p.image_url} alt={p.title} className="w-14 h-9 rounded-lg object-cover shrink-0 border border-border" />
            ) : (
              <div className="w-14 h-9 rounded-lg flex items-center justify-center shrink-0 bg-muted">
                <Package className="w-4 h-4 text-muted-foreground/50" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm truncate">{p.title} <span className="text-muted-foreground font-normal">{p.price === 0 ? 'FREE' : `₹${p.price}`}</span></p>
              <p className="text-xs text-muted-foreground truncate flex items-center gap-2">
                {p.category || 'Uncategorized'} <span className="inline-flex items-center gap-0.5"><Download className="w-3 h-3" />{p.download_count}</span>
                {!p.file_url && <span className="text-amber-500">• no file attached</span>}
              </p>
            </div>
            <button onClick={() => toggleActive(p)} className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${p.is_active ? 'bg-green-500/15 text-green-500' : 'bg-muted text-muted-foreground'}`}>
              {p.is_active ? 'ACTIVE' : 'HIDDEN'}
            </button>
            <button onClick={() => startEdit(p)} className="p-2 rounded-lg hover:bg-muted shrink-0"><Pencil className="w-4 h-4" /></button>
            <button onClick={() => deleteProduct(p.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive shrink-0"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-center text-muted-foreground py-8 text-sm">No products yet. Add your first one!</p>
        )}
      </div>
    </GlassCard>
  );
}
