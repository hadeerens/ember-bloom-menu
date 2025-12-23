import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { MenuItem } from '@/data/menuItems';

interface MenuCard3DProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  index: number;
}

const MenuCard3D: React.FC<MenuCard3DProps> = ({ item, onSelect, index }) => {
  const { language, t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-15deg', '15deg']);
  const imageX = useTransform(mouseX, [-0.5, 0.5], ['-10px', '10px']);
  const imageY = useTransform(mouseY, [-0.5, 0.5], ['-10px', '10px']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseXVal = (e.clientX - centerX) / rect.width;
    const mouseYVal = (e.clientY - centerY) / rect.height;
    x.set(mouseXVal);
    y.set(mouseYVal);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="perspective-1000"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(item)}
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.02, z: 50 }}
        whileTap={{ scale: 0.98 }}
        className="relative glass-card cursor-pointer group preserve-3d"
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
            filter: 'blur(20px)',
            zIndex: -1,
          }}
        />
        
        {/* Image container with parallax */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <motion.img
            src={item.image}
            alt={item.name[language]}
            style={{ x: imageX, y: imageY }}
            className="w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-125"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          {/* Featured badge */}
          {item.featured && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 px-3 py-1 rounded-full text-xs font-semibold gradient-animated text-primary-foreground shadow-glow-sm"
            >
              ⭐ Featured
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-gradient-warm transition-all duration-300">
            {item.name[language]}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {item.description[language]}
          </p>
          
          {/* Price badge with glow */}
          <div className="flex items-center justify-between pt-2">
            <motion.span 
              className="price-badge text-sm"
              whileHover={{ scale: 1.05 }}
            >
              ${item.price}
            </motion.span>
            
            <motion.button
              whileHover={{ scale: 1.1, x: language === 'ar' ? -5 : 5 }}
              whileTap={{ scale: 0.95 }}
              className="text-primary hover:text-primary-glow transition-colors duration-300 text-sm font-medium flex items-center gap-1"
            >
              {t('menu.viewDetails')}
              <span className="rtl:rotate-180">→</span>
            </motion.button>
          </div>
        </div>

        {/* Edge highlight effect */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none">
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, transparent 50%)',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MenuCard3D;
