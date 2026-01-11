import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Play, Clock, BarChart } from 'lucide-react';

const tutorials = [
  {
    id: 1,
    title: "HTML & CSS Fundamentals",
    description: "Master the building blocks of web development with hands-on projects.",
    duration: "4 hours",
    level: "Beginner",
    lessons: 12,
  },
  {
    id: 2,
    title: "JavaScript Essentials",
    description: "Learn JavaScript from scratch and build interactive web applications.",
    duration: "6 hours",
    level: "Beginner",
    lessons: 18,
  },
  {
    id: 3,
    title: "React for Beginners",
    description: "Build modern user interfaces with React and component-based architecture.",
    duration: "8 hours",
    level: "Intermediate",
    lessons: 24,
  },
  {
    id: 4,
    title: "Backend Development with Supabase",
    description: "Create full-stack applications with authentication, database, and storage.",
    duration: "5 hours",
    level: "Intermediate",
    lessons: 15,
  },
  {
    id: 5,
    title: "Advanced CSS Techniques",
    description: "Level up your styling skills with animations, Grid, and modern CSS features.",
    duration: "3 hours",
    level: "Intermediate",
    lessons: 10,
  },
  {
    id: 6,
    title: "TypeScript Deep Dive",
    description: "Add type safety to your JavaScript projects and catch errors early.",
    duration: "4 hours",
    level: "Advanced",
    lessons: 14,
  },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner':
      return 'bg-green-500/20 text-green-400';
    case 'Intermediate':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'Advanced':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-primary/20 text-primary';
  }
};

export default function Tutorials() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 glow-text">Tutorials</h1>
          <p className="text-muted-foreground mb-12">
            Step-by-step guides to help you master web development skills.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutorials.map((tutorial) => (
              <GlassCard key={tutorial.id} className="p-6 group cursor-pointer hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${getLevelColor(tutorial.level)}`}>
                    {tutorial.level}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Play className="w-5 h-5 text-primary" />
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {tutorial.title}
                </h2>
                <p className="text-muted-foreground mb-4 text-sm">{tutorial.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {tutorial.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart className="w-4 h-4" />
                    {tutorial.lessons} lessons
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="mt-12 text-center">
            <GlassCard className="p-8 inline-block">
              <p className="text-lg mb-2">Want access to all tutorials?</p>
              <p className="text-muted-foreground mb-4">Join our membership for unlimited access.</p>
              <a href="/membership" className="glow-button inline-flex px-6 py-2">
                View Membership
              </a>
            </GlassCard>
          </div>
        </div>
      </div>
    </Layout>
  );
}
