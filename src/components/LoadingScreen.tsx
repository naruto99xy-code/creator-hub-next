import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const displayProgress = (p: number) => Math.min(Math.round(p), 100);

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 120);

    const timeout = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  const pct = displayProgress(progress);

  // SVG circle params
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  const particles = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        left: `${10 + Math.random() * 80}%`,
        top: `${10 + Math.random() * 80}%`,
        dur: 2 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 2%) 100%)' }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, hsl(217 91% 60% / 0.4), transparent 70%)', top: '20%', left: '30%' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, hsl(187 100% 42% / 0.3), transparent 70%)', bottom: '25%', right: '25%' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* Circular Logo with ring progress */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="relative mb-6"
      >
        {/* Glow behind circle */}
        <motion.div
          className="absolute inset-[-20px] blur-3xl opacity-30 rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(217 91% 60% / 0.6), transparent)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* SVG Ring */}
        <div className="relative w-[150px] h-[150px]">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
            {/* Background ring */}
            <circle cx="70" cy="70" r={radius} fill="none" stroke="hsl(217 33% 17%)" strokeWidth="3" />
            {/* Animated progress ring */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="url(#loaderGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.15s ease' }}
            />
            {/* Spinning orbital dot */}
            <motion.circle
              cx="70"
              cy={70 - radius}
              r="4"
              fill="hsl(187 100% 42%)"
              style={{ filter: 'drop-shadow(0 0 6px hsl(187 100% 42%))' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              transformOrigin="70px 70px"
            />
            <defs>
              <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(217 91% 60%)" />
                <stop offset="100%" stopColor="hsl(187 100% 42%)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Logo inside circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.img
              src="/logo.png"
              alt="Next Developer"
              className="w-16 h-16 drop-shadow-lg"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Percentage */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold tracking-wider mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-mono"
      >
        {pct}%
      </motion.p>

      {/* Brand Name */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-xl font-bold tracking-[0.3em] mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
      >
        NEXT DEVELOPER
      </motion.h1>

      {/* Bottom text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xs text-muted-foreground tracking-widest font-medium"
      >
        Loading AI Experience...
      </motion.p>
    </motion.div>
  );
};
