import { motion } from 'framer-motion';
import { AdminPromotionsSection } from '@/components/admin/AdminPromotionsSection';

export default function AdminPromotions() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <AdminPromotionsSection />
    </motion.div>
  );
}
