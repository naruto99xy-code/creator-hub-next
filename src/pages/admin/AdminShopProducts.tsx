import { motion } from 'framer-motion';
import { AdminProductsSection } from '@/components/admin/AdminProductsSection';

export default function AdminShopProducts() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <AdminProductsSection />
    </motion.div>
  );
}
