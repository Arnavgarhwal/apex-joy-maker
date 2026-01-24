import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  subtitle: string;
  image: string;
}

const ProjectCard = ({ title, subtitle, image }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-xl bg-card cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-primary/20"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent"
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <motion.h4 
          className="text-foreground font-semibold mb-1"
          initial={{ y: 0 }}
          whileHover={{ y: -2 }}
        >
          {title}
        </motion.h4>
        <motion.p 
          className="text-muted-foreground text-sm group-hover:text-primary/80 transition-colors duration-300"
        >
          {subtitle}
        </motion.p>
      </div>
      
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at center, hsl(38 92% 50% / 0.1) 0%, transparent 70%)"
        }}
      />
    </motion.div>
  );
};

export default ProjectCard;
