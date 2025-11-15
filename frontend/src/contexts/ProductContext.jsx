import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProducts, searchProducts as apiSearchProducts } from '../services/api';
import { storage, STORAGE_KEYS } from '../utils/localStorage';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    brands: [],
    frameTypes: [],
    frameShapes: [],
    colors: [],
    minPrice: 0,
    maxPrice: 500,
    search: '',
    sortBy: '',
  });
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    return storage.get(STORAGE_KEYS.RECENTLY_VIEWED, []);
  });

  useEffect(() => {
    storage.set(STORAGE_KEYS.RECENTLY_VIEWED, recentlyViewed);
  }, [recentlyViewed]);

  const fetchProducts = async (customFilters = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProducts(customFilters || filters);
      if (response.success) {
        setProducts(response.data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const applyFilters = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    fetchProducts(updatedFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      category: 'all',
      brands: [],
      frameTypes: [],
      frameShapes: [],
      colors: [],
      minPrice: 0,
      maxPrice: 500,
      search: '',
      sortBy: '',
    };
    setFilters(defaultFilters);
    fetchProducts(defaultFilters);
  };

  const searchProducts = async (query) => {
    if (!query.trim()) return [];
    try {
      const response = await apiSearchProducts(query);
      return response.success ? response.data : [];
    } catch (err) {
      return [];
    }
  };

  const addToRecentlyViewed = (productId) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 10); // Keep last 10
    });
  };

  const getRecentlyViewedProducts = () => {
    return recentlyViewed
      .map(id => products.find(p => p.id === id))
      .filter(Boolean);
  };

  const value = {
    products,
    loading,
    error,
    filters,
    applyFilters,
    resetFilters,
    fetchProducts,
    searchProducts,
    addToRecentlyViewed,
    recentlyViewed,
    getRecentlyViewedProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
