import React, { useState } from 'react';
import Button from '../ui/Button';

const ProductFilter = ({ filters, onApplyFilters, onResetFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const brands = ['Ray-Ban', 'Oakley', 'Prada', 'Gucci', 'Versace', 'Tom Ford'];
  const frameTypes = ['Full Rim', 'Half Rim', 'Rimless'];
  const frameShapes = ['Rectangle', 'Round', 'Square', 'Cat-Eye', 'Aviator', 'Wayfarer'];
  const colors = ['Black', 'Brown', 'Blue', 'Gold', 'Silver', 'Transparent'];

  const handleCheckboxChange = (filterType, value) => {
    setLocalFilters(prev => {
      const currentValues = prev[filterType] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [filterType]: newValues };
    });
  };

  const handlePriceChange = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: Number(value) }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
  };

  const handleReset = () => {
    const resetFilters = {
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
    setLocalFilters(resetFilters);
    onResetFilters();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6" data-testid="product-filter">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
        <button
          onClick={handleReset}
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
          data-testid="reset-filters-button"
        >
          Reset All
        </button>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 dark:text-white">Price Range</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max="500"
              value={localFilters.minPrice}
              onChange={(e) => handlePriceChange('minPrice', e.target.value)}
              className="input text-sm"
              placeholder="Min"
              data-testid="price-min-input"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              min="0"
              max="500"
              value={localFilters.maxPrice}
              onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
              className="input text-sm"
              placeholder="Max"
              data-testid="price-max-input"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>${localFilters.minPrice}</span>
            <span>${localFilters.maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 dark:text-white">Brands</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer" data-testid={`brand-filter-${brand}`}>
              <input
                type="checkbox"
                checked={(localFilters.brands || []).includes(brand)}
                onChange={() => handleCheckboxChange('brands', brand)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Frame Types */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 dark:text-white">Frame Type</h4>
        <div className="space-y-2">
          {frameTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer" data-testid={`frame-type-filter-${type}`}>
              <input
                type="checkbox"
                checked={(localFilters.frameTypes || []).includes(type)}
                onChange={() => handleCheckboxChange('frameTypes', type)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Frame Shapes */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 dark:text-white">Frame Shape</h4>
        <div className="space-y-2">
          {frameShapes.map((shape) => (
            <label key={shape} className="flex items-center gap-2 cursor-pointer" data-testid={`frame-shape-filter-${shape}`}>
              <input
                type="checkbox"
                checked={(localFilters.frameShapes || []).includes(shape)}
                onChange={() => handleCheckboxChange('frameShapes', shape)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{shape}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 dark:text-white">Color</h4>
        <div className="space-y-2">
          {colors.map((color) => (
            <label key={color} className="flex items-center gap-2 cursor-pointer" data-testid={`color-filter-${color}`}>
              <input
                type="checkbox"
                checked={(localFilters.colors || []).includes(color)}
                onChange={() => handleCheckboxChange('colors', color)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{color}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <Button
        variant="primary"
        className="w-full"
        onClick={handleApply}
        data-testid="apply-filters-button"
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default ProductFilter;
