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
  transition: { delay, duration: 0.5, type: 'spring' as const, stiffness: 120 },
});

const impactStats = [
  { icon: Users, label: 'Developers Helped', value: '50+', color: 'text-blue-400' },
  { icon: Zap, label: 'Projects Created', value: '10+', color: 'text-amber-400' },
  { icon: Star, label: 'Resources Shared', value: '25+', color: 'text-pink-400' },
  { icon: Shield, label: 'Hours of Content', value: '100+', color: 'text-emerald-400' },
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
      <section className="relative py-12 overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-[10%] w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
          <div className="absolute bottom-10 right-[10%] w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-[pulse_5s_ease-in-out_infinite_1s]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/8 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite_2s]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeUp(0)} className="text-center mb-10">
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
              <GlassCard className="relative overflow-hidden">
                {/* Top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-pink-500 to-secondary" />

                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border/50 relative">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring' as const, stiffness: 300 }}
                    className="relative"
                  >
                    <img src={logo} alt="Profile" className="w-16 h-16 rounded-full border-2 border-primary shadow-lg shadow-primary/20" />
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-background flex items-center justify-center">
                      <span className="text-[8px] text-white font-bold">✓</span>
                    </span>
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      Next Developer
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </h3>
                    <p className="text-muted-foreground text-sm flex items-center gap-1">
                      Buy me a coffee <span className="text-lg">☕</span>
                    </p>
                  </div>
                  <div className="ml-auto hidden sm:block">
                    <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 text-emerald-400 border border-emerald-500/20">
                      ✓ Verified Creator
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Coffee Visual Section */}
                  <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-primary/5 via-pink-500/5 to-secondary/5 border border-border/30">
                    <p className="text-sm text-muted-foreground mb-1">Each coffee fuels</p>
                    <div className="flex items-center justify-center gap-6 text-xs text-foreground/80">
                      <span className="flex flex-col items-center gap-1">
                        <span className="text-2xl">📹</span>
                        <span>Video Tutorials</span>
                      </span>
                      <span className="flex flex-col items-center gap-1">
                        <span className="text-2xl">💻</span>
                        <span>Open Source</span>
                      </span>
                      <span className="flex flex-col items-center gap-1">
                        <span className="text-2xl">📦</span>
                        <span>Free Resources</span>
                      </span>
                      <span className="flex flex-col items-center gap-1">
                        <span className="text-2xl">🎓</span>
                        <span>Mentorship</span>
                      </span>
                    </div>
                  </div>

                  {/* Amount Selection */}
                  <div>
                    <Label className="mb-3 block text-sm font-semibold flex items-center gap-2">
                      <Heart className="w-4 h-4 text-pink-400" /> Choose Your Support
                    </Label>
                    <div className="grid grid-cols-4 gap-3 mb-3">
                      {presetAmounts.map((preset) => {
                        const coffeeCount = Math.max(1, Math.round(preset / 99));
                        const isSelected = amount === preset;
                        return (
                          <motion.div
                            key={preset}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <button
                              onClick={() => setAmount(preset)}
                              className={`w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 border-2 relative overflow-hidden ${
                                isSelected
                                  ? 'border-primary bg-primary/15 text-primary shadow-lg shadow-primary/20'
                                  : 'border-border/50 bg-muted/30 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                              }`}
                            >
                              <span className="text-base mb-0.5 block">{'☕'.repeat(Math.min(coffeeCount, 4))}</span>
                              <span>₹{preset}</span>
                              {isSelected && (
                                <motion.div
                                  layoutId="amount-glow"
                                  className="absolute inset-0 rounded-xl bg-primary/5"
                                  transition={{ type: 'spring' as const, stiffness: 300 }}
                                />
                              )}
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                    <div className="relative">
                      <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        placeholder="Or enter custom amount"
                        min={1}
                        className="bg-muted/30 pl-8"
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    <span className="text-xs text-muted-foreground font-medium">YOUR DETAILS</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                  </div>

                  {/* Form Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div className="space-y-1.5" whileFocus={{ scale: 1.01 }}>
                      <Label className="text-sm flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-blue-400" /> Your Name *
                      </Label>
                      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="bg-muted/30 focus:bg-muted/50 transition-colors" />
                    </motion.div>
                    <div className="space-y-1.5">
                      <Label className="text-sm flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400" /> Mobile Number *
                      </Label>
                      <Input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="10-digit mobile" className="bg-muted/30 focus:bg-muted/50 transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-sm flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-pink-400" /> Email (optional)
                    </Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="bg-muted/30 focus:bg-muted/50 transition-colors" />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-sm flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-secondary" /> Message (optional)
                    </Label>
                    <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Say something nice... 💬" rows={3} className="bg-muted/30 focus:bg-muted/50 transition-colors" />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 cursor-pointer"
                    onClick={() => setIsMonthly(!isMonthly)}
                  >
                    <Checkbox id="monthly" checked={isMonthly} onCheckedChange={(c) => setIsMonthly(c as boolean)} />
                    <div>
                      <Label htmlFor="monthly" className="cursor-pointer text-sm font-medium">
                        Make this monthly
                      </Label>
                      <p className="text-xs text-muted-foreground">Support consistently & help me plan ahead</p>
                    </div>
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                      Recurring
                    </span>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <GlowButton className="w-full text-base py-6 relative overflow-hidden" size="lg" onClick={handleSupport} disabled={processing}>
                      {processing ? 'Processing...' : (
                        <span className="flex items-center gap-2">
                          <Heart className="w-5 h-5 animate-[pulse_1.5s_ease-in-out_infinite]" fill="currentColor" />
                          Support with ₹{amount}
                          <Coffee className="w-4 h-4" />
                        </span>
                      )}
                    </GlowButton>
                  </motion.div>

                  {/* Trust Badges */}
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground px-3 py-1.5 rounded-full bg-muted/30 border border-border/30">
                      <Shield className="w-3.5 h-3.5 text-emerald-400" /> Secure Payment
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground px-3 py-1.5 rounded-full bg-muted/30 border border-border/30">
                      <Zap className="w-3.5 h-3.5 text-amber-400" /> Instant Processing
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground px-3 py-1.5 rounded-full bg-muted/30 border border-border/30">
                      🇮🇳 Razorpay
                    </span>
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
