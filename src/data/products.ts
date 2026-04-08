export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  hoverImage?: string;
  gallery?: string[];
  badge?: { text: string; color: string };
  type?: 'mens' | 'womens' | 'jewelry' | 'perfume' | 'hot-offers' | 'all';
  subCategory?: string;
}

export const allProducts: Product[] = [
  // Mens
  { 
    id: 1, 
    title: "Relaxed Short full Sleeve T-Shirt", 
    category: "mens", 
    subCategory: "shirts",
    price: 45, 
    oldPrice: 12, 
    rating: 4, 
    image: "https://picsum.photos/seed/m1/600/800", 
    hoverImage: "https://picsum.photos/seed/m1h/600/800", 
    gallery: [
      "https://picsum.photos/seed/m1/600/800",
      "https://picsum.photos/seed/m1-1/600/800",
      "https://picsum.photos/seed/m1-2/600/800",
      "https://picsum.photos/seed/m1-3/600/800"
    ],
    type: 'mens' 
  },
  { 
    id: 4, 
    title: "Pure Garment Dyed Cotton Shirt", 
    category: "mens", 
    subCategory: "shirts",
    price: 68, 
    oldPrice: 31, 
    rating: 4, 
    image: "https://picsum.photos/seed/m2/600/800", 
    hoverImage: "https://picsum.photos/seed/m2h/600/800", 
    gallery: [
      "https://picsum.photos/seed/m2/600/800",
      "https://picsum.photos/seed/m2-1/600/800",
      "https://picsum.photos/seed/m2-2/600/800"
    ],
    type: 'mens' 
  },
  { 
    id: 13, 
    title: "Mens Winter Leathers Jackets", 
    category: "mens", 
    subCategory: "jackets",
    price: 48, 
    oldPrice: 75, 
    rating: 3, 
    image: "https://picsum.photos/seed/m3/600/800", 
    hoverImage: "https://picsum.photos/seed/m3h/600/800", 
    gallery: [
      "https://picsum.photos/seed/m3/600/800",
      "https://picsum.photos/seed/m3-1/600/800",
      "https://picsum.photos/seed/m3-2/600/800"
    ],
    badge: { text: "15%", color: "bg-emerald-500" }, 
    type: 'mens' 
  },
  { 
    id: 15, 
    title: "MEN Yarn Fleece Full-Zip Jacket", 
    category: "mens", 
    subCategory: "jackets",
    price: 58, 
    oldPrice: 65, 
    rating: 3, 
    image: "https://picsum.photos/seed/m4/600/800", 
    hoverImage: "https://picsum.photos/seed/m4h/600/800", 
    gallery: [
      "https://picsum.photos/seed/m4/600/800",
      "https://picsum.photos/seed/m4-1/600/800"
    ],
    type: 'mens' 
  },
  { 
    id: 17, 
    title: "Casual Men's Brown shoes", 
    category: "mens", 
    subCategory: "shoes-casual",
    price: 99, 
    oldPrice: 105, 
    rating: 5, 
    image: "https://picsum.photos/seed/m5/600/800", 
    hoverImage: "https://picsum.photos/seed/m5h/600/800", 
    gallery: [
      "https://picsum.photos/seed/m5/600/800",
      "https://picsum.photos/seed/m5-1/600/800",
      "https://picsum.photos/seed/m5-2/600/800"
    ],
    type: 'mens' 
  },
  { 
    id: 18, 
    title: "Men's Formal Oxford Shoes", 
    category: "mens", 
    subCategory: "shoes-formal",
    price: 149, 
    oldPrice: 180, 
    rating: 5, 
    image: "https://picsum.photos/seed/m6/600/800", 
    hoverImage: "https://picsum.photos/seed/m6h/600/800", 
    gallery: [
      "https://picsum.photos/seed/m6/600/800",
      "https://picsum.photos/seed/m6-1/600/800"
    ],
    type: 'mens' 
  },
  { 
    id: 19, 
    title: "Men's Sports Running Shoes", 
    category: "mens", 
    subCategory: "shoes-sports",
    price: 85, 
    oldPrice: 110, 
    rating: 4, 
    image: "https://picsum.photos/seed/m7/600/800", 
    hoverImage: "https://picsum.photos/seed/m7h/600/800", 
    gallery: [
      "https://picsum.photos/seed/m7/600/800",
      "https://picsum.photos/seed/m7-1/600/800"
    ],
    type: 'mens' 
  },
  { 
    id: 20, 
    title: "Men's Slim Fit Denim Jeans", 
    category: "mens", 
    subCategory: "jeans",
    price: 55, 
    oldPrice: 70, 
    rating: 4, 
    image: "https://picsum.photos/seed/m8/600/800", 
    hoverImage: "https://picsum.photos/seed/m8h/600/800", 
    gallery: [
      "https://picsum.photos/seed/m8/600/800",
      "https://picsum.photos/seed/m8-1/600/800"
    ],
    type: 'mens' 
  },
  { 
    id: 21, 
    title: "Men's Cotton Cargo Shorts", 
    category: "mens", 
    subCategory: "shorts",
    price: 35, 
    oldPrice: 45, 
    rating: 4, 
    image: "https://picsum.photos/seed/m9/600/800", 
    hoverImage: "https://picsum.photos/seed/m9h/600/800", 
    gallery: [
      "https://picsum.photos/seed/m9/600/800",
      "https://picsum.photos/seed/m9-1/600/800"
    ],
    type: 'mens' 
  },

  // Womens
  { 
    id: 2, 
    title: "Girls pink Embro design Top", 
    category: "womens", 
    price: 61, 
    oldPrice: 9, 
    rating: 5, 
    image: "https://picsum.photos/seed/w1/600/800", 
    hoverImage: "https://picsum.photos/seed/w1h/600/800", 
    gallery: [
      "https://picsum.photos/seed/w1/600/800",
      "https://picsum.photos/seed/w1-1/600/800",
      "https://picsum.photos/seed/w1-2/600/800"
    ],
    type: 'womens' 
  },
  { 
    id: 3, 
    title: "Black Floral Wrap Midi Skirt", 
    category: "womens", 
    price: 76, 
    oldPrice: 25, 
    rating: 3, 
    image: "https://picsum.photos/seed/w2/600/800", 
    hoverImage: "https://picsum.photos/seed/w2h/600/800", 
    gallery: [
      "https://picsum.photos/seed/w2/600/800",
      "https://picsum.photos/seed/w2-1/600/800"
    ],
    type: 'womens' 
  },
  { 
    id: 16, 
    title: "Black Floral Wrap Midi Skirt", 
    category: "womens", 
    price: 25, 
    oldPrice: 35, 
    rating: 5, 
    image: "https://picsum.photos/seed/w3/600/800", 
    hoverImage: "https://picsum.photos/seed/w3h/600/800", 
    gallery: [
      "https://picsum.photos/seed/w3/600/800",
      "https://picsum.photos/seed/w3-1/600/800"
    ],
    badge: { text: "NEW", color: "bg-pink-400" }, 
    type: 'womens' 
  },

  // Jewelry
  { 
    id: 10, 
    title: "Silver Deer Heart Necklace", 
    category: "jewelry", 
    price: 84, 
    oldPrice: 30, 
    rating: 4, 
    image: "https://picsum.photos/seed/j1/600/800", 
    hoverImage: "https://picsum.photos/seed/j1h/600/800", 
    gallery: [
      "https://picsum.photos/seed/j1/600/800",
      "https://picsum.photos/seed/j1-1/600/800",
      "https://picsum.photos/seed/j1-2/600/800"
    ],
    type: 'jewelry' 
  },

  // Perfume
  { 
    id: 11, 
    title: "Titan 100 Ml Womens Perfume", 
    category: "perfume", 
    price: 42, 
    oldPrice: 10, 
    rating: 4, 
    image: "https://picsum.photos/seed/pe1/600/800", 
    hoverImage: "https://picsum.photos/seed/pe1h/600/800", 
    gallery: [
      "https://picsum.photos/seed/pe1/600/800",
      "https://picsum.photos/seed/pe1-1/600/800"
    ],
    type: 'perfume' 
  },
  // Hot Offers
  { 
    id: 101, 
    title: "Exclusive Summer Sale Combo", 
    category: "hot-offers", 
    price: 120, 
    oldPrice: 250, 
    rating: 5, 
    image: "https://picsum.photos/seed/hot1/600/800", 
    hoverImage: "https://picsum.photos/seed/hot1h/600/800", 
    gallery: [
      "https://picsum.photos/seed/hot1/600/800",
      "https://picsum.photos/seed/hot1-1/600/800"
    ],
    badge: { text: "HOT", color: "bg-red-500" },
    type: 'hot-offers' 
  },
  { 
    id: 102, 
    title: "Limited Edition Watch Set", 
    category: "hot-offers", 
    price: 89, 
    oldPrice: 199, 
    rating: 5, 
    image: "https://picsum.photos/seed/hot2/600/800", 
    hoverImage: "https://picsum.photos/seed/hot2h/600/800", 
    gallery: [
      "https://picsum.photos/seed/hot2/600/800",
      "https://picsum.photos/seed/hot2-1/600/800"
    ],
    badge: { text: "50% OFF", color: "bg-red-500" },
    type: 'hot-offers' 
  },
];
