import { motion } from 'framer-motion';

const programmingLanguages = [
  "Python",
  "Java",
  "C",
  "C++",
];

const skills = [
  "React",
  "Vite",
  "UI/UX Design",
  "Web Development",
  "Responsive Design",
];

const databases = [
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
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-8 md:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-semibold text-foreground mb-12"
        >
          Skills & Tools
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Programming Languages & Skills */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-8"
          >
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Programming Languages</h3>
              <div className="flex flex-wrap gap-3">
                {programmingLanguages.map((lang, index) => (
                  <motion.span
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-default"
                  >
                    {lang}
                  </motion.span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Frameworks & Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Databases</h3>
              <div className="flex flex-wrap gap-3">
                {databases.map((db, index) => (
                  <motion.span
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-default"
                  >
                    {db}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h3 className="text-lg font-medium text-foreground mb-4">Tools</h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, y: -5, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card hover:bg-secondary hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group cursor-pointer"
                >
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    className="w-10 h-10 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
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
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16"
        >
          <h3 className="text-lg font-medium text-foreground mb-4">Languages</h3>
          <div className="flex gap-6">
            {languages.map((lang, index) => (
              <motion.span 
                key={index} 
                className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-default"
                whileHover={{ scale: 1.1 }}
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
