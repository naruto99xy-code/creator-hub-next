import { motion } from 'framer-motion';
import { Check, Loader2, Clock, Sparkles } from 'lucide-react';

const roadmapItems = [
  { title: 'Premium Templates', status: 'completed', desc: 'Production-ready templates for modern web apps' },
  { title: 'Advanced Projects', status: 'in-progress', desc: 'Full-stack projects with real-world features' },
  { title: 'Community Platform', status: 'coming-soon', desc: 'Connect with other developers and share projects' },
  { title: 'Courses & Mentorship', status: 'planned', desc: 'Structured learning paths with personal guidance' },
];

const statusConfig = {
  'completed': { icon: Check, label: 'Completed', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30', animate: false },
  'in-progress': { icon: Loader2, label: 'In Progress', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/30', animate: true },
  'coming-soon': { icon: Clock, label: 'Coming Soon', color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/30', animate: false },
  'planned': { icon: Sparkles, label: 'Planned', color: 'text-muted-foreground', bg: 'bg-muted/30', border: 'border-muted', animate: false },
};

export function RoadmapSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What's <span className="glow-text">Coming Next</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow our journey as we build the ultimate platform for developers.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[23px] md:left-1/2 md:-translate-x-[1px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-muted" />

            {roadmapItems.map((item, i) => {
              const config = statusConfig[item.status as keyof typeof statusConfig];
              const Icon = config.icon;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-center gap-6 mb-8 md:mb-12 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Icon */}
                  <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full ${config.bg} ${config.border} border-2 flex items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2`}>
                    <Icon className={`w-5 h-5 ${config.color} ${config.animate ? 'animate-spin' : ''}`} />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 p-5 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all ${
                    isEven ? 'md:mr-[calc(50%+2rem)] md:text-right' : 'md:ml-[calc(50%+2rem)]'
                  }`}>
                    <div className={`flex items-center gap-2 mb-2 ${isEven ? 'md:justify-end' : ''}`}>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${config.bg} ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
