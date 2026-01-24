import { motion, AnimatePresence, Variants } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import SummarySection from '@/components/SummarySection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import EducationSection from '@/components/EducationSection';
import FooterSection from '@/components/FooterSection';
import GlassNavigation from '@/components/GlassNavigation';

const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.4, ease: "easeIn" }
  }
};

const sectionVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const Index = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.main 
        className="min-h-screen bg-background overflow-x-hidden"
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <HeroSection />
        
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SummarySection />
        </motion.div>
        
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <ExperienceSection />
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <ProjectsSection />
        </motion.div>
        
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SkillsSection />
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <EducationSection />
        </motion.div>
        
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <FooterSection />
        </motion.div>
        
        {/* Glass Navigation */}
        <GlassNavigation />
      </motion.main>
    </AnimatePresence>
  );
};

export default Index;
