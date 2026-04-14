import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Users, Package, Code, Zap, Star, Coffee, Crown, Rocket, Shield, BookOpen } from 'lucide-react';
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
import { PublishedMaterials } from '@/components/shared/PublishedMaterials';

const whySupportCards = [
  { icon: Rocket, title: 'Faster Learning', desc: 'Skip the guesswork with production-ready code and real-world patterns.' },
  { icon: Shield, title: 'Real-World Skills', desc: 'Build portfolio-worthy projects that actually impress employers.' },
  { icon: BookOpen, title: 'Exclusive Content', desc: 'Access members-only tutorials, templates, and deep-dive guides.' },
  { icon: Heart, title: 'Direct Support', desc: 'Get priority help and connect with a community of builders.' },
];

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
        {/* Hero Section */}
        <motion.section 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0">
            <img src={heroBanner} alt="Hero Banner" className="w-full h-full object-cover opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
            <div className="orb orb-purple w-[500px] h-[500px] -top-40 -left-40" style={{ animationDelay: '0s' }} />
            <div className="orb orb-blue w-[400px] h-[400px] top-20 -right-20" style={{ animationDelay: '2s' }} />
            <div className="orb orb-pink w-[350px] h-[350px] -bottom-20 left-1/3" style={{ animationDelay: '4s' }} />
          </div>
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
                      <AnimatedStat key={i} icon={stat.icon} value={stat.value} label={stat.label} delay={i * 200} />
                    ))}
                  </div>
                </GlassCard>
              </motion.div>

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

        <div className="relative h-px">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
        </div>

        <FeaturesSection />

        {/* Why Support Me - Premium Glass Cards */}
        <section className="py-24 relative overflow-hidden">
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
                className="w-32 h-[3px] rounded-full mx-auto mt-4 mb-6 relative overflow-hidden"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, hsl(262 83% 58%), hsl(230 80% 56%), hsl(280 70% 60%), hsl(262 83% 58%))',
                    backgroundSize: '200% 100%',
                    boxShadow: '0 0 20px hsl(262 83% 58% / 0.4)',
                  }}
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Your support helps me create more tutorials, templates, and tools for the developer community.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whySupportCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                  whileHover={{ y: -10, rotateY: 5, scale: 1.03 }}
                  className="group"
                >
                  <div
                    className="p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_hsl(262_83%_58%/0.25)] text-center h-full"
                    style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)' }}
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-5 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all group-hover:shadow-[0_0_25px_hsl(262_83%_58%/0.3)]"
                    >
                      <card.icon className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
                    <p className="text-muted-foreground text-sm">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="relative h-px">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
        </div>

        <MembershipBenefitsSection />
        <TestimonialsSection />

        <div className="relative h-px">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
        </div>

        <CreatorStorySection />
        <TechStackSection />
        <RoadmapSection />
        <PublishedMaterials section="Home" title="Featured Materials" subtitle="Explore our latest resources and templates" />
        <NewsletterSection />
        <MobileCTA />
        <div className="h-20 md:hidden" />
      </div>
    </Layout>
  );
}
