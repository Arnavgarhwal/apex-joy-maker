import { motion } from 'framer-motion';
import { User, FileText, Briefcase, Zap, Link2, FolderKanban, GraduationCap, Mail, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [{
  id: 'home',
  label: 'Home',
  icon: User
}, {
  id: 'summary',
  label: 'Summary',
  icon: FileText
}, {
  id: 'experience',
  label: 'Experience',
  icon: Briefcase
}, {
  id: 'projects',
  label: 'Projects',
  icon: FolderKanban
}, {
  id: 'skills',
  label: 'Skills',
  icon: Zap
}, {
  id: 'education',
  label: 'Education',
  icon: GraduationCap
}, {
  id: 'contact',
  label: 'Contact',
  icon: Mail
}, {
  id: 'links',
  label: 'Links',
  icon: Link2
}];

// Create a reusable audio context for click sounds
const createClickSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    // Audio not supported
  }
};

// Haptic feedback for mobile devices
const triggerHaptic = () => {
  if ('vibrate' in navigator) {
    navigator.vibrate(10); // Short 10ms vibration
  }
};

const GlassNavigation = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('navbar-sound-enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev: boolean) => {
      const newValue = !prev;
      localStorage.setItem('navbar-sound-enabled', JSON.stringify(newValue));
      return newValue;
    });
  }, []);

  const handleFeedback = useCallback(() => {
    if (soundEnabled) {
      triggerHaptic();
      createClickSound();
    }
  }, [soundEnabled]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'summary', 'experience', 'projects', 'skills', 'education', 'contact', 'footer'];
      const sectionToNav: Record<string, string> = {
        hero: 'home',
        summary: 'summary',
        experience: 'experience',
        projects: 'projects',
        skills: 'skills',
        education: 'education',
        contact: 'contact',
        footer: 'links'
      };
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveItem(sectionToNav[sectionId]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    handleFeedback();
    setActiveItem(id);
    const sectionMap: Record<string, string> = {
      home: 'hero',
      summary: 'summary',
      experience: 'experience',
      projects: 'projects',
      skills: 'skills',
      education: 'education',
      contact: 'contact',
      links: 'footer'
    };
    const element = document.getElementById(sectionMap[id]);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return <motion.nav initial={{
    y: 100,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.8,
    delay: 1,
    type: "spring",
    stiffness: 100
  }} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-2rem)]">
      {/* Enhanced glow effect behind nav */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-70">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/40 via-primary/50 to-amber-500/40 rounded-full scale-125" />
      </div>
      <div className="absolute inset-0 -z-10 blur-2xl opacity-50">
        <div className="absolute inset-0 bg-primary/30 rounded-full scale-115" />
      </div>
      <div className="absolute inset-0 -z-10 blur-xl opacity-40">
        <div className="absolute inset-0 bg-amber-600/20 rounded-full scale-105" />
      </div>
      
      <div 
        ref={scrollContainerRef} 
        className="glass-nav flex-row flex-nowrap p-1 md:p-1.5 rounded-full overflow-x-auto shadow-2xl shadow-primary/30 opacity-80 gap-[2px] md:gap-[4px] px-[4px] md:px-[8px] mx-0 flex items-center justify-start scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent"
        style={{
          scrollbarWidth: 'thin',
        }}
      >
        {navItems.map((item, index) => (
          <motion.button 
            key={item.id} 
            onClick={() => handleClick(item.id)} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + index * 0.1 }}
            className={`relative flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2.5 rounded-full transition-all duration-300 shrink-0 ${
              activeItem === item.id 
                ? 'bg-primary text-primary-foreground' 
                : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
            }`}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              animate={activeItem === item.id ? {
                scale: [1, 1.3, 0.9, 1.1, 1],
                rotate: [0, -15, 15, -5, 0],
                y: [0, -4, 2, -1, 0]
              } : {}} 
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 300,
                damping: 10
              }}
            >
              <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </motion.div>
            {/* Hide label on small screens, show on md and up */}
            <span className="hidden md:inline text-sm font-medium whitespace-nowrap">{item.label}</span>
            
            {activeItem === item.id && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute inset-0 bg-primary rounded-full -z-10" 
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30
                }} 
              />
            )}
          </motion.button>
        ))}
        
        {/* Sound Toggle Button */}
        <motion.button
          onClick={toggleSound}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 + navItems.length * 0.1 }}
          className="relative flex items-center justify-center px-2 py-1.5 md:py-2.5 rounded-full transition-all duration-300 shrink-0 text-foreground/50 hover:text-foreground hover:bg-foreground/5 ml-1 border-l border-foreground/10 pl-3"
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          title={soundEnabled ? "Mute sounds" : "Enable sounds"}
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 md:w-4 md:h-4" />
          )}
        </motion.button>
      </div>
    </motion.nav>;
};
export default GlassNavigation;