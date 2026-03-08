import { motion } from 'framer-motion';

export function SideBadge() {
  return (
    <motion.a
      href="https://nextdeveloper.in"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed hidden md:block"
      style={{
        left: '-40px',
        top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
        transformOrigin: 'left center',
        zIndex: 1000,
      }}
    >
      <div
        className="text-white text-xs font-medium tracking-wide px-4 py-2.5 rounded-md shadow-lg cursor-pointer whitespace-nowrap transition-all duration-300"
        style={{
          background: '#0f172a',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#7c3aed';
          e.currentTarget.style.boxShadow = '0 0 15px rgba(124,58,237,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#0f172a';
          e.currentTarget.style.boxShadow = '';
        }}
      >
        Created with Next Developer
      </div>
    </motion.a>
  );
}
