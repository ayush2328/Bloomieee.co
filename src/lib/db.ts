import fs from 'fs';
import path from 'path';

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  secondaryCategories?: string[];
  price: number;
  originalPrice?: number;
  inStock: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isArchived?: boolean;
  images: string[];
  flowerTypes: string[];
  colors: string[];
  wrapOptions?: string[];
  occasions: string[];
  description: string;
  dispatchTime: string;
  careInstructions: string;
  packagingInfo: string;
  rating: number;
  reviewCount: number;
}

export interface OrderItem {
  productId: string;
  title: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
  selectedColor?: string;
  selectedWrap?: string;
  giftMessage?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    apartment?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: 'razorpay' | 'cod' | 'manual_upi';
  paymentStatus: 'paid' | 'pending';
  orderStatus: 'pending' | 'crafting' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  notes?: string;
  giftMessage?: string;
}

export interface CustomRequest {
  id: string;
  createdAt: string;
  customerName: string;
  contact: string;
  flowerTypes: string[];
  preferredColors: string;
  bouquetSize: string;
  budgetRange: string;
  occasion: string;
  notes: string;
  referenceImageUrl?: string;
  status: 'new' | 'contacted' | 'crafting' | 'completed';
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  productName: string;
  location: string;
  isPublished: boolean;
  date: string;
}

export interface StoreSettings {
  announcementText: string;
  announcementEnabled: boolean;
  freeShippingThreshold: number;
  standardShippingFee: number;
  expressShippingFee: number;
  instagramUrl: string;
  whatsappNumber: string;
  contactEmail: string;
  storeAddress: string;
  adminPin: string;
}

export interface DatabaseSchema {
  products: Product[];
  orders: Order[];
  customRequests: CustomRequest[];
  subscribers: NewsletterSubscriber[];
  testimonials: Testimonial[];
  settings: StoreSettings;
}

const dataDir = path.resolve(process.cwd(), 'data');
const dbFile = path.join(dataDir, 'bloomieee.json');

const INITIAL_DATA: DatabaseSchema = {
  settings: {
    announcementText: 'Little blooms, made with love ♡ Free courier shipping across India on orders above ₹999',
    announcementEnabled: true,
    freeShippingThreshold: 999,
    standardShippingFee: 79,
    expressShippingFee: 149,
    instagramUrl: 'https://www.instagram.com/bloomieee.co/',
    whatsappNumber: '+91 98765 43210',
    contactEmail: 'hello@bloomieee.co',
    storeAddress: 'Bloomieee Handmade Floral Studio, Surat / Ahmedabad, Gujarat, India',
    adminPin: 'bloom2026',
  },
  products: [
    {
      id: 'prod-01',
      title: 'Royal Blue Velvet Tulips & Lily Bouquet',
      slug: 'royal-blue-velvet-tulips',
      category: 'Tulip Bouquets',
      secondaryCategories: ['Lily Bouquets', 'Bestsellers'],
      price: 1499,
      originalPrice: 1899,
      inStock: 8,
      isFeatured: true,
      isBestseller: true,
      images: [
        '/images/products/royal-blue-velvet-tulips.jpg',
        '/images/products/lavender-romance-bouquet.jpg',
        '/images/brand/luxury-gift-box.jpg',
      ],
      flowerTypes: ['Cobalt Tulips', 'Star Lily', "Baby's Breath Florets"],
      colors: ['Royal Blue & White', 'Midnight Blue', 'Sky Blue & Pearl'],
      wrapOptions: ['Crisp White Pleated Wrap', 'Soft Ivory Cloud', 'Korean Pastel Matte'],
      occasions: ['Birthdays', 'Special Surprises', 'Friendship Gifts'],
      description:
        'Exquisitely hand-sculpted royal cobalt blue pipe-cleaner tulips paired with an everlasting lily centerpiece and delicate forget-me-not florets. Wrapped in pleated ivory paper and finished with a satin royal blue bow.',
      dispatchTime: '2-3 business days handmade time',
      careInstructions:
        'Everlasting by design! Keep away from direct water or rain. Dust gently with a soft makeup brush or dry microfiber cloth. Petals and stems can be gently repositioned by hand.',
      packagingInfo:
        'Shipped in a sturdy floral gift shipping carton with reinforced support, tissue bedding, and a complimentary Bloomieee.co signature wax-sealed blank message card.',
      rating: 4.9,
      reviewCount: 28,
    },
    {
      id: 'prod-02',
      title: 'Lavender Romance Everlasting Bouquet',
      slug: 'lavender-romance-bouquet',
      category: 'Bouquets',
      secondaryCategories: ['Bestsellers', 'Tulip Bouquets', 'Lily Bouquets'],
      price: 1699,
      originalPrice: 2099,
      inStock: 12,
      isFeatured: true,
      isBestseller: true,
      images: [
        '/images/products/lavender-romance-bouquet.jpg',
        '/images/products/lavender-buttercream-roses.jpg',
        '/images/brand/luxury-gift-box.jpg',
      ],
      flowerTypes: ['Lavender Stalks', 'Pastel Pink Tulips', 'Violet Star Lily', 'Plush Hyacinth'],
      colors: ['Soft Lilac & Blush Pink', 'Deep Violet & Cream', 'Pastel Blossom'],
      wrapOptions: ['Pleated Tulle & Sheer Organza', 'Korean Frosted Lavender', 'Ivory Editorial Wrap'],
      occasions: ['Anniversaries', 'Birthdays', 'Just Because'],
      description:
        'Our signature editorial showstopper. Handcrafted plush pipe-cleaner lavender stalks, pastel pink tulips, violet lilies, and soft floral filler encased in tiered pleated lavender tulle and tied with a sheer organza bow.',
      dispatchTime: '2-3 business days handmade time',
      careInstructions:
        'Do not soak or spray with water. Gently fluff the tulle wrapping upon arrival for maximum volume.',
      packagingInfo:
        'Arrives nested in luxury tissue wrapping with a bespoke Bloomieee.co ribbon and custom greeting card.',
      rating: 5.0,
      reviewCount: 42,
    },
    {
      id: 'prod-03',
      title: 'Sunlit Golden Sunflower & Daisy Bouquet',
      slug: 'sunlit-sunflower-daisy',
      category: 'Bouquets',
      secondaryCategories: ['Bestsellers', 'Mini Flower Gifts'],
      price: 1299,
      originalPrice: 1599,
      inStock: 6,
      isFeatured: true,
      isBestseller: true,
      images: [
        '/images/products/sunlit-sunflower-daisy.jpg',
      ],
      flowerTypes: ['Double-Petal Sunflowers', 'White Daisies', 'Eucalyptus Foliage'],
      colors: ['Warm Sunflower Yellow', 'Pastel Lemon & Buttercream'],
      wrapOptions: ['Rustic Kraft Wrap & Bronze Ribbon', 'Warm Ivory Cream Paper'],
      occasions: ['Friendship Gifts', 'Just Because', 'Birthdays'],
      description:
        'A bundle of perpetual sunshine. Double-layered fuzzy golden sunflowers complemented by cheerful white daisies with yellow centers, bundled in rustic brown kraft paper with a satin bronze ribbon.',
      dispatchTime: '1-2 business days handmade time',
      careInstructions:
        'Requires zero watering or sunlight! Stems contain bendable wire for easy arrangement in your favorite vase.',
      packagingInfo:
        'Carefully bundled in protective corrugated wrap with botanical sticker seal.',
      rating: 4.8,
      reviewCount: 19,
    },
    {
      id: 'prod-04',
      title: 'Scarlet Red Velvet Rose Keepsake Gift',
      slug: 'scarlet-rose-keepsake',
      category: 'Rose Bouquets',
      secondaryCategories: ['Mini Flower Gifts', 'Bestsellers'],
      price: 599,
      originalPrice: 749,
      inStock: 15,
      isFeatured: false,
      isBestseller: true,
      images: [
        '/images/products/scarlet-rose-keepsake.jpg',
      ],
      flowerTypes: ['Velvet Rose Bloom', 'Leafy Stem'],
      colors: ['Classic Crimson Red', 'Blush Petal Pink', 'Deep Burgundy'],
      wrapOptions: ['Aesthetic Clear Carrier Sleeve', 'Mini Paper Cone'],
      occasions: ['Anniversaries', 'Special Surprises', 'Just Because'],
      description:
        'A single, timeless red rose hand-spun with dense scarlet velvet pipe cleaners, blooming atop a sturdy leafy stem. Presented in an aesthetic transparent boutique carrier with an ivory printed ribbon.',
      dispatchTime: '1 business day dispatch',
      careInstructions:
        'Gently reshape outer petals with fingertips if needed. Keep away from extreme heat.',
      packagingInfo:
        'Packed in a clear tote sleeve with aesthetic carrier handles and printed bow.',
      rating: 4.9,
      reviewCount: 35,
    },
    {
      id: 'prod-05',
      title: 'Burgundy Crimson Tulip & Lily Bouquet',
      slug: 'burgundy-bloom-scalloped',
      category: 'Tulip Bouquets',
      secondaryCategories: ['Lily Bouquets'],
      price: 1599,
      originalPrice: 1999,
      inStock: 5,
      isFeatured: false,
      isBestseller: false,
      images: [
        '/images/products/burgundy-bloom-scalloped.jpg',
        '/images/products/burgundy-tulip-duet.jpg',
      ],
      flowerTypes: ['Burgundy Tulips', 'Star Lily', 'White Daisies', 'Curly Vines'],
      colors: ['Burgundy & Cream', 'Mulberry & Ivory'],
      wrapOptions: ['Scalloped Border Wrap', 'Warm Mocha Paper'],
      occasions: ['Anniversaries', 'Special Surprises'],
      description:
        'Rich deep burgundy tulips paired with an open crimson star lily, surrounded by delicate white accent florets and textured spiral foliage. Wrapped in scalloped blush and mocha Korean flower wrapping.',
      dispatchTime: '2-3 business days handmade time',
      careInstructions: 'Everlasting craft item. Keep dry and dust occasionally.',
      packagingInfo: 'Packaged in rigid carton box with aesthetic protective wrap.',
      rating: 4.7,
      reviewCount: 14,
    },
    {
      id: 'prod-06',
      title: 'Lavender & Buttercream Rose Pastel Bouquet',
      slug: 'lavender-buttercream-roses',
      category: 'Rose Bouquets',
      secondaryCategories: ['Bestsellers'],
      price: 1399,
      originalPrice: 1699,
      inStock: 9,
      isFeatured: true,
      isBestseller: true,
      images: [
        '/images/products/lavender-buttercream-roses.jpg',
        '/images/products/lavender-romance-bouquet.jpg',
      ],
      flowerTypes: ['Lavender Roses', 'Buttercream Roses', 'Heart Wire Stem', 'Eucalyptus Sprigs'],
      colors: ['Lavender & Buttercream Yellow', 'Rose Pink & Mint'],
      wrapOptions: ['Frosted Lilac Wrap with Organza Ribbon', 'Ivory Pearl Paper'],
      occasions: ['Birthdays', 'Friendship Gifts', 'Anniversaries'],
      description:
        'Handmade pastel purple roses intertwined with warm buttercream yellow blossoms, playful green foliage, and a delicate handmade pipe-cleaner heart stem. Finished in sheer frosted lilac wrap.',
      dispatchTime: '2 business days handmade time',
      careInstructions: 'Everlasting pipe cleaner bouquet. Gently reshape leaves or petals anytime.',
      packagingInfo: 'Shipped in sturdy Bloomieee boutique packaging with gift tag.',
      rating: 4.9,
      reviewCount: 22,
    },
    {
      id: 'prod-07',
      title: 'Roseate Star Pink Lily with Pearl Stamen',
      slug: 'roseate-star-lily',
      category: 'Lily Bouquets',
      secondaryCategories: ['Mini Flower Gifts'],
      price: 649,
      originalPrice: 799,
      inStock: 10,
      isFeatured: false,
      isBestseller: true,
      images: [
        '/images/products/roseate-star-lily.jpg',
        '/images/brand/luxury-gift-box.jpg',
      ],
      flowerTypes: ['Pink Star Lily', 'Faux Pearl Stamen', 'Green Stems'],
      colors: ['Rose Pink with White Trim', 'Soft Coral Pink'],
      wrapOptions: ['Presentation Backer Card & Bow', 'Clear Gift Cylinder'],
      occasions: ['Birthdays', 'Just Because', 'Friendship Gifts'],
      description:
        'A standout single bloom featuring vivid pink petals with intricate white edging, pearl-embellished stamens, and green leaves. Comes affixed to a chic boutique presentation card with an ivory ribbon.',
      dispatchTime: '1 business day dispatch',
      careInstructions: 'Handle gently by the stem. Dust gently with dry cloth.',
      packagingInfo: 'Mounted on aesthetic cardstock backer in clear protective sleeve.',
      rating: 4.9,
      reviewCount: 16,
    },
    {
      id: 'prod-08',
      title: 'Sunset Blush Peachy Lilies Bouquet',
      slug: 'sunset-blush-lilies',
      category: 'Lily Bouquets',
      secondaryCategories: ['Bouquets'],
      price: 1449,
      originalPrice: 1799,
      inStock: 7,
      isFeatured: false,
      isBestseller: false,
      images: [
        '/images/products/sunset-blush-lilies.jpg',
        '/images/products/royal-blue-velvet-tulips.jpg',
      ],
      flowerTypes: ['Peach Lilies', 'Wheat Sprigs', 'Broad Leaves'],
      colors: ['Soft Peach & Blush Pink', 'Sunset Apricot'],
      wrapOptions: ['Modern Striped Korean Paper', 'Warm Cream Wrap'],
      occasions: ['Anniversaries', 'Birthdays'],
      description:
        'Soft warm tones inspired by golden hour. Dual peach-toned lilies complemented by textured cream wheat stems and lush leaves, enveloped in modern striped Korean wrapping paper.',
      dispatchTime: '2-3 business days handmade time',
      careInstructions: 'Everlasting floral keepsake. Protect from direct water.',
      packagingInfo: 'Packaged in Bloomieee signature presentation box.',
      rating: 4.8,
      reviewCount: 11,
    },
    {
      id: 'prod-09',
      title: 'Midnight Burgundy Tulip Duet',
      slug: 'burgundy-tulip-duet',
      category: 'Tulip Bouquets',
      price: 1349,
      originalPrice: 1649,
      inStock: 8,
      isFeatured: false,
      isBestseller: false,
      images: [
        '/images/products/burgundy-tulip-duet.jpg',
        '/images/products/burgundy-bloom-scalloped.jpg',
      ],
      flowerTypes: ['Deep Burgundy Tulips', 'Mini Cream Daisies'],
      colors: ['Wine Red & Champagne', 'Classic Burgundy'],
      wrapOptions: ['Layered Beige Kraft Paper', 'French Script Wrap'],
      occasions: ['Anniversaries', 'Special Surprises'],
      description:
        'Romantic and moody arrangement of deep wine red tulips and mini cream blossoms wrapped in layered beige kraft paper with a custom cursive ribbon.',
      dispatchTime: '2 business days handmade time',
      careInstructions: 'Everlasting craft flowers. Keep away from moisture.',
      packagingInfo: 'Rigid carton shipping with custom ribbon wrap.',
      rating: 4.7,
      reviewCount: 9,
    },
    {
      id: 'prod-10',
      title: 'Bespoke Custom Bouquet (Handmade to Order)',
      slug: 'bespoke-custom-bouquet',
      category: 'Custom Bouquets',
      secondaryCategories: ['Bestsellers'],
      price: 1899,
      originalPrice: 2299,
      inStock: 25,
      isFeatured: true,
      isBestseller: true,
      images: [
        '/images/brand/luxury-gift-box.jpg',
        '/images/products/lavender-romance-bouquet.jpg',
        '/images/products/royal-blue-velvet-tulips.jpg',
      ],
      flowerTypes: ['Custom Stem Mix: Tulips, Roses, Lilies, Daisies, Sunflowers'],
      colors: ['Your Chosen Color Palette'],
      wrapOptions: ['Pleated Tulle', 'Matte Korean Paper', 'Kraft Vintage', 'Clear Tote Carrier'],
      occasions: ['Weddings', 'Anniversaries', 'Special Surprises', 'Birthdays'],
      description:
        'Let your imagination bloom! Work directly with our floral artist to choose your flower types, color palette, bouquet size, wrapping aesthetic, and custom handwritten message card. We send photos for your approval before dispatching.',
      dispatchTime: '3-4 business days handmade crafting',
      careInstructions: 'Crafted with premium chenille pipe cleaners and floral wire. Lasts forever.',
      packagingInfo: 'Delivered in luxury presentation box with satin bow and custom card.',
      rating: 5.0,
      reviewCount: 54,
    },
  ],
  orders: [
    {
      id: 'BLM-9281',
      createdAt: '2026-03-28T14:22:00Z',
      customer: {
        name: 'Aanya Sharma',
        email: 'aanya.sharma@example.com',
        phone: '+91 98201 54321',
      },
      shippingAddress: {
        street: '402, Lotus Greens, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400050',
        country: 'India',
      },
      items: [
        {
          productId: 'prod-02',
          title: 'Lavender Romance Everlasting Bouquet',
          slug: 'lavender-romance-bouquet',
          price: 1699,
          quantity: 1,
          image: '/images/products/lavender-romance-bouquet.jpg',
          selectedColor: 'Soft Lilac & Blush Pink',
          selectedWrap: 'Pleated Tulle & Sheer Organza',
          giftMessage: 'Happy 1st Anniversary my love! May our love bloom forever like these flowers.',
        },
      ],
      subtotal: 1699,
      shippingFee: 0,
      discount: 0,
      total: 1699,
      paymentMethod: 'razorpay',
      paymentStatus: 'paid',
      orderStatus: 'crafting',
      trackingNumber: 'DTDC-88492019',
      notes: 'Please add extra lavender stems if possible',
      giftMessage: 'Happy 1st Anniversary my love!',
    },
    {
      id: 'BLM-9240',
      createdAt: '2026-03-25T11:05:00Z',
      customer: {
        name: 'Rohan Verma',
        email: 'rohan.v@example.com',
        phone: '+91 99100 88219',
      },
      shippingAddress: {
        street: '12-B, Indiranagar 100ft Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        postalCode: '560038',
        country: 'India',
      },
      items: [
        {
          productId: 'prod-01',
          title: 'Royal Blue Velvet Tulips & Lily Bouquet',
          slug: 'royal-blue-velvet-tulips',
          price: 1499,
          quantity: 1,
          image: '/images/products/royal-blue-velvet-tulips.jpg',
          selectedColor: 'Royal Blue & White',
          selectedWrap: 'Crisp White Pleated Wrap',
        },
      ],
      subtotal: 1499,
      shippingFee: 0,
      discount: 0,
      total: 1499,
      paymentMethod: 'razorpay',
      paymentStatus: 'paid',
      orderStatus: 'shipped',
      trackingNumber: 'BLUEDART-938217',
    },
  ],
  customRequests: [
    {
      id: 'REQ-801',
      createdAt: '2026-03-29T10:30:00Z',
      customerName: 'Priya Mehta',
      contact: '+91 97123 45678',
      flowerTypes: ['Tulips', 'Lilies', 'White Daisies'],
      preferredColors: 'Baby Blue, Pastel Yellow and White',
      bouquetSize: 'Standard Bouquet (5-7 stems)',
      budgetRange: '₹1500 - ₹2000',
      occasion: 'Graduation Day',
      notes: 'Need a small graduation cap miniature or yellow ribbon if possible!',
      status: 'new',
    },
    {
      id: 'REQ-795',
      createdAt: '2026-03-24T16:15:00Z',
      customerName: 'Dev Patel',
      contact: 'dev.patel@gmail.com',
      flowerTypes: ['Sunflowers', 'Roses'],
      preferredColors: 'Sunflower yellow & crimson red',
      bouquetSize: 'Grand Deluxe (10-15 stems)',
      budgetRange: '₹2000+',
      occasion: 'Birthday Surprise',
      notes: 'Delivered in Ahmedabad before April 5th.',
      status: 'contacted',
    },
  ],
  subscribers: [
    {
      id: 'sub-1',
      email: 'tanvi.art@example.com',
      subscribedAt: '2026-03-20T09:12:00Z',
      status: 'active',
    },
    {
      id: 'sub-2',
      email: 'arjun.k@example.com',
      subscribedAt: '2026-03-22T15:40:00Z',
      status: 'active',
    },
  ],
  testimonials: [
    {
      id: 't-1',
      name: 'Simran K.',
      rating: 5,
      review:
        'The royal blue tulips look even more stunning in person! My best friend cried tears of joy when she opened the box. The craftsmanship is pure perfection.',
      productName: 'Royal Blue Velvet Tulips',
      location: 'New Delhi',
      isPublished: true,
      date: 'March 2026',
    },
    {
      id: 't-2',
      name: 'Arjun & Sneha',
      rating: 5,
      review:
        'Ordered the Lavender Romance bouquet for our 2nd anniversary. The fact that these flowers will never wilt and sit beautifully on our dresser forever makes them so special.',
      productName: 'Lavender Romance Bouquet',
      location: 'Bengaluru',
      isPublished: true,
      date: 'February 2026',
    },
    {
      id: 't-3',
      name: 'Meera Trivedi',
      rating: 5,
      review:
        'The team at Bloomieee customized my sunflower bouquet exactly how I imagined it. Super fast delivery and the handwritten note card was so heartwarming!',
      productName: 'Sunlit Sunflower Bouquet',
      location: 'Ahmedabad',
      isPublished: true,
      date: 'March 2026',
    },
  ],
};

let inMemoryDB: DatabaseSchema | null = null;

function getDbFilePath(): string {
  // Check if writable in current directory, otherwise use /tmp for Vercel serverless
  if (fs.existsSync(dbFile)) {
    return dbFile;
  }
  const tmpDbFile = path.join('/tmp', 'bloomieee.json');
  return tmpDbFile;
}

export function getDatabase(): DatabaseSchema {
  if (inMemoryDB) {
    return inMemoryDB;
  }

  // 1. Try local data file
  if (fs.existsSync(dbFile)) {
    try {
      const raw = fs.readFileSync(dbFile, 'utf-8');
      inMemoryDB = JSON.parse(raw);
      return inMemoryDB!;
    } catch (e) {
      console.error('Error reading local db file:', e);
    }
  }

  // 2. Try /tmp file if on serverless
  const tmpFile = path.join('/tmp', 'bloomieee.json');
  if (fs.existsSync(tmpFile)) {
    try {
      const raw = fs.readFileSync(tmpFile, 'utf-8');
      inMemoryDB = JSON.parse(raw);
      return inMemoryDB!;
    } catch (e) {
      console.error('Error reading tmp db file:', e);
    }
  }

  // 3. Fallback to initial data
  inMemoryDB = JSON.parse(JSON.stringify(INITIAL_DATA));
  return inMemoryDB!;
}

export function saveDatabase(data: DatabaseSchema): void {
  inMemoryDB = data;

  // Try saving to project data folder first
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const tmp = `${dbFile}.tmp.${Date.now()}`;
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tmp, dbFile);
    return;
  } catch (err) {
    // If running in Vercel read-only serverless filesystem, save to /tmp
    try {
      const tmpFile = path.join('/tmp', 'bloomieee.json');
      fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
    } catch (tmpErr) {
      console.warn('Could not persist to disk in serverless environment:', tmpErr);
    }
  }
}

