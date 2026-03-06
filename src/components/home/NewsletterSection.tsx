import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, Loader2 } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';

const emailSchema = z.string().trim().email({ message: 'Please enter a valid email' }).max(255);

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: result.data });

      if (error) {
        if (error.code === '23505') {
          toast.error('You\'re already subscribed!');
        } else {
          throw error;
        }
      } else {
        await supabase.functions.invoke('send-welcome-email', {
          body: { email: result.data },
        });

        setIsSubscribed(true);
        toast.success('Welcome! You\'re now subscribed.');
        setEmail('');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <div className="orb orb-purple w-[500px] h-[500px] bottom-0 left-1/2 -translate-x-1/2" style={{ animationDelay: '0s' }} />
        <div className="absolute inset-0 particle-grid opacity-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-6"
            animate={{ boxShadow: ["0 0 20px hsl(var(--primary) / 0.2)", "0 0 40px hsl(var(--primary) / 0.4)", "0 0 20px hsl(var(--primary) / 0.2)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Mail className="w-8 h-8 text-primary" />
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Stay <span className="glow-text">Updated</span>
          </h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4 mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="text-muted-foreground mb-8 text-lg">
            Get notified about new templates, projects, and exclusive content. No spam, unsubscribe anytime.
          </p>

          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 p-6 rounded-xl bg-green-500/10 border border-green-500/30"
            >
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-green-400 font-medium">You're subscribed! Check your inbox soon.</span>
            </motion.div>
          ) : (
            <motion.form 
              onSubmit={handleSubmit} 
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-card/50 border border-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <GlowButton type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Subscribe
                  </>
                )}
              </GlowButton>
            </motion.form>
          )}

          <p className="text-xs text-muted-foreground mt-4">
            Join 500+ developers already subscribed
          </p>
        </motion.div>
      </div>
    </section>
  );
}
