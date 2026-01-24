import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, Linkedin, MapPin, Github, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-portrait.png';
import { useRef } from 'react';
import MagneticButton from './MagneticButton';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/arnav-garhwal-cv.pdf';
    link.download = 'Arnav_Garhwal_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Warm ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 via-background to-background pointer-events-none" />
      
      {/* Right side image - Full clear image with warm orange rim lighting */}
      <motion.div 
        className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block"
        style={{ y: imageY, scale: imageScale }}
      >
        {/* Warm orange rim lighting effect */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-0 right-0 bottom-0 w-4 bg-gradient-to-l from-amber-500/40 to-transparent blur-sm" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-amber-500/20 to-transparent blur-md" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-600/30 to-transparent blur-md" />
        </div>
        
        <motion.img
          src={heroImage}
          alt="Arnav Garhwal"
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        
        {/* Sepia/warm overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-l from-amber-900/10 to-transparent mix-blend-overlay" />
        
        {/* Gradient fade to left */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
      </motion.div>

      {/* Mobile background image */}
      <motion.div 
        className="absolute inset-0 lg:hidden"
        style={{ y: imageY }}
      >
        <img
          src={heroImage}
          alt="Arnav Garhwal"
          className="w-full h-full object-cover object-top opacity-30"
        />
        {/* Warm sepia overlay for mobile */}
        <div className="absolute inset-0 bg-amber-900/20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </motion.div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-8 md:px-16 py-6"
        style={{ opacity }}
      >
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-green-status animate-pulse-glow" />
          <span className="text-foreground font-medium">Open to work</span>
        </motion.div>
        <MagneticButton strength={0.4}>
          <Button 
            variant="outline" 
            onClick={handleDownloadCV}
            className="border-primary bg-primary text-primary-foreground hover:bg-amber-500 hover:shadow-lg hover:shadow-amber-500/30 rounded-full px-6 font-medium transition-all duration-300"
          >
            Download CV
          </Button>
        </MagneticButton>
      </motion.header>

      {/* Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-8 md:px-16 pt-32"
        style={{ y: contentY, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <motion.p 
            className="text-primary font-semibold tracking-widest uppercase mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Full Stack Developer & Designer
          </motion.p>
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-12 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Arnav
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-gradient"
            >
              Garhwal
            </motion.span>
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground/90">
            <ContactItem icon={Mail} text="arnavgarhwal@gmail.com" href="mailto:arnavgarhwal@gmail.com" delay={0.5} />
            <ContactItem icon={Phone} text="+91 9004682830" href="tel:+919004682830" delay={0.55} />
            <ContactItem icon={Linkedin} text="linkedin.com/in/arnavgarhwal" href="https://www.linkedin.com/in/arnavgarhwal/" delay={0.6} />
            <ContactItem icon={Github} text="github.com/Arnavgarhwal" href="https://github.com/Arnavgarhwal" delay={0.65} />
            <ContactItem icon={Instagram} text="instagram.com/arnavgarhwal" href="https://www.instagram.com/arnavgarhwal/" delay={0.7} />
            <ContactItem icon={MapPin} text="Mumbai, India" delay={0.75} />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2"
        >
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

interface ContactItemProps {
  icon: React.ElementType;
  text: string;
  href?: string;
  delay?: number;
}

const ContactItem = ({ icon: Icon, text, href, delay = 0 }: ContactItemProps) => {
  const content = (
    <motion.div 
      className="flex items-center gap-3 group cursor-pointer"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ x: 8, scale: 1.02 }}
    >
      <motion.div
        whileHover={{ scale: 1.3, rotate: 10, backgroundColor: 'hsl(var(--primary) / 0.2)' }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="w-8 h-8 rounded-lg border border-primary/50 flex items-center justify-center bg-primary/5"
      >
        <Icon className="w-4 h-4 text-primary" />
      </motion.div>
      <span className="group-hover:text-primary transition-colors duration-300">{text}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
        {content}
      </a>
    );
  }

  return content;
};

export default HeroSection;
