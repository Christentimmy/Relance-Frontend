// src/layouts/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Sidebar = ({ isOpen, setIsOpen, userRole = 'buyer' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const buyerMenu = [
    { icon: '', label: 'Dashboard', path: '/dashboard' },
    { icon: '', label: 'Explore Gigs', path: '/dashboard/explore' },
    { icon: '', label: 'My Orders', path: '/dashboard/orders' },
   
    { icon: '', label: 'Messages', path: '/dashboard/messages' },
    { icon: '', label: 'Billing', path: '/dashboard/billing' },
  ];

  const sellerMenu = [
   
    { icon: '', label: 'My Gigs', path: '/dashboard/gigs' },
    { icon: '', label: 'Orders', path: '/dashboard/orders' },
    { icon: '', label: 'Messages', path: '/dashboard/messages' },
    { icon: '', label: 'Reviews', path: '/dashboard/reviews' },
    { icon: '', label: 'Earnings', path: '/dashboard/earnings' },
     { icon: '', label: 'Analytics', path: '/dashboard/analytics' },
  ];

  const generalMenu = [
    { icon: '⚙️', label: 'Settings', path: '/dashboard/settings' },
    { icon: '❓', label: 'Help Center', path: '/dashboard/help' },
  ];

  const menuItems = userRole === 'seller' ? sellerMenu : buyerMenu;

  const handleLogout = () => {
    // Handle logout logic
    navigate('/login');
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative top-0 left-0 h-full
          bg-white border-r border-gray-200
          z-50 flex flex-col
          transition-all duration-500 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-72
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-green-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <div className={`transition-all duration-300 ${isHovered ? 'opacity-100' : 'lg:opacity-100 opacity-0'}`}>
              <h1 className="text-xl font-bold text-gray-900">Realance</h1>
              <p className="text-xs text-gray-500">{userRole === 'seller' ? 'Seller Portal' : 'Buyer Dashboard'}</p>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                JD
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className={`transition-all duration-300 ${isHovered ? 'opacity-100' : 'lg:opacity-100 opacity-0'}`}>
              <h3 className="font-semibold text-gray-900">John Designer</h3>
              <p className="text-sm text-gray-500">Pro {userRole}</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              Main Menu
            </p>
            
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) => `
                  flex items-center space-x-3 px-4 py-3 rounded-xl
                  transition-all duration-300 ease-in-out
                  ${isActive 
                    ? 'bg-green-50 text-green-700 font-semibold' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                  group hover:translate-x-1
                `}
              >
                <span className="text-xl transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </span>
                <span className={`transition-all duration-300 ${isHovered ? 'opacity-100' : 'lg:opacity-100 opacity-0'}`}>
                  {item.label}
                </span>
                {item.badge && (
                  <span className="ml-auto bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          <div className="mt-8 space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              General
            </p>
            
            {generalMenu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center space-x-3 px-4 py-3 rounded-xl
                  transition-all duration-300 ease-in-out
                  ${isActive 
                    ? 'bg-gray-100 text-gray-900 font-semibold' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                  group hover:translate-x-1
                `}
              >
                <span className="text-xl transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </span>
                <span className={`transition-all duration-300 ${isHovered ? 'opacity-100' : 'lg:opacity-100 opacity-0'}`}>
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-200 space-y-3">
          {userRole === 'buyer' && (
            <Button
              variant="primary"
              className="w-full justify-center group hover:scale-105 transition-transform duration-300"
              onClick={() => navigate('/seller/register')}
            >
              <span className="mr-2">💼</span>
              <span className={`transition-all duration-300 ${isHovered ? 'opacity-100' : 'lg:opacity-100 opacity-0'}`}>
                Become a Seller
              </span>
            </Button>
          )}
          
          <Button
            variant="outline"
            className="w-full justify-center hover:scale-105 transition-transform duration-300"
            onClick={handleLogout}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className={`transition-all duration-300 ${isHovered ? 'opacity-100' : 'lg:opacity-100 opacity-0'}`}>
              Logout
            </span>
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;