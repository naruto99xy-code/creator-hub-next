import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { useRazorpay } from '@/hooks/useRazorpay';
import { getSafeErrorMessage } from '@/lib/safeError';
import { Coffee, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import profileAvatar from '@/assets/profile-avatar.jpg';

const presetAmounts = [99, 199, 499, 999];

export default function Support() {
  const [amount, setAmount] = useState(199);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isMonthly, setIsMonthly] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const { handlePurchase, processing } = useRazorpay();

  const handleSupport = async () => {
    if (!name.trim() || amount < 1) {
      toast({ title: 'Please fill in required fields', variant: 'destructive' });
      return;
    }

    const label = isMonthly ? `Monthly Support - ₹${amount}` : `One-time Support - ₹${amount}`;
    handlePurchase(label, amount);
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mb-6">
                <Coffee className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Support My Work</h1>
              <p className="text-muted-foreground">Your support helps me create more content for the developer community</p>
            </div>

            <GlassCard>
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
                <img src={profileAvatar} alt="Profile" className="w-16 h-16 rounded-full border-2 border-primary" />
                <div>
                  <h3 className="font-bold text-lg">Next Developer</h3>
                  <p className="text-muted-foreground text-sm">Buy me a coffee ☕</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">Select Amount (₹)</Label>
                  <div className="grid grid-cols-4 gap-3 mb-3">
                    {presetAmounts.map((preset) => (
                      <GlowButton key={preset} variant={amount === preset ? 'primary' : 'secondary'} size="sm" onClick={() => setAmount(preset)}>
                        ₹{preset}
                      </GlowButton>
                    ))}
                  </div>
                  <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Custom amount" min={1} />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div><Label>Your Name *</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" /></div>
                  <div><Label>Email (optional)</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></div>
                </div>

                <div><Label>Message (optional)</Label><Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Say something nice..." rows={3} /></div>

                <div className="flex items-center gap-2">
                  <Checkbox id="monthly" checked={isMonthly} onCheckedChange={(c) => setIsMonthly(c as boolean)} />
                  <Label htmlFor="monthly" className="cursor-pointer">Make this a monthly support</Label>
                </div>

                <GlowButton className="w-full" size="lg" onClick={handleSupport} disabled={processing}>
                  {processing ? 'Processing...' : <><Heart className="w-5 h-5" /> Support ₹{amount}</>}
                </GlowButton>

                <p className="text-center text-xs text-muted-foreground">Secure payment via Razorpay</p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
