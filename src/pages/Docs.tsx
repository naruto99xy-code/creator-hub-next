import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Book, Rocket, Code, Settings, Users, HelpCircle } from 'lucide-react';

const docSections = [
  {
    icon: Rocket,
    title: "Getting Started",
    description: "Quick start guides and setup instructions for new users.",
    links: ["Installation", "First Project", "Environment Setup"],
  },
  {
    icon: Code,
    title: "Templates",
    description: "Documentation for using and customizing our templates.",
    links: ["Template Structure", "Customization", "Best Practices"],
  },
  {
    icon: Book,
    title: "Guides",
    description: "In-depth tutorials and walkthroughs for various topics.",
    links: ["Building APIs", "Authentication", "Database Design"],
  },
  {
    icon: Settings,
    title: "Configuration",
    description: "Learn how to configure and optimize your projects.",
    links: ["Environment Variables", "Build Settings", "Deployment"],
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with other developers and contribute.",
    links: ["Discord Server", "GitHub Discussions", "Contributing"],
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    description: "Answers to commonly asked questions.",
    links: ["Account & Billing", "Technical Issues", "Licensing"],
  },
];

export default function Docs() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 glow-text">Documentation</h1>
          <p className="text-muted-foreground mb-12">
            Everything you need to know about using Next Developer products and services.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docSections.map((section) => (
              <GlassCard key={section.title} className="p-6 group cursor-pointer hover:border-primary/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
                
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {section.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">{section.description}</p>
                
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <span className="text-sm text-primary/80 hover:text-primary cursor-pointer transition-colors">
                        → {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>

          <div className="mt-12">
            <GlassCard className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">Can't find what you're looking for?</h3>
              <p className="text-muted-foreground mb-4">
                Our support team is here to help you with any questions.
              </p>
              <a href="/support" className="glow-button inline-flex px-6 py-2">
                Contact Support
              </a>
            </GlassCard>
          </div>
        </div>
      </div>
    </Layout>
  );
}
