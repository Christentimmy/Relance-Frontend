// src/pages/auth/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Badge from '../../components/Badge';
import { UserIcon, MailIcon, LockIcon, CheckCircleIcon, BriefcaseIcon, ShoppingBagIcon } from '../../components/Icons';

const API_BASE_URL = "https://relance-backend-oucs.onrender.com/api"; 



const Register = () => {
  const navigate = useNavigate();

const [otp, setOtp] = useState('');
const [otpStage, setOtpStage] = useState(false);
const [otpLoading, setOtpLoading] = useState(false);


  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'buyer',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength < 3) {
      newErrors.password = 'Password is too weak';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
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
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        accountType: formData.role, // ✅ matches backend
      }),
    });

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error("Invalid server response");
    }

    if (!response.ok) {
      throw new Error(data.message || data.error || "Registration failed");
    }

    await handleSendOtp(formData.email);

    setOtpStage(true);

  } catch (error) {
    setErrors(prev => ({
      ...prev,
      general: error.message,
    }));
  } finally {
    setIsLoading(false);
  }
};


const handleSendOtp = async (email) => {
  try {
    await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  } catch (err) {
    console.error("Send OTP failed:", err);
  }
};


const handleVerifyOtp = async () => {
  if (!otp.trim()) {
    setErrors(prev => ({ ...prev, otp: "Enter the OTP code" }));
    return;
  }

  setOtpLoading(true);
  setErrors({});

  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        otp,
      }),
    });

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error("Invalid server response");
    }

    if (!response.ok) {
      throw new Error(data.message || data.error || "Invalid OTP");
    }

    navigate('/dashboard');

  } catch (error) {
    setErrors(prev => ({
      ...prev,
      otp: error.message,
    }));
  } finally {
    setOtpLoading(false);
  }
};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Calculate password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRoleSelect = (role) => {
    setFormData(prev => ({ ...prev, role }));
    // Save selected role to localStorage for dashboard routing
    try {
      localStorage.setItem('userRole', role);
    } catch (e) {
      console.error('Failed to save role:', e);
    }
  };

  const getStrengthColor = (strength) => {
    if (strength <= 1) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength) => {
    if (strength <= 1) return 'Very Weak';
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Good';
    if (strength <= 4) return 'Strong';
    return 'Very Strong';
  };

  return (
    <AuthLayout
      title="Join Our Community"
      subtitle="Create your account to get started"
    >

      {!otpStage ? (
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          icon={UserIcon}
          required
          className="animate-fadeInUp"
        />

        {/* Email */}
        <div className="animate-fadeInUp" style={{ animationDelay: '100ms' }}>
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
          />
        </div>

        {/* Role Selection */}
        <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            I want to join as a...
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleRoleSelect('buyer')}
              className={`
                p-4 rounded-xl border-2 transition-all duration-500 ease-in-out
                ${formData.role === 'buyer' 
                  ? 'border-green-500 bg-green-50 scale-105 shadow-md' 
                  : 'border-gray-200 hover:border-green-300 hover:shadow-sm'
                }
                flex flex-col items-center justify-center
                group hover:scale-105
              `}
            >
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center mb-3
                transition-all duration-300
                ${formData.role === 'buyer' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-600 group-hover:bg-green-50 group-hover:text-green-500'
                }
              `}>
                <ShoppingBagIcon className="h-6 w-6" />
              </div>
              <span className={`
                font-semibold transition-colors duration-300
                ${formData.role === 'buyer' ? 'text-green-700' : 'text-gray-700'}
              `}>
                Buyer
              </span>
              <span className="text-xs text-gray-500 mt-1">Hire freelancers</span>
              {formData.role === 'buyer' && (
                <div className="mt-2 animate-pulse">
                  <Badge variant="success" className="text-xs">Selected</Badge>
                </div>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('seller')}
              className={`
                p-4 rounded-xl border-2 transition-all duration-500 ease-in-out
                ${formData.role === 'seller' 
                  ? 'border-green-500 bg-green-50 scale-105 shadow-md' 
                  : 'border-gray-200 hover:border-green-300 hover:shadow-sm'
                }
                flex flex-col items-center justify-center
                group hover:scale-105
              `}
            >
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center mb-3
                transition-all duration-300
                ${formData.role === 'seller' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-600 group-hover:bg-green-50 group-hover:text-green-500'
                }
              `}>
                <BriefcaseIcon className="h-6 w-6" />
              </div>
              <span className={`
                font-semibold transition-colors duration-300
                ${formData.role === 'seller' ? 'text-green-700' : 'text-gray-700'}
              `}>
                Seller
              </span>
              <span className="text-xs text-gray-500 mt-1">Offer services</span>
              {formData.role === 'seller' && (
                <div className="mt-2 animate-pulse">
                  <Badge variant="success" className="text-xs">Selected</Badge>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Password */}
        <div className="animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            icon={LockIcon}
            required
          />
          
          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="mt-3 space-y-2 animate-fadeInUp">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Password strength</span>
                <span className={`text-sm font-medium ${
                  passwordStrength <= 1 ? 'text-red-600' :
                  passwordStrength <= 3 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {getStrengthText(passwordStrength)}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${getStrengthColor(passwordStrength)}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
              <ul className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                <li className="flex items-center">
                  <CheckCircleIcon className={`h-3 w-3 mr-1 ${formData.password.length >= 8 ? 'text-green-500' : 'text-gray-300'}`} />
                  At least 8 characters
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className={`h-3 w-3 mr-1 ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                  Uppercase letter
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className={`h-3 w-3 mr-1 ${/[a-z]/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                  Lowercase letter
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className={`h-3 w-3 mr-1 ${/[0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                  Number
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            icon={LockIcon}
            required
          />
        </div>

        {/* Terms Agreement */}
        <div className="animate-fadeInUp" style={{ animationDelay: '500ms' }}>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500 focus:ring-offset-0 transition-all duration-300"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeTerms" className="text-gray-600 cursor-pointer hover:text-gray-900 transition-colors duration-300">
                I agree to the{' '}
                <Link to="/terms" className="text-green-600 hover:text-green-700 font-medium">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-green-600 hover:text-green-700 font-medium">
                  Privacy Policy
                </Link>
              </label>
              {errors.agreeTerms && (
                <p className="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="animate-fadeInUp" style={{ animationDelay: '600ms' }}>
          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            disabled={!formData.agreeTerms}
            className={`w-full group hover:scale-105 transition-all duration-300 ${
              !formData.agreeTerms ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Button>
        </div>

        {/* Benefits */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 animate-fadeInUp" style={{ animationDelay: '700ms' }}>
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-2">Benefits of joining:</p>
            <ul className="space-y-1">
              <li className="flex items-center">
                <CheckCircleIcon className="h-4 w-4 text-blue-600 mr-2" />
                Access to thousands of skilled freelancers
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-4 w-4 text-blue-600 mr-2" />
                Secure payment protection
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-4 w-4 text-blue-600 mr-2" />
                24/7 customer support
              </li>
            </ul>
          </div>
        </div>
      </form>
      ) : (
  <div className="space-y-6 animate-fadeInUp">
     <div className="text-center">
        <h3 className="text-xl font-bold">Verify Your Email</h3>
        <p className="text-gray-600">
           Enter the OTP sent to <strong>{formData.email}</strong>
        </p>
     </div>

     <Input
        label="OTP Code"
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
     />

     {errors.otp && (
        <p className="text-red-600 text-sm text-center">{errors.otp}</p>
     )}

     <Button
        variant="primary"
        className="w-full"
        onClick={handleVerifyOtp}
        loading={otpLoading}
     >
        Verify OTP
     </Button>

     <Button
        variant="outline"
        className="w-full"
        onClick={() => handleSendOtp(formData.email)}
        disabled={otpLoading}
     >
        Resend OTP
     </Button>
  </div>
)}
    </AuthLayout>
  );
};

export default Register;

