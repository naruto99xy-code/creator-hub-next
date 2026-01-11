import { motion } from 'framer-motion';
import { Heart, Target, Lightbulb } from 'lucide-react';
import { AnimatedCreatorProfile } from './AnimatedCreatorProfile';

export function CreatorStorySection() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Why I Built <span className="glow-text">Next Developer</span>
            </h2>
          </motion.div>

          <div className="mb-10">
            <AnimatedCreatorProfile />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid md:grid-cols-3 gap-6 mt-12"
          >
            {[
              { icon: Target, title: 'Quality First', desc: 'Every template is production-ready' },
              { icon: Lightbulb, title: 'Clarity Always', desc: 'Clean code that makes sense' },
              { icon: Heart, title: 'Real-World Skills', desc: 'Build what matters' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-card/30 border border-border/50">
                <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
