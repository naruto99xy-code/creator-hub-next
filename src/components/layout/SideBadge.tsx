import { motion } from 'framer-motion';

export function SideBadge() {
  return (
    <motion.a
      href="https://nextdeveloper.in"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-center z-[1000] hidden md:block"
      style={{ transformOrigin: 'center center' }}
    >
      <div className="bg-[#0f172a] text-white text-xs font-medium tracking-wide px-4 py-2.5 rounded-md shadow-lg hover:bg-[#2563eb] hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300 cursor-pointer whitespace-nowrap"
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        Created with Next Developer
      </div>
    </motion.a>
  );
}
