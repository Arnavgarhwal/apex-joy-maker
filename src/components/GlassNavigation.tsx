import { motion } from 'framer-motion';
import { User, FileText, Briefcase, Zap, Link2 } from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: User },
  { id: 'summary', label: 'Summary', icon: FileText },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Zap },
  { id: 'links', label: 'Links', icon: Link2 },
];

const GlassNavigation = () => {
  const [activeItem, setActiveItem] = useState('home');

  const handleClick = (id: string) => {
    setActiveItem(id);
    
    const sectionMap: Record<string, string> = {
      home: 'hero',
      summary: 'summary',
      experience: 'experience',
      skills: 'skills',
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
      <div className="glass-nav flex items-center gap-1 p-1.5 rounded-full">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ${
              activeItem === item.id
                ? 'bg-foreground text-background'
                : 'text-foreground/70 hover:text-foreground'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon className="w-4 h-4" />
            <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
            
            {activeItem === item.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-foreground rounded-full -z-10"
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
