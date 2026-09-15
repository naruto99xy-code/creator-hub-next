import { motion } from 'framer-motion';
import { AdminAIProductsSection } from '@/components/admin/AdminAIProductsSection';

export default function AdminAIProducts() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <AdminAIProductsSection />
    </motion.div>
  );
}
