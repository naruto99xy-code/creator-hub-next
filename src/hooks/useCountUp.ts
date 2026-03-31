import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  enabled?: boolean;
}

export function useCountUp({
  start,
  end,
  duration = 2000,
  decimals = 0,
  suffix = '',
  enabled = true,
}: UseCountUpOptions) {
  // Start from 70% of the end value for a premium feel
  const actualStart = start ?? Math.floor(end * 0.7);
  const [count, setCount] = useState(actualStart);
  const [hasStarted, setHasStarted] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || hasStarted) return;

    setHasStarted(true);
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      
      // easeOutExpo for premium feel
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentCount = actualStart + (end - actualStart) * easeOutExpo;
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [enabled, hasStarted, actualStart, end, duration]);

  const displayValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toString();

  return displayValue + suffix;
}
