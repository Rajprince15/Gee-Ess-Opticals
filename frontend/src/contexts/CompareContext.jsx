import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage, STORAGE_KEYS } from '../utils/localStorage';
import productsData from '../mock/products.json';

const CompareContext = createContext();

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within CompareProvider');
  }
  return context;
};

const MAX_COMPARE_ITEMS = 3;

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState(() => {
    return storage.get(STORAGE_KEYS.COMPARE, []);
  });

  useEffect(() => {
    storage.set(STORAGE_KEYS.COMPARE, compareItems);
  }, [compareItems]);

  const addToCompare = (productId) => {
    setCompareItems(prev => {
      if (prev.includes(productId)) return prev;
      if (prev.length >= MAX_COMPARE_ITEMS) {
        return prev; // Don't add if already at max
      }
      return [...prev, productId];
    });
  };

  const removeFromCompare = (productId) => {
    setCompareItems(prev => prev.filter(id => id !== productId));
  };

  const toggleCompare = (productId) => {
    if (isInCompare(productId)) {
      removeFromCompare(productId);
    } else {
      addToCompare(productId);
    }
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  const getCompareItemsWithDetails = () => {
    return compareItems
      .map(productId => productsData.find(p => p.id === productId))
      .filter(Boolean);
  };

  const isInCompare = (productId) => {
    return compareItems.includes(productId);
  };

  const canAddMore = () => {
    return compareItems.length < MAX_COMPARE_ITEMS;
  };

  const value = {
    compareItems,
    addToCompare,
    removeFromCompare,
    toggleCompare,
    clearCompare,
    getCompareItemsWithDetails,
    isInCompare,
    canAddMore,
    count: compareItems.length,
    maxItems: MAX_COMPARE_ITEMS,
  };

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
};
