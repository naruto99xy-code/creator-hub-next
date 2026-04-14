import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Check, Crown, Zap, Star, Loader2, Sparkles, Shield, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRazorpay } from '@/hooks/useRazorpay';
import { PublishedMaterials } from '@/components/shared/PublishedMaterials';

const plans = [
  {
    name: 'Starter',
    price: 199,
    icon: Zap,
    gradient: 'from-blue-500 to-cyan-500',
    bgGlow: 'from-blue-500/10 via-cyan-500/5 to-transparent',
    borderColor: 'border-blue-500/30',
    iconBg: 'bg-blue-500/15',
    badgeColor: 'bg-blue-500/20 text-blue-300',
    features: ['Access to basic templates', 'Community Discord access', 'Monthly newsletter', 'Basic code snippets'],
    popular: false,
  },
  {
    name: 'Pro',
    price: 499,
    icon: Crown,
    gradient: 'from-purple-500 via-primary to-pink-500',
    bgGlow: 'from-purple-500/15 via-primary/10 to-pink-500/5',
    borderColor: 'border-primary/50',
    iconBg: 'bg-primary/15',
    badgeColor: 'bg-primary/20 text-purple-300',
    features: ['All Starter features', 'Premium templates', 'Priority support', 'Exclusive tutorials', 'Project source codes'],
    popular: true,
  },
  {
    name: 'Elite',
    price: 999,
    icon: Star,
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    bgGlow: 'from-amber-500/10 via-orange-500/5 to-transparent',
    borderColor: 'border-amber-500/30',
    iconBg: 'bg-amber-500/15',
    badgeColor: 'bg-amber-500/20 text-amber-300',
    features: ['All Pro features', '1-on-1 mentorship', 'Early access to products', 'Custom code reviews', 'Private GitHub repos'],
    popular: false,
  },
];

const perks = [
  { icon: Shield, title: 'Secure Payments', desc: 'Razorpay powered secure transactions', color: 'text-green-400' },
  { icon: Rocket, title: 'Instant Access', desc: 'Get access immediately after payment', color: 'text-blue-400' },
  { icon: Sparkles, title: 'Cancel Anytime', desc: 'No long-term commitments required', color: 'text-purple-400' },
];

export default function Membership() {
  const { handlePurchase, processing } = useRazorpay();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-10 right-1/4 w-64 h-64 rounded-full bg-pink-500/10 blur-[100px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/5 blur-[140px]"
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Premium Membership Plans</span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-5">
              Join the{' '}
              <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Membership
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Get exclusive access to premium content, templates, mentorship, and direct developer support
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-16">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 150 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative group"
              >
                {/* Popular glow ring */}
                {plan.popular && (
                  <motion.div
                    className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-purple-500 via-primary to-pink-500 opacity-60 blur-sm"
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}

                <div className={`relative h-full rounded-2xl border ${plan.borderColor} bg-gradient-to-b ${plan.bgGlow} backdrop-blur-xl p-7 overflow-hidden`}>
                  {/* Background orb */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${plan.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />

                  {/* Popular badge */}
                  {plan.popular && (
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="absolute -top-0.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 via-primary to-pink-500 rounded-b-xl text-xs font-bold text-white tracking-wider"
                    >
                      ⭐ MOST POPULAR
                    </motion.div>
                  )}

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${plan.iconBg} flex items-center justify-center mb-5 mt-2 group-hover:scale-110 transition-transform duration-300`}>
                    <plan.icon className="w-7 h-7" style={{ color: plan.name === 'Starter' ? '#3b82f6' : plan.name === 'Pro' ? '#a855f7' : '#f59e0b' }} />
                  </div>

                  <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                  <div className="mb-6">
                    <span className={`text-5xl font-black bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>₹{plan.price}</span>
                    <span className="text-muted-foreground text-sm">/month</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, fi) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + fi * 0.05 }}
                        className="flex items-center gap-2.5 text-sm"
                      >
                        <div className={`w-5 h-5 rounded-full ${plan.iconBg} flex items-center justify-center shrink-0`}>
                          <Check className="w-3 h-3" style={{ color: plan.name === 'Starter' ? '#3b82f6' : plan.name === 'Pro' ? '#a855f7' : '#f59e0b' }} />
                        </div>
                        {f}
                      </motion.li>
                    ))}
                  </ul>

                  <GlowButton
                    variant={plan.popular ? 'primary' : 'secondary'}
                    className={`w-full font-bold ${plan.popular ? 'shadow-lg shadow-primary/25' : ''}`}
                    disabled={processing}
                    onClick={() => handlePurchase(`${plan.name} Membership`, plan.price)}
                  >
                    {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    {plan.popular ? '🚀 ' : ''}Join {plan.name}
                  </GlowButton>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Perks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            {perks.map((perk, i) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/30"
              >
                <perk.icon className={`w-5 h-5 ${perk.color} shrink-0`} />
                <div>
                  <p className="text-sm font-semibold">{perk.title}</p>
                  <p className="text-xs text-muted-foreground">{perk.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <PublishedMaterials section="Membership" title="Member Resources" subtitle="Exclusive content for members" />
    </Layout>
  );
}
