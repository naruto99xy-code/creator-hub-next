import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Input } from '@/components/ui/input';
import { MaterialForm, MaterialFormData, emptyFormData } from './MaterialForm';
import { MaterialCard } from './MaterialCard';
import { Plus, Search, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Material {
  id: string;
  title: string;
  content_type: string;
  description: string | null;
  category: string | null;
  author: string | null;
  file_url: string | null;
  youtube_url: string | null;
  image_url: string | null;
  tags: string[] | null;
  software_compatibility: string[] | null;
  is_premium: boolean;
  is_featured: boolean;
  html_code: string | null;
  css_code: string | null;
  js_code: string | null;
  html_intro: string | null;
  css_intro: string | null;
  js_intro: string | null;
  download_count: number;
  rating: number;
  created_at: string;
}

export function MaterialsSection() {
  const { toast } = useToast();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<MaterialFormData>(emptyFormData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const fetchMaterials = useCallback(async () => {
    const { data } = await supabase.from('materials').select('*').order('created_at', { ascending: false });
    if (data) setMaterials(data as Material[]);
  }, []);

  useEffect(() => { fetchMaterials(); }, [fetchMaterials]);

  const uploadThumbnail = async (file: File): Promise<string | null> => {
    const ext = file.name.split('.').pop();
    const name = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    const { error } = await supabase.storage.from('material-thumbnails').upload(name, file);
    if (error) { toast({ title: 'Upload failed', variant: 'destructive' }); return null; }
    return supabase.storage.from('material-thumbnails').getPublicUrl(name).data.publicUrl;
  };

  const handleSubmit = async (imageFile: File | null) => {
    if (!form.title.trim() || !form.content_type) {
      toast({ title: 'Title and Content Type are required', variant: 'destructive' });
      return;
    }

    setUploading(true);
    try {
      let image_url: string | null = null;
      if (imageFile) image_url = await uploadThumbnail(imageFile);

      const payload = {
        title: form.title.trim(),
        content_type: form.content_type,
        description: form.description || null,
        category: form.category || null,
        author: form.author || null,
        file_url: form.file_url || null,
        youtube_url: form.youtube_url || null,
        ...(image_url ? { image_url } : {}),
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
        software_compatibility: form.software_compatibility ? form.software_compatibility.split(',').map((t) => t.trim()).filter(Boolean) : [],
        is_premium: form.is_premium,
        is_featured: form.is_featured,
        html_code: form.html_code || null,
        css_code: form.css_code || null,
        js_code: form.js_code || null,
        html_intro: form.html_intro || null,
        css_intro: form.css_intro || null,
        js_intro: form.js_intro || null,
      };

      let error;
      if (editingId) {
        ({ error } = await supabase.from('materials').update(payload).eq('id', editingId));
      } else {
        ({ error } = await supabase.from('materials').insert(payload));
      }

      if (error) {
        toast({ title: 'Error', description: 'Failed to save material.', variant: 'destructive' });
      } else {
        toast({ title: editingId ? 'Material updated!' : 'Material created!' });
        resetForm();
        fetchMaterials();
      }
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setForm(emptyFormData);
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (m: Material) => {
    setForm({
      title: m.title,
      content_type: m.content_type,
      description: m.description || '',
      category: m.category || '',
      author: m.author || '',
      file_url: m.file_url || '',
      youtube_url: m.youtube_url || '',
      tags: m.tags?.join(', ') || '',
      software_compatibility: m.software_compatibility?.join(', ') || '',
      is_premium: m.is_premium,
      is_featured: m.is_featured,
      html_code: m.html_code || '',
      css_code: m.css_code || '',
      js_code: m.js_code || '',
      html_intro: m.html_intro || '',
      css_intro: m.css_intro || '',
      js_intro: m.js_intro || '',
    });
    setEditingId(m.id);
    setShowForm(true);
  };

  const deleteMaterial = async (id: string) => {
    const { error } = await supabase.from('materials').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: 'Failed to delete.', variant: 'destructive' });
    } else {
      toast({ title: 'Material deleted' });
      fetchMaterials();
    }
  };

  const categories = [...new Set(materials.map((m) => m.category).filter(Boolean))];

  const filtered = materials.filter((m) => {
    const matchesSearch = !search || m.title.toLowerCase().includes(search.toLowerCase()) || m.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'all' || m.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <GlassCard className="mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold">Materials</h2>
        <GlowButton size="sm" onClick={() => { setShowForm(!showForm); if (showForm) resetForm(); }}>
          {showForm ? <><X className="w-4 h-4" /> Close</> : <><Plus className="w-4 h-4" /> Add Material</>}
        </GlowButton>
      </div>

      {showForm && (
        <div className="mb-6 p-4 border border-border rounded-lg bg-muted/20">
          <MaterialForm
            form={form}
            onChange={setForm}
            onSubmit={handleSubmit}
            uploading={uploading}
            isEditing={!!editingId}
            onCancel={resetForm}
          />
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search materials..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="All categories" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => <SelectItem key={c!} value={c!}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Material Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m) => (
          <MaterialCard key={m.id} material={m} onEdit={() => startEdit(m)} onDelete={() => deleteMaterial(m.id)} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          {materials.length === 0 ? 'No materials yet. Add your first one!' : 'No materials match your search.'}
        </p>
      )}
    </GlassCard>
  );
}
