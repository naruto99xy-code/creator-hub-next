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
import { Coffee, Heart, Sparkles, Star, Zap, Shield, Users, MessageCircle } from 'lucide-react';
import { PublishedMaterials } from '@/components/shared/PublishedMaterials';
import { motion } from 'framer-motion';
import logo from '/logo.png';

const presetAmounts = [99, 199, 499, 999];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, type: 'spring', stiffness: 120 },
});

const impactStats = [
  { icon: Users, label: 'Developers Helped', value: '2,000+', color: 'text-blue-400' },
  { icon: Zap, label: 'Projects Created', value: '150+', color: 'text-amber-400' },
  { icon: Star, label: 'Resources Shared', value: '500+', color: 'text-pink-400' },
  { icon: Shield, label: 'Hours of Content', value: '1,200+', color: 'text-emerald-400' },
];

export default function Support() {
  const [amount, setAmount] = useState(199);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [isMonthly, setIsMonthly] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const { handlePurchaseWithDetails, processing } = useRazorpay();

  const handleSupport = async () => {
    if (!name.trim() || !mobile.trim() || amount < 1) {
      toast({ title: 'Please fill in required fields', variant: 'destructive' });
      return;
    }
    if (!/^\d{10}$/.test(mobile.trim())) {
      toast({ title: 'Enter a valid 10-digit mobile number', variant: 'destructive' });
      return;
    }

    const label = isMonthly ? `Monthly Support - ₹${amount}` : `One-time Support - ₹${amount}`;
    handlePurchaseWithDetails({ productName: label, price: amount, userName: name.trim(), userMobile: mobile.trim() });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-[10%] w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
          <div className="absolute bottom-10 right-[10%] w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-[pulse_5s_ease-in-out_infinite_1s]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/8 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite_2s]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <motion.div
              className="inline-flex p-5 rounded-full bg-gradient-to-br from-primary/20 via-pink-500/20 to-secondary/20 mb-6 relative"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Coffee className="w-14 h-14 text-primary" />
              <Sparkles className="w-5 h-5 text-amber-400 absolute -top-1 -right-1 animate-[pulse_2s_ease-in-out_infinite]" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary via-pink-400 to-secondary bg-clip-text text-transparent">
              Support My Work
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Your support fuels free content, open-source tools & resources for the developer community
            </p>
          </motion.div>

          {/* Impact Stats */}
          <motion.div {...fadeUp(0.15)} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
            {impactStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 150 }}
                whileHover={{ scale: 1.08, y: -4 }}
                className="group text-center p-4 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_-5px] hover:shadow-primary/20"
              >
                <stat.icon className={`w-7 h-7 mx-auto mb-2 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                <p className="text-2xl font-black bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Support Card */}
          <motion.div {...fadeUp(0.3)} className="max-w-2xl mx-auto">
            <div className="relative">
              {/* Card border beam */}
              <div className="border-beam border-beam-red" />

              <GlassCard className="relative overflow-hidden">
                {/* Top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-pink-500 to-secondary" />

                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border/50">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <img src={logo} alt="Profile" className="w-16 h-16 rounded-full border-2 border-primary shadow-lg shadow-primary/20" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-lg">Next Developer</h3>
                    <p className="text-muted-foreground text-sm flex items-center gap-1">
                      Buy me a coffee <span className="text-lg">☕</span>
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ✓ Verified Creator
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Amount Selection */}
                  <div>
                    <Label className="mb-3 block text-sm font-semibold">Choose Amount (₹)</Label>
                    <div className="grid grid-cols-4 gap-3 mb-3">
                      {presetAmounts.map((preset, i) => (
                        <motion.div
                          key={preset}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <button
                            onClick={() => setAmount(preset)}
                            className={`w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 border-2 ${
                              amount === preset
                                ? 'border-primary bg-primary/15 text-primary shadow-lg shadow-primary/20'
                                : 'border-border/50 bg-muted/30 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                            }`}
                          >
                            ₹{preset}
                          </button>
                        </motion.div>
                      ))}
                    </div>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      placeholder="Or enter custom amount"
                      min={1}
                      className="bg-muted/30"
                    />
                  </div>

                  {/* Form Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm">Your Name *</Label>
                      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="bg-muted/30" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm">Mobile Number *</Label>
                      <Input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="10-digit mobile" className="bg-muted/30" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-sm">Email (optional)</Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="bg-muted/30" />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-sm flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5" /> Message (optional)
                    </Label>
                    <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Say something nice... 💬" rows={3} className="bg-muted/30" />
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/20 border border-border/30">
                    <Checkbox id="monthly" checked={isMonthly} onCheckedChange={(c) => setIsMonthly(c as boolean)} />
                    <Label htmlFor="monthly" className="cursor-pointer text-sm">
                      Make this a monthly support <span className="text-xs text-muted-foreground">(recurring)</span>
                    </Label>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <GlowButton className="w-full text-base py-6" size="lg" onClick={handleSupport} disabled={processing}>
                      {processing ? 'Processing...' : (
                        <span className="flex items-center gap-2">
                          <Heart className="w-5 h-5" fill="currentColor" />
                          Support with ₹{amount}
                        </span>
                      )}
                    </GlowButton>
                  </motion.div>

                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Secure Payment</span>
                    <span>•</span>
                    <span>Powered by Razorpay</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Instant</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </motion.div>

          {/* Motivational Text */}
          <motion.div {...fadeUp(0.45)} className="text-center mt-12 max-w-md mx-auto">
            <p className="text-sm text-muted-foreground italic">
              "Every contribution, no matter how small, helps me keep creating free resources and tools for developers worldwide." 
            </p>
            <p className="text-xs text-muted-foreground mt-2">— Next Developer</p>
          </motion.div>
        </div>
      </section>

      <PublishedMaterials section="Support" title="Support Resources" subtitle="Helpful materials and guides" />
    </Layout>
  );
}
