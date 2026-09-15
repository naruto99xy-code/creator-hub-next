import { motion } from 'framer-motion';

/** Thin animated gradient line that draws in as it scrolls into view — used to separate major sections. */
export function AISectionDivider({ variant = 'primary' }: { variant?: 'primary' | 'secondary' }) {
  return (
    <div className="relative h-px max-w-5xl mx-auto">
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r from-transparent ${variant === 'primary' ? 'via-primary' : 'via-secondary'} to-transparent`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />
    </div>
  );
}
