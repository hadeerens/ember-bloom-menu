import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { menuItems, MenuItem } from '@/data/menuItems';
import MenuCard3D from './MenuCard3D';
import MenuCardSkeleton from './MenuCardSkeleton';
import CategoryFilter from './CategoryFilter';
import ProductModal from './ProductModal';

const MenuSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = 
        item.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.ar.includes(searchQuery) ||
        item.description.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.ar.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="menu" className="relative py-24 overflow-hidden">
      {/* Background depth layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      
      {/* Decorative elements */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1] 
        }}
        transition={{ 
          rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
          scale: { duration: 8, repeat: Infinity }
        }}
        className="absolute top-20 right-0 w-72 h-72 rounded-full bg-primary/5 blur-[80px]"
      />
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [1.1, 1, 1.1] 
        }}
        transition={{ 
          rotate: { duration: 80, repeat: Infinity, ease: 'linear' },
          scale: { duration: 10, repeat: Infinity }
        }}
        className="absolute bottom-20 left-0 w-96 h-96 rounded-full bg-secondary/5 blur-[100px]"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full glass-card text-sm text-muted-foreground mb-4"
          >
            ✦ {t('categories.all')} ✦
          </motion.span>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-warm glow-text mb-4">
            {t('menu.title')}
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t('menu.subtitle')}
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-12">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Menu Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              // Skeleton loading
              [...Array(6)].map((_, index) => (
                <MenuCardSkeleton key={`skeleton-${index}`} />
              ))
            ) : (
              filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                >
                  <MenuCard3D 
                    item={item} 
                    onSelect={setSelectedItem}
                    index={index}
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg">
              No items found matching your search.
            </p>
          </motion.div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
};

export default MenuSection;
