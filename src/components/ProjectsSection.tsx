import { motion, AnimatePresence, Variants, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { ExternalLink, Github, X, ArrowUpRight } from 'lucide-react';
import { AnimatedHeading } from './AnimatedText';
import heroImage from '@/assets/hero-portrait.png';
import MagneticButton from './MagneticButton';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  gradient: string;
  github?: string;
  live?: string;
  features: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Personal Portfolio",
    description: "Award-winning interactive portfolio with stunning animations",
    longDescription: "This portfolio website features smooth parallax effects, cursor trails, magnetic buttons, and a carefully crafted user experience. Built with React, TypeScript, and Framer Motion for buttery smooth interactions.",
    tags: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"],
    gradient: "from-amber-500/20 to-orange-600/20",
    github: "https://github.com/Arnavgarhwal",
    live: "#",
    features: [
      "Cursor trail effects & magnetic buttons",
      "Smooth parallax scrolling effects",
      "Interactive glass morphism navigation",
      "Staggered text reveal animations",
      "Fully responsive design",
      "Dark theme with warm amber accents"
    ]
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with modern UI/UX",
    longDescription: "A comprehensive e-commerce platform featuring product management, user authentication, shopping cart, and payment integration. Built with a focus on performance and user experience.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    gradient: "from-orange-500/20 to-amber-600/20",
    github: "https://github.com/Arnavgarhwal",
    features: [
      "User authentication & authorization",
      "Product catalog with filters",
      "Shopping cart functionality",
      "Secure payment processing",
      "Order tracking system"
    ]
  },
  {
    id: 3,
    title: "AI Chat Application",
    description: "Intelligent chatbot with natural language processing",
    longDescription: "An AI-powered chat application that uses machine learning to provide intelligent responses. Features real-time messaging, conversation history, and personalized interactions.",
    tags: ["Python", "TensorFlow", "React", "WebSocket"],
    gradient: "from-amber-600/20 to-yellow-500/20",
    github: "https://github.com/Arnavgarhwal",
    features: [
      "Natural language understanding",
      "Real-time messaging",
      "Conversation context memory",
      "Multi-language support",
      "Voice input capability"
    ]
  },
  {
    id: 4,
    title: "Task Management System",
    description: "Collaborative project management tool for teams",
    longDescription: "A feature-rich task management application designed for team collaboration. Includes kanban boards, sprint planning, time tracking, and real-time updates for seamless teamwork.",
    tags: ["React", "Firebase", "Material-UI", "Redux"],
    gradient: "from-orange-600/20 to-red-500/20",
    github: "https://github.com/Arnavgarhwal",
    features: [
      "Kanban board interface",
      "Sprint planning tools",
      "Team collaboration features",
      "Time tracking & reports",
      "Real-time notifications"
    ]
  },
  {
    id: 5,
    title: "Weather Dashboard",
    description: "Real-time weather tracking with beautiful visualizations",
    longDescription: "A sleek weather application featuring real-time data, interactive maps, and 7-day forecasts. Built with modern APIs and stunning data visualizations.",
    tags: ["React", "OpenWeather API", "Chart.js", "Geolocation"],
    gradient: "from-amber-400/20 to-orange-500/20",
    github: "https://github.com/Arnavgarhwal",
    features: [
      "Real-time weather updates",
      "Interactive weather maps",
      "7-day forecast predictions",
      "Location-based detection",
      "Beautiful data charts"
    ]
  },
  {
    id: 6,
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media management",
    longDescription: "A comprehensive dashboard for tracking social media metrics, engagement rates, and audience growth across multiple platforms.",
    tags: ["React", "D3.js", "REST APIs", "Tailwind"],
    gradient: "from-yellow-500/20 to-amber-600/20",
    github: "https://github.com/Arnavgarhwal",
    features: [
      "Multi-platform analytics",
      "Engagement tracking",
      "Audience insights",
      "Scheduled posting",
      "Performance reports"
    ]
  },
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 100
      }
    }
  };

  return (
    <>
      <section ref={sectionRef} id="projects" className="py-20 md:py-32 bg-background relative overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <img
            src={heroImage}
            alt=""
            className="w-full h-[130%] object-cover opacity-[0.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </motion.div>

        {/* Ambient effects */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-8 md:px-16 relative z-10">
          <AnimatedHeading 
            text="Featured Projects"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6"
            delay={0.1}
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg mb-16 max-w-2xl"
          >
            A collection of projects that showcase my passion for creating beautiful, functional applications.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                onClick={() => setSelectedProject(project)}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-card/60 backdrop-blur-sm rounded-3xl p-8 border border-border/50 hover:border-primary/40 transition-all duration-500 cursor-pointer overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Gradient overlay */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)',
                  }}
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                />
                
                {/* Project number */}
                <motion.span 
                  className="absolute top-6 right-8 text-7xl font-bold text-foreground/5 group-hover:text-primary/10 transition-colors duration-500"
                >
                  0{index + 1}
                </motion.span>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <motion.div
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.2, rotate: 45 }}
                    >
                      <ArrowUpRight className="w-5 h-5 text-primary" />
                    </motion.div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <motion.span
                        key={i}
                        className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom accent line */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-card/95 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-border/50 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Close button */}
              <motion.button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-foreground" />
              </motion.button>

              {/* Modal content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                  {selectedProject.title}
                </h2>
                
                <p className="text-foreground/80 text-lg mb-8 leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-foreground mb-4">Features</h4>
                  <ul className="space-y-3">
                    {selectedProject.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                        className="flex items-center gap-3 text-muted-foreground"
                      >
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {selectedProject.github && (
                    <motion.a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-muted hover:bg-muted/80 rounded-full font-medium transition-colors duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-5 h-5" />
                      View Code
                    </motion.a>
                  )}
                  {selectedProject.live && (
                    <motion.a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-amber-500 transition-colors duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-5 h-5" />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </motion.div>

              {/* Decorative gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.gradient} opacity-20 rounded-3xl pointer-events-none`} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsSection;
