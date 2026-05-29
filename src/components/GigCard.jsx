// src/components/GigCard.jsx
import React from 'react';

const GigCard = ({ gig, onClick }) => {
  const {
    image,
    title,
    seller,
    rating,
    reviews,
    price,
    deliveryTime,
    isFavorite = false,
  } = gig;

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden cursor-pointer hover:-translate-y-2 active:scale-95"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Handle favorite toggle
          }}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <svg
            className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={isFavorite ? 0 : 2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Seller Info */}
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
            <span className="text-sm font-semibold text-gray-600">
              {seller.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm text-gray-600 truncate">{seller.name}</span>
          {seller.isVerified && (
            <span className="ml-1 text-green-600" title="Verified Seller">
              ✓
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-green-600 transition-colors duration-300">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm font-semibold text-gray-900">{rating}</span>
            <span className="ml-1 text-sm text-gray-500">({reviews})</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-gray-500">{deliveryTime}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500">Starting at</span>
            <div className="text-lg font-bold text-green-600">${price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigCard;