import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Clock } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

const trustItems = [
  { icon: ShieldCheck, title: 'Secure Payments', description: '100% secure checkout with bank-grade encryption on every order.' },
  { icon: Zap, title: 'Instant Activation', description: 'Get started right after purchase — no waiting, no complex setup.' },
  { icon: Clock, title: '24/7 Support', description: 'A dedicated support channel, always ready to help with any question.' },
];

export function AITrustSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="text-center h-full">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
