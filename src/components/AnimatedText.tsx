import { motion, Variants } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
}

export const AnimatedHeading = ({ text, className = '', delay = 0, staggerChildren = 0.03 }: AnimatedTextProps) => {
  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerChildren,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`flex flex-wrap gap-x-3 gap-y-1 overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block origin-bottom"
          style={{ perspective: '1000px' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

interface CharacterRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export const CharacterReveal = ({ text, className = '', delay = 0 }: CharacterRevealProps) => {
  const characters = text.split('');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: 0.02,
      },
    },
  };

  const charVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 150,
      },
    },
  };

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={charVariants}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export const GlowingText = ({ text, className = '' }: { text: string; className?: string }) => {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      whileHover={{ scale: 1.02 }}
    >
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 blur-xl opacity-0"
        whileHover={{ opacity: 0.3 }}
        transition={{ duration: 0.3 }}
      />
    </motion.span>
  );
};
