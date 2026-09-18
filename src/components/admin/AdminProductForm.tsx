import { useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { GlowButton } from '@/components/ui/GlowButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UploadCloud, Loader2, X, FileArchive } from 'lucide-react';
import type { ProductRow } from './AdminProductsSection';

export interface ProductFormState {
  title: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
  file_url: string;
  download_count: string;
  is_active: boolean;
}

export const EMPTY_PRODUCT_FORM: ProductFormState = {
  title: '', description: '', price: '', category: 'Templates',
  image_url: '', file_url: '', download_count: '0', is_active: true,
};

const CATEGORIES = ['Templates', 'Tools', 'Automation', 'Resources', 'Portfolio', '3D Templates'];

export function rowToForm(r: ProductRow): ProductFormState {
  return {
    title: r.title, description: r.description || '', price: String(r.price),
    category: r.category || 'Templates', image_url: r.image_url || '', file_url: r.file_url || '',
    download_count: String(r.download_count || 0), is_active: r.is_active,
  };
}

interface Props {
  form: ProductFormState;
  onChange: (form: ProductFormState) => void;
  onSubmit: () => void;
  onCancel: () => void;
  saving: boolean;
  isEditing: boolean;
}

export function AdminProductForm({ form, onChange, onSubmit, onCancel, saving, isEditing }: Props) {
  const { toast } = useToast();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof ProductFormState>(key: K, value: ProductFormState[K]) =>
    onChange({ ...form, [key]: value });

  const uploadImage = async (file: File) => {
    setUploadingImage(true);
    try {
      const ext = file.name.split('.').pop();
      const path = `covers/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from('product-images').upload(path, file);
      if (error) { toast({ title: 'Upload failed', description: error.message, variant: 'destructive' }); return; }
      const { publicUrl } = supabase.storage.from('product-images').getPublicUrl(path).data;
      set('image_url', publicUrl);
    } finally {
      setUploadingImage(false);
    }
  };

  // The product's downloadable file lives in the private "product-files" bucket, so we
  // store just its storage path here — get-product-file signs it server-side after checking
  // the buyer actually paid (or is an admin), it's never a directly-usable public URL.
  const uploadFile = async (file: File) => {
    setUploadingFile(true);
    try {
      const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`;
      const { error } = await supabase.storage.from('product-files').upload(path, file);
      if (error) { toast({ title: 'Upload failed', description: error.message, variant: 'destructive' }); return; }
      set('file_url', path);
      toast({ title: 'File uploaded', description: path });
    } finally {
      setUploadingFile(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>Title *</Label>
        <Input placeholder="e.g. React Dashboard Template" value={form.title} onChange={(e) => set('title', e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea placeholder="Short description shown on the shop card" value={form.description} onChange={(e) => set('description', e.target.value)} rows={2} />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Price (₹, 0 = free) *</Label>
          <Input type="number" min={0} value={form.price} onChange={(e) => set('price', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={form.category} onValueChange={(v) => set('category', v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Download Count</Label>
          <Input type="number" min={0} value={form.download_count} onChange={(e) => set('download_count', e.target.value)} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Cover Image</Label>
          <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} />
          {form.image_url ? (
            <div className="flex items-center gap-2">
              <img src={form.image_url} alt="Cover" className="w-16 h-10 rounded-lg object-cover border border-border" />
              <button type="button" onClick={() => set('image_url', '')} className="p-1.5 rounded-md hover:bg-muted"><X className="w-4 h-4" /></button>
            </div>
          ) : (
            <div onClick={() => imageInputRef.current?.click()} className="border-2 border-dashed rounded-lg p-3 cursor-pointer text-center text-sm text-muted-foreground hover:border-primary/50 transition-colors">
              {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : <><UploadCloud className="w-4 h-4 mx-auto mb-1" />Upload cover image</>}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Product File (.zip — private, only released after purchase/admin)</Label>
          <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])} />
          {form.file_url ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-muted/30 text-xs truncate">
                <FileArchive className="w-3.5 h-3.5 shrink-0" /><span className="truncate">{form.file_url}</span>
              </div>
              <button type="button" onClick={() => set('file_url', '')} className="p-1.5 rounded-md hover:bg-muted shrink-0"><X className="w-4 h-4" /></button>
            </div>
          ) : (
            <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed rounded-lg p-3 cursor-pointer text-center text-sm text-muted-foreground hover:border-primary/50 transition-colors">
              {uploadingFile ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : <><UploadCloud className="w-4 h-4 mx-auto mb-1" />Upload product file</>}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Switch checked={form.is_active} onCheckedChange={(v) => set('is_active', v)} />
        <Label>Active (visible on the Shop page)</Label>
      </div>

      <div className="flex gap-3 pt-2">
        <GlowButton onClick={onSubmit} className="flex-1" disabled={saving}>
          {saving ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
        </GlowButton>
        {isEditing && <GlowButton variant="outline" onClick={onCancel}>Cancel</GlowButton>}
      </div>
    </div>
  );
}
