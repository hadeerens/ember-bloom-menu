import React from 'react';
import { motion } from 'framer-motion';

const MenuCardSkeleton: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card overflow-hidden"
    >
      {/* Image skeleton */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <div className="w-full h-full bg-muted animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>

      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <div className="h-6 bg-muted rounded-lg animate-pulse w-3/4" />
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse w-full" />
          <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
        </div>
        
        {/* Price and button */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-8 w-16 bg-muted rounded-full animate-pulse" />
          <div className="h-5 w-24 bg-muted rounded animate-pulse" />
        </div>
      </div>

      {/* Shimmer overlay */}
      <motion.div
        animate={{
          x: ['0%', '200%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/5 to-transparent pointer-events-none"
        style={{ width: '50%' }}
      />
    </motion.div>
  );
};

export default MenuCardSkeleton;
