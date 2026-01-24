import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, School, BookOpen } from 'lucide-react';
import { AnimatedHeading } from './AnimatedText';
import heroImage from '@/assets/arnav-portrait.png';

const educationData = [
  {
    institution: "Mumbai University",
    degree: "Bachelor of Engineering (Computer Science & Design)",
    period: "2024 - Present",
    icon: GraduationCap,
  },
  {
    institution: "Kendriya Vidyalaya AFS Thane",
    degree: "12th CBSE",
    period: "2024",
    icon: School,
  },
  {
    institution: "Kendriya Vidyalaya AFS Thane",
    degree: "10th CBSE",
    period: "2022",
    icon: BookOpen,
  },
];

const EducationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 100
      }
    }
  };

  return (
    <section ref={sectionRef} id="education" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <img
          src={heroImage}
          alt=""
          className="w-full h-[130%] object-cover opacity-[0.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </motion.div>

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        <AnimatedHeading 
          text="Education"
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-16"
          delay={0.1}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 20 }
              }}
              className="group relative bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Hover glow effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              {/* Icon */}
              <motion.div 
                className="relative z-10 mb-6"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <edu.icon className="w-7 h-7 text-primary" />
                </div>
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {edu.institution}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {edu.degree}
                </p>
                <motion.span 
                  className="inline-block text-primary font-semibold"
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  {edu.period}
                </motion.span>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
