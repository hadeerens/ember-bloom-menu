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
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.crafted': 'Crafted with passion',
  },
  ar: {
    // Navigation
    'nav.menu': 'القائمة',
    'nav.categories': 'الأصناف',
    'nav.about': 'عنا',
    'nav.contact': 'اتصل بنا',
    
    // Hero
    'hero.title': 'تميز الطهي',
    'hero.subtitle': 'اختبر تناول الطعام بطريقة جديدة من خلال نكهات غامرة',
    'hero.cta': 'استكشف القائمة',
    
    // Categories
    'categories.all': 'الكل',
    'categories.appetizers': 'المقبلات',
    'categories.mains': 'الأطباق الرئيسية',
    'categories.desserts': 'الحلويات',
    'categories.drinks': 'المشروبات',
    
    // Menu
    'menu.title': 'قائمتنا',
    'menu.subtitle': 'صُنعت بشغف، تُقدم بأناقة',
    'menu.search': 'ابحث عن الأطباق...',
    'menu.addToOrder': 'أضف للطلب',
    'menu.viewDetails': 'عرض التفاصيل',
    'menu.close': 'إغلاق',
    'menu.ingredients': 'المكونات',
    'menu.price': 'السعر',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.crafted': 'صُنع بشغف',
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
