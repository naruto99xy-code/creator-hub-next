import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { CheckCircle, Download, ArrowRight } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import { useSearchParams } from 'react-router-dom';

export default function Success() {
  const [searchParams] = useSearchParams();
  const product = searchParams.get('product') || 'Your Product';
  const paymentId = searchParams.get('payment_id') || '';

  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center py-20">
        <div className="container mx-auto px-4 text-center max-w-lg">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-primary/30 blur-xl"
              />
              <CheckCircle className="w-20 h-20 text-primary relative z-10" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold mb-3"
          >
            Payment <span className="glow-text">Successful!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-muted-foreground mb-6"
          >
            Thank you for purchasing <strong className="text-foreground">{product}</strong>.
          </motion.p>

          {paymentId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-card/60 backdrop-blur-md border border-border rounded-xl p-4 mb-8 text-sm"
            >
              <span className="text-muted-foreground">Payment ID: </span>
              <span className="font-mono text-foreground">{paymentId}</span>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <GlowButton onClick={() => (window.location.href = '/dashboard')}>
              <Download className="w-4 h-4" />
              Go to Dashboard
            </GlowButton>
            <GlowButton variant="secondary" onClick={() => (window.location.href = '/ai')}>
              <ArrowRight className="w-4 h-4" />
              Browse More
            </GlowButton>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
