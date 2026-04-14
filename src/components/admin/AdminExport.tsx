import { Download } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import { useToast } from '@/hooks/use-toast';

interface AdminExportProps {
  supporters: any[];
  materials: any[];
}

function downloadCSV(filename: string, headers: string[], rows: string[][]) {
  const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function AdminExport({ supporters, materials }: AdminExportProps) {
  const { toast } = useToast();

  const exportSupporters = () => {
    if (supporters.length === 0) {
      toast({ title: 'No data to export', variant: 'destructive' });
      return;
    }
    downloadCSV(
      'supporters.csv',
      ['Name', 'Email', 'Amount', 'Message', 'Monthly', 'Date'],
      supporters.map((s) => [s.name, s.email, s.amount, s.message, s.is_monthly ? 'Yes' : 'No', new Date(s.created_at).toLocaleDateString()])
    );
    toast({ title: 'Supporters exported! 📥' });
  };

  const exportMaterials = () => {
    if (materials.length === 0) {
      toast({ title: 'No data to export', variant: 'destructive' });
      return;
    }
    downloadCSV(
      'materials.csv',
      ['Title', 'Type', 'Category', 'Premium', 'Price', 'Downloads', 'Rating', 'Date'],
      materials.map((m) => [m.title, m.content_type, m.category, m.is_premium ? 'Yes' : 'No', m.price, m.download_count, m.rating, new Date(m.created_at).toLocaleDateString()])
    );
    toast({ title: 'Materials exported! 📥' });
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <GlowButton size="sm" variant="outline" onClick={exportSupporters}>
        <Download className="w-4 h-4" /> Export Supporters
      </GlowButton>
      <GlowButton size="sm" variant="outline" onClick={exportMaterials}>
        <Download className="w-4 h-4" /> Export Materials
      </GlowButton>
    </div>
  );
}
