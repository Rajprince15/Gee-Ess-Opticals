import React, { useState, useEffect } from 'react';

const PriceSlider = ({ min = 0, max = 500, value = { min: 0, max: 500 }, onChange }) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMinChange = (e) => {
    const newMin = Number(e.target.value);
    if (newMin <= localValue.max) {
      const newValue = { ...localValue, min: newMin };
      setLocalValue(newValue);
      onChange && onChange(newValue);
    }
  };

  const handleMaxChange = (e) => {
    const newMax = Number(e.target.value);
    if (newMax >= localValue.min) {
      const newValue = { ...localValue, max: newMax };
      setLocalValue(newValue);
      onChange && onChange(newValue);
    }
  };

  const minPercent = ((localValue.min - min) / (max - min)) * 100;
  const maxPercent = ((localValue.max - min) / (max - min)) * 100;

  return (
    <div className="space-y-4" data-testid="price-slider">
      {/* Range Display */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900 dark:text-white">${localValue.min}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">-</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">${localValue.max}</span>
        </div>
      </div>

      {/* Slider Track */}
      <div className="relative h-2">
        {/* Background Track */}
        <div className="absolute w-full h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
        
        {/* Active Track */}
        <div
          className="absolute h-2 bg-primary-600 rounded"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        ></div>

        {/* Min Slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={localValue.min}
          onChange={handleMinChange}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none"
          style={{
            zIndex: localValue.min > max - 100 ? 5 : 3,
          }}
          data-testid="price-slider-min"
        />

        {/* Max Slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={localValue.max}
          onChange={handleMaxChange}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none"
          style={{
            zIndex: 4,
          }}
          data-testid="price-slider-max"
        />
      </div>

      {/* Min/Max Labels */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>${min}</span>
        <span>${max}</span>
      </div>

      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          pointer-events: all;
          width: 20px;
          height: 20px;
          background-color: #0284c7;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        input[type='range']::-moz-range-thumb {
          pointer-events: all;
          width: 20px;
          height: 20px;
          background-color: #0284c7;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default PriceSlider;
