import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Lock, Eye, EyeOff, ArrowLeft, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';
import { z } from 'zod';

const passwordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for recovery token in URL hash
    const hash = window.location.hash;
    if (hash && hash.includes('type=recovery')) {
      setIsValid(true);
    } else {
      // Also check if user has an active session from recovery flow
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setIsValid(true);
        } else {
          toast({ title: 'Invalid or expired link', description: 'Please request a new password reset.', variant: 'destructive' });
          navigate('/auth');
        }
      });
    }
  }, [navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = passwordSchema.safeParse({ password, confirmPassword });
    if (!result.success) {
      toast({ title: 'Validation Error', description: result.error.errors[0].message, variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast({ title: 'Password updated!', description: 'You can now sign in with your new password.' });
      navigate('/auth');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Something went wrong.';
      toast({ title: 'Error', description: msg, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  if (!isValid) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary/8 rounded-full blur-[120px] animate-[pulse_5s_ease-in-out_infinite]" />
        <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-secondary/8 rounded-full blur-[100px] animate-[pulse_7s_ease-in-out_infinite_2s]" />
      </div>

      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/auth')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Login
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 rounded-3xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-2xl shadow-primary/5 relative z-10"
      >
        <div className="mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20"
          >
            <KeyRound className="w-7 h-7 text-primary-foreground" />
          </motion.div>
          <h1 className="text-2xl font-bold text-foreground">Set New Password</h1>
          <p className="text-muted-foreground text-sm mt-1">Enter your new password below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="pl-10 pr-10 h-12 bg-muted/30 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-muted/50 rounded-xl transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="relative group">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="pl-10 h-12 bg-muted/30 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-muted/50 rounded-xl transition-all"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-12 rounded-xl font-semibold text-primary-foreground transition-all disabled:opacity-50 bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/20 mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Updating...
              </span>
            ) : 'Update Password'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
