import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';
import { LucideIcon } from 'lucide-react';

interface AnimatedStatProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

export function AnimatedStat({ icon: Icon, value, label }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [enabled, setEnabled] = useState(false);

  // Parse the value (e.g., "1.2K+" -> { num: 1.2, suffix: "K+" })
  const match = value.match(/^([\d.]+)(.*)$/);
  const numericValue = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const hasDecimal = value.includes('.');

  useEffect(() => {
    if (isInView) {
      setEnabled(true);
    }
  }, [isInView]);

  const displayValue = useCountUp({
    end: numericValue,
    duration: 2000,
    decimals: hasDecimal ? 1 : 0,
    suffix,
    enabled,
  });

  return (
    <div ref={ref} className="text-center">
      <Icon className="w-5 h-5 mx-auto mb-1 text-primary" />
      <div className="text-lg font-bold">{enabled ? displayValue : '0' + suffix}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
