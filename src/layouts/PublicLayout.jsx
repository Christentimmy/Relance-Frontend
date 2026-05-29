// src/layouts/PublicLayout.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PublicLayout = ({ children }) => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate page transition
    setIsPageLoading(true);
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar is included in the layout */}
      <Navbar />
      
      {/* Main Content with smooth transition */}
      <main className={`
        flex-1 w-full mx-auto px-4 py-8
        transition-all duration-500 ease-in-out
        ${isPageLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
        md:px-6 lg:px-8
      `}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Loading Overlay */}
      {isPageLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 animate-pulse">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicLayout;