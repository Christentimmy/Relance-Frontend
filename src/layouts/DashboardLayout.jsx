// src/layouts/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';

const DashboardLayout = ({ children, userRole = 'buyer' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Auto-close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    
    // Simulate content loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Get page title from path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('analytics')) return 'Analytics Dashboard';
    if (path.includes('orders')) return 'Order Management';
    if (path.includes('gigs')) return 'My Gigs';
    if (path.includes('messages')) return 'Messages';
    if (path.includes('settings')) return 'Settings';
    return 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        userRole={userRole}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader 
          pageTitle={getPageTitle()}
          userRole={userRole}
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        {/* Main Content */}
        <main className={`
          flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto
          transition-all duration-500 ease-in-out
          ${isLoading ? 'opacity-0' : 'opacity-100'}
        `}>
          <div className="max-w-7xl mx-auto">
           
            
            {/* Page Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {isLoading ? (
                <div className="p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading content...</p>
                  </div>
                </div>
              ) : (
                <div className="p-6 md:p-8">{children}</div>
              )}
            </div>
          </div>
        </main>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 z-40 p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DashboardLayout;