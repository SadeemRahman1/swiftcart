import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from './data/products';
import { useCart } from './context/CartContext';
import { 
  Heart, 
  Eye, 
  Repeat, 
  ShoppingBag, 
  Plus, 
  Star,
  X,
  LayoutGrid,
  List
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex text-amber-400 text-sm">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} fill={i < rating ? "currentColor" : "none"} />
      ))}
    </div>
  );
};

const ProductGridItem: React.FC<{ product: Product; onQuickView: (p: Product) => void }> = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const isFavorite = isInWishlist(product.id);

  return (
    <div 
      className="group relative border border-zinc-100 rounded-xl overflow-hidden bg-white hover:shadow-lg transition-all cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onQuickView(product)}
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

export default function CategoryPage() {
  const { slug } = useParams();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await fetch(`/api/products?type=${slug}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [slug]);

  useEffect(() => {
    if (quickViewProduct) {
      setActiveImage(quickViewProduct.image);
    }
  }, [quickViewProduct]);

  const categoryTitle = slug === 'all' ? 'All Products' : slug?.charAt(0).toUpperCase() + slug?.slice(1) + "'s Fashion";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-400"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 uppercase tracking-tighter mb-2">{categoryTitle}</h1>
          <p className="text-sm text-zinc-400">Showing {products.length} products</p>
        </div>
        
        <div className="flex items-center gap-4 bg-zinc-50 p-2 rounded-2xl">
          <button className="p-2 bg-white text-pink-400 rounded-xl shadow-sm"><LayoutGrid size={20} /></button>
          <button className="p-2 text-zinc-400 hover:text-zinc-900"><List size={20} /></button>
          <div className="w-px h-6 bg-zinc-200 mx-2" />
          <select className="bg-transparent text-sm font-bold text-zinc-600 outline-none cursor-pointer">
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductGridItem 
            key={product.id} 
            product={product} 
            onQuickView={(p) => setQuickViewProduct(p)} 
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-xl font-bold text-zinc-400">No products found in this category.</h2>
          <Link to="/" className="text-pink-400 font-bold hover:underline mt-4 inline-block">Back to Home</Link>
        </div>
      )}

      {/* Quick View Modal */}
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
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
