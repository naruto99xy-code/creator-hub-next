import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';
import { Layout, Rocket, Code2, RefreshCw, Users } from 'lucide-react';

const features = [
  { icon: Layout, title: 'Premium Templates', desc: 'Production-ready templates for dashboards, landing pages, and web apps.' },
  { icon: Rocket, title: 'Real-World Projects', desc: 'Learn by building complete projects with modern best practices.' },
  { icon: Code2, title: 'Clean Code & Best Practices', desc: 'Well-documented, maintainable code following industry standards.' },
  { icon: RefreshCw, title: 'Regular Updates', desc: 'New templates and projects added every week to keep you ahead.' },
  { icon: Users, title: 'Community Access', desc: 'Join a growing community of developers learning together.' },
];

export function FeaturesSection() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What You'll <span className="glow-text">Find Here</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to level up your development skills and build professional projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard hover className="h-full group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.desc}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
