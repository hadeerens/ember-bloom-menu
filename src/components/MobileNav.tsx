import React from 'react';
import { motion } from 'framer-motion';
import { Home, UtensilsCrossed, Grid3X3, Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const MobileNav: React.FC = () => {
  const { t } = useLanguage();

  const navItems = [
    { id: 'hero', icon: Home, label: t('nav.home') },
    { id: 'menu', icon: UtensilsCrossed, label: t('nav.menu') },
    { id: 'categories', icon: Grid3X3, label: t('nav.categories') },
    { id: 'about', icon: Info, label: t('nav.about') },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
    >
      <div className="glass-card mx-2 mb-2 rounded-2xl">
        <div className="flex items-center justify-around py-3">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollTo(item.id)}
              className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default MobileNav;
