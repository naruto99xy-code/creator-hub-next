import { motion } from 'framer-motion';
import { Heart, Target, Lightbulb } from 'lucide-react';
import { AnimatedCreatorProfile } from './AnimatedCreatorProfile';

export function CreatorStorySection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Full background effect */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary/5 via-background to-accent/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <div className="orb orb-purple w-[400px] h-[400px] top-1/4 -right-20" style={{ animationDelay: '0s' }} />
        <div className="orb orb-pink w-[300px] h-[300px] bottom-1/4 -left-20" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 particle-grid opacity-15" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why I Built <span className="glow-text">Next Developer</span>
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-4 mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatedCreatorProfile />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6 text-muted-foreground leading-relaxed"
          >
            <p className="text-lg">
              When I started learning to code, I struggled to find resources that showed how to build
              <span className="text-foreground font-medium"> real, production-ready projects</span>.
              Most tutorials stopped at the basics, leaving a huge gap between learning and actually shipping.
            </p>

            <p className="text-lg">
              That's why I created Next Developer — a platform dedicated to helping developers like you
              <span className="text-foreground font-medium"> learn by building</span>. Every template, every project,
              and every piece of content is designed to give you practical skills you can use immediately.
            </p>
          </motion.div>

          {/* Mission pillars */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Target, title: 'Quality First', desc: 'Every template is production-ready' },
              { icon: Lightbulb, title: 'Clarity Always', desc: 'Clean code that makes sense' },
              { icon: Heart, title: 'Real-World Skills', desc: 'Build what matters' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                className="p-5 rounded-xl bg-card/30 border border-border/50 hover:border-primary/30 transition-all group"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                </motion.div>
                <h4 className="font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
