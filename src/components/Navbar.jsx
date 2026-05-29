// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { SearchIcon, UserIcon, BellIcon, MenuIcon, XIcon } from './Icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const navLinks = [
   
  ];

  return (
    <>
      <nav className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-in-out
        ${isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white py-3'}
      `}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 z-50">
              <div className="h-10 w-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 hidden sm:block">Realance</span>
            </Link>

            {/* Desktop Search Bar - Centered */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className={`relative group ${isSearchFocused ? 'ring-2 ring-green-500 ring-opacity-50' : ''}`}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search for services, freelancers, or skills..."
                    className="w-full px-6 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-green-400 transition-all duration-300"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <SearchIcon className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors duration-300" />
                  </div>
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* Desktop Navigation & User Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Navigation Links */}
              <div className="flex items-center space-x-6">
                {navLinks.slice(0, 3).map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`
                      relative text-gray-600 hover:text-green-600 font-medium text-sm
                      transition-all duration-300 ease-in-out
                      after:absolute after:left-0 after:-bottom-1
                      after:h-0.5 after:w-0 after:bg-green-600
                      hover:after:w-full after:transition-all after:duration-300
                      ${location.pathname === link.path ? 'text-green-600 after:w-full' : ''}
                    `}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-gray-300"></div>

              {/* User Actions */}
              <div className="flex items-center space-x-4">
                {/* Notification Bell */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 relative"
                  >
                    <BellIcon className="h-5 w-5 text-gray-600 hover:text-green-600 transition-colors duration-300" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                  </button>
                  
                  {/* Notification Dropdown */}
                  {showNotifications && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowNotifications(false)}
                      ></div>
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 py-2">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <h3 className="font-semibold text-gray-900">Notifications</h3>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                              <div className="flex items-start space-x-3">
                                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                                  <BellIcon className="h-5 w-5 text-green-600" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm text-gray-900">New job matches your skills</p>
                                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="px-4 py-3 border-t border-gray-100">
                          <Link to="/notifications" className="text-green-600 text-sm font-medium hover:underline">
                            View all notifications
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* User Avatar / Login */}
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-600 hover:text-green-600 transition-colors duration-300 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 font-medium"
                  >
                    Join Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Search & Menu Buttons */}
            <div className="flex lg:hidden items-center space-x-3">
              {/* Mobile Search Button */}
              <Link
                to="/explore"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
              >
                <SearchIcon className="h-5 w-5 text-gray-600" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                {isOpen ? (
                  <XIcon className="h-6 w-6 text-gray-600" />
                ) : (
                  <MenuIcon className="h-6 w-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar (Shown when open on mobile) */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out ${isOpen ? 'mt-4 opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services..."
                  className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-green-400 transition-all duration-300"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-medium"
                >
                  Go
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100
          transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="container mx-auto px-4 py-6">
            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center justify-between py-3 px-4 rounded-lg
                    transition-all duration-300
                    ${location.pathname === link.path 
                      ? 'bg-green-50 text-green-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
                    }
                  `}
                >
                  <span className="font-medium">{link.name}</span>
                  <span className="text-gray-400">→</span>
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-200"></div>

            {/* Mobile Auth Buttons */}
            <div className="space-y-4">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300"
              >
                <UserIcon className="h-5 w-5 mr-2" />
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Join Now - It's Free
              </Link>
            </div>

            {/* Additional Mobile Links */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { name: 'Post a Job', path: '/post-job' },
                { name: 'Become a Seller', path: '/become-seller' },
                { name: 'Help Center', path: '/help' },
                { name: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2.5 px-3 bg-gray-50 rounded-lg text-sm text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Add padding to prevent content from being hidden under fixed navbar */}
      <div className={`${isScrolled ? 'pt-16' : 'pt-20'}`}></div>
    </>
  );
};

export default Navbar;