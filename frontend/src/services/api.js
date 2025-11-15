// Mock API Service Layer
// All functions currently use mock data from JSON files
// Easy to swap with real backend API calls later

import productsData from '../mock/products.json';
import usersData from '../mock/users.json';
import couponsData from '../mock/coupons.json';
import ordersData from '../mock/orders.json';
import reviewsData from '../mock/reviews.json';
import addressesData from '../mock/addresses.json';

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// ========== PRODUCT APIs ==========

export const getProducts = async (filters = {}) => {
  await delay(300);
  let products = [...productsData];

  // Apply filters
  if (filters.category && filters.category !== 'all') {
    products = products.filter(p => p.category === filters.category);
  }
  if (filters.brands && filters.brands.length > 0) {
    products = products.filter(p => filters.brands.includes(p.brand));
  }
  if (filters.frameTypes && filters.frameTypes.length > 0) {
    products = products.filter(p => filters.frameTypes.includes(p.frame_type));
  }
  if (filters.frameShapes && filters.frameShapes.length > 0) {
    products = products.filter(p => filters.frameShapes.includes(p.frame_shape));
  }
  if (filters.colors && filters.colors.length > 0) {
    products = products.filter(p => filters.colors.includes(p.color));
  }
  if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
    products = products.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);
  }
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.brand.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    );
  }

  // Apply sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        // Mock: just reverse order
        products.reverse();
        break;
      default:
        break;
    }
  }

  return { success: true, data: products };
};

export const getProductById = async (id) => {
  await delay(300);
  const product = productsData.find(p => p.id === id);
  if (!product) {
    return { success: false, error: 'Product not found' };
  }
  return { success: true, data: product };
};

export const searchProducts = async (query) => {
  await delay(200);
  const searchLower = query.toLowerCase();
  const results = productsData.filter(p => 
    p.name.toLowerCase().includes(searchLower) ||
    p.brand.toLowerCase().includes(searchLower)
  ).slice(0, 5); // Limit to 5 results for autocomplete
  return { success: true, data: results };
};

// ========== USER / AUTH APIs ==========

export const login = async (email, password) => {
  await delay(500);
  const user = usersData.find(u => u.email === email && u.password === password);
  if (!user) {
    return { success: false, error: 'Invalid email or password' };
  }
  // Don't return password
  const { password: _, ...userWithoutPassword } = user;
  return { success: true, data: userWithoutPassword };
};

export const register = async (userData) => {
  await delay(500);
  // Check if email already exists
  const existingUser = usersData.find(u => u.email === userData.email);
  if (existingUser) {
    return { success: false, error: 'Email already exists' };
  }
  // Mock: create new user
  const newUser = {
    id: `user-${Date.now()}`,
    ...userData,
    role: 'user',
    created_at: new Date().toISOString(),
  };
  const { password: _, ...userWithoutPassword } = newUser;
  return { success: true, data: userWithoutPassword };
};

export const updateUser = async (userId, userData) => {
  await delay(300);
  // Mock: just return updated data
  return { success: true, data: { id: userId, ...userData } };
};

// ========== CART APIs (mock - actual cart managed in context) ==========

export const getCart = async (userId) => {
  await delay(200);
  // Cart managed in localStorage via context
  return { success: true, data: [] };
};

export const addToCart = async (userId, productId, quantity = 1) => {
  await delay(200);
  return { success: true, message: 'Added to cart' };
};

export const updateCartItem = async (userId, productId, quantity) => {
  await delay(200);
  return { success: true, message: 'Cart updated' };
};

export const removeFromCart = async (userId, productId) => {
  await delay(200);
  return { success: true, message: 'Removed from cart' };
};

// ========== WISHLIST APIs (mock - managed in context) ==========

export const getWishlist = async (userId) => {
  await delay(200);
  return { success: true, data: [] };
};

export const addToWishlist = async (userId, productId) => {
  await delay(200);
  return { success: true, message: 'Added to wishlist' };
};

export const removeFromWishlist = async (userId, productId) => {
  await delay(200);
  return { success: true, message: 'Removed from wishlist' };
};

// ========== ORDER APIs ==========

export const getOrders = async (userId) => {
  await delay(300);
  const userOrders = ordersData.filter(o => o.user_id === userId);
  return { success: true, data: userOrders };
};

export const getOrderById = async (orderId) => {
  await delay(300);
  const order = ordersData.find(o => o.id === orderId);
  if (!order) {
    return { success: false, error: 'Order not found' };
  }
  return { success: true, data: order };
};

export const createOrder = async (orderData) => {
  await delay(500);
  const newOrder = {
    id: `order-${Date.now()}`,
    ...orderData,
    payment_status: 'paid',
    order_status: 'processing',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tracking: [
      {
        id: `track-${Date.now()}`,
        status: 'Order Placed',
        description: 'Your order has been confirmed',
        location: 'Processing',
        created_at: new Date().toISOString(),
      },
    ],
  };
  return { success: true, data: newOrder };
};

// ========== COUPON APIs ==========

export const validateCoupon = async (code) => {
  await delay(300);
  const coupon = couponsData.find(c => 
    c.code.toLowerCase() === code.toLowerCase() && 
    c.is_active && 
    new Date(c.valid_until) > new Date()
  );
  if (!coupon) {
    return { success: false, error: 'Invalid or expired coupon code' };
  }
  return { success: true, data: coupon };
};

export const getCoupons = async () => {
  await delay(200);
  return { success: true, data: couponsData };
};

// ========== REVIEW APIs ==========

export const getProductReviews = async (productId) => {
  await delay(200);
  const reviews = reviewsData.filter(r => r.product_id === productId);
  return { success: true, data: reviews };
};

export const addReview = async (reviewData) => {
  await delay(300);
  const newReview = {
    id: `review-${Date.now()}`,
    ...reviewData,
    created_at: new Date().toISOString(),
  };
  return { success: true, data: newReview };
};

// ========== ADDRESS APIs ==========

export const getAddresses = async (userId) => {
  await delay(200);
  const userAddresses = addressesData.filter(a => a.user_id === userId);
  return { success: true, data: userAddresses };
};

export const addAddress = async (addressData) => {
  await delay(300);
  const newAddress = {
    id: `addr-${Date.now()}`,
    ...addressData,
  };
  return { success: true, data: newAddress };
};

export const updateAddress = async (addressId, addressData) => {
  await delay(300);
  return { success: true, data: { id: addressId, ...addressData } };
};

export const deleteAddress = async (addressId) => {
  await delay(200);
  return { success: true, message: 'Address deleted' };
};

// ========== ADMIN APIs ==========

export const getAllProducts = async () => {
  await delay(300);
  return { success: true, data: productsData };
};

export const createProduct = async (productData) => {
  await delay(400);
  const newProduct = {
    id: `prod-${Date.now()}`,
    ...productData,
    stock: productData.stock || 100,
    rating: 0,
    review_count: 0,
  };
  return { success: true, data: newProduct };
};

export const updateProduct = async (productId, productData) => {
  await delay(300);
  return { success: true, data: { id: productId, ...productData } };
};

export const deleteProduct = async (productId) => {
  await delay(300);
  return { success: true, message: 'Product deleted' };
};

export const getAllOrders = async () => {
  await delay(300);
  return { success: true, data: ordersData };
};

export const updateOrderStatus = async (orderId, status) => {
  await delay(300);
  return { success: true, message: 'Order status updated' };
};
