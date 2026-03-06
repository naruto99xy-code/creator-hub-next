import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { motion } from 'framer-motion';
import { Lock, Gift, Zap, Percent, MessageCircle, Crown, FileCode, Video, BookOpen, Palette } from 'lucide-react';

const benefits = [
  { icon: Lock, title: 'Member-Only Templates', desc: 'Exclusive templates not available to free users' },
  { icon: Gift, title: 'Private Posts & Updates', desc: 'Behind-the-scenes content and early announcements' },
  { icon: Zap, title: 'Early Access', desc: 'Be the first to try new releases and features' },
  { icon: Percent, title: 'Discounts on Products', desc: 'Special pricing on all digital products' },
  { icon: MessageCircle, title: 'Direct Creator Support', desc: 'Priority support and direct communication' },
];

const lockedContent = [
  { icon: FileCode, title: 'Pro Dashboard Template', type: 'Template', tag: 'New' },
  { icon: Video, title: 'Advanced React Patterns', type: 'Video Course', tag: 'Popular' },
  { icon: BookOpen, title: 'Full-Stack SaaS Guide', type: 'E-Book', tag: 'Exclusive' },
  { icon: Palette, title: 'UI Component Library', type: 'Resource Pack', tag: 'Premium' },
];

export function MembershipBenefitsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Unlock <span className="glow-text">Full Access</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join the membership to get exclusive content, early access, and direct support.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Benefits list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-border/50 hover:border-primary/30 transition-all hover:bg-card/50"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Premium locked content card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassCard className="relative overflow-hidden min-h-[420px]" glow>
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Crown className="w-6 h-6 text-primary" />
                    <span className="font-bold text-lg">Premium Content</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {lockedContent.length} Items Locked
                  </span>
                </div>

                {/* Locked content items with actual info */}
                <div className="space-y-3">
                  {lockedContent.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/30 group"
                    >
                      <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-primary/70" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm text-foreground/80 truncate">{item.title}</p>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary/10 text-secondary font-medium shrink-0">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.type}</p>
                      </div>
                      <Lock className="w-4 h-4 text-muted-foreground/60 shrink-0" />
                    </motion.div>
                  ))}
                </div>

                {/* Overlay with CTA */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent flex items-end justify-center pb-8 pointer-events-none">
                  <div className="text-center pointer-events-auto">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Lock className="w-4 h-4 text-primary" />
                      <p className="text-sm font-medium text-foreground">Members Only Access</p>
                    </div>
                    <p className="text-muted-foreground text-xs mb-4">Unlock all premium templates, courses & resources</p>
                    <Link to="/membership">
                      <GlowButton size="lg">
                        <Crown className="w-5 h-5" />
                        Join Membership
                      </GlowButton>
                    </Link>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
