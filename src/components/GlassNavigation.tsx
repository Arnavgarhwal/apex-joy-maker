import { motion, AnimatePresence, useDragControls, PanInfo } from 'framer-motion';
import { User, FileText, Briefcase, Zap, Link2, FolderKanban, GraduationCap, Mail, Volume2, VolumeX, GripVertical } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('navbar-sound-enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem('navbar-position');
    return saved ? JSON.parse(saved) : { x: 32, y: window.innerHeight - 100 };
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);

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

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const totalItems = navItems.length + 1; // +1 for sound toggle
    
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => {
          const next = prev < totalItems - 1 ? prev + 1 : 0;
          buttonRefs.current[next]?.focus();
          return next;
        });
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => {
          const next = prev > 0 ? prev - 1 : totalItems - 1;
          buttonRefs.current[next]?.focus();
          return next;
        });
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        buttonRefs.current[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(totalItems - 1);
        buttonRefs.current[totalItems - 1]?.focus();
        break;
    }
  }, []);

  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const newPosition = { 
      x: position.x + info.offset.x, 
      y: position.y + info.offset.y 
    };
    // Constrain to viewport
    const navWidth = scrollContainerRef.current?.offsetWidth || 400;
    const navHeight = scrollContainerRef.current?.offsetHeight || 60;
    newPosition.x = Math.max(8, Math.min(window.innerWidth - navWidth - 8, newPosition.x));
    newPosition.y = Math.max(8, Math.min(window.innerHeight - navHeight - 8, newPosition.y));
    setPosition(newPosition);
    localStorage.setItem('navbar-position', JSON.stringify(newPosition));
  }, [position]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Auto-hide logic: hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
      
      // Active section detection
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Handle window resize to keep navbar in bounds
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev: { x: number; y: number }) => {
        const navWidth = scrollContainerRef.current?.offsetWidth || 400;
        const navHeight = scrollContainerRef.current?.offsetHeight || 60;
        const newX = Math.max(8, Math.min(window.innerWidth - navWidth - 8, prev.x));
        const newY = Math.max(8, Math.min(window.innerHeight - navHeight - 8, prev.y));
        return { x: newX, y: newY };
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  return (
    <TooltipProvider delayDuration={300}>
      <AnimatePresence>
        {isVisible && (
          <motion.nav 
            drag
            dragControls={dragControls}
            dragMomentum={false}
            dragElastic={0.1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, x: position.x, y: position.y }}
            animate={{ opacity: 1, x: position.x, y: position.y }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 25
            }} 
            className="fixed top-0 left-0 z-50 cursor-grab active:cursor-grabbing"
            style={{ touchAction: 'none' }}
          >
            {/* Enhanced glow effect behind nav */}
            <div className="absolute inset-0 -z-10 blur-3xl opacity-70 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/40 via-primary/50 to-amber-500/40 rounded-full scale-125" />
            </div>
            <div className="absolute inset-0 -z-10 blur-2xl opacity-50 pointer-events-none">
              <div className="absolute inset-0 bg-primary/30 rounded-full scale-115" />
            </div>
            <div className="absolute inset-0 -z-10 blur-xl opacity-40 pointer-events-none">
              <div className="absolute inset-0 bg-amber-600/20 rounded-full scale-105" />
            </div>
            
            <div 
              ref={scrollContainerRef} 
              role="navigation"
              aria-label="Main navigation"
              onKeyDown={handleKeyDown}
              className="glass-nav flex-row flex-nowrap p-1 md:p-1.5 rounded-full overflow-x-auto shadow-2xl shadow-primary/30 opacity-80 gap-[2px] md:gap-[4px] px-[4px] md:px-[8px] mx-0 flex items-center justify-start scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent max-w-[calc(100vw-4rem)]"
              style={{
                scrollbarWidth: 'thin',
              }}
            >
              {/* Drag Handle */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className="flex items-center justify-center px-1.5 py-1.5 md:py-2.5 rounded-full text-foreground/40 hover:text-foreground/70 transition-colors cursor-grab active:cursor-grabbing shrink-0 border-r border-foreground/10 pr-2 mr-1"
                    onPointerDown={(e) => dragControls.start(e)}
                  >
                    <GripVertical className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-card border-border text-foreground">
                  <p>Drag to reposition</p>
                </TooltipContent>
              </Tooltip>
              {navItems.map((item, index) => (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <motion.button 
                      ref={(el) => { buttonRefs.current[index] = el; }}
                      onClick={() => handleClick(item.id)}
                      onFocus={() => setFocusedIndex(index)}
                      tabIndex={focusedIndex === index || (focusedIndex === -1 && index === 0) ? 0 : -1}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className={`relative flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2.5 rounded-full transition-all duration-300 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
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
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-card border-border text-foreground">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
              
              {/* Sound Toggle Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    ref={(el) => { buttonRefs.current[navItems.length] = el; }}
                    onClick={toggleSound}
                    onFocus={() => setFocusedIndex(navItems.length)}
                    tabIndex={focusedIndex === navItems.length ? 0 : -1}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + navItems.length * 0.1 }}
                    className="relative flex items-center justify-center px-2 py-1.5 md:py-2.5 rounded-full transition-all duration-300 shrink-0 text-foreground/50 hover:text-foreground hover:bg-foreground/5 ml-1 border-l border-foreground/10 pl-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={soundEnabled ? "Mute sounds" : "Enable sounds"}
                  >
                    {soundEnabled ? (
                      <Volume2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    )}
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-card border-border text-foreground">
                  <p>{soundEnabled ? "Mute sounds" : "Enable sounds"}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </TooltipProvider>
  );
};

export default GlassNavigation;