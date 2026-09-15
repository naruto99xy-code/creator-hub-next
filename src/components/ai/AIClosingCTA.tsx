import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';

/** Final CTA — ported from codeninjavik's closing section (glass card + glow orbs + two CTAs). */
export function AIClosingCTA() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative glass-card rounded-3xl p-8 md:p-16 text-center overflow-hidden"
        >
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Ready to <span className="glow-text">Transform</span> Your Workflow?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Join thousands of users who have already upgraded to AI-powered voice control and automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#ai-assistants">
                <GlowButton size="lg">
                  <Sparkles className="w-5 h-5" />
                  Choose Your Assistant
                </GlowButton>
              </a>
              <Link to="/services">
                <GlowButton variant="outline" size="lg">
                  <ArrowDown className="w-5 h-5" />
                  Explore Services
                </GlowButton>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
