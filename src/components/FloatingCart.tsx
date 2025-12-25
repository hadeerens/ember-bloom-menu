import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Send, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';

const FloatingCart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const { language, t } = useLanguage();

  const sendToWhatsApp = () => {
    const restaurantPhone = '201234567890'; // غير الرقم ده لرقم المطعم
    let message = language === 'ar' ? '🍽️ طلب جديد:\n\n' : '🍽️ New Order:\n\n';
    
    items.forEach(({ item, quantity }) => {
      message += `• ${item.name[language]} x${quantity} - $${(item.price * quantity).toFixed(2)}\n`;
    });
    
    message += `\n${language === 'ar' ? 'الإجمالي' : 'Total'}: $${totalPrice.toFixed(2)}`;
    
    const url = `https://wa.me/${restaurantPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Floating Cart Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 md:bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-animated shadow-glow-md flex items-center justify-center"
      >
        <ShoppingCart className="w-6 h-6 text-primary-foreground" />
        {totalItems > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-secondary text-secondary-foreground text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
          >
            {totalItems}
          </motion.span>
        )}
      </motion.button>

      {/* Cart Modal */}
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
            
            {/* Cart Panel */}
            <motion.div
              initial={{ x: language === 'ar' ? '-100%' : '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: language === 'ar' ? '-100%' : '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`fixed top-0 ${language === 'ar' ? 'left-0' : 'right-0'} h-full w-full max-w-md z-50 glass-card rounded-none md:rounded-l-3xl rtl:md:rounded-r-3xl rtl:md:rounded-l-none overflow-hidden flex flex-col`}
            >
              {/* Header */}
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  {t('cart.title')}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-6 h-6 text-muted-foreground" />
                </motion.button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground">{t('cart.empty')}</p>
                  </motion.div>
                ) : (
                  items.map(({ item, quantity }) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="glass-card p-4 flex gap-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name[language]}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">
                            {item.name[language]}
                          </h3>
                          <p className="text-primary font-semibold">${item.price}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, quantity - 1)}
                              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                            >
                              <Minus className="w-4 h-4" />
                            </motion.button>
                            <span className="w-8 text-center font-semibold">{quantity}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, quantity + 1)}
                              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                            >
                              <Plus className="w-4 h-4" />
                            </motion.button>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeItem(item.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-border space-y-4">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span className="text-muted-foreground">{t('cart.total')}</span>
                    <span className="text-gradient-warm text-2xl">${totalPrice.toFixed(2)}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={sendToWhatsApp}
                    className="w-full py-4 rounded-xl gradient-animated text-primary-foreground font-semibold flex items-center justify-center gap-3 shadow-glow-sm"
                  >
                    <Send className="w-5 h-5" />
                    {t('cart.sendWhatsApp')}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={clearCart}
                    className="w-full py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-colors"
                  >
                    {t('cart.clear')}
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingCart;
