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
    <section className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />
        <div className="orb orb-pink w-[350px] h-[350px] -top-20 right-1/4" style={{ animationDelay: '2s' }} />
        <div className="orb orb-purple w-[250px] h-[250px] bottom-0 left-1/4" style={{ animationDelay: '0s' }} />
        <div className="absolute inset-0 particle-grid opacity-15" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What You'll <span className="glow-text">Find Here</span>
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-4 mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Everything you need to level up your development skills and build professional projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              <GlassCard hover className="h-full group">
                <div className="flex items-start gap-4">
                  <motion.div 
                    className="p-3 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors"
                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <feature.icon className="w-6 h-6 text-primary" />
                  </motion.div>
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
