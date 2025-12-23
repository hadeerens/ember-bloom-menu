import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { categories } from '@/data/menuItems';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}) => {
  const { language, t } = useLanguage();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Search bar with 3D effect */}
      <motion.div
        animate={{
          scale: isSearchFocused ? 1.02 : 1,
          boxShadow: isSearchFocused 
            ? 'var(--shadow-glow-sm)' 
            : 'none'
        }}
        className="relative"
      >
        <motion.div
          className="relative glass-card overflow-hidden"
          whileHover={{ scale: 1.01 }}
        >
          <Search 
            className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 text-muted-foreground" 
            size={20} 
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder={t('menu.search')}
            className="w-full bg-transparent py-4 pl-12 pr-4 rtl:pl-4 rtl:pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          
          {/* Animated border on focus */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-warm origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isSearchFocused ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onCategoryChange(category.id)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category.id
                ? 'text-primary-foreground'
                : 'text-foreground/70 hover:text-foreground glass-card'
            }`}
          >
            {/* Active background */}
            <AnimatePresence>
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 rounded-full gradient-animated shadow-glow-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                />
              )}
            </AnimatePresence>
            
            <span className="relative z-10">{category.name[language]}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoryFilter;
