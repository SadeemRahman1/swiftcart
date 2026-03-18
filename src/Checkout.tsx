import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, CreditCard, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from './context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h2 className="text-3xl font-black text-zinc-900 mb-4 uppercase tracking-tighter">Order Placed Successfully!</h2>
        <p className="text-zinc-500 mb-8 max-w-md mx-auto">
          Thank you for your purchase. Your order has been received and is being processed. 
          You will receive an email confirmation shortly.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-zinc-900 text-white font-bold rounded-xl hover:bg-pink-400 transition-colors uppercase tracking-wider text-sm"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/cart')} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-black text-zinc-900 uppercase tracking-tighter">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
        {/* Checkout Form */}
        <div className="flex-1 space-y-8">
          {/* Shipping Info */}
          <section className="p-8 border border-zinc-100 rounded-3xl bg-white shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-pink-50 text-pink-400 rounded-lg">
                <Truck size={20} />
              </div>
              <h2 className="text-xl font-bold text-zinc-900 uppercase tracking-wider">Shipping Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">First Name</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Last Name</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Address</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">City</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Postal Code</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all" />
              </div>
            </div>
          </section>

          {/* Payment Info */}
          <section className="p-8 border border-zinc-100 rounded-3xl bg-white shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-50 text-pink-400 rounded-lg">
                  <CreditCard size={20} />
                </div>
                <h2 className="text-xl font-bold text-zinc-900 uppercase tracking-wider">Payment Method</h2>
              </div>
              <div className="flex gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 opacity-50" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Card Number</label>
                <input required type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 rounded-xl border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Expiry Date</label>
                  <input required type="text" placeholder="MM/YY" className="w-full px-4 py-3 rounded-xl border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">CVV</label>
                  <input required type="text" placeholder="000" className="w-full px-4 py-3 rounded-xl border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="p-8 border border-zinc-100 rounded-3xl bg-zinc-50 sticky top-32">
            <h2 className="text-xl font-bold text-zinc-900 mb-6 uppercase tracking-wider">Your Order</h2>
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 scrollbar-hide">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="text-xs font-bold text-zinc-800 truncate max-w-[120px]">{item.title}</p>
                      <p className="text-[10px] text-zinc-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-zinc-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3 mb-8 pt-6 border-t border-zinc-200">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Subtotal</span>
                <span className="font-bold text-zinc-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Shipping</span>
                <span className="text-emerald-500 font-bold uppercase">Free</span>
              </div>
              <div className="pt-4 border-t border-zinc-200 flex justify-between">
                <span className="text-lg font-bold text-zinc-900">Total</span>
                <span className="text-2xl font-black text-pink-400">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              disabled={isProcessing}
              className="w-full py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-pink-400 transition-colors uppercase tracking-widest text-sm shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Processing...
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Complete Purchase
                </>
              )}
            </button>
            <p className="text-[10px] text-zinc-400 text-center mt-4 uppercase tracking-widest">
              Your data is encrypted and secure
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
