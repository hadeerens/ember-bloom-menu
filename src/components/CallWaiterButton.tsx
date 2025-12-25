import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

const CallWaiterButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState('');
  const { language, t } = useLanguage();

  const handleCallWaiter = () => {
    if (!tableNumber.trim()) {
      toast.error(t('waiter.enterTable'));
      return;
    }
    
    // هنا ممكن تضيف API call لإرسال الطلب للسيرفر
    toast.success(t('waiter.called'));
    setIsOpen(false);
    setTableNumber('');
  };

  return (
    <>
      {/* Floating Waiter Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 md:bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-secondary shadow-lg flex items-center justify-center pulse-glow"
        style={{ boxShadow: '0 0 20px hsl(var(--secondary) / 0.5)' }}
      >
        <Bell className="w-6 h-6 text-secondary-foreground" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm z-50 glass-card p-6 rounded-3xl"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </motion.button>

              {/* Content */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring' }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center"
                >
                  <Bell className="w-8 h-8 text-secondary" />
                </motion.div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {t('waiter.title')}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t('waiter.subtitle')}
                </p>
              </div>

              {/* Table Number Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  {t('waiter.tableLabel')}
                </label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder={t('waiter.tablePlaceholder')}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  maxLength={3}
                />
              </div>

              {/* Call Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCallWaiter}
                className="w-full py-4 rounded-xl bg-secondary text-secondary-foreground font-semibold flex items-center justify-center gap-3 shadow-lg"
              >
                <Check className="w-5 h-5" />
                {t('waiter.call')}
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CallWaiterButton;
