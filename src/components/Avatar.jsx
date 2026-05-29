// src/components/Avatar.jsx
import React, { useState } from 'react';
import { FiUser, FiCamera, FiCheck } from 'react-icons/fi';

const Avatar = ({
  src,
  alt = 'Avatar',
  size = 'md',
  online = false,
  offline = false,
  busy = false,
  away = false,
  status = null, // 'online', 'offline', 'busy', 'away'
  className = '',
  onClick = null,
  editable = false,
  onEdit = null,
  badge = null,
  badgeColor = 'green',
  border = false,
  borderColor = 'white',
  rounded = 'full',
  placeholder = null,
  fallbackType = 'initials', // 'initials', 'icon', 'image'
  children,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  
  // Size mapping
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-20 h-20 text-xl',
    '2xl': 'w-24 h-24 text-2xl',
  };

  const iconSizes = {
    xs: 12,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
    '2xl': 48,
  };

  // Status indicator sizes
  const statusSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
    '2xl': 'w-4 h-4',
  };

  const statusBorder = {
    xs: 'border-[1px]',
    sm: 'border-[1.5px]',
    md: 'border-2',
    lg: 'border-[2.5px]',
    xl: 'border-[3px]',
    '2xl': 'border-[3.5px]',
  };

  // Determine status
  const getStatus = () => {
    if (status) return status;
    if (online) return 'online';
    if (offline) return 'offline';
    if (busy) return 'busy';
    if (away) return 'away';
    return null;
  };

  const currentStatus = getStatus();

  // Status colors
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-yellow-500',
  };

  // Badge colors
  const badgeColors = {
    green: 'bg-green-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    indigo: 'bg-indigo-500',
  };

  // Border colors
  const borderColors = {
    white: 'border-white',
    gray: 'border-gray-200',
    green: 'border-green-200',
    blue: 'border-blue-200',
    purple: 'border-purple-200',
    transparent: 'border-transparent',
  };

  // Rounded classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  };

  // Generate initials from alt text
  const getInitials = () => {
    if (!alt || alt === 'Avatar') return '?';
    
    const words = alt.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };

  // Generate gradient based on name for consistent colors
  const getGradientFromName = (name) => {
    const colors = [
      'from-blue-500 to-purple-500',
      'from-green-500 to-teal-500',
      'from-red-500 to-pink-500',
      'from-yellow-500 to-orange-500',
      'from-indigo-500 to-blue-500',
      'from-pink-500 to-rose-500',
      'from-teal-500 to-emerald-500',
      'from-purple-500 to-violet-500',
    ];
    
    if (!name) return colors[0];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  const gradientClass = getGradientFromName(alt);

  // Render fallback content
  const renderFallback = () => {
    if (placeholder) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          {placeholder}
        </div>
      );
    }

    switch (fallbackType) {
      case 'initials':
        return (
          <span className="font-semibold text-white select-none">
            {getInitials()}
          </span>
        );
      case 'image':
        return (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <FiUser className="text-gray-400" size={iconSizes[size] * 0.6} />
          </div>
        );
      case 'icon':
      default:
        return (
          <FiUser className="text-gray-400" size={iconSizes[size] * 0.6} />
        );
    }
  };

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
  };

  // Click handler
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    if (editable && onEdit) {
      onEdit(e);
    }
  };

  return (
    <div className={`relative inline-block ${className}`} {...props}>
      <div
        className={`
          relative overflow-hidden
          ${sizeClasses[size]}
          ${roundedClasses[rounded]}
          ${border ? `border-2 ${borderColors[borderColor]}` : ''}
          ${onClick || editable ? 'cursor-pointer hover:opacity-90 transition-opacity duration-200' : ''}
          flex items-center justify-center
          ${!src || imageError ? `bg-gradient-to-br ${gradientClass}` : 'bg-gray-100'}
          shadow-sm
        `}
        onClick={handleClick}
        role={onClick || editable ? 'button' : 'img'}
        aria-label={alt}
      >
        {/* Image or Fallback */}
        {src && !imageError ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          renderFallback()
        )}

        {/* Editable overlay */}
        {editable && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
            <FiCamera className="text-white" size={iconSizes[size] * 0.4} />
          </div>
        )}

        {/* Children overlay (for custom content) */}
        {children && (
          <div className="absolute inset-0 flex items-center justify-center">
            {children}
          </div>
        )}
      </div>

      {/* Status Indicator */}
      {currentStatus && (
        <div
          className={`
            absolute bottom-0 right-0
            ${statusSizes[size]}
            ${statusBorder[size]}
            ${statusColors[currentStatus]}
            border-white
            ${roundedClasses[rounded]}
            transform translate-x-1/4 translate-y-1/4
            z-10
          `}
        />
      )}

      {/* Custom Badge */}
      {badge && (
        <div
          className={`
            absolute -top-1 -right-1
            min-w-[18px] h-[18px]
            ${badgeColors[badgeColor]}
            text-white text-xs
            rounded-full
            flex items-center justify-center
            px-1
            z-20
            shadow-sm
          `}
        >
          {badge}
        </div>
      )}

      {/* Verified Badge */}
      {props.verified && (
        <div
          className="
            absolute -top-1 -right-1
            w-5 h-5
            bg-blue-500
            text-white
            rounded-full
            flex items-center justify-center
            z-20
            shadow-sm
          "
        >
          <FiCheck size={12} />
        </div>
      )}
    </div>
  );
};

export default Avatar;