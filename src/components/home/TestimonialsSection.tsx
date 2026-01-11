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
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by <span className="glow-text">Developers</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of developers who are building better projects.
          </p>
        </motion.div>

        {/* Desktop grid / Mobile horizontal scroll */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-max md:min-w-0">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-72 md:w-auto flex-shrink-0"
              >
                <GlassCard hover className="h-full relative">
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
                  
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-primary text-primary" />
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
