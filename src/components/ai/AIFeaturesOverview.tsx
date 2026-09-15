import { motion } from 'framer-motion';
import {
  Mic, Settings, Battery, AppWindow, Power, MessageCircle, Volume2, Sun, LucideIcon,
} from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  variant: 'primary' | 'secondary';
}

const features: Feature[] = [
  { icon: Mic, title: 'Voice Input', description: 'Choose from multiple male and female voice options for natural interaction with your AI assistant.', variant: 'primary' },
  { icon: Settings, title: 'Full System Automation', description: 'Open, close, and manage applications. Handle files and folders with simple voice commands.', variant: 'secondary' },
  { icon: Battery, title: 'System Status Check', description: 'Monitor battery, CPU usage, RAM usage, and internet status in real-time via voice.', variant: 'primary' },
  { icon: AppWindow, title: 'Windows Management', description: 'Minimize, maximize, and switch between windows effortlessly using voice commands.', variant: 'secondary' },
  { icon: Power, title: 'PC Power Control', description: 'Shutdown, restart, sleep, or lock your PC instantly with voice commands.', variant: 'primary' },
  { icon: MessageCircle, title: 'WhatsApp Automation', description: 'Send messages and files through WhatsApp using simple voice instructions.', variant: 'secondary' },
  { icon: Volume2, title: 'Volume Control', description: 'Increase, decrease, mute, or unmute system volume with natural voice commands.', variant: 'primary' },
  { icon: Sun, title: 'Brightness Management', description: 'Adjust your screen brightness up or down with easy voice commands.', variant: 'secondary' },
];

function FeatureCard({ feature, delay }: { feature: Feature; delay: number }) {
  const isPrimary = feature.variant === 'primary';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-card rounded-xl p-6 group cursor-default"
    >
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 ${
          isPrimary ? 'bg-primary/20 group-hover:bg-primary/30' : 'bg-secondary/20 group-hover:bg-secondary/30'
        }`}
      >
        <feature.icon className={`w-6 h-6 ${isPrimary ? 'text-primary' : 'text-secondary'}`} />
      </div>
      <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">{feature.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

/** Ported from codeninjavik's Features Overview section (FeatureCard grid). */
export function AIFeaturesOverview() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass-card text-primary font-semibold text-sm tracking-wider mb-4">
            POWERFUL FEATURES
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="glow-text">Complete Control</span> at Your Voice
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the future of PC automation with advanced AI voice recognition and intelligent command processing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
