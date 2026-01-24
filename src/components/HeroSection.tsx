import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, MapPin, Github, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/arnav-portrait.png';

const HeroSection = () => {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/arnav-garhwal-cv.pdf';
    link.download = 'Arnav_Garhwal_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Right side image - Full clear image */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
        <img
          src={heroImage}
          alt="Arnav Garhwal"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient fade to left */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>

      {/* Mobile background image */}
      <div className="absolute inset-0 lg:hidden">
        <img
          src={heroImage}
          alt="Arnav Garhwal"
          className="w-full h-full object-cover object-top opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-8 md:px-16 py-6"
      >
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-green-status animate-pulse-glow" />
          <span className="text-foreground font-medium">Open to work</span>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="outline" 
            onClick={handleDownloadCV}
            className="border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 rounded-full px-6 font-medium transition-all duration-300"
          >
            Download CV
          </Button>
        </motion.div>
      </motion.header>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-8 md:px-16 pt-32">
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
            Arnav Garhwal
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
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" />
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
      className="flex items-center gap-3 group"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ x: 5 }}
    >
      <motion.div
        whileHover={{ scale: 1.2, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400 }}
        className="w-8 h-8 rounded-lg border border-primary/50 flex items-center justify-center"
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
