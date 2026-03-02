import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import creatorProfile from '@/assets/creator-profile.png';
import { useIsMobile } from '@/hooks/use-mobile';

export function AnimatedCreatorProfile() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate tilt based on mouse position relative to center
    const maxTilt = 12;
    const x = ((e.clientY - centerY) / (rect.height / 2)) * -maxTilt;
    const y = ((e.clientX - centerX) / (rect.width / 2)) * maxTilt;
    
    setTilt({ x, y });
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-32 h-32 md:w-40 md:h-40 mx-auto cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Floating animation wrapper */}
      <motion.div
        className="relative w-full h-full"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* 3D tilt wrapper */}
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {/* Outer glow ring - animated */}
          <motion.div
            className="absolute inset-[-6px] rounded-full"
            style={{
              background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(187 100% 50%) 50%, hsl(217 91% 60%) 100%)',
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              opacity: isHovered ? 1 : 0.8,
              scale: isHovered ? 1.02 : 1,
            }}
            transition={{
              backgroundPosition: {
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
          />

          {/* Pulsing glow effect */}
          <motion.div
            className="absolute inset-[-12px] rounded-full blur-xl"
            style={{
              background: 'linear-gradient(135deg, hsl(217 91% 60% / 0.4) 0%, hsl(187 100% 50% / 0.4) 100%)',
            }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Glass background */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, hsl(217 91% 60% / 0.1) 0%, hsl(187 100% 50% / 0.1) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid hsl(217 91% 60% / 0.2)',
            }}
          />

          {/* Inner dark ring */}
          <div className="absolute inset-[3px] rounded-full bg-background/90" />

          {/* Profile image container */}
          <div className="absolute inset-[6px] rounded-full overflow-hidden">
            <img
              src={creatorProfile}
              alt="Creator"
              className="w-full h-full object-cover"
              loading="eager"
            />
            
            {/* Subtle overlay for depth */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, transparent 0%, hsl(0 0% 0% / 0.1) 100%)',
              }}
            />
          </div>

          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-[6px] rounded-full overflow-hidden pointer-events-none"
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.15) 0%, transparent 50%, transparent 100%)',
              }}
            />
          </motion.div>

          {/* Shadow for 3D depth */}
          <motion.div
            className="absolute inset-0 rounded-full -z-10"
            style={{
              boxShadow: '0 20px 40px -10px hsl(217 91% 30% / 0.4), 0 10px 20px -5px hsl(0 0% 0% / 0.3)',
            }}
            animate={{
              boxShadow: isHovered 
                ? '0 25px 50px -10px hsl(217 91% 40% / 0.5), 0 15px 30px -5px hsl(0 0% 0% / 0.4)'
                : '0 20px 40px -10px hsl(217 91% 30% / 0.4), 0 10px 20px -5px hsl(0 0% 0% / 0.3)',
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
