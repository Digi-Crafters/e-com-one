'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCart, clearCart, getWhatsAppUrl, type CartItem } from '@/utils/cart';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<{ items: CartItem[]; total: number; itemCount: number }>({ 
    items: [], 
    total: 0, 
    itemCount: 0 
  });

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/categories' },
    { name: 'Products', href: '/products' },
    { name: 'Our Story', href: '/#our-story' },
    { name: 'Contact', href: '/#footer' },
  ];

  // Update cart when component mounts and when cart changes
  useEffect(() => {
    const updateCart = () => {
      setCart(getCart());
    };

    updateCart();

    // Listen for cart updates from other components
    const handleStorageChange = () => {
      updateCart();
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom event for cart updates within the same window
    window.addEventListener('cartUpdated', updateCart);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', updateCart);
    };
  }, []);

  const handleWhatsAppOrder = () => {
    const whatsappUrl = getWhatsAppUrl('8957066090'); // Replace with your WhatsApp number
    window.open(whatsappUrl, '_blank');
    setIsCartOpen(false);
  };

  const handleClearCart = () => {
    clearCart();
    setCart(getCart());
    // Dispatch event to update other components
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (productId: string) => {
    const cart = getCart();
    const updatedItems = cart.items.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    setCart(getCart());
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(productId);
      return;
    }

    const cart = getCart();
    const item = cart.items.find(item => item.id === productId);
    if (item && newQuantity <= item.stock) {
      item.quantity = newQuantity;
      localStorage.setItem('cart', JSON.stringify(cart.items));
      setCart(getCart());
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link href="/" className="text-2xl font-bold text-gray-900 tracking-tight">
              KASHORA
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ y: -2 }}
                className="text-gray-700 hover:text-emerald-600 font-medium text-sm transition-colors duration-200 relative group"
              >
                {item.name}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"
                  initial={false}
                />
              </motion.a>
            ))}
          </nav>

          {/* Desktop Right Section - Cart & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center space-x-4"
          >
            {/* Cart Icon */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 transition-colors duration-200 relative"
                aria-label="Shopping cart"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cart.itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                  >
                    {cart.itemCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Cart Dropdown */}
              <AnimatePresence>
                {isCartOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Your Cart</h3>
                        {cart.items.length > 0 && (
                          <button
                            onClick={handleClearCart}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Clear All
                          </button>
                        )}
                      </div>

                      {cart.items.length === 0 ? (
                        <div className="text-center py-8">
                          <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <p className="text-gray-500 text-sm">Your cart is empty</p>
                        </div>
                      ) : (
                        <>
                          <div className="max-h-64 overflow-y-auto space-y-3">
                            {cart.items.map((item) => (
                              <div key={item.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                                {item.images && item.images.length > 0 && (
                                  <img
                                    src={item.images[0]}
                                    alt={item.name}
                                    className="w-10 h-10 rounded object-cover"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <Link href={`/products/${item.id}`} className="text-sm font-medium text-gray-900 truncate">{item.name}</Link>
                                  <p className="text-sm text-gray-500">${item.price} x {item.quantity}</p>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:bg-gray-100"
                                  >
                                    -
                                  </button>
                                  <span className="text-sm w-6 text-center">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    disabled={item.quantity >= item.stock}
                                    className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                                  >
                                    +
                                  </button>
                                </div>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-red-500 hover:text-red-700 p-1"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>

                          <div className="border-t border-gray-200 pt-4 mt-4">
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-lg font-semibold text-gray-900">Total:</span>
                              <span className="text-lg font-bold text-emerald-600">${cart.total.toFixed(2)}</span>
                            </div>
                            <button
                              onClick={handleWhatsAppOrder}
                              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                            >
                              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.262-6.209-3.553-8.485"/>
                              </svg>
                              Order via WhatsApp
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current block transition-transform duration-200"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-current block transition-opacity duration-200"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current block transition-transform duration-200"
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4 border-t border-gray-200">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 px-4 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </motion.a>
                ))}
                
                {/* Mobile Cart Summary */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Cart Items: {cart.itemCount}</span>
                    <span className="text-sm font-semibold text-emerald-600">${cart.total.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={handleWhatsAppOrder}
                    disabled={cart.items.length === 0}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.262-6.209-3.553-8.485"/>
                    </svg>
                    Order via WhatsApp ({cart.itemCount})
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;