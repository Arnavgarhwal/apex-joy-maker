import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

interface Experience {
  title: string;
  period: string;
  company: string;
  description: string;
  projects: {
    title: string;
    subtitle: string;
    image: string;
  }[];
  responsibilities: string[];
}

const experiences: Experience[] = [
  {
    title: "Project Intern",
    period: "June 2025 - July 2025",
    company: "Consisty Systems",
    description: "As a Project Intern at Consisty Systems, I contributed to the development of web applications and gained hands-on experience with modern development practices. I collaborated with the team to deliver high-quality solutions while learning industry-standard workflows and methodologies.",
    projects: [
      { title: "WellSync", subtitle: "AI Health Analyzer", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80" },
      { title: "InteliFarmSystem", subtitle: "Farmer Website Platform", image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&q=80" },
      { title: "Recipe Generator", subtitle: "Smart Recipe App", image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&q=80" },
    ],
    responsibilities: [
      "Developed and maintained web applications using React and modern JavaScript frameworks",
      "Collaborated with team members on code reviews and project planning",
      "Implemented responsive UI designs following best practices",
      "Participated in agile development processes and daily standups",
      "Contributed to documentation and code quality improvements",
      "Integrated APIs and handled data management with databases",
    ],
  },
];

const personalProjects = [
  { title: "WellSync", subtitle: "AI Health Analyzer", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80" },
  { title: "InteliFarmSystem", subtitle: "Farmer Website Platform", image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&q=80" },
  { title: "Recipe Generator", subtitle: "Smart Recipe Application", image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&q=80" },
  { title: "Banking Management", subtitle: "Banking System Application", image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=400&q=80" },
];

const ExperienceSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-8 md:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-semibold text-foreground mb-16"
        >
          Work Experience
        </motion.h2>

        <div className="space-y-24">
          {experiences.map((exp, index) => (
            <ExperienceItem key={index} experience={exp} index={index} />
          ))}
        </div>

        {/* Personal Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <h3 className="text-xl font-semibold text-foreground mb-8">Personal Projects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalProjects.map((project, idx) => (
              <ProjectCard key={idx} {...project} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ExperienceItem = ({ experience, index }: { experience: Experience; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16"
    >
      {/* Left Column - Job Info */}
      <motion.div 
        className="lg:col-span-4"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-xl font-semibold text-foreground mb-2">{experience.title}</h3>
        <p className="text-primary font-medium mb-1">{experience.period}</p>
        <p className="text-muted-foreground">{experience.company}</p>
      </motion.div>

      {/* Right Column - Details */}
      <div className="lg:col-span-8 space-y-8">
        <p className="text-muted-foreground leading-relaxed">{experience.description}</p>

        {/* Projects */}
        <div>
          <p className="text-foreground font-medium mb-4">Key Projects</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {experience.projects.map((project, idx) => (
              <ProjectCard key={idx} {...project} />
            ))}
          </div>
        </div>

        {/* Responsibilities */}
        <ul className="space-y-3">
          {experience.responsibilities.map((resp, idx) => (
            <motion.li 
              key={idx} 
              className="flex items-start gap-3 text-muted-foreground"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ x: 5 }}
            >
              <span className="text-primary mt-1.5">—</span>
              <span>{resp}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ExperienceSection;
