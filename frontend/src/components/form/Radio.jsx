import React from 'react';

const Radio = ({
  label,
  name,
  value,
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
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
            error ? 'border-red-500' : ''
          }`}
          data-testid={`radio-${name}-${value}`}
          {...props}
        />
        <span className={`text-sm ${
          disabled ? 'text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'
        }`}>
          {label}
        </span>
      </label>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 ml-6" data-testid={`radio-error-${name}`}>
          {error}
        </p>
      )}
    </div>
  );
};

// Radio Group component for managing multiple radio buttons
export const RadioGroup = ({ name, options, value, onChange, error = '', className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`} data-testid={`radio-group-${name}`}>
      {options.map((option) => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          checked={value === option.value}
          onChange={() => onChange(option.value)}
          disabled={option.disabled}
        />
      ))}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400" data-testid={`radio-group-error-${name}`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Radio;
