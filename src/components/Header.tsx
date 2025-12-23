import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-40"
    >
      <div className="glass-card mx-4 mt-4 rounded-2xl">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-10 h-10 rounded-xl gradient-animated flex items-center justify-center shadow-glow-sm"
            >
              <span className="text-primary-foreground font-display font-bold text-xl">É</span>
            </motion.div>
            <span className="font-display text-xl font-semibold text-foreground hidden sm:block">
              Élysée
            </span>
          </motion.div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {['menu', 'categories', 'about', 'contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -2 }}
                className="text-foreground/70 hover:text-foreground transition-colors duration-300 relative group"
              >
                {t(`nav.${item}`)}
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-warm origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                />
              </motion.a>
            ))}
          </div>

          {/* Language Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card text-foreground/80 hover:text-foreground transition-colors duration-300"
          >
            <Globe size={18} />
            <span className="text-sm font-medium">
              {language === 'en' ? 'العربية' : 'English'}
            </span>
          </motion.button>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
