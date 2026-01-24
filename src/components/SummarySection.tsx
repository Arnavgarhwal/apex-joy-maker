import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

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
    hidden: { opacity: 0, y: 30, rotateX: -15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  return (
    <section ref={sectionRef} id="summary" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Floating background elements */}
      <motion.div 
        style={{ y }}
        className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          style={{ perspective: 1000 }}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-2xl font-semibold text-foreground mb-8"
          >
            Summary
          </motion.h2>
          <div className="max-w-4xl space-y-6 text-muted-foreground leading-relaxed text-lg">
            <motion.p 
              variants={itemVariants}
              className="card-3d"
            >
              <span className="card-3d-content block">
                I am a passionate Computer Science & Design student at Mumbai University, currently pursuing my Bachelor of Engineering degree. With a strong foundation in programming languages including Python, Java, C, and C++, I bring a unique blend of technical expertise and creative design sensibilities to every project.
              </span>
            </motion.p>
            <motion.p 
              variants={itemVariants}
              className="card-3d"
            >
              <span className="card-3d-content block">
                My experience as a Project Intern at Consisty Systems has equipped me with real-world development skills and the ability to collaborate effectively in professional environments. I specialize in building modern web applications using React, Vite, and implementing intuitive UI/UX designs that enhance user experiences.
              </span>
            </motion.p>
            <motion.p 
              variants={itemVariants}
              className="card-3d"
            >
              <span className="card-3d-content block">
                I am constantly exploring new technologies and methodologies to expand my skillset. From developing AI-powered health analyzers to comprehensive farming solutions, I am committed to creating impactful digital solutions that make a difference in people's lives.
              </span>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SummarySection;
