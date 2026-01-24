import { motion } from 'framer-motion';

const skillsList = [
  "Python",
  "Java",
  "C",
  "C++",
  "React",
  "Vite",
  "UI/UX Design",
  "Web Development",
  "Responsive Design",
  "MySQL",
  "Node.js",
];

const tools = [
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Cursor", icon: "https://framerusercontent.com/images/jS90hiVPvwKI1R3JUPOR14Reh7s.png" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Canva", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
];

const languages = ["English", "Hindi"];

const SkillsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-20 md:py-32 bg-background relative">
      <div className="container mx-auto px-8 md:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-primary mb-12"
        >
          Skills & Tools
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Skills List */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <div className="grid grid-cols-2 gap-4">
              {skillsList.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span className="text-foreground text-lg">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tools with Icons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex flex-wrap gap-8 justify-start">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex flex-col items-center gap-3 cursor-pointer group"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-card/50 flex items-center justify-center p-3 group-hover:bg-card transition-colors duration-300">
                    <img
                      src={tool.icon}
                      alt={tool.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {tool.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="text-lg font-medium text-foreground mb-4">Languages</h3>
          <div className="flex gap-6">
            {languages.map((lang, index) => (
              <motion.span 
                key={index} 
                className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-default"
                whileHover={{ scale: 1.05 }}
              >
                {lang}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
