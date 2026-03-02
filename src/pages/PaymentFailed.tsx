import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';

function AnimatedCross() {
  return (
    <div className="relative inline-flex items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0, 0.25] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-28 h-28 rounded-full bg-destructive/30 blur-2xl"
      />
      <svg width="96" height="96" viewBox="0 0 96 96" className="relative z-10">
        <motion.circle
          cx="48" cy="48" r="42"
          fill="none"
          stroke="hsl(var(--destructive))"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <motion.path
          d="M34 34 L62 62"
          fill="none"
          stroke="hsl(var(--destructive))"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.5 }}
        />
        <motion.path
          d="M62 34 L34 62"
          fill="none"
          stroke="hsl(var(--destructive))"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.65 }}
        />
      </svg>
    </div>
  );
}

export default function PaymentFailed() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const product = searchParams.get('product') || '';

  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-destructive/6 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 text-center max-w-lg relative z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 180, damping: 14 }}
            className="mb-8"
          >
            <AnimatedCross />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-3"
          >
            Payment <span className="text-destructive">Failed</span> ❌
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="text-muted-foreground mb-8"
          >
            Your payment could not be verified. No amount has been charged.
            <br />
            Please try again or contact support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <button
              onClick={() => navigate(product ? '/ai' : '/')}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
            <a
              href="https://t.me/krishnaking407"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
