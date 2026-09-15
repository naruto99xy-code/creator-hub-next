import { motion } from 'framer-motion';
import { MaterialsSection } from '@/components/admin/MaterialsSection';

export default function AdminMaterials() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <MaterialsSection />
    </motion.div>
  );
}
