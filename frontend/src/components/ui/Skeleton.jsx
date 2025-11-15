import React from 'react';

const Skeleton = ({ className = '', variant = 'default' }) => {
  const variants = {
    default: 'h-4 w-full',
    circle: 'h-12 w-12 rounded-full',
    rect: 'h-32 w-full',
    text: 'h-4 w-3/4',
  };

  return (
    <div className={`skeleton rounded ${variants[variant]} ${className}`}></div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-4">
      <Skeleton variant="rect" className="h-48" />
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-1/2" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
};

export default Skeleton;
