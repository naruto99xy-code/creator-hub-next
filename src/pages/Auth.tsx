import { useState, useEffect } from 'react';
import { getSafeErrorMessage } from '@/lib/safeError';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Code, Mail, Lock, User } from 'lucide-react';
import { z } from 'zod';

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
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <GlassCard className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary to-secondary mb-4">
              <Code className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">{isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
            <p className="text-muted-foreground mt-2">
              {isSignUp ? 'Join the Next Developer community' : 'Sign in to your account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" className="pl-10" />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-10" />
              </div>
            </div>

            <GlowButton type="submit" className="w-full" disabled={loading}>
              {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
            </GlowButton>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-primary hover:underline">
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </GlassCard>
      </div>
    </Layout>
  );
}
