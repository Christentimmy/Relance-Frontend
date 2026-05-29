// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from '../../components/Icons';
import { authService } from '../../services/auth';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsLoading(true);
  setErrors({});

  try {
    const data = await authService.login({
      email: formData.email,
      password: formData.password,
    });

    if (data.error) {
      throw new Error(data.error);
    }

    if (!data.token) {
      throw new Error("Token missing from server");
    }

    // Save token
    localStorage.setItem("token", data.token);

    // Decode JWT to get user info like role
    const payload = JSON.parse(atob(data.token.split('.')[1]));
    const role = payload.role || "buyer";
    const userId = payload.id || null;

    // Store role and userId in localStorage
    localStorage.setItem("userRole", role);
    localStorage.setItem("user", JSON.stringify({ id: userId, role }));

    // Navigate to dashboard
    navigate("/dashboard");

  } catch (error) {
    setErrors(prev => ({
      ...prev,
      general: error.message,
    }));
  } finally {
    setIsLoading(false);
  }
};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Social login implementation would go here
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={MailIcon}
          required
          className="animate-fadeInUp"
        />

        {/* Password Input */}
        <div className="animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            icon={LockIcon}
            required
          />
          
          {/* Password Toggle & Forgot */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500 focus:ring-offset-0 transition-all duration-300"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300 cursor-pointer">
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-300 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Submit Button */}
        <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            className="w-full group hover:scale-105 transition-all duration-300"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Button>
        </div>

        {/* Divider */}
        <div className="relative animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-md transition-all duration-300 hover:scale-105 group"
          >
            <div className="w-5 h-5 mr-2">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
              Google
            </span>
          </button>
          
          <button
            type="button"
            onClick={() => handleSocialLogin('github')}
            className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-md transition-all duration-300 hover:scale-105 group"
          >
            <div className="w-5 h-5 mr-2">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path fill="#333" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
              GitHub
            </span>
          </button>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-100 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <LockIcon className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-800">
                Your security is our priority. All data is encrypted and protected.
              </p>
            </div>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
