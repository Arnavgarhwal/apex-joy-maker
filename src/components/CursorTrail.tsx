import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

const CursorTrail = () => {
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    let idCounter = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Add new trail dot
      const newDot: TrailDot = {
        id: idCounter++,
        x: e.clientX,
        y: e.clientY,
      };
      
      setTrail(prev => [...prev.slice(-12), newDot]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  // Clean up old trail dots
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(-8));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-4 h-4 rounded-full bg-primary/80 blur-[2px]" />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] hidden lg:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div 
          className="w-10 h-10 rounded-full border border-primary/40"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Trail dots */}
      <AnimatePresence>
        {trail.map((dot, index) => (
          <motion.div
            key={dot.id}
            className="fixed pointer-events-none z-[9997] hidden lg:block"
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              left: dot.x,
              top: dot.y,
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            <div 
              className="rounded-full bg-primary/60"
              style={{
                width: Math.max(2, 8 - index * 0.5),
                height: Math.max(2, 8 - index * 0.5),
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default CursorTrail;
