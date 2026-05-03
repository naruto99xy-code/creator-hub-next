import { motion } from 'framer-motion';

export function SEOContentSection() {
  return (
    <section className="py-20 relative overflow-hidden" aria-labelledby="about-next-developer">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="prose prose-invert max-w-none"
        >
          <h2 id="about-next-developer" className="text-3xl md:text-5xl font-bold mb-6 text-center">
            About <span className="glow-text">Next Developer (NextDeveloper)</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-10" />

          <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
            <p>
              <strong className="text-foreground">Next Developer</strong>, also known as{' '}
              <strong className="text-foreground">NextDeveloper</strong>, is a software and web development
              company building modern digital solutions for startups, creators, and enterprises around the
              world. Whether you spell it as Next Developer or NextDeveloper, our mission is the same — to
              help businesses ship faster with production-ready websites, mobile apps, AI assistants, and
              custom software.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold text-foreground pt-4">
              What Next Developer Offers
            </h3>
            <p>
              At NextDeveloper, we specialize in full-stack web development, cross-platform mobile app
              development, AI-powered tools, SaaS platforms, and developer-focused digital products. Our
              team combines clean engineering with thoughtful design so every project we ship is fast,
              scalable, and built to last. From landing pages to enterprise dashboards, Next Developer
              delivers code you can trust.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold text-foreground pt-4">
              Why Choose NextDeveloper
            </h3>
            <p>
              Next Developer (NextDeveloper) was founded with a simple belief — quality code shouldn't be
              a luxury. That's why we offer affordable templates, premium source codes, AI assistant
              starter kits, and end-to-end software services under one roof. Thousands of developers
              already rely on NextDeveloper for tutorials, project blueprints, and ready-to-deploy
              codebases that save weeks of work.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold text-foreground pt-4">
              Web, App & AI Development
            </h3>
            <p>
              As a modern development company, Next Developer focuses on the technologies businesses
              actually use today: React, Next.js, TypeScript, Tailwind CSS, Node.js, Supabase, and the
              latest AI APIs. NextDeveloper engineers craft responsive websites, performant mobile apps,
              and intelligent AI agents tailored to your brand. Every product we ship is mobile-first,
              SEO-optimized, and ready for real users from day one.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold text-foreground pt-4">
              Built for Creators and Founders
            </h3>
            <p>
              Beyond client work, Next Developer runs a thriving creator ecosystem — premium AI source
              codes (Jarvis, MYRA, ARIYA, Zara, AI Girlfriend), membership tiers, and a marketplace of
              templates. NextDeveloper is more than a software company; it's a platform built to help the
              next generation of developers learn, build, and grow. Join thousands who trust Next
              Developer (NextDeveloper) to power their digital journey.
            </p>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
