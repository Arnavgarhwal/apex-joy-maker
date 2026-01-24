import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import heroImage from '@/assets/arnav-portrait.png';

const SummarySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  return (
    <section ref={sectionRef} id="summary" className="py-20 md:py-32 relative overflow-hidden">
      {/* Blurred background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover object-center opacity-10 blur-2xl scale-110"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      {/* Floating background elements */}
      <motion.div 
        style={{ y }}
        className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-primary mb-12"
          >
            Summary
          </motion.h2>
          <div className="max-w-4xl space-y-6 text-foreground/80 leading-relaxed text-lg">
            <motion.p variants={itemVariants}>
              I am a passionate Computer Science & Design student at Mumbai University, currently pursuing my Bachelor of Engineering degree. With a strong foundation in programming languages including Python, Java, C, and C++, I bring a unique blend of technical expertise and creative design sensibilities to every project.
            </motion.p>
            <motion.p variants={itemVariants}>
              My experience as a Project Intern at Consisty Systems has equipped me with real-world development skills and the ability to collaborate effectively in professional environments. I specialize in building modern web applications using React, Vite, and implementing intuitive UI/UX designs that enhance user experiences.
            </motion.p>
            <motion.p variants={itemVariants}>
              I am constantly exploring new technologies and methodologies to expand my skillset. From developing AI-powered health analyzers to comprehensive farming solutions, I am committed to creating impactful digital solutions that make a difference in people's lives.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SummarySection;
