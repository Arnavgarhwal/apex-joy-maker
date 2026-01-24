import { motion } from 'framer-motion';

const educationData = [
  {
    institution: "Mumbai University",
    degree: "Bachelor of Engineering (Computer Science & Design)",
    period: "2024 - Present",
  },
  {
    institution: "Kendriya Vidyalaya AFS Thane",
    degree: "12th CBSE",
    period: "2024",
  },
  {
    institution: "Kendriya Vidyalaya AFS Thane",
    degree: "10th CBSE",
    period: "2022",
  },
];

const EducationSection = () => {
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
          Education
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.03, 
                y: -5,
                boxShadow: "0 20px 40px -15px hsl(38 92% 50% / 0.2)"
              }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 cursor-default"
            >
              <motion.h3 
                className="text-lg font-semibold text-foreground mb-2"
                whileHover={{ color: "hsl(38 92% 50%)" }}
              >
                {edu.institution}
              </motion.h3>
              <p className="text-muted-foreground mb-2">
                {edu.degree}
              </p>
              <p className="text-primary font-medium text-sm">
                {edu.period}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
