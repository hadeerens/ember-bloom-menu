import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.categories': 'Categories',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Culinary Excellence',
    'hero.subtitle': 'Experience dining reimagined through immersive flavors',
    'hero.cta': 'Explore Menu',
    
    // Categories
    'categories.all': 'All',
    'categories.appetizers': 'Appetizers',
    'categories.mains': 'Main Courses',
    'categories.desserts': 'Desserts',
    'categories.drinks': 'Beverages',
    
    // Menu
    'menu.title': 'Our Menu',
    'menu.subtitle': 'Crafted with passion, served with elegance',
    'menu.search': 'Search dishes...',
    'menu.addToOrder': 'Add to Order',
    'menu.viewDetails': 'View Details',
    'menu.close': 'Close',
    'menu.ingredients': 'Ingredients',
    'menu.price': 'Price',
    
    // Cart
    'cart.title': 'Your Order',
    'cart.empty': 'Your cart is empty',
    'cart.total': 'Total',
    'cart.sendWhatsApp': 'Send Order via WhatsApp',
    'cart.clear': 'Clear Cart',
    
    // Waiter
    'waiter.title': 'Call Waiter',
    'waiter.subtitle': 'Enter your table number',
    'waiter.tableLabel': 'Table Number',
    'waiter.tablePlaceholder': '00',
    'waiter.call': 'Call Now',
    'waiter.called': 'Waiter has been notified!',
    'waiter.enterTable': 'Please enter table number',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.crafted': 'Crafted with passion',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.menu': 'المنيو',
    'nav.categories': 'الأقسام',
    'nav.about': 'عننا',
    'nav.contact': 'كلمنا',
    
    // Hero
    'hero.title': 'أكل على أصوله',
    'hero.subtitle': 'جرب تجربة أكل مختلفة بنكهات تاخدك لعالم تاني',
    'hero.cta': 'شوف المنيو',
    
    // Categories
    'categories.all': 'الكل',
    'categories.appetizers': 'المقبلات',
    'categories.mains': 'الأطباق الرئيسية',
    'categories.desserts': 'الحلويات',
    'categories.drinks': 'المشروبات',
    
    // Menu
    'menu.title': 'المنيو بتاعنا',
    'menu.subtitle': 'معمول بحب، ومقدم بذوق',
    'menu.search': 'دور على أكلة...',
    'menu.addToOrder': 'ضيف للأوردر',
    'menu.viewDetails': 'شوف التفاصيل',
    'menu.close': 'قفل',
    'menu.ingredients': 'المكونات',
    'menu.price': 'السعر',
    
    // Cart
    'cart.title': 'طلبك',
    'cart.empty': 'السلة فاضية',
    'cart.total': 'الإجمالي',
    'cart.sendWhatsApp': 'ابعت الأوردر على واتساب',
    'cart.clear': 'فضي السلة',
    
    // Waiter
    'waiter.title': 'نادي الجرسون',
    'waiter.subtitle': 'اكتب رقم الطاولة بتاعتك',
    'waiter.tableLabel': 'رقم الطاولة',
    'waiter.tablePlaceholder': '00',
    'waiter.call': 'نادي دلوقتي',
    'waiter.called': 'الجرسون في السكة!',
    'waiter.enterTable': 'اكتب رقم الطاولة الأول',
    
    // Footer
    'footer.rights': 'كل الحقوق محفوظة',
    'footer.crafted': 'معمول بحب',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', language);
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
