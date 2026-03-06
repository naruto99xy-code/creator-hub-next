import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Frontend Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    text: 'This platform helped me build real projects with confidence. The code quality is exceptional.',
  },
  {
    name: 'Sarah Johnson',
    role: 'Full-Stack Engineer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    text: 'The templates saved me weeks of work. Clean, modern, and exactly what I needed for my startup.',
  },
  {
    name: 'Mike Rivera',
    role: 'Junior Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    text: 'Best investment I made for my career. The real-world projects taught me more than any course.',
  },
  {
    name: 'Emma Wilson',
    role: 'UI/UX Designer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    text: 'Love the attention to design details. These templates are not just functional, they\'re beautiful.',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <div className="orb orb-blue w-[400px] h-[400px] -top-20 -left-20" style={{ animationDelay: '1s' }} />
        <div className="orb orb-pink w-[300px] h-[300px] bottom-0 right-0" style={{ animationDelay: '3s' }} />
        <div className="absolute inset-0 particle-grid opacity-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Loved by <span className="glow-text">Developers</span>
          </h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-secondary to-primary rounded-full mx-auto mt-4 mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Join hundreds of developers who are building better projects.
          </p>
        </motion.div>

        {/* Desktop grid / Mobile horizontal scroll */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-max md:min-w-0">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                className="w-72 md:w-auto flex-shrink-0"
              >
                <GlassCard hover className="h-full relative group">
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20 group-hover:text-primary/40 transition-colors" />
                  
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.4 + j * 0.05 }}
                      >
                        <Star className="w-4 h-4 fill-primary text-primary" />
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-3 mt-auto">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full bg-muted"
                    />
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
