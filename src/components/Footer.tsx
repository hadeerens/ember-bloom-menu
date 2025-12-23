import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative py-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-card" />
      
      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6"
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-16 h-16 rounded-2xl gradient-animated flex items-center justify-center shadow-glow-sm"
          >
            <span className="text-primary-foreground font-display font-bold text-3xl">É</span>
          </motion.div>

          {/* Tagline */}
          <p className="text-muted-foreground text-center flex items-center gap-2">
            {t('footer.crafted')}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={16} className="text-secondary fill-secondary" />
            </motion.span>
          </p>

          {/* Copyright */}
          <p className="text-muted-foreground/60 text-sm">
            © 2024 Élysée. {t('footer.rights')}.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
