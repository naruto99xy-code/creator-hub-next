import { useEffect, useState, useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';
import { LucideIcon } from 'lucide-react';

interface AnimatedStatProps {
  icon: LucideIcon;
  value: string;
  label: string;
  delay?: number;
}

export function AnimatedStat({ icon: Icon, value, label, delay = 0 }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [enabled, setEnabled] = useState(false);

  const match = value.match(/^([\d.]+)(.*)$/);
  const numericValue = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const hasDecimal = value.includes('.');

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setEnabled(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  const displayValue = useCountUp({
    end: numericValue,
    duration: 2500,
    decimals: hasDecimal ? 1 : 0,
    suffix,
    enabled,
  });

  return (
    <div ref={ref} className="text-center">
      <motion.div
        animate={enabled ? {
          filter: [
            'drop-shadow(0 0 4px hsl(262 83% 58% / 0.3))',
            'drop-shadow(0 0 12px hsl(262 83% 58% / 0.6))',
            'drop-shadow(0 0 4px hsl(262 83% 58% / 0.3))',
          ]
        } : {}}
        transition={{ duration: 2, repeat: enabled ? 2 : 0 }}
      >
        <Icon className="w-5 h-5 mx-auto mb-1 text-primary" />
      </motion.div>
      <motion.div 
        className="text-lg font-bold"
        animate={enabled ? {
          textShadow: [
            '0 0 8px hsl(262 83% 58% / 0)',
            '0 0 16px hsl(262 83% 58% / 0.5)',
            '0 0 8px hsl(262 83% 58% / 0)',
          ]
        } : {}}
        transition={{ duration: 2, repeat: enabled ? 2 : 0 }}
      >
        {enabled ? displayValue : value.replace(/[\d.]+/, Math.floor(numericValue * 0.7).toString())}
      </motion.div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
