// src/components/Badge.jsx
import React from 'react';

const Badge = ({ children, variant = 'success', className = '' }) => {
  const variants = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    pending: 'bg-blue-100 text-blue-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
        transition-all duration-300 ease-in-out animate-fadeIn
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

// Add to your global styles or index.css:
// @keyframes fadeIn {
//   from { opacity: 0; transform: scale(0.9); }
//   to { opacity: 1; transform: scale(1); }
// }

export default Badge;