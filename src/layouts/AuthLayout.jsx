// src/layouts/AuthLayout.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-green-100 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className={`
        relative z-10 w-full max-w-2xl
        transition-all duration-700 ease-out
        ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}>
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col min-h-auto">
            {/* Left Form Section */}
            <div className="flex-1 p-8 md:p-12 lg:p-16">
              <div className="h-full flex flex-col justify-center">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-3 mb-8 group">
                  <div className="h-12 w-12 bg-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-2xl">F</span>
                  </div>
                  <span className="text-3xl font-bold text-gray-900">Realance</span>
                </Link>

                {/* Auth Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {title || 'Welcome Back'}
                  </h1>
                  <p className="text-gray-600">
                    {subtitle || 'Sign in to continue to your account'}
                  </p>
                </div>

                {/* Form Content */}
                <div className="space-y-6">
                  {children}
                </div>

                {/* Auth Footer */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-center text-gray-600 text-sm">
                    {title?.includes('Sign Up') ? (
                      <>
                        Already have an account?{' '}
                        <Link to="/login" className="text-green-600 font-semibold hover:text-green-700 transition-colors duration-300">
                          Sign In
                        </Link>
                      </>
                    ) : (
                      <>
                        Don't have an account?{' '}
                        <Link to="/register" className="text-green-600 font-semibold hover:text-green-700 transition-colors duration-300">
                          Sign Up
                        </Link>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Illustration */}
       
      </div>
    </div>
  );
};

export default AuthLayout;