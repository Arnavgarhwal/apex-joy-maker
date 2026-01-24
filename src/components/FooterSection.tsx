import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, Github, Linkedin, Instagram } from 'lucide-react';
import heroImage from '@/assets/arnav-portrait.png';
import { useRef } from 'react';

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/arnavgarhwal/", label: "LinkedIn", color: "bg-[#0077B5]" },
  { icon: Github, href: "https://github.com/Arnavgarhwal", label: "GitHub", color: "bg-[#333]" },
  { icon: Instagram, href: "https://www.instagram.com/arnavgarhwal/", label: "Instagram", color: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]" },
];

const FooterSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <footer ref={sectionRef} id="footer" className="py-20 md:py-32 relative overflow-hidden">
      {/* Blurred background image with warm tones and parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover object-center opacity-20 blur-xl scale-110"
        />
        {/* Warm sepia overlay */}
        <div className="absolute inset-0 bg-amber-900/10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
      </motion.div>

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-primary mb-12"
        >
          Links
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-8"
        >
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={`w-12 h-12 rounded-xl ${social.color} flex items-center justify-center text-white shadow-lg`}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
            <motion.a
              href="mailto:arnavgarhwal@gmail.com"
              className="flex items-center gap-3 text-foreground/90 hover:text-primary transition-colors duration-300"
              whileHover={{ x: 3 }}
            >
              <div className="w-8 h-8 rounded-lg border border-primary/50 flex items-center justify-center">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              arnavgarhwal@gmail.com
            </motion.a>
            <motion.a
              href="tel:+919004682830"
              className="flex items-center gap-3 text-foreground/90 hover:text-primary transition-colors duration-300"
              whileHover={{ x: 3 }}
            >
              <div className="w-8 h-8 rounded-lg border border-primary/50 flex items-center justify-center">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              +91 9004682830
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-border text-muted-foreground text-sm"
        >
          © 2025 Arnav Garhwal. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
