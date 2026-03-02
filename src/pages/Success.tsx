import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TELEGRAM_URL = 'https://t.me/krishnaking407';
const REDIRECT_SECONDS = 5;

export default function Success() {
  const [searchParams] = useSearchParams();
  const product = searchParams.get('product') || 'Your Product';
  const paymentId = searchParams.get('payment_id') || '';
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = TELEGRAM_URL;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
            className="text-muted-foreground mb-2"
          >
            Thank you for purchasing <strong className="text-foreground">{product}</strong>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="text-sm text-muted-foreground mb-6"
          >
            You are being redirected to Telegram for download instructions.
          </motion.p>

          {paymentId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-card/60 backdrop-blur-md border border-border rounded-xl p-4 mb-6 text-sm"
            >
              <span className="text-muted-foreground">Payment ID: </span>
              <span className="font-mono text-foreground">{paymentId}</span>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="space-y-3"
          >
            <div className="text-sm text-muted-foreground">
              Redirecting in <span className="font-bold text-primary">{countdown}</span> seconds...
            </div>

            <motion.div
              className="h-1 rounded-full bg-muted overflow-hidden max-w-xs mx-auto"
            >
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: REDIRECT_SECONDS, ease: 'linear' }}
                className="h-full bg-primary rounded-full"
              />
            </motion.div>

            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-2"
            >
              <ExternalLink className="w-4 h-4" />
              Open Telegram Now
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
