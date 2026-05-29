import React from 'react';
import { FiCheck, FiClock, FiX, FiAlertCircle } from 'react-icons/fi';

const StatusBadge = ({ 
  status = 'pending', 
  size = 'md',
  showIcon = true,
  showText = true,
  className = ''
}) => {
  const statusConfig = {
    pending: {
      text: 'Pending Review',
      icon: <FiClock className="w-3 h-3 md:w-4 md:h-4" />,
      bg: 'bg-yellow-50',
      textColor: 'text-yellow-800',
      border: 'border-yellow-200',
      iconColor: 'text-yellow-600'
    },
    verified: {
      text: 'Verified',
      icon: <FiCheck className="w-3 h-3 md:w-4 md:h-4" />,
      bg: 'bg-green-50',
      textColor: 'text-green-800',
      border: 'border-green-200',
      iconColor: 'text-green-600'
    },
    rejected: {
      text: 'Rejected',
      icon: <FiX className="w-3 h-3 md:w-4 md:h-4" />,
      bg: 'bg-red-50',
      textColor: 'text-red-800',
      border: 'border-red-200',
      iconColor: 'text-red-600'
    },
    warning: {
      text: 'Action Required',
      icon: <FiAlertCircle className="w-3 h-3 md:w-4 md:h-4" />,
      bg: 'bg-orange-50',
      textColor: 'text-orange-800',
      border: 'border-orange-200',
      iconColor: 'text-orange-600'
    },
    processing: {
      text: 'Processing',
      icon: <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>,
      bg: 'bg-blue-50',
      textColor: 'text-blue-800',
      border: 'border-blue-200',
      iconColor: 'text-blue-600'
    }
  };

  const config = statusConfig[status] || statusConfig.pending;
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <div className={`inline-flex items-center space-x-1.5 rounded-full border ${config.bg} ${config.textColor} ${config.border} ${sizeClasses[size]} ${className}`}>
      {showIcon && <span className={config.iconColor}>{config.icon}</span>}
      {showText && <span className="font-medium">{config.text}</span>}
    </div>
  );
};

export default StatusBadge;