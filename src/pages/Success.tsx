import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';

const TELEGRAM_USERNAME = 'krishnaking407';
const REDIRECT_SECONDS = 3;

function AnimatedCheckmark() {
  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Pulsing glow */}
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-28 h-28 rounded-full bg-primary/30 blur-2xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        className="absolute w-24 h-24 rounded-full bg-primary/20 blur-xl"
      />
      {/* SVG animated circle + checkmark */}
      <svg width="96" height="96" viewBox="0 0 96 96" className="relative z-10">
        <motion.circle
          cx="48" cy="48" r="42"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <motion.path
          d="M30 50 L42 62 L66 36"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.5 }}
        />
      </svg>
    </div>
  );
}

export default function Success() {
  const [searchParams] = useSearchParams();
  const product = searchParams.get('product') || 'Your Product';
  const paymentId = searchParams.get('payment_id') || '';
  const amount = searchParams.get('amount') || '';
  const orderId = searchParams.get('order_id') || '';
  const userName = searchParams.get('name') || '';
  const userMobile = searchParams.get('mobile') || '';
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);

  const telegramUrl = useMemo(() => {
    const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const message = `🎉 New Payment Received

📦 Product: ${product}
👤 Name: ${userName}
📱 Mobile: ${userMobile}
💳 Payment ID: ${paymentId}
🧾 Order ID: ${orderId}
💰 Amount: ₹${amount}
🌐 Source: nextdeveloper.in
🕐 Time: ${now}`;
    return `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`;
  }, [product, userName, userMobile, paymentId, orderId, amount]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = telegramUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [telegramUrl]);

  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center py-20 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 text-center max-w-lg relative z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 180, damping: 14 }}
            className="mb-8"
          >
            <AnimatedCheckmark />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-3"
          >
            Payment <span className="glow-text">Successful!</span> 🎉
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="text-muted-foreground mb-6"
          >
            You are being redirected to Telegram for download instructions.
          </motion.p>

          {/* Payment details card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-5 mb-6 text-sm space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Product</span>
              <span className="font-semibold text-foreground">{product}</span>
            </div>
            {amount && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-semibold text-foreground">₹{amount}</span>
              </div>
            )}
            {paymentId && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Payment ID</span>
                <span className="font-mono text-xs text-foreground">{paymentId}</span>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="space-y-3"
          >
            <div className="text-sm text-muted-foreground">
              Redirecting in <span className="font-bold text-primary">{countdown}</span>s
            </div>

            <motion.div className="h-1 rounded-full bg-muted overflow-hidden max-w-xs mx-auto">
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: REDIRECT_SECONDS, ease: 'linear' }}
                className="h-full bg-primary rounded-full"
              />
            </motion.div>

            <a
              href={telegramUrl}
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
