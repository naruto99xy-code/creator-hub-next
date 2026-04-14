import { GlassCard } from '@/components/ui/GlassCard';
import { Pencil, Trash2, Star, Download, Crown, Sparkles } from 'lucide-react';

interface MaterialCardProps {
  material: {
    id: string;
    title: string;
    description?: string | null;
    category?: string | null;
    content_type: string;
    image_url?: string | null;
    download_count: number;
    rating: number;
    is_premium: boolean;
    is_featured: boolean;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export function MaterialCard({ material, onEdit, onDelete }: MaterialCardProps) {
  return (
    <GlassCard className="overflow-hidden p-0">
      {/* Thumbnail */}
      <div className="relative h-40 bg-muted/30">
        {material.image_url ? (
          <img src={material.image_url} alt={material.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
            <Sparkles className="w-12 h-12" />
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-1.5">
          {material.is_premium && (
            <span className="bg-yellow-500/90 text-black text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Crown className="w-3 h-3" /> Premium
            </span>
          )}
          {material.is_featured && (
            <span className="bg-primary/90 text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-foreground truncate">{material.title}</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {material.category && <span className="bg-muted px-2 py-0.5 rounded">{material.category}</span>}
          <span className="bg-muted px-2 py-0.5 rounded">{material.content_type}</span>
        </div>
        {material.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{material.description}</p>
        )}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Download className="w-3.5 h-3.5" />{material.download_count}</span>
            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-500" />{Number(material.rating).toFixed(1)}</span>
          </div>
          <div className="flex gap-1">
            <button onClick={onEdit} className="p-1.5 rounded hover:bg-primary/10 text-primary transition-colors"><Pencil className="w-4 h-4" /></button>
            <button onClick={onDelete} className="p-1.5 rounded hover:bg-destructive/10 text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
