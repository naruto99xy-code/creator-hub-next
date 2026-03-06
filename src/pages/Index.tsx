import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Users, Package, Code, Zap, Star, Coffee, Crown } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { MembershipBenefitsSection } from '@/components/home/MembershipBenefitsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CreatorStorySection } from '@/components/home/CreatorStorySection';
import { TechStackSection } from '@/components/home/TechStackSection';
import { RoadmapSection } from '@/components/home/RoadmapSection';
import { MobileCTA } from '@/components/home/MobileCTA';
import { AnimatedStat } from '@/components/home/AnimatedStat';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { useRef } from 'react';

export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  const stats = [
    { icon: Users, label: 'Supporters', value: '1.2K+' },
    { icon: Package, label: 'Products', value: '25+' },
    { icon: Star, label: 'Members', value: '500+' },
  ];

  return (
    <Layout>
      <div ref={containerRef}>
        {/* Hero Section with parallax */}
        <motion.section 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        >
          {/* Background with orbs */}
          <div className="absolute inset-0">
            <img src={heroBanner} alt="Hero Banner" className="w-full h-full object-cover opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
            {/* Animated orbs */}
            <div className="orb orb-purple w-[500px] h-[500px] -top-40 -left-40" style={{ animationDelay: '0s' }} />
            <div className="orb orb-blue w-[400px] h-[400px] top-20 -right-20" style={{ animationDelay: '2s' }} />
            <div className="orb orb-pink w-[350px] h-[350px] -bottom-20 left-1/3" style={{ animationDelay: '4s' }} />
          </div>
          {/* Particle grid overlay */}
          <div className="absolute inset-0 particle-grid opacity-30" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
                    <span className="glow-text">Next Developer</span>
                  </h1>
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-xl md:text-2xl text-muted-foreground mb-8"
                >
                  Learn. Build. Grow.
                </motion.p>
              </motion.div>

              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <GlassCard className="max-w-md mx-auto mb-8 gradient-border">
                  <div className="flex items-center gap-4">
                    <motion.img 
                      src="/logo.png" 
                      alt="Next Developer" 
                      className="w-20 h-20 rounded-full border-2 border-primary object-contain bg-background p-1"
                      animate={{ boxShadow: ["0 0 20px hsl(262 83% 58% / 0.3)", "0 0 40px hsl(262 83% 58% / 0.6)", "0 0 20px hsl(262 83% 58% / 0.3)"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <div className="text-left">
                      <h3 className="text-xl font-bold">Next Developer</h3>
                      <p className="text-muted-foreground text-sm">Full-Stack Developer & Creator</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
                    {stats.map((stat, i) => (
                      <AnimatedStat key={i} icon={stat.icon} value={stat.value} label={stat.label} />
                    ))}
                  </div>
                </GlassCard>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link to="/support">
                  <GlowButton size="lg">
                    <Coffee className="w-5 h-5" />
                    Support Me
                  </GlowButton>
                </Link>
                <Link to="/membership">
                  <GlowButton variant="secondary" size="lg">
                    <Crown className="w-5 h-5" />
                    Join Membership
                  </GlowButton>
                </Link>
                <Link to="/shop">
                  <GlowButton variant="outline" size="lg">
                    <Package className="w-5 h-5" />
                    Visit Shop
                  </GlowButton>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs text-muted-foreground">Scroll Down</span>
            <div className="w-6 h-10 rounded-full border-2 border-primary/40 flex items-start justify-center p-1.5">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.section>

        {/* Divider with animated line */}
        <div className="relative h-px">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
        </div>

        {/* Features Section */}
        <FeaturesSection />

        {/* Why Support Section with scroll background */}
        <section className="py-24 relative overflow-hidden">
          {/* Full-screen animated background */}
          <div className="absolute inset-0">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
            <div className="orb orb-purple w-[300px] h-[300px] top-10 right-10" style={{ animationDelay: '1s' }} />
            <div className="orb orb-blue w-[250px] h-[250px] bottom-10 left-10" style={{ animationDelay: '3s' }} />
            <div className="absolute inset-0 particle-grid opacity-20" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Why Support <span className="glow-text">Me?</span>
              </motion.h2>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4 mb-6"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Your support helps me create more tutorials, templates, and tools for the developer community.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Code, title: 'Quality Content', desc: 'High-quality tutorials and code templates' },
                { icon: Zap, title: 'Regular Updates', desc: 'New content and products every week' },
                { icon: Heart, title: 'Community First', desc: 'Building for developers, by a developer' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50, rotateY: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                >
                  <GlassCard hover className="text-center group">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-5 group-hover:bg-primary/20 transition-colors"
                    >
                      <feature.icon className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Animated divider */}
        <div className="relative h-px">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
        </div>

        {/* Membership Benefits */}
        <MembershipBenefitsSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Animated divider */}
        <div className="relative h-px">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
        </div>

        {/* Creator Story */}
        <CreatorStorySection />

        {/* Tech Stack */}
        <TechStackSection />

        {/* Roadmap */}
        <RoadmapSection />

        {/* Newsletter */}
        <NewsletterSection />

        {/* Mobile sticky CTA */}
        <MobileCTA />

        {/* Bottom padding for mobile CTA */}
        <div className="h-20 md:hidden" />
      </div>
    </Layout>
  );
}
