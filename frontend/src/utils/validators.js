// Validation utility functions

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password (min 6 characters)
export const isValidPassword = (password) => {
  return password.length >= 6;
};

// Validate phone number
export const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
};

// Validate zip code (US)
export const isValidZipCode = (zipCode) => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
};

// Validate required field
export const isRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

// Validate minimum length
export const minLength = (value, min) => {
  return value.length >= min;
};

// Validate maximum length
export const maxLength = (value, max) => {
  return value.length <= max;
};

// Validate number range
export const isInRange = (value, min, max) => {
  return value >= min && value <= max;
};

// Validate coupon code format
export const isValidCouponCode = (code) => {
  return /^[A-Z0-9]{4,15}$/.test(code);
};
