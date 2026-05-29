import React, { useState } from 'react';
import { 
  FiUser, 
  FiShield, 
  FiCheckCircle, 
  FiCreditCard, 
  FiBell,
  FiGlobe,
  FiEye,
  FiDollarSign
} from 'react-icons/fi';

const SettingsSidebar = ({ activePage, onPageChange }) => {
  const menuItems = [
    { id: 'profile', label: 'Profile', icon: <FiUser className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <FiShield className="w-5 h-5" /> },
    { id: 'verification', label: 'Verification', icon: <FiCheckCircle className="w-5 h-5" /> },
    { id: 'billing', label: 'Billing', icon: <FiCreditCard className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <FiBell className="w-5 h-5" /> },
    { id: 'privacy', label: 'Privacy', icon: <FiEye className="w-5 h-5" /> },
    { id: 'language', label: 'Language', icon: <FiGlobe className="w-5 h-5" /> },
    { id: 'payments', label: 'Payment Methods', icon: <FiDollarSign className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`
              w-full flex items-center space-x-3 px-4 py-3 rounded-xl
              transition-all duration-200 text-left
              ${activePage === item.id 
                ? 'bg-green-50 text-green-700 border-l-4 border-green-500' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }
            `}
          >
            <span className={activePage === item.id ? 'text-green-600' : 'text-gray-400'}>
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Mobile Tabs (Only visible on mobile) */}
      <div className="lg:hidden mt-6">
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4">
          {menuItems.slice(0, 3).map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-lg mx-1
                transition-all duration-200
                ${activePage === item.id 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebar;