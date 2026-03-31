import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Frontend Developer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'This platform helped me build real projects with confidence. The code quality is exceptional and I landed my first dev job within months.',
  },
  {
    name: 'Sarah Johnson',
    role: 'Full-Stack Engineer',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'The templates saved me weeks of work. Clean, modern, and exactly what I needed for my startup.',
  },
  {
    name: 'Mike Rivera',
    role: 'Junior Developer',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    text: 'Best investment I made for my career. The real-world projects taught me more than any course. Highly recommended for anyone getting started.',
  },
  {
    name: 'Emma Wilson',
    role: 'UI/UX Designer',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    text: 'Love the attention to design details. These templates are not just functional, they\'re beautiful.',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
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
            className="w-32 h-[3px] rounded-full mx-auto mt-4 mb-6 relative overflow-hidden"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, hsl(230 80% 56%), hsl(262 83% 58%), hsl(280 70% 60%), hsl(230 80% 56%))',
                backgroundSize: '200% 100%',
                boxShadow: '0 0 20px hsl(262 83% 58% / 0.4)',
              }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Join hundreds of developers who are building better projects.
          </p>
        </motion.div>

        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-max md:min-w-0">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                whileHover={{ y: -8, rotateY: 5, scale: 1.02 }}
                className="w-72 md:w-auto flex-shrink-0 group perspective-1000"
              >
                <div className="glass-card p-6 h-full relative border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_hsl(262_83%_58%/0.2)] rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)' }}
                >
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/15 group-hover:text-primary/30 transition-colors" />
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 + j * 0.08, type: 'spring' }}
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
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all"
                    />
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
