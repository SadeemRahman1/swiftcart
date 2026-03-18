import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from './context/CartContext';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, wishlistCount } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-pink-100 selection:text-pink-600">
      {/* --- Header --- */}
      <header className="border-b border-zinc-100 sticky top-0 bg-white z-40">
        {/* Top Bar */}
        <div className="hidden md:block bg-white border-b border-zinc-100 py-2.5">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex gap-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-1.5 bg-zinc-50 text-zinc-400 rounded-lg hover:bg-pink-400 hover:text-white transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-widest">
              <span className="font-bold text-zinc-600">Free Shipping</span> This Week Order Over - $55
            </p>
            <div className="flex gap-4">
              <select className="text-[11px] text-zinc-400 bg-transparent uppercase cursor-pointer hover:text-zinc-900 outline-none">
                <option>USD $</option>
                <option>EUR €</option>
              </select>
              <select className="text-[11px] text-zinc-400 bg-transparent uppercase cursor-pointer hover:text-zinc-900 outline-none">
                <option>English</option>
                <option>Español</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="py-4 md:py-6">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-4 md:gap-20">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-zinc-900">SwiftCart</h1>
            </Link>
            
            <div className="relative flex-1 w-full max-w-2xl order-3 md:order-2">
              <input 
                type="search" 
                placeholder="Search products..." 
                className="w-full pl-4 pr-12 py-2 rounded-xl border border-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-pink-400 transition-colors">
                <Search size={18} />
              </button>
            </div>

            <div className="flex items-center gap-4 md:gap-6 order-2 md:order-3">
              <button className="relative p-1 text-zinc-700 hover:text-pink-400 transition-colors">
                <User size={24} strokeWidth={1.5} />
              </button>
              <button className="relative p-1 text-zinc-700 hover:text-pink-400 transition-colors">
                <Heart size={24} strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-400 text-white text-[8px] font-bold flex items-center justify-center rounded-full">{wishlistCount}</span>
              </button>
              <button 
                onClick={() => navigate('/cart')}
                className="relative p-1 text-zinc-700 hover:text-pink-400 transition-colors"
              >
                <ShoppingBag size={24} strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-400 text-white text-[8px] font-bold flex items-center justify-center rounded-full">{totalItems}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <div className="container mx-auto px-4">
            <ul className="flex justify-center gap-10">
              {[
                { name: 'Home', path: '/' },
                { name: 'Categories', path: '/category/all' },
                { name: "Men's", path: '/category/mens' },
                { name: "Women's", path: '/category/womens' },
                { name: 'Jewelry', path: '/category/jewelry' },
                { name: 'Perfume', path: '/category/perfume' },
                { name: 'Blog', path: '#' },
                { name: 'Hot Offers', path: '#' }
              ].map((item, i) => (
                <li key={i} className="group relative py-4">
                  <Link to={item.path} className="text-sm font-bold text-zinc-700 uppercase tracking-wider group-hover:text-pink-400 transition-colors">
                    {item.name}
                  </Link>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      {/* --- Footer --- */}
      <footer className="bg-zinc-900 text-zinc-400 pt-16 pb-20 md:pb-8">
        <div className="container mx-auto px-4">
          {/* Brand Directory */}
          <div className="pb-12 border-b border-zinc-800 mb-12">
            <h2 className="text-pink-400 text-sm font-bold uppercase tracking-widest mb-6">Brand directory</h2>
            <div className="space-y-4">
              {[
                { label: "Fashion", items: ["T-shirt", "Shirts", "shorts & jeans", "jacket", "dress & frock", "innerwear", "hosiery"] },
                { label: "Footwear", items: ["sport", "formal", "Boots", "casual", "cowboy shoes", "safety shoes", "Party wear shoes"] },
                { label: "Jewellery", items: ["Necklace", "Earrings", "Couple rings", "Pendants", "Crystal", "Bangles", "bracelets"] }
              ].map((dir, i) => (
                <div key={i} className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <h3 className="text-[10px] font-bold uppercase text-zinc-500">{dir.label} :</h3>
                  {dir.items.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <a href="#" className="text-xs hover:text-white transition-colors capitalize">{item}</a>
                      {idx < dir.items.length - 1 && <span className="text-zinc-700">|</span>}
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Nav */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            {[
              { title: "Popular Categories", items: ["Fashion", "Electronic", "Cosmetic", "Health", "Watches"] },
              { title: "Products", items: ["Prices drop", "New products", "Best sales", "Contact us", "Sitemap"] },
              { title: "Our Company", items: ["Delivery", "Legal Notice", "Terms and conditions", "About us", "Secure payment"] },
              { title: "Admin", items: [{ name: "Admin Dashboard", path: "/admin" }] },
              { title: "Services", items: ["Prices drop", "New products", "Best sales", "Contact us", "Sitemap"] }
            ].map((nav, i) => (
              <div key={i}>
                <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6 relative pb-2 inline-block">
                  {nav.title}
                  <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-pink-400" />
                </h4>
                <ul className="space-y-3">
                  {nav.items.map((item, idx) => (
                    <li key={idx}>
                      {typeof item === 'string' ? (
                        <a href="#" className="text-xs hover:text-pink-400 transition-colors">{item}</a>
                      ) : (
                        <Link to={item.path} className="text-xs hover:text-pink-400 transition-colors">{item.name}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6 relative pb-2 inline-block">
                Contact
                <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-pink-400" />
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="text-zinc-500 flex-shrink-0" />
                  <address className="text-xs not-italic leading-relaxed">419 State 414 Rte Beaver Dams, New York(NY), 14812, USA</address>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={20} className="text-zinc-500 flex-shrink-0" />
                  <a href="tel:+6079368058" className="text-xs hover:text-pink-400 transition-colors">(607) 936-8058</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={20} className="text-zinc-500 flex-shrink-0" />
                  <a href="mailto:example@gmail.com" className="text-xs hover:text-pink-400 transition-colors">example@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-zinc-800 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] font-medium">
              Copyright © <a href="#" className="text-white hover:text-pink-400 transition-colors">SwiftCart</a> all rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-zinc-100 px-4 py-2 flex justify-between items-center z-40 shadow-[0_-4px_15px_rgba(0,0,0,0.08)]">
        <button onClick={() => setIsMobileMenuOpen(true)} className="flex flex-col items-center gap-1 p-2 text-zinc-500 hover:text-pink-400 transition-colors">
          <Menu size={20} />
          <span className="text-[10px] font-medium">Menu</span>
        </button>
        <button 
          onClick={() => navigate('/cart')}
          className="relative flex flex-col items-center gap-1 p-2 text-zinc-500 hover:text-pink-400 transition-colors"
        >
          <ShoppingBag size={20} />
          <span className="absolute top-1.5 right-3 w-4 h-4 bg-pink-400 text-white text-[8px] font-bold flex items-center justify-center rounded-full">{totalItems}</span>
          <span className="text-[10px] font-medium">Cart</span>
        </button>
        <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1 p-2 text-zinc-500 hover:text-pink-400 transition-colors">
          <Search size={20} />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button className="relative flex flex-col items-center gap-1 p-2 text-zinc-500 hover:text-pink-400 transition-colors">
          <Heart size={20} />
          <span className="absolute top-1.5 right-3 w-4 h-4 bg-pink-400 text-white text-[8px] font-bold flex items-center justify-center rounded-full">{wishlistCount}</span>
          <span className="text-[10px] font-medium">Wishlist</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-zinc-500 hover:text-pink-400 transition-colors">
          <User size={20} />
          <span className="text-[10px] font-medium">Account</span>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white z-50 p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black text-pink-400">MENU</h2>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-900"><X size={24} /></button>
              </div>
              <ul className="space-y-4">
                {[
                  { name: 'Home', path: '/' },
                  { name: "Men's", path: '/category/mens' },
                  { name: "Women's", path: '/category/womens' },
                  { name: 'Jewelry', path: '/category/jewelry' },
                  { name: 'Perfume', path: '/category/perfume' },
                  { name: 'Blog', path: '#' },
                  { name: 'Hot Offers', path: '#' }
                ].map((item, i) => (
                  <li key={i} className="border-b border-zinc-50 pb-4">
                    <Link 
                      to={item.path} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm font-bold text-zinc-700 uppercase tracking-wider block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
