import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MenuItem } from '@/data/menuItems';

interface ProductModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ item, isOpen, onClose }) => {
  const { language, t } = useLanguage();

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-xl z-50"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4 perspective-1000"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ 
                opacity: 0, 
                scale: 0.8, 
                rotateX: 30,
                y: 100 
              }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotateX: 0,
                y: 0 
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.8, 
                rotateX: -30,
                y: 100 
              }}
              transition={{ 
                type: 'spring', 
                damping: 25, 
                stiffness: 300 
              }}
              className="relative w-full max-w-2xl glass-card overflow-hidden preserve-3d"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10 w-10 h-10 rounded-full glass-card flex items-center justify-center text-foreground/80 hover:text-foreground transition-colors"
              >
                <X size={20} />
              </motion.button>

              {/* Image section with depth */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <motion.img
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src={item.image}
                  alt={item.name[language]}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-transparent to-transparent" />
                
                {/* Floating elements for 3D effect */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotateZ: [0, 2, 0] 
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: 'easeInOut' 
                  }}
                  className="absolute bottom-6 left-6 rtl:left-auto rtl:right-6 price-badge text-xl font-bold"
                >
                  ${item.price}
                </motion.div>
              </div>

              {/* Content section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 md:p-8 space-y-6"
              >
                <div className="space-y-3">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-display text-3xl md:text-4xl font-bold text-gradient-warm"
                  >
                    {item.name[language]}
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-muted-foreground text-lg leading-relaxed"
                  >
                    {item.description[language]}
                  </motion.p>
                </div>

                {/* Ingredients with staggered animation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {t('menu.ingredients')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.ingredients[language].map((ingredient, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + idx * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-3 py-1.5 rounded-full text-sm glass-card border border-primary/20 text-foreground/80"
                      >
                        {ingredient}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Add to order button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.02, boxShadow: 'var(--shadow-glow-md)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl gradient-animated text-primary-foreground font-semibold text-lg shadow-glow-sm transition-all duration-300"
                >
                  {t('menu.addToOrder')}
                </motion.button>
              </motion.div>

              {/* Decorative depth elements */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
              <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
