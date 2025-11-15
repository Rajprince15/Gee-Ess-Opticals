import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage, STORAGE_KEYS } from '../utils/localStorage';
import productsData from '../mock/products.json';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    return storage.get(STORAGE_KEYS.CART, []);
  });

  useEffect(() => {
    storage.set(STORAGE_KEYS.CART, cartItems);
  }, [cartItems]);

  const addToCart = (productId, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.productId === productId);
      if (existingItem) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId, quantity, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartItemsWithDetails = () => {
    return cartItems.map(item => {
      const product = productsData.find(p => p.id === item.productId);
      return {
        ...item,
        product,
      };
    }).filter(item => item.product); // Filter out products that don't exist
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const product = productsData.find(p => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item.productId === productId);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemsWithDetails,
    getTotalPrice,
    getTotalItems,
    isInCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
