import React from 'react';
import ProductCard from './ProductCard';
import Skeleton from '../ui/Skeleton';

const ProductGrid = ({ products, loading, onQuickView, emptyMessage = 'No products found' }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="product-grid-loading">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-4">
            <Skeleton variant="rect" className="h-48" />
            <Skeleton variant="text" />
            <Skeleton variant="text" className="w-1/2" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12" data-testid="product-grid-empty">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">{emptyMessage}</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your filters or search criteria.</p>
      </div>
    );
  }

  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      data-testid="product-grid"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
