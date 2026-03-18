import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Eye, 
  Repeat,
  Plus,
  Minus,
  Star,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from './context/CartContext';

import { Product } from './data/products';

// --- Types ---
// Removed internal Product interface as it's now imported

interface Category {
  id: number;
  title: string;
  amount: number;
  icon: string;
}

// --- Mock Data ---
const categories: Category[] = [
  { id: 1, title: "Dress & frock", amount: 53, icon: "https://picsum.photos/seed/dress/100/100" },
  { id: 2, title: "Winter wear", amount: 58, icon: "https://picsum.photos/seed/winter/100/100" },
  { id: 3, title: "Glasses & lens", amount: 68, icon: "https://picsum.photos/seed/glasses/100/100" },
  { id: 4, title: "Shorts & jeans", amount: 84, icon: "https://picsum.photos/seed/shorts/100/100" },
  { id: 5, title: "T-shirts", amount: 35, icon: "https://picsum.photos/seed/tee/100/100" },
  { id: 6, title: "Jacket", amount: 16, icon: "https://picsum.photos/seed/jacket/100/100" },
  { id: 7, title: "Watch", amount: 27, icon: "https://picsum.photos/seed/watch/100/100" },
  { id: 8, title: "Hat & caps", amount: 39, icon: "https://picsum.photos/seed/hat/100/100" },
];

// --- Components ---

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex text-amber-400 text-sm">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} fill={i < rating ? "currentColor" : "none"} />
      ))}
    </div>
  );
};

const ProductCardMinimal: React.FC<{ product: Product; onClick: () => void }> = ({ product, onClick }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const isFavorite = isInWishlist(product.id);

  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-4 p-4 border border-zinc-100 rounded-xl hover:shadow-md transition-shadow bg-white group cursor-pointer"
    >
      <img 
        src={product.image} 
        alt={product.title} 
        className="w-16 h-16 object-cover rounded-lg"
        referrerPolicy="no-referrer"
      />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-zinc-800 truncate">{product.title}</h4>
        <p className="text-xs text-pink-400 font-medium mb-1">{product.category}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-pink-400">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <del className="text-xs text-zinc-400">${product.oldPrice.toFixed(2)}</del>
            )}
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product);
              }}
              className={`p-1.5 rounded-lg transition-all ${isFavorite ? 'bg-pink-400 text-white' : 'bg-zinc-50 text-zinc-400 hover:bg-pink-400 hover:text-white'}`}
            >
              <Heart size={14} fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="p-1.5 bg-zinc-50 text-zinc-400 rounded-lg hover:bg-pink-400 hover:text-white transition-all"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductGridItem: React.FC<{ product: Product; onQuickView: (p: Product) => void }> = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const isFavorite = isInWishlist(product.id);

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group relative border border-zinc-100 rounded-xl overflow-hidden bg-white hover:shadow-lg transition-all cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={isHovered && product.hoverImage ? product.hoverImage : product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {product.badge && (
          <span className={`absolute top-4 left-4 px-2 py-0.5 text-[10px] font-bold text-white rounded uppercase z-10 ${product.badge.color}`}>
            {product.badge.text}
          </span>
        )}
        
        <div className="absolute top-4 right-4 md:-right-12 md:group-hover:right-4 flex flex-col gap-2 transition-all duration-300 z-10">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-2 backdrop-blur-sm rounded-lg shadow-md transition-colors ${isFavorite ? 'bg-pink-400 text-white' : 'bg-white/90 text-zinc-500 hover:bg-zinc-900 hover:text-white'}`}
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md text-zinc-500 hover:bg-zinc-900 hover:text-white transition-colors"
          >
            <Eye size={18} />
          </button>
          <button 
            onClick={(e) => e.stopPropagation()}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md text-zinc-500 hover:bg-zinc-900 hover:text-white transition-colors"
          >
            <Repeat size={18} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md text-zinc-500 hover:bg-zinc-900 hover:text-white transition-colors"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-pink-400 font-medium uppercase mb-1">{product.category}</p>
        <h3 className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors truncate mb-2">
          {product.title}
        </h3>
        <StarRating rating={product.rating} />
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-zinc-900">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <del className="text-xs text-zinc-400">${product.oldPrice.toFixed(2)}</del>
            )}
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="md:hidden p-2 bg-pink-400 text-white rounded-lg shadow-sm"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const SidebarAccordion = ({ title, items, icon: Icon }: { title: string, items: string[], icon: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 text-zinc-600 hover:text-zinc-900 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon size={18} className="text-zinc-400" />
          <span className="text-sm font-medium">{title}</span>
        </div>
        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pl-11 pb-3 space-y-2"
          >
            {items.map((item, idx) => (
              <li key={idx}>
                <a href="#" className="text-xs text-zinc-500 hover:text-pink-400 transition-colors flex justify-between">
                  <span>{item}</span>
                  <span className="text-[10px] text-zinc-300">300</span>
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (quickViewProduct) {
      setActiveImage(quickViewProduct.image);
    }
  }, [quickViewProduct]);

  useEffect(() => {
    const modalTimer = setTimeout(() => setShowModal(true), 5000);
    const toastTimer = setTimeout(() => setShowToast(true), 3000);
    return () => {
      clearTimeout(modalTimer);
      clearTimeout(toastTimer);
    };
  }, []);

  const newArrivals = products.slice(0, 4);
  const trendingProducts = products.slice(4, 8);
  const topRatedProducts = products.slice(8, 12);
  const mainGridProducts = products;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-400"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* --- Modals & Overlays --- */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setQuickViewProduct(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-3xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row shadow-2xl"
            >
              <button 
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-zinc-100 text-zinc-500 rounded-full hover:bg-pink-400 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
              
              <div className="w-full md:w-1/2 bg-zinc-50 p-6 flex flex-col gap-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-zinc-100">
                  <img 
                    src={activeImage || quickViewProduct.image} 
                    alt={quickViewProduct.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {quickViewProduct.gallery && quickViewProduct.gallery.length > 0 && (
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {quickViewProduct.gallery.map((img, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-pink-400 scale-95' : 'border-transparent opacity-70 hover:opacity-100'}`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
                <p className="text-pink-400 font-bold uppercase tracking-widest text-xs mb-2">{quickViewProduct.category}</p>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 mb-4 leading-tight">{quickViewProduct.title}</h3>
                <div className="flex items-center gap-4 mb-6">
                  <StarRating rating={quickViewProduct.rating} />
                  <span className="text-zinc-400 text-xs">(120 Customer Reviews)</span>
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl font-black text-pink-400">${quickViewProduct.price.toFixed(2)}</span>
                  {quickViewProduct.oldPrice && (
                    <del className="text-xl text-zinc-400">${quickViewProduct.oldPrice.toFixed(2)}</del>
                  )}
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                  Experience premium quality and modern design with the {quickViewProduct.title}. Perfect for any occasion, this {quickViewProduct.category} item combines style and comfort seamlessly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                      addToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-pink-400 transition-colors uppercase tracking-widest text-sm shadow-xl flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>
                  <button className="px-8 py-4 border-2 border-zinc-100 text-zinc-900 font-bold rounded-2xl hover:border-pink-400 hover:text-pink-400 transition-all uppercase tracking-widest text-sm">
                    Wishlist
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-2xl overflow-hidden max-w-3xl w-full flex flex-col md:flex-row shadow-2xl"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 z-10 p-1 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition-colors"
              >
                <X size={20} />
              </button>
              <div className="hidden md:block w-1/2">
                <img 
                  src="https://picsum.photos/seed/newsletter/600/800" 
                  alt="Newsletter" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 md:p-12 flex-1 flex flex-col justify-center text-center md:text-left">
                <h3 className="text-2xl font-bold text-zinc-800 mb-2">Subscribe Newsletter.</h3>
                <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
                  Subscribe the <span className="font-bold text-zinc-800">SwiftCart</span> to get latest products and discount update.
                </p>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                    required
                  />
                  <button className="w-full py-3 bg-zinc-900 text-white font-bold rounded-lg hover:bg-pink-400 transition-colors uppercase tracking-wider text-sm">
                    Subscribe
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="fixed bottom-24 left-8 z-40 bg-white p-4 rounded-2xl shadow-2xl border border-zinc-100 flex items-start gap-4 max-w-xs"
          >
            <button 
              onClick={() => setShowToast(false)}
              className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-600"
            >
              <X size={14} />
            </button>
            <img 
              src="https://picsum.photos/seed/toast/100/100" 
              alt="Recent Purchase" 
              className="w-16 h-16 rounded-xl object-cover border border-zinc-100"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="text-[10px] text-zinc-400 mb-1">Someone in new just bought</p>
              <h4 className="text-sm font-semibold text-zinc-800">Rose Gold Earrings</h4>
              <p className="text-[10px] text-zinc-400 mt-1">2 Minutes ago</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Banner Slider (Mock) */}
      <section className="mb-8">
        <div className="relative h-[350px] md:h-[450px] rounded-3xl overflow-hidden group">
          <img 
            src="https://picsum.photos/seed/banner1/1920/1080" 
            alt="Banner" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent flex items-center px-6 md:px-20">
            <div className="max-w-md">
              <p className="text-pink-400 text-xs md:text-sm font-bold tracking-widest uppercase mb-2 md:mb-4">Trending item</p>
              <h2 className="text-3xl md:text-6xl font-black text-zinc-900 leading-tight md:leading-none mb-4 md:mb-6 uppercase">WOMEN'S LATEST FASHION SALE</h2>
              <p className="text-sm md:text-lg text-zinc-600 mb-6 md:mb-8">starting at $ <span className="text-2xl md:text-3xl font-bold text-zinc-900">20</span>.00</p>
              <button className="px-6 md:px-8 py-2.5 md:py-3 bg-pink-400 text-white font-bold rounded-xl hover:bg-zinc-900 transition-colors uppercase tracking-wider text-xs md:text-sm">
                Shop now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Scroll */}
      <section className="mb-12">
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map((cat) => (
            <div key={cat.id} className="flex-shrink-0 flex items-center gap-3 md:gap-4 p-3 md:p-4 border border-zinc-100 rounded-2xl bg-white min-w-[200px] md:min-w-[250px] hover:border-pink-200 transition-colors cursor-pointer group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-zinc-50 rounded-xl flex items-center justify-center p-2 group-hover:bg-pink-50 transition-colors">
                <img src={cat.icon} alt={cat.title} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-0.5 md:mb-1">
                  <h4 className="text-xs md:text-sm font-bold text-zinc-800">{cat.title}</h4>
                  <span className="text-[9px] md:text-[10px] text-zinc-400">({cat.amount})</span>
                </div>
                <button className="text-[9px] md:text-[10px] font-bold text-pink-400 uppercase tracking-wider hover:underline">Show all</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Grid Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Sections (Main Content) */}
        <div className="flex-1 order-1 lg:order-2 space-y-12">
          {/* Minimal Lists */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider mb-6 pb-2 border-b border-zinc-100">New Arrivals</h2>
              <div className="space-y-4">
                {newArrivals.map(p => <ProductCardMinimal key={p.id} product={p} onClick={() => setQuickViewProduct(p)} />)}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider mb-6 pb-2 border-b border-zinc-100">Trending</h2>
              <div className="space-y-4">
                {trendingProducts.map(p => <ProductCardMinimal key={p.id} product={p} onClick={() => setQuickViewProduct(p)} />)}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider mb-6 pb-2 border-b border-zinc-100">Top Rated</h2>
              <div className="space-y-4">
                {topRatedProducts.map(p => <ProductCardMinimal key={p.id} product={p} onClick={() => setQuickViewProduct(p)} />)}
              </div>
            </div>
          </div>

          {/* Featured Deal */}
          <section>
            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider mb-6 pb-2 border-b border-zinc-100">Deal of the day</h2>
            <div className="p-6 md:p-8 border border-zinc-100 rounded-3xl bg-white flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <img 
                  src="https://picsum.photos/seed/deal/600/600" 
                  alt="Deal" 
                  className="w-full h-auto rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 space-y-6">
                <StarRating rating={4} />
                <h3 className="text-xl font-bold text-zinc-800 uppercase">shampoo, conditioner & facewash packs</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor dolor sit amet consectetur Lorem ipsum dolor
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-black text-pink-400">$150.00</span>
                  <del className="text-lg text-zinc-400">$200.00</del>
                </div>
                <button 
                  onClick={() => addToCart({ id: 99, title: "Deal Shampoo Pack", price: 150, image: "https://picsum.photos/seed/deal/600/600" })}
                  className="w-full md:w-auto px-8 py-3 bg-pink-400 text-white font-bold rounded-xl hover:bg-zinc-900 transition-colors uppercase tracking-wider text-sm"
                >
                  Add to cart
                </button>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase text-zinc-600">
                    <span>already sold: 20</span>
                    <span>available: 40</span>
                  </div>
                  <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-400 w-[33%]" />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase text-zinc-800">Hurry Up! Offer ends in:</p>
                  <div className="grid grid-cols-4 gap-2 md:gap-3">
                    {[
                      { val: 360, label: "Days" },
                      { val: 24, label: "Hours" },
                      { val: 59, label: "Min" },
                      { val: "00", label: "Sec" }
                    ].map((t, i) => (
                      <div key={i} className="bg-zinc-50 p-2 rounded-xl text-center">
                        <p className="text-base md:text-lg font-bold text-zinc-900">{t.val}</p>
                        <p className="text-[8px] md:text-[10px] text-zinc-400 uppercase tracking-tighter">{t.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Product Grid */}
          <section>
            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider mb-6 pb-2 border-b border-zinc-100">New Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {mainGridProducts.map(p => (
                <ProductGridItem 
                  key={p.id} 
                  product={p} 
                  onQuickView={(product) => setQuickViewProduct(product)} 
                />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-1/4 order-2 lg:order-1 space-y-8">
          <div className="p-6 border border-zinc-100 rounded-2xl bg-white">
            <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-wider mb-6">Category</h3>
            <div className="space-y-1">
              <SidebarAccordion title="Clothes" items={["Shirt", "Shorts & Jeans", "Jacket", "Dress & Frock"]} icon={ShoppingBag} />
              <SidebarAccordion title="Footwear" items={["Sports", "Formal", "Casual", "Safety Shoes"]} icon={ShoppingBag} />
              <SidebarAccordion title="Jewelry" items={["Earrings", "Couple Rings", "Necklace"]} icon={ShoppingBag} />
              <SidebarAccordion title="Perfume" items={["Clothes Perfume", "Deodorant", "Air Freshener"]} icon={ShoppingBag} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
