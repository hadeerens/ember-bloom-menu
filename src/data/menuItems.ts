export interface MenuItem {
  id: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  price: number;
  category: 'appetizers' | 'mains' | 'desserts' | 'drinks';
  image: string;
  ingredients: { en: string[]; ar: string[] };
  featured?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: { en: 'Truffle Arancini', ar: 'أرانشيني بالكمأة' },
    description: {
      en: 'Golden-fried risotto balls infused with black truffle and aged parmesan',
      ar: 'كرات ريزوتو مقلية ذهبية مشبعة بالكمأة السوداء والبارميزان المعتق'
    },
    price: 18,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=800&q=80',
    ingredients: {
      en: ['Arborio rice', 'Black truffle', 'Parmesan', 'Mozzarella'],
      ar: ['أرز أربوريو', 'كمأة سوداء', 'بارميزان', 'موزاريلا']
    },
    featured: true
  },
  {
    id: '2',
    name: { en: 'Wagyu Carpaccio', ar: 'كارباتشيو واغيو' },
    description: {
      en: 'Thinly sliced A5 wagyu with citrus ponzu and microgreens',
      ar: 'شرائح رقيقة من لحم واغيو A5 مع صلصة بونزو الحمضية والأعشاب الصغيرة'
    },
    price: 32,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    ingredients: {
      en: ['A5 Wagyu beef', 'Ponzu', 'Microgreens', 'Truffle oil'],
      ar: ['لحم واغيو A5', 'بونزو', 'أعشاب صغيرة', 'زيت الكمأة']
    }
  },
  {
    id: '3',
    name: { en: 'Lobster Bisque', ar: 'شوربة اللوبستر' },
    description: {
      en: 'Velvety cream soup with fresh lobster meat and cognac essence',
      ar: 'شوربة كريمية ناعمة مع لحم اللوبستر الطازج وخلاصة الكونياك'
    },
    price: 24,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
    ingredients: {
      en: ['Fresh lobster', 'Heavy cream', 'Cognac', 'Herbs'],
      ar: ['لوبستر طازج', 'كريمة ثقيلة', 'كونياك', 'أعشاب']
    }
  },
  {
    id: '4',
    name: { en: 'Prime Ribeye Steak', ar: 'ستيك ريب آي الفاخر' },
    description: {
      en: 'Dry-aged 45 days, charred to perfection with bone marrow butter',
      ar: 'معتق جاف لمدة 45 يوماً، مشوي بإتقان مع زبدة نخاع العظم'
    },
    price: 68,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
    ingredients: {
      en: ['Prime ribeye', 'Bone marrow', 'Garlic butter', 'Fresh herbs'],
      ar: ['ريب آي فاخر', 'نخاع العظم', 'زبدة الثوم', 'أعشاب طازجة']
    },
    featured: true
  },
  {
    id: '5',
    name: { en: 'Chilean Sea Bass', ar: 'سمك القاروص التشيلي' },
    description: {
      en: 'Miso-glazed with sake reduction and wasabi aioli',
      ar: 'مزجج بالميسو مع صلصة الساكي والوسابي أيولي'
    },
    price: 56,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80',
    ingredients: {
      en: ['Chilean sea bass', 'White miso', 'Sake', 'Wasabi'],
      ar: ['قاروص تشيلي', 'ميسو أبيض', 'ساكي', 'وسابي']
    }
  },
  {
    id: '6',
    name: { en: 'Duck Confit', ar: 'كونفيت البط' },
    description: {
      en: 'Slow-cooked duck leg with cherry gastrique and root vegetables',
      ar: 'ساق بط مطهوة ببطء مع صلصة الكرز والخضروات الجذرية'
    },
    price: 48,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80',
    ingredients: {
      en: ['Duck leg', 'Cherries', 'Root vegetables', 'Fresh thyme'],
      ar: ['ساق بط', 'كرز', 'خضروات جذرية', 'زعتر طازج']
    }
  },
  {
    id: '7',
    name: { en: 'Truffle Risotto', ar: 'ريزوتو بالكمأة' },
    description: {
      en: 'Creamy arborio rice with white truffle shavings and aged parmesan',
      ar: 'أرز أربوريو كريمي مع شرائح الكمأة البيضاء والبارميزان المعتق'
    },
    price: 42,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80',
    ingredients: {
      en: ['Arborio rice', 'White truffle', 'Parmesan', 'White wine'],
      ar: ['أرز أربوريو', 'كمأة بيضاء', 'بارميزان', 'نبيذ أبيض']
    }
  },
  {
    id: '8',
    name: { en: 'Molten Chocolate Sphere', ar: 'كرة الشوكولاتة الذائبة' },
    description: {
      en: 'Warm chocolate dome with salted caramel core and gold leaf',
      ar: 'قبة شوكولاتة دافئة مع قلب كراميل مملح وورق ذهب'
    },
    price: 22,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
    ingredients: {
      en: ['Dark chocolate', 'Salted caramel', 'Gold leaf', 'Vanilla cream'],
      ar: ['شوكولاتة داكنة', 'كراميل مملح', 'ورق ذهب', 'كريمة فانيليا']
    },
    featured: true
  },
  {
    id: '9',
    name: { en: 'Crème Brûlée', ar: 'كريم بروليه' },
    description: {
      en: 'Madagascar vanilla custard with caramelized sugar crust',
      ar: 'كاسترد فانيليا مدغشقر مع قشرة سكر مكرمل'
    },
    price: 16,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=800&q=80',
    ingredients: {
      en: ['Madagascar vanilla', 'Heavy cream', 'Egg yolks', 'Caramelized sugar'],
      ar: ['فانيليا مدغشقر', 'كريمة ثقيلة', 'صفار بيض', 'سكر مكرمل']
    }
  },
  {
    id: '10',
    name: { en: 'Tiramisu Deconstructed', ar: 'تيراميسو محدث' },
    description: {
      en: 'Modern interpretation with espresso caviar and mascarpone clouds',
      ar: 'تفسير عصري مع كافيار الإسبريسو وسحب الماسكاربوني'
    },
    price: 18,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
    ingredients: {
      en: ['Mascarpone', 'Espresso', 'Ladyfingers', 'Cocoa'],
      ar: ['ماسكاربوني', 'إسبريسو', 'سافواردي', 'كاكاو']
    }
  },
  {
    id: '11',
    name: { en: 'Aged Whiskey Sour', ar: 'ويسكي ساور معتق' },
    description: {
      en: 'Barrel-aged bourbon with citrus and aromatic bitters foam',
      ar: 'بوربون معتق في البراميل مع الحمضيات ورغوة المرارات العطرية'
    },
    price: 18,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
    ingredients: {
      en: ['Bourbon', 'Lemon juice', 'Egg white', 'Aromatic bitters'],
      ar: ['بوربون', 'عصير ليمون', 'بياض بيض', 'مرارات عطرية']
    }
  },
  {
    id: '12',
    name: { en: 'Smoked Rose Martini', ar: 'مارتيني الورد المدخن' },
    description: {
      en: 'Premium vodka infused with rose essence and clove smoke',
      ar: 'فودكا فاخرة مشبعة بخلاصة الورد ودخان القرنفل'
    },
    price: 22,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80',
    ingredients: {
      en: ['Premium vodka', 'Rose essence', 'Clove', 'Elderflower'],
      ar: ['فودكا فاخرة', 'خلاصة الورد', 'قرنفل', 'زهر البيلسان']
    }
  }
];

export const categories = [
  { id: 'all', name: { en: 'All', ar: 'الكل' } },
  { id: 'appetizers', name: { en: 'Appetizers', ar: 'المقبلات' } },
  { id: 'mains', name: { en: 'Main Courses', ar: 'الأطباق الرئيسية' } },
  { id: 'desserts', name: { en: 'Desserts', ar: 'الحلويات' } },
  { id: 'drinks', name: { en: 'Beverages', ar: 'المشروبات' } },
];
