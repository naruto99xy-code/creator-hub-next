import { motion } from 'framer-motion';

const technologies = [
  { name: 'HTML', color: '#E34F26' },
  { name: 'CSS', color: '#1572B6' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Express.js', color: '#ffffff' },
  { name: 'Python', color: '#3776AB' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'Firebase', color: '#FFCA28' },
  { name: 'Supabase', color: '#3ECF8E' },
  { name: 'GitHub', color: '#ffffff' },
];

export function TechStackSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-background to-primary/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <div className="orb orb-blue w-[350px] h-[350px] top-0 left-1/3" style={{ animationDelay: '1s' }} />
        <div className="orb orb-purple w-[250px] h-[250px] bottom-0 right-1/4" style={{ animationDelay: '3s' }} />
        <div className="absolute inset-0 particle-grid opacity-15" />
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
            Built With <span className="glow-text">Modern Tech</span>
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
            All projects use industry-standard technologies and best practices.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 md:gap-6">
          {technologies.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.06, type: "spring", stiffness: 120 }}
              whileHover={{ scale: 1.15, y: -8 }}
              className="group flex flex-col items-center gap-3 p-4 md:p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-[0_0_30px_hsl(262_83%_58%/0.2)]"
              style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}
            >
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold transition-all duration-300"
                style={{ 
                  color: tech.color,
                  textShadow: `0 0 20px ${tech.color}40`,
                }}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
              >
                {tech.name.charAt(0)}
              </motion.div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
