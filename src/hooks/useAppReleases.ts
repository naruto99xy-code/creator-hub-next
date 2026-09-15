import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AppRelease {
  id: string;
  app_name: string;
  platform: string;
  version_name: string;
  version_code: number | null;
  release_notes: string | null;
  download_url: string;
  file_size_mb: number | null;
  icon_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

/** Published app releases for the public Download section on the home page. */
export function useAppReleases() {
  const [releases, setReleases] = useState<AppRelease[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReleases = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('app_releases')
      .select('*')
      .eq('is_published', true)
      .order('updated_at', { ascending: false });
    setReleases((data as AppRelease[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchReleases(); }, [fetchReleases]);

  return { releases, loading, refetch: fetchReleases };
}
