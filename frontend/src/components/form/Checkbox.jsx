import React from 'react';

const Checkbox = ({
  label,
  name,
  checked = false,
  onChange,
  disabled = false,
  error = '',
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
            error ? 'border-red-500' : ''
          }`}
          data-testid={`checkbox-${name}`}
          {...props}
        />
        <span className={`text-sm ${
          disabled ? 'text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'
        }`}>
          {label}
        </span>
      </label>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 ml-6" data-testid={`checkbox-error-${name}`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Checkbox;
