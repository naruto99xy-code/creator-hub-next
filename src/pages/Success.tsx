import { Layout } from '@/components/layout/Layout';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, useMemo, useCallback, useRef } from 'react';

const TELEGRAM_USERNAME = 'krishnaking407';
const REDIRECT_SECONDS = 3;

/* ── Floating particles ── */
function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 6,
        opacity: Math.random() * 0.35 + 0.08,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, hsl(var(--primary) / ${p.opacity}), transparent 70%)`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ── Animated checkmark SVG ── */
function AnimatedCheckmark() {
  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Outer radial glow */}
      <motion.div
        animate={{ scale: [1, 1.6, 1], opacity: [0.25, 0, 0.25] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-36 h-36 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(160 80% 50% / 0.25), transparent 70%)',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.35, 1], opacity: [0.18, 0, 0.18] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
        className="absolute w-28 h-28 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.2), transparent 70%)',
        }}
      />

      <svg width="110" height="110" viewBox="0 0 110 110" className="relative z-10 drop-shadow-[0_0_24px_hsl(160_80%_50%/0.5)]">
        {/* Background filled circle */}
        <motion.circle
          cx="55"
          cy="55"
          r="48"
          fill="hsl(160 80% 50% / 0.08)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
        {/* Stroke circle */}
        <motion.circle
          cx="55"
          cy="55"
          r="48"
          fill="none"
          stroke="url(#successGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        {/* Checkmark */}
        <motion.path
          d="M34 57 L48 71 L76 41"
          fill="none"
          stroke="url(#successGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.5 }}
        />
        <defs>
          <linearGradient id="successGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(160 80% 50%)" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ── Detail row ── */
function DetailRow({ label, value, icon, index }: { label: string; value: string; icon: string; index: number }) {
  if (!value) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 + index * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex justify-between items-center py-2.5 border-b border-border/30 last:border-b-0"
    >
      <span className="text-muted-foreground text-sm flex items-center gap-2">
        <span className="text-base">{icon}</span> {label}
      </span>
      <span className="font-medium text-foreground text-sm">{value}</span>
    </motion.div>
  );
}

/* ── Main page ── */
export default function Success() {
  const [searchParams] = useSearchParams();
  const product = searchParams.get('product') || 'Your Product';
  const paymentId = searchParams.get('payment_id') || '';
  const amount = searchParams.get('amount') || '';
  const orderId = searchParams.get('order_id') || '';
  const userName = searchParams.get('name') || '';
  const userMobile = searchParams.get('mobile') || '';
  const fileUrl = searchParams.get('file_url') || '';
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);

  /* Parallax on desktop */
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useTransform(mouseX, [-400, 400], [8, -8]);
  const bgY = useTransform(mouseY, [-400, 400], [8, -8]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    },
    [mouseX, mouseY],
  );

  const now = useMemo(() => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }), []);

  const telegramUrl = useMemo(() => {
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
  }, [product, userName, userMobile, paymentId, orderId, amount, now]);

  const finalRedirectUrl = fileUrl || telegramUrl;
  const hasFileUrl = !!fileUrl;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.href = finalRedirectUrl;
            return 0;
          }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [finalRedirectUrl]);

  const details = [
    { label: 'Product', value: product, icon: '📦' },
    { label: 'Amount', value: amount ? `₹${amount}` : '', icon: '💰' },
    { label: 'Payment ID', value: paymentId, icon: '💳' },
    { label: 'Order ID', value: orderId, icon: '🧾' },
    { label: 'Date & Time', value: now, icon: '🕐' },
  ];

  return (
    <Layout>
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="min-h-[100vh] flex items-center justify-center py-16 relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, hsl(222 47% 4%) 0%, hsl(222 47% 7%) 40%, hsl(222 47% 5%) 100%)',
        }}
      >
        {/* Ambient background shapes */}
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        >
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[160px] opacity-40"
            style={{ background: 'radial-gradient(ellipse, hsl(160 80% 50% / 0.12), transparent 70%)' }}
          />
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[250px] rounded-full blur-[120px] opacity-30"
            style={{ background: 'radial-gradient(ellipse, hsl(var(--primary) / 0.1), transparent 70%)' }}
          />
        </motion.div>

        <Particles />

        {/* Animated gradient lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <motion.div
            className="absolute h-px w-1/2 top-1/3 left-0"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.15), transparent)' }}
            animate={{ x: ['-50%', '200%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute h-px w-1/3 bottom-1/3 right-0"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(160 80% 50% / 0.12), transparent)' }}
            animate={{ x: ['200%', '-50%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: 2 }}
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 text-center max-w-md relative z-10">
          {/* Checkmark */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 160, damping: 14 }}
            className="mb-8"
          >
            <AnimatedCheckmark />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl md:text-4xl font-bold mb-2"
          >
            Payment{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, hsl(160 80% 50%), hsl(var(--primary)))' }}
            >
              Successful!
            </span>{' '}
            🎉
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="text-muted-foreground mb-8 text-sm md:text-base"
          >
            Your purchase has been confirmed. {hasFileUrl ? 'Redirecting to your file…' : 'Redirecting to Telegram…'}
          </motion.p>

          {/* Glass card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.65, duration: 0.55 }}
            className="relative rounded-2xl p-5 mb-8 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(222 47% 12% / 0.7), hsl(222 47% 8% / 0.5))',
              backdropFilter: 'blur(24px)',
              border: '1px solid hsl(160 80% 50% / 0.15)',
              boxShadow: '0 0 40px hsl(160 80% 50% / 0.06), inset 0 1px 0 hsl(210 40% 98% / 0.03)',
            }}
          >
            {/* Corner accent */}
            <div
              className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at top right, hsl(160 80% 50% / 0.08), transparent 70%)',
              }}
            />
            {details.map((d, i) => (
              <DetailRow key={d.label} label={d.label} value={d.value} icon={d.icon} index={i} />
            ))}
          </motion.div>

          {/* Redirect section */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="space-y-4"
          >
            <p className="text-sm text-muted-foreground">
              Redirecting in{' '}
              <span className="font-bold" style={{ color: 'hsl(160 80% 50%)' }}>
                {countdown}
              </span>
              s…
            </p>

            {/* Progress bar */}
            <div className="relative h-1.5 rounded-full overflow-hidden max-w-xs mx-auto" style={{ background: 'hsl(var(--muted))' }}>
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: REDIRECT_SECONDS, ease: 'linear' }}
                className="h-full rounded-full relative"
                style={{
                  background: 'linear-gradient(90deg, hsl(160 80% 50%), hsl(var(--primary)))',
                }}
              >
                {/* Neon leading edge */}
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                  style={{
                    background: 'hsl(160 80% 50%)',
                    boxShadow: '0 0 10px hsl(160 80% 50% / 0.8), 0 0 20px hsl(160 80% 50% / 0.4)',
                  }}
                />
              </motion.div>
            </div>

            {/* Manual button */}
            <motion.a
              href={finalRedirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px hsl(160 80% 50% / 0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 text-sm font-medium px-6 py-2.5 rounded-xl transition-colors"
              style={{
                background: 'linear-gradient(135deg, hsl(160 80% 50% / 0.12), hsl(var(--primary) / 0.1))',
                border: '1px solid hsl(160 80% 50% / 0.25)',
                color: 'hsl(160 80% 60%)',
              }}
            >
              <ExternalLink className="w-4 h-4" />
              {hasFileUrl ? 'Open File Now' : 'Open Telegram Now'}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
