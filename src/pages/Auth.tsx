import { useState, useEffect } from 'react';
import { getSafeErrorMessage } from '@/lib/safeError';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import authIllustration from '@/assets/auth-illustration.png';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signUpSchema = signInSchema.extend({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
});

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get('mode') === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const result = signUpSchema.safeParse({ email, password, fullName });
        if (!result.success) {
          toast({ title: 'Validation Error', description: result.error.errors[0].message, variant: 'destructive' });
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, fullName);
        if (error) throw error;
        toast({ title: 'Account created!', description: 'Welcome to Next Developer!' });
      } else {
        const result = signInSchema.safeParse({ email, password });
        if (!result.success) {
          toast({ title: 'Validation Error', description: result.error.errors[0].message, variant: 'destructive' });
          setLoading(false);
          return;
        }
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast({ title: 'Welcome back!' });
      }
      navigate('/dashboard');
    } catch (error: unknown) {
      toast({ title: 'Error', description: getSafeErrorMessage(error), variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, hsl(222 47% 6%) 0%, hsl(222 47% 10%) 50%, hsl(222 47% 4%) 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl grid md:grid-cols-2"
        style={{
          background: 'hsl(222 47% 8%)',
          border: '1px solid hsl(217 33% 20%)',
        }}
      >
        {/* Left - Illustration */}
        <div className="hidden md:flex flex-col items-center justify-center p-8 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(222 47% 12%) 0%, hsl(222 47% 8%) 100%)' }}>
          {/* Subtle glow */}
          <div
            className="absolute w-[300px] h-[300px] rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, hsl(217 91% 60% / 0.4), transparent)', top: '30%', left: '20%' }}
          />
          <motion.img
            src={authIllustration}
            alt="Developer illustration"
            className="w-80 h-80 object-contain relative z-10 drop-shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center text-muted-foreground text-sm mt-4 relative z-10"
          >
            Build. Ship. Scale. 🚀
          </motion.p>
        </div>

        {/* Right - Form */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={isSignUp ? 'signup' : 'login'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold text-foreground mb-1">
                {isSignUp ? 'Create Account' : 'Log In'}
              </h1>
              <p className="text-muted-foreground text-sm mb-8">
                {isSignUp ? 'Join the Next Developer community' : 'Welcome back! Sign in to continue'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {isSignUp && (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your Name"
                      className="pl-10 h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                    />
                  </div>
                )}

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="pl-10 h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="pl-10 pr-10 h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-12 rounded-lg font-semibold text-primary-foreground transition-all disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, hsl(217 91% 60%), hsl(187 100% 42%))',
                    boxShadow: '0 4px 20px hsl(217 91% 60% / 0.3)',
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : isSignUp ? 'Create Account' : 'Log In'}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Toggle */}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="w-full text-center text-primary font-medium hover:underline underline-offset-4 transition-all text-sm"
              >
                {isSignUp ? 'Sign In Instead' : 'Create an Account'}
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Back to home */}
          <button
            onClick={() => navigate('/')}
            className="mt-6 text-xs text-muted-foreground hover:text-foreground transition-colors text-center"
          >
            ← Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
