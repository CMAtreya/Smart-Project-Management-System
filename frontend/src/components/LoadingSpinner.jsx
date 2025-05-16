import React from 'react';

const LoadingSpinner = ({ size = 'medium', fullScreen = false }) => {
  const sizeClasses = {
    small: 'h-6 w-6 border-2',
    medium: 'h-12 w-12 border-2',
    large: 'h-16 w-16 border-3'
  };

  const spinnerClasses = `animate-spin rounded-full border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent ${sizeClasses[size]}`;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-50">
        <div className={spinnerClasses}></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className={spinnerClasses}></div>
    </div>
  );
};

export default LoadingSpinner;