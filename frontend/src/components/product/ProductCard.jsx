import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCompare } from '../../contexts/CompareContext';
import Button from '../ui/Button';

const ProductCard = ({ product, onQuickView }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toggleCompare, isInCompare, canAddMore } = useCompare();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product.id);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleToggleCompare = (e) => {
    e.stopPropagation();
    if (!isInCompare(product.id) && !canAddMore()) {
      alert('You can only compare up to 3 products');
      return;
    }
    toggleCompare(product.id);
  };

  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);
  const inCart = isInCart(product.id);

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md card-hover overflow-hidden group"
      data-testid={`product-card-${product.id}`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700 h-64">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
          data-testid="product-image"
        />
        
        {/* Stock Badge */}
        {product.stock === 0 && (
          <div className="absolute top-2 left-2">
            <span className="badge-error">Out of Stock</span>
          </div>
        )}
        
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-2 right-2">
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              {product.discount}% OFF
            </span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute bottom-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 smooth-transition">
          <button
            onClick={handleToggleWishlist}
            className={`p-2 rounded-full ${
              inWishlist ? 'bg-red-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            } shadow-md hover:shadow-lg smooth-transition`}
            data-testid="wishlist-toggle"
            title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg className="w-5 h-5" fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          
          <button
            onClick={handleToggleCompare}
            className={`p-2 rounded-full ${
              inCompare ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            } shadow-md hover:shadow-lg smooth-transition`}
            data-testid="compare-toggle"
            title={inCompare ? 'Remove from compare' : 'Add to compare'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Brand */}
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide" data-testid="product-brand">
          {product.brand}
        </p>
        
        {/* Name */}
        <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2" data-testid="product-name">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center" data-testid="product-rating">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">({product.review_count || 0})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900 dark:text-white" data-testid="product-price">
            ${product.price}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ${(product.price / (1 - product.discount / 100)).toFixed(2)}
            </span>
          )}
        </div>

        {/* Frame Type & Shape */}
        <div className="flex gap-2 text-xs text-gray-600 dark:text-gray-400">
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{product.frame_type}</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{product.frame_shape}</span>
        </div>

        {/* Add to Cart Button */}
        <Button
          variant={inCart ? 'secondary' : 'primary'}
          className="w-full"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          data-testid="add-to-cart-button"
        >
          {product.stock === 0 ? 'Out of Stock' : inCart ? 'Added to Cart' : 'Add to Cart'}
        </Button>

        {/* Quick View */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline"
            data-testid="quick-view-button"
          >
            Quick View
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
