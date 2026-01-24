import { motion } from 'framer-motion';
import { Mail, Phone, Github, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const socialLinks = [
  { icon: Github, href: "https://github.com/Arnavgarhwal", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/arnavgarhwal/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/arnavgarhwal/", label: "Instagram" },
];

const FooterSection = () => {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/arnav-garhwal-cv.pdf';
    link.download = 'Arnav_Garhwal_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <footer id="footer" className="py-16 bg-card border-t border-border">
      <div className="container mx-auto px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <h3 className="text-lg font-medium text-foreground">Connect</h3>
            <motion.a
              href="mailto:arnavgarhwal@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
              whileHover={{ x: 3, scale: 1.02 }}
            >
              <Mail className="w-4 h-4" />
              arnavgarhwal@gmail.com
            </motion.a>
            <motion.a
              href="tel:+919004682830"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
              whileHover={{ x: 3, scale: 1.02 }}
            >
              <Phone className="w-4 h-4" />
              +91 9004682830
            </motion.a>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.2, rotate: 10, y: -5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="p-2 rounded-full bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline"
                onClick={handleDownloadCV}
                className="border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 rounded-full px-6 transition-all duration-300"
              >
                Download CV
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 pt-8 border-t border-border text-center text-muted-foreground text-sm"
        >
          © 2025 Arnav Garhwal. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
