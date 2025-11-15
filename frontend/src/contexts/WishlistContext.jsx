import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage, STORAGE_KEYS } from '../utils/localStorage';
import productsData from '../mock/products.json';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    return storage.get(STORAGE_KEYS.WISHLIST, []);
  });

  useEffect(() => {
    storage.set(STORAGE_KEYS.WISHLIST, wishlistItems);
  }, [wishlistItems]);

  const addToWishlist = (productId) => {
    setWishlistItems(prev => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(id => id !== productId));
  };

  const toggleWishlist = (productId) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const getWishlistItemsWithDetails = () => {
    return wishlistItems
      .map(productId => productsData.find(p => p.id === productId))
      .filter(Boolean); // Filter out undefined products
  };

  const isInWishlist = (productId) => {
    return wishlistItems.includes(productId);
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    getWishlistItemsWithDetails,
    isInWishlist,
    count: wishlistItems.length,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
