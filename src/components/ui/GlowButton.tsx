import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlowButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function GlowButton({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md',
  onClick, 
  disabled,
  type = 'button'
}: GlowButtonProps) {
  const baseStyles = 'relative font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-[0_0_40px_hsl(217_91%_60%/0.4)] hover:-translate-y-0.5',
    secondary: 'bg-muted text-foreground hover:bg-muted/80 border border-border hover:border-primary/50',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
    ghost: 'bg-transparent text-foreground hover:bg-muted',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </motion.button>
  );
}
