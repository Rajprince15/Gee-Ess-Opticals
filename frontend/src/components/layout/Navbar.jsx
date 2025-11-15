import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';

const Navbar = ({ onSearch }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const cartCount = getTotalItems();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch && onSearch(searchQuery);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2" data-testid="logo-link">
              <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xl font-bold text-gray-900 dark:text-white">EyeWear</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="/products" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 smooth-transition" data-testid="nav-products">
                Products
              </a>
              <a href="/categories" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 smooth-transition" data-testid="nav-categories">
                Categories
              </a>
              <a href="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 smooth-transition" data-testid="nav-about">
                About
              </a>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for eyewear..."
                  className="input pr-10"
                  data-testid="search-input"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 smooth-transition"
                  data-testid="search-button"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg smooth-transition"
              data-testid="theme-toggle"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Wishlist */}
            <a
              href="/wishlist"
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg smooth-transition"
              data-testid="wishlist-link"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" data-testid="wishlist-count">
                  {wishlistCount}
                </span>
              )}
            </a>

            {/* Cart */}
            <a
              href="/cart"
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg smooth-transition"
              data-testid="cart-link"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" data-testid="cart-count">
                  {cartCount}
                </span>
              )}
            </a>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg smooth-transition"
                  data-testid="user-menu-button"
                >
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2" data-testid="user-menu">
                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Profile
                    </a>
                    <a href="/orders" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Orders
                    </a>
                    {user?.role === 'admin' && (
                      <a href="/admin" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Admin Dashboard
                      </a>
                    )}
                    <hr className="my-2 border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      data-testid="logout-button"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button variant="primary" size="sm" data-testid="login-button">
                <a href="/login">Login</a>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              data-testid="mobile-menu-button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700" data-testid="mobile-menu">
          <div className="px-4 py-4 space-y-3">
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="input"
              />
            </form>
            <a href="/products" className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 py-2">
              Products
            </a>
            <a href="/categories" className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 py-2">
              Categories
            </a>
            <a href="/about" className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 py-2">
              About
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
