import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: "Building Your First Full-Stack Application",
    excerpt: "Learn how to create a complete web application from scratch using modern technologies and best practices.",
    date: "January 8, 2026",
    readTime: "8 min read",
    category: "Tutorial",
  },
  {
    id: 2,
    title: "Why Clean Code Matters",
    excerpt: "Discover the importance of writing maintainable code and how it impacts your projects in the long run.",
    date: "January 5, 2026",
    readTime: "5 min read",
    category: "Best Practices",
  },
  {
    id: 3,
    title: "Getting Started with Supabase",
    excerpt: "A comprehensive guide to setting up your backend with Supabase for authentication and database management.",
    date: "January 2, 2026",
    readTime: "10 min read",
    category: "Guide",
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox: When to Use Which",
    excerpt: "Understanding the differences between CSS Grid and Flexbox and when to use each layout system.",
    date: "December 28, 2025",
    readTime: "6 min read",
    category: "CSS",
  },
];

export default function Blog() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 glow-text">Blog</h1>
          <p className="text-muted-foreground mb-12">
            Insights, tutorials, and updates from the Next Developer community.
          </p>
          
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <GlassCard key={post.id} className="p-6 group cursor-pointer hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/20 text-primary">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                  Read more <ArrowRight className="w-4 h-4" />
                </span>
              </GlassCard>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              More posts coming soon! Subscribe to our newsletter to stay updated.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
