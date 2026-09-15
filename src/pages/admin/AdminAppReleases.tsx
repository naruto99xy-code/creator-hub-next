import { motion } from 'framer-motion';
import { AppReleaseSection } from '@/components/admin/AppReleaseSection';

export default function AdminAppReleases() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <AppReleaseSection />
    </motion.div>
  );
}
