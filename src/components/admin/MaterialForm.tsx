import { useState, useRef, useCallback } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { GlowButton } from '@/components/ui/GlowButton';
import { Upload, X, Image, Code, Info, Eye, LayoutGrid } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface MaterialFormData {
  title: string;
  content_type: string;
  description: string;
  category: string;
  author: string;
  file_url: string;
  youtube_url: string;
  tags: string;
  software_compatibility: string;
  is_premium: boolean;
  is_featured: boolean;
  price: number;
  publish_sections: string[];
  html_code: string;
  css_code: string;
  js_code: string;
  html_intro: string;
  css_intro: string;
  js_intro: string;
  original_price: number;
  live_site_price: number;
  live_site_original_price: number;
  live_site_file_url: string;
  whats_included: string;
  premium_features: string;
  live_site_features: string;
  premium_note: string;
  live_site_note: string;
}

export const emptyFormData: MaterialFormData = {
  title: '', content_type: '', description: '', category: '', author: '',
  file_url: '', youtube_url: '', tags: '', software_compatibility: '',
  is_premium: false, is_featured: false, price: 0, publish_sections: [],
  html_code: '', css_code: '', js_code: '',
  html_intro: '', css_intro: '', js_intro: '',
  original_price: 0, live_site_price: 0, live_site_original_price: 0,
  live_site_file_url: '', whats_included: '', premium_features: '',
  live_site_features: '', premium_note: '', live_site_note: '',
};

const PUBLISH_SECTIONS = ['Home', 'Services', 'AI', 'Shop', 'Support', 'Membership', 'Templates', 'Portfolio'];

const CATEGORIES = ['Templates', 'Code Snippets', 'Tutorials', 'UI Kits', 'Effects', 'Animations', 'Portfolio', 'Other'];
const CONTENT_TYPES = ['HTML/CSS', 'JavaScript', 'React Component', 'Animation', 'Template', 'Full Project', 'Other'];

interface MaterialFormProps {
  form: MaterialFormData;
  onChange: (form: MaterialFormData) => void;
  onSubmit: (imageFile: File | null) => void;
  uploading: boolean;
  isEditing: boolean;
  onCancel: () => void;
}

export function MaterialForm({ form, onChange, onSubmit, uploading, isEditing, onCancel }: MaterialFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = useCallback((file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) handleImageSelect(file);
  }, [handleImageSelect]);

  const set = (key: keyof MaterialFormData, value: string | boolean | number) =>
    onChange({ ...form, [key]: value });

  const previewContent = `<!DOCTYPE html><html><head><style>${form.css_code || ''}</style></head><body>${form.html_code || ''}<script>${form.js_code || ''}<\/script></body></html>`;
  const hasCode = form.html_code || form.css_code || form.js_code;

  return (
    <div className="space-y-4">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="w-full grid grid-cols-5 bg-muted/50">
          <TabsTrigger value="basic" className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Image className="w-3.5 h-3.5" /> Basic
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Code className="w-3.5 h-3.5" /> Code
          </TabsTrigger>
          <TabsTrigger value="detail" className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <LayoutGrid className="w-3.5 h-3.5" /> Detail
          </TabsTrigger>
          <TabsTrigger value="info" className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Info className="w-3.5 h-3.5" /> Info
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Eye className="w-3.5 h-3.5" /> Preview
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: BASIC */}
        <TabsContent value="basic" className="space-y-4 mt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input placeholder="Material title" value={form.title} onChange={(e) => set('title', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Content Type *</Label>
              <Select value={form.content_type} onValueChange={(v) => set('content_type', v)}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  {CONTENT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea placeholder="Brief description..." value={form.description} onChange={(e) => set('description', e.target.value)} rows={3} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => set('category', v)}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Author</Label>
              <Input placeholder="Author name" value={form.author} onChange={(e) => set('author', e.target.value)} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>File URL</Label>
              <Input placeholder="https://example.com/file.zip" value={form.file_url} onChange={(e) => set('file_url', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>YouTube URL</Label>
              <Input placeholder="https://youtube.com/watch?v=..." value={form.youtube_url} onChange={(e) => set('youtube_url', e.target.value)} />
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageSelect(e.target.files[0])} />
            <div
              onClick={() => imageInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors text-center ${dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
            >
              {imagePreview ? (
                <div className="relative inline-block">
                  <img src={imagePreview} alt="Preview" className="max-h-32 rounded" />
                  <button onClick={(e) => { e.stopPropagation(); setImageFile(null); setImagePreview(null); }} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="text-muted-foreground text-sm">
                  <Upload className="w-6 h-6 mx-auto mb-2" />
                  Drag & drop or click to upload
                </div>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tags (comma separated)</Label>
              <Input placeholder="react, animation, ui" value={form.tags} onChange={(e) => set('tags', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Software Compatibility</Label>
              <Input placeholder="premiere_pro, after_effects" value={form.software_compatibility} onChange={(e) => set('software_compatibility', e.target.value)} />
            </div>
          </div>

          {/* Publish Sections */}
          <div className="space-y-2">
            <Label>Publish Sections</Label>
            <div className="flex flex-wrap gap-2">
              {PUBLISH_SECTIONS.map((section) => {
                const selected = form.publish_sections.includes(section);
                return (
                  <button
                    key={section}
                    type="button"
                    onClick={() => {
                      const updated = selected
                        ? form.publish_sections.filter((s) => s !== section)
                        : [...form.publish_sections, section];
                      onChange({ ...form, publish_sections: updated });
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      selected
                        ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                        : 'bg-muted/50 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                    }`}
                  >
                    {section}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Switch
                checked={form.is_premium}
                onCheckedChange={(v) => {
                  onChange({ ...form, is_premium: v, price: v ? form.price : 0 });
                }}
              />
              <Label>Premium</Label>
            </div>
            {form.is_premium && (
              <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-200">
                <Label className="text-xs text-muted-foreground">Price</Label>
                <Input
                  type="number"
                  min={1}
                  placeholder="Enter price"
                  value={form.price || ''}
                  onChange={(e) => set('price', Number(e.target.value) || 0)}
                  className="w-28 h-8 text-sm"
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              <Switch checked={form.is_featured} onCheckedChange={(v) => set('is_featured', v)} />
              <Label>Featured</Label>
            </div>
          </div>
        </TabsContent>

        {/* TAB 2: CODE */}
        <TabsContent value="code" className="space-y-4 mt-4">
          {(['html_code', 'css_code', 'js_code'] as const).map((field) => (
            <div key={field} className="space-y-2">
              <Label>{field === 'html_code' ? 'HTML' : field === 'css_code' ? 'CSS' : 'JavaScript'} Code</Label>
              <Textarea
                value={form[field]}
                onChange={(e) => set(field, e.target.value)}
                placeholder={`Enter ${field.replace('_code', '').toUpperCase()} code...`}
                className="font-mono text-sm bg-muted/80 min-h-[200px] leading-relaxed"
                rows={10}
              />
            </div>
          ))}
        </TabsContent>

        {/* TAB: DETAIL PAGE */}
        <TabsContent value="detail" className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground">Configure the product detail page for Templates & Portfolio items.</p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Original Price (strikethrough)</Label>
              <Input type="number" min={0} placeholder="e.g. 200" value={form.original_price || ''} onChange={(e) => set('original_price', Number(e.target.value) || 0)} />
            </div>
            <div className="space-y-2">
              <Label>Live Site Price</Label>
              <Input type="number" min={0} placeholder="e.g. 265" value={form.live_site_price || ''} onChange={(e) => set('live_site_price', Number(e.target.value) || 0)} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Live Site Original Price (strikethrough)</Label>
              <Input type="number" min={0} placeholder="e.g. 379" value={form.live_site_original_price || ''} onChange={(e) => set('live_site_original_price', Number(e.target.value) || 0)} />
            </div>
            <div className="space-y-2">
              <Label>Live Site File URL</Label>
              <Input placeholder="https://..." value={form.live_site_file_url} onChange={(e) => set('live_site_file_url', e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>What's Included (comma separated)</Label>
            <Input placeholder="Responsive design, Modern UI, Clean code" value={form.whats_included} onChange={(e) => set('whats_included', e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Premium Code Features (comma separated)</Label>
            <Input placeholder="Complete source code, Easily editable, Setup instructions" value={form.premium_features} onChange={(e) => set('premium_features', e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Live Site Features (comma separated)</Label>
            <Input placeholder="Fully deployed website, Personalized content, Live link & QR" value={form.live_site_features} onChange={(e) => set('live_site_features', e.target.value)} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Premium Code Note</Label>
              <Input placeholder="Requires laptop & basic HTML/CSS/JS knowledge" value={form.premium_note} onChange={(e) => set('premium_note', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Live Site Note</Label>
              <Input placeholder="Get your ready-made website within 24 hours" value={form.live_site_note} onChange={(e) => set('live_site_note', e.target.value)} />
            </div>
          </div>
        </TabsContent>

        {/* TAB 3: INFO */}
        <TabsContent value="info" className="space-y-4 mt-4">
          {(['html_intro', 'css_intro', 'js_intro'] as const).map((field) => (
            <div key={field} className="space-y-2">
              <Label>{field === 'html_intro' ? 'HTML' : field === 'css_intro' ? 'CSS' : 'JavaScript'} Introduction</Label>
              <Textarea
                value={form[field]}
                onChange={(e) => set(field, e.target.value)}
                placeholder={`Write an introduction for the ${field.replace('_intro', '').toUpperCase()} section...`}
                className="min-h-[150px]"
                rows={6}
              />
            </div>
          ))}
        </TabsContent>

        {/* TAB 4: PREVIEW */}
        <TabsContent value="preview" className="mt-4">
          {hasCode ? (
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-4 py-2 text-sm text-muted-foreground border-b border-border">Live Preview</div>
              <iframe
                srcDoc={previewContent}
                sandbox="allow-scripts"
                className="w-full min-h-[400px] bg-background"
                title="Material Preview"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[300px] border border-dashed border-border rounded-lg text-muted-foreground">
              <div className="text-center">
                <Code className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>Add code in the Code tab to preview</p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex gap-3 pt-2">
        <GlowButton onClick={() => onSubmit(imageFile)} className="flex-1" disabled={uploading}>
          {uploading ? 'Saving...' : isEditing ? 'Update Material' : 'Create Material'}
        </GlowButton>
        {isEditing && (
          <GlowButton variant="outline" onClick={onCancel}>Cancel</GlowButton>
        )}
      </div>
    </div>
  );
}
