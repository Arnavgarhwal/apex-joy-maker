import { motion } from 'framer-motion';
import { User, FileText, Briefcase, Zap, Link2, FolderKanban, GraduationCap } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
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
  id: 'links',
  label: 'Links',
  icon: Link2
}];
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
    setActiveItem(id);
    const sectionMap: Record<string, string> = {
      home: 'hero',
      summary: 'summary',
      experience: 'experience',
      projects: 'projects',
      skills: 'skills',
      education: 'education',
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
  }} className="fixed bottom-8 left-1/2 -translate-x-[53%] z-50">
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
      
      <div ref={scrollContainerRef} className="glass-nav flex-row flex-nowrap p-1.5 rounded-full overflow-x-auto scrollbar-hide shadow-2xl shadow-primary/30 opacity-80 gap-[4px] px-[8px] mx-0 flex items-center justify-start" style={{
      scrollbarWidth: 'none',
      msOverflowStyle: 'none'
    }}>
        {navItems.map((item, index) => <motion.button key={item.id} onClick={() => handleClick(item.id)} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 1.2 + index * 0.1
      }} className={`relative flex items-center gap-2 px-3 md:px-4 py-2.5 rounded-full transition-all duration-300 shrink-0 ${activeItem === item.id ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'}`} whileHover={{
        scale: 1.08,
        y: -2
      }} whileTap={{
        scale: 0.95
      }}>
            <motion.div animate={activeItem === item.id ? {
          scale: [1, 1.3, 0.9, 1.1, 1],
          rotate: [0, -15, 15, -5, 0],
          y: [0, -4, 2, -1, 0]
        } : {}} transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 300,
          damping: 10
        }}>
              <item.icon className="w-4 h-4" />
            </motion.div>
            {/* Hide label on small screens, show on md and up */}
            <span className="hidden md:inline text-sm font-medium whitespace-nowrap">{item.label}</span>
            
            {activeItem === item.id && <motion.div layoutId="activeTab" className="absolute inset-0 bg-primary rounded-full -z-10" transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }} />}
          </motion.button>)}
      </div>
    </motion.nav>;
};
export default GlassNavigation;