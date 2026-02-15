import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Check, Crown, Zap, Star, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRazorpay } from '@/hooks/useRazorpay';

const plans = [
  { name: 'Starter', price: 199, icon: Zap, features: ['Access to basic templates', 'Community Discord access', 'Monthly newsletter'], popular: false },
  { name: 'Pro', price: 499, icon: Crown, features: ['All Starter features', 'Premium templates', 'Priority support', 'Exclusive tutorials'], popular: true },
  { name: 'Elite', price: 999, icon: Star, features: ['All Pro features', '1-on-1 mentorship', 'Early access to products', 'Custom code reviews'], popular: false },
];

export default function Membership() {
  const { handlePurchase, processing } = useRazorpay();

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join the <span className="glow-text">Membership</span></h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Get exclusive access to premium content, templates, and direct support</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <GlassCard hover className={`h-full ${plan.popular ? 'border-primary ring-2 ring-primary/20' : ''}`}>
                  {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-primary to-secondary rounded-full text-xs font-semibold text-primary-foreground">Most Popular</div>}
                  <plan.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6"><span className="text-4xl font-bold">₹{plan.price}</span><span className="text-muted-foreground">/month</span></div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => <li key={f} className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-primary" />{f}</li>)}
                  </ul>
                  <GlowButton
                    variant={plan.popular ? 'primary' : 'secondary'}
                    className="w-full"
                    disabled={processing}
                    onClick={() => handlePurchase(`${plan.name} Membership`, plan.price)}
                  >
                    {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    Join {plan.name}
                  </GlowButton>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
