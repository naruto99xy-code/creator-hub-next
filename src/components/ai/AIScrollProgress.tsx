import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin fixed bar across the top of the viewport that fills as the user scrolls the page. */
export function AIScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-primary via-accent to-secondary z-[60] pointer-events-none"
    />
  );
}
