import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { motion } from 'framer-motion';
import { Heart, Users, Package, Code, Zap, Star, Coffee, Crown } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';
import profileAvatar from '@/assets/profile-avatar.jpg';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { MembershipBenefitsSection } from '@/components/home/MembershipBenefitsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CreatorStorySection } from '@/components/home/CreatorStorySection';
import { TechStackSection } from '@/components/home/TechStackSection';
import { RoadmapSection } from '@/components/home/RoadmapSection';
import { MobileCTA } from '@/components/home/MobileCTA';
import { AnimatedStat } from '@/components/home/AnimatedStat';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export default function Index() {
  const stats = [
    { icon: Users, label: 'Supporters', value: '1.2K+' },
    { icon: Package, label: 'Products', value: '25+' },
    { icon: Star, label: 'Members', value: '500+' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBanner} alt="Hero Banner" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="glow-text">Next Developer</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Learn. Build. Grow.
              </p>
            </motion.div>

            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard className="max-w-md mx-auto mb-8">
                <div className="flex items-center gap-4">
                  <img src={profileAvatar} alt="Profile" className="w-20 h-20 rounded-full border-2 border-primary" />
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
              transition={{ duration: 0.6, delay: 0.4 }}
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
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Original Why Support Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Support Me?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your support helps me create more tutorials, templates, and tools for the developer community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Code, title: 'Quality Content', desc: 'High-quality tutorials and code templates' },
              { icon: Zap, title: 'Regular Updates', desc: 'New content and products every week' },
              { icon: Heart, title: 'Community First', desc: 'Building for developers, by a developer' },
            ].map((feature, i) => (
              <GlassCard key={i} hover>
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <MembershipBenefitsSection />

      {/* Testimonials */}
      <TestimonialsSection />

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
    </Layout>
  );
}
