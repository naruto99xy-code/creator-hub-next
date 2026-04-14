import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { motion } from 'framer-motion';
import {
  Globe, ShoppingCart, Bot, Layers, LayoutDashboard, Cog,
  MessageCircle, Mail, Linkedin, ArrowRight, Check, Send,
  ChevronRight
} from 'lucide-react';
import founderImg from '@/assets/founder.jpg';
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { PublishedMaterials } from '@/components/shared/PublishedMaterials';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const services = [
  {
    icon: Globe,
    title: 'Business Websites',
    items: ['High-performance responsive websites', 'Modern UI/UX', 'SEO-ready structure'],
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Development',
    items: ['Custom online stores', 'Razorpay integration', 'Admin dashboard'],
  },
  {
    icon: Bot,
    title: 'AI-Integrated Applications',
    items: ['AI chat systems', 'Automation tools', 'Custom AI assistants'],
  },
  {
    icon: Layers,
    title: 'SaaS Platforms',
    items: ['Full-stack SaaS architecture', 'Supabase / Firebase backend', 'Role-based authentication'],
  },
  {
    icon: LayoutDashboard,
    title: 'Admin Dashboards',
    items: ['Secure admin panels', 'Analytics integration', 'Data management systems'],
  },
  {
    icon: Cog,
    title: 'Custom Automation',
    items: ['WhatsApp automation', 'Workflow systems', 'API integrations'],
  },
];

const pricingPlans = [
  {
    name: 'Basic Website',
    price: '₹7,999 – ₹12,999',
    features: ['5 Pages', 'Responsive Design', 'Contact Form'],
    delivery: '7 Days',
  },
  {
    name: 'Business Website',
    price: '₹15,000 – ₹30,000',
    features: ['Up to 12 Pages', 'Custom UI', 'Admin Panel', 'SEO Setup'],
    delivery: '10–14 Days',
    popular: true,
  },
  {
    name: 'E-Commerce Platform',
    price: '₹25,000 – ₹60,000',
    features: ['Product System', 'Payment Integration', 'Order Management', 'Admin Dashboard'],
    delivery: '2–3 Weeks',
  },
  {
    name: 'AI / SaaS Development',
    price: '₹50,000+',
    features: ['Custom Architecture', 'Authentication', 'Database Setup', 'Deployment'],
    delivery: 'Based on Features',
  },
];

const processSteps = [
  'Requirement Discussion',
  'Planning & Architecture',
  '50% Advance Payment',
  'Development Phase',
  'Demo & Revisions',
  'Final Payment',
  'Launch & Support',
];

export default function Services() {
  const [form, setForm] = useState({ name: '', email: '', projectType: '', budget: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inquirySchema = z.object({
    name: z.string().trim().min(1, 'Name is required').max(100),
    email: z.string().trim().email('Please enter a valid email').max(255),
    message: z.string().trim().min(1, 'Message is required').max(1000),
    projectType: z.string().optional(),
    budget: z.string().optional(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = inquirySchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('inquiries').insert({
        name: result.data.name,
        email: result.data.email,
        project_type: result.data.projectType || null,
        budget_range: result.data.budget || null,
        message: result.data.message,
      });

      if (error) throw error;

      // Send email notification
      const { data: emailRes, error: emailError } = await supabase.functions.invoke('send-inquiry-email', {
        body: {
          name: result.data.name,
          email: result.data.email,
          project_type: result.data.projectType || 'Not specified',
          budget_range: result.data.budget || 'Not specified',
          message: result.data.message,
        },
      });

      if (emailError) throw emailError;

      toast.success('Inquiry sent! We\'ll get back to you shortly.');
      setForm({ name: '', email: '', projectType: '', budget: '', message: '' });
    } catch (error) {
      console.error('Inquiry submission error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]" style={{ background: 'linear-gradient(135deg, hsl(270 80% 60%), hsl(217 91% 60%))' }} />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-mono text-sm tracking-widest uppercase mb-4"
          >
            Premium Digital Studio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6"
          >
            <span className="glow-text">NextDeveloper</span>{' '}
            <span className="text-foreground">Studio</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-3xl font-light text-muted-foreground mb-6"
          >
            We Build Intelligent Digital Systems
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg"
          >
            From business websites to AI-powered SaaS platforms, we design, develop, and launch scalable digital systems for startups and enterprises.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a href="#pricing">
              <GlowButton size="lg">
                Start Your Project <ArrowRight className="w-5 h-5" />
              </GlowButton>
            </a>
            <a href="https://wa.me/919866994058?text=Hi%2C%20I%20want%20to%20discuss%20a%20project" target="_blank" rel="noopener noreferrer">
              <GlowButton variant="outline" size="lg">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Consultation
              </GlowButton>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What We <span className="glow-text">Build</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              End-to-end digital solutions built with modern technologies and best practices.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <GlassCard hover className="h-full group">
                  <div className="p-1">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                    <ul className="space-y-2">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-muted-foreground text-sm">
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative">
        <div className="absolute inset-0 opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle at 50% 50%, hsl(270 80% 60%), transparent 70%)' }} />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Transparent <span className="glow-text">Pricing</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Clear pricing with no hidden fees. Pay for what you need.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}
                <GlassCard
                  hover
                  className={`h-full flex flex-col ${plan.popular ? 'border-primary/50 shadow-[0_0_30px_hsl(217_91%_60%/0.15)]' : ''}`}
                >
                  <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                  <p className="text-2xl font-black glow-text mb-6">{plan.price}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground mb-4">Delivery: {plan.delivery}</p>
                  <a href="#contact">
                    <GlowButton variant={plan.popular ? 'primary' : 'outline'} size="sm" className="w-full">
                      Start Project
                    </GlowButton>
                  </a>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Our Development <span className="glow-text">Process</span>
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary/20" />

            {processSteps.map((step, i) => (
              <motion.div
                key={step}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative flex items-start gap-6 md:gap-8 mb-10 last:mb-0"
              >
                <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center shrink-0 shadow-[0_0_20px_hsl(217_91%_60%/0.2)]">
                  <span className="text-primary font-bold text-sm md:text-base">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="pt-2 md:pt-4">
                  <h4 className="text-lg md:text-xl font-semibold">{step}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle at 30% 50%, hsl(217 91% 60%), transparent 60%)' }} />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Meet The <span className="glow-text">Founder</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-primary/50 shrink-0 shadow-[0_0_30px_hsl(217_91%_60%/0.2)]">
                  <img src={founderImg} alt="Krishna Bhagat" className="w-full h-full object-cover" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-1">Krishna Bhagat</h3>
                  <p className="text-primary font-medium mb-4">Founder & Director, NextDeveloper</p>
                  <p className="text-muted-foreground mb-6">
                    Krishna is a full-stack developer and AI system architect building scalable digital platforms and intelligent automation systems.
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      <GlowButton variant="outline" size="sm">
                        <Linkedin className="w-4 h-4" /> LinkedIn
                      </GlowButton>
                    </a>
                    <a href="mailto:hello@nextdeveloper.com">
                      <GlowButton variant="outline" size="sm">
                        <Mail className="w-4 h-4" /> Email
                      </GlowButton>
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Start Your Project <span className="glow-text">Today</span>
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <a href="https://wa.me/919866994058?text=Hi%2C%20I%20want%20to%20discuss%20a%20project" target="_blank" rel="noopener noreferrer">
                <GlowButton size="lg">
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </GlowButton>
              </a>
              <a href="mailto:hello@nextdeveloper.com">
                <GlowButton variant="secondary" size="lg">
                  <Mail className="w-5 h-5" /> Email Us
                </GlowButton>
              </a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                        placeholder="Your name"
                        maxLength={100}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                        placeholder="you@email.com"
                        maxLength={255}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Type</label>
                      <select
                        value={form.projectType}
                        onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                      >
                        <option value="">Select type</option>
                        <option>Business Website</option>
                        <option>E-Commerce</option>
                        <option>AI Application</option>
                        <option>SaaS Platform</option>
                        <option>Admin Dashboard</option>
                        <option>Custom Automation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Budget Range</label>
                      <select
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                      >
                        <option value="">Select budget</option>
                        <option>₹7,999 – ₹12,999</option>
                        <option>₹15,000 – ₹30,000</option>
                        <option>₹25,000 – ₹60,000</option>
                        <option>₹50,000+</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
                      placeholder="Tell us about your project..."
                      maxLength={1000}
                    />
                  </div>
                  <GlowButton type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="w-5 h-5" /> Send Inquiry</>
                    )}
                  </GlowButton>
                </form>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>
      <PublishedMaterials section="Services" title="Service Resources" subtitle="Templates and tools for your projects" />
    </Layout>
  );
}
