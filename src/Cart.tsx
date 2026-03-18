import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from './context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={40} className="text-zinc-300" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-800 mb-2">Your cart is empty</h2>
        <p className="text-zinc-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-8 py-3 bg-pink-400 text-white font-bold rounded-xl hover:bg-zinc-900 transition-colors uppercase tracking-wider text-sm"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-zinc-900 mb-8 uppercase tracking-tighter">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-6 border border-zinc-100 rounded-2xl bg-white hover:shadow-md transition-shadow">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-24 h-24 object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-zinc-800 mb-1">{item.title}</h3>
                <p className="text-sm text-zinc-400 mb-4">Unit Price: ${item.price.toFixed(2)}</p>
                <div className="flex items-center justify-center sm:justify-start gap-4">
                  <div className="flex items-center border border-zinc-100 rounded-lg">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 hover:text-pink-400 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 hover:text-pink-400 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-zinc-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-zinc-900">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="p-8 border border-zinc-100 rounded-3xl bg-zinc-50 sticky top-32">
            <h2 className="text-xl font-bold text-zinc-900 mb-6 uppercase tracking-wider">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm text-zinc-500">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-bold text-zinc-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-zinc-500">
                <span>Shipping</span>
                <span className="text-emerald-500 font-bold uppercase">Free</span>
              </div>
              <div className="pt-4 border-t border-zinc-200 flex justify-between">
                <span className="text-lg font-bold text-zinc-900">Total</span>
                <span className="text-2xl font-black text-pink-400">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-pink-400 transition-colors uppercase tracking-widest text-sm shadow-xl"
            >
              Proceed to Checkout
            </button>
            <p className="text-[10px] text-zinc-400 text-center mt-4 uppercase tracking-widest">
              Secure checkout powered by SwiftCart
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
