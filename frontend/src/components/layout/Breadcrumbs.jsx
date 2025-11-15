import React from 'react';

const Breadcrumbs = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb" data-testid="breadcrumbs">
      {/* Home */}
      <a
        href="/"
        className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 smooth-transition"
        data-testid="breadcrumb-home"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </a>

      {/* Breadcrumb Items */}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <React.Fragment key={index}>
            {/* Separator */}
            <svg className="w-4 h-4 text-gray-400 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>

            {/* Item */}
            {isLast ? (
              <span
                className="text-gray-900 dark:text-white font-medium"
                data-testid={`breadcrumb-item-${index}`}
              >
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 smooth-transition"
                data-testid={`breadcrumb-item-${index}`}
              >
                {item.label}
              </a>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
