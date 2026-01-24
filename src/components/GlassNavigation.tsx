import { motion } from 'framer-motion';
import { User, FileText, Briefcase, Zap, Link2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: User },
  { id: 'summary', label: 'Summary', icon: FileText },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Zap },
  { id: 'education', label: 'Education', icon: FileText },
  { id: 'links', label: 'Links', icon: Link2 },
];

const GlassNavigation = () => {
  const [activeItem, setActiveItem] = useState('home');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'summary', 'experience', 'projects', 'skills', 'education', 'footer'];
      const sectionToNav: Record<string, string> = {
        hero: 'home',
        summary: 'summary',
        experience: 'experience',
        projects: 'projects',
        skills: 'skills',
        education: 'education',
        footer: 'links',
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
    setActiveItem(id);
    
    const sectionMap: Record<string, string> = {
      home: 'hero',
      summary: 'summary',
      experience: 'experience',
      projects: 'projects',
      skills: 'skills',
      education: 'education',
      links: 'footer',
    };
    
    const element = document.getElementById(sectionMap[id]);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1, type: "spring", stiffness: 100 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      {/* Glow effect behind nav */}
      <div className="absolute inset-0 -z-10 blur-2xl opacity-60">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-primary/40 to-amber-500/30 rounded-full scale-110" />
      </div>
      <div className="absolute inset-0 -z-10 blur-xl opacity-40">
        <div className="absolute inset-0 bg-primary/20 rounded-full scale-105" />
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="glass-nav flex flex-row flex-nowrap items-center gap-1 p-1.5 rounded-full overflow-x-auto scrollbar-hide shadow-lg shadow-primary/20"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {navItems.map((item, index) => (
          <motion.button
            key={item.id}
            onClick={() => handleClick(item.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + index * 0.1 }}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 shrink-0 ${
              activeItem === item.id
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
            }`}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={activeItem === item.id 
                ? { 
                    scale: [1, 1.3, 0.9, 1.1, 1],
                    rotate: [0, -15, 15, -5, 0],
                    y: [0, -4, 2, -1, 0]
                  } 
                : {}
              }
              transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 300,
                damping: 10
              }}
            >
              <item.icon className="w-4 h-4" />
            </motion.div>
            <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
            
            {activeItem === item.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary rounded-full -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default GlassNavigation;
