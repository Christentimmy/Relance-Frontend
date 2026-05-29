// src/pages/dashboard/gigs/CreateGig.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../layouts/DashboardLayout';
import Button from '../../../components/Button';
import Input from '../../../components/Button';
import Badge from '../../../components/Badge';
import Modal from '../../../components/Modal';
import Loader from '../../../components/Loader';
import { 
  ArrowLeftIcon,
  ArrowRightIcon,
  CameraIcon,
  TagIcon,
  ClockIcon,
  DollarIcon,
  CheckCircleIcon,
  XIcon,
  UploadIcon,
  ImageIcon,
  VideoIcon
} from '../../../components/Icons';

const CreateGig = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    // Step 1: Overview
    title: '',
    category: '',
    description: '',
    
    // Step 2: Pricing
    basicPackage: {
      price: 49,
      deliveryDays: 3,
      revisions: 2,
      description: 'Basic service with essential features',
      features: ['1 concept design', '2 revisions', 'Source files']
    },
    standardPackage: {
      price: 99,
      deliveryDays: 5,
      revisions: 'Unlimited',
      description: 'Most popular package',
      features: ['3 concept designs', 'Unlimited revisions', 'Source files', 'Commercial license']
    },
    premiumPackage: {
      price: 199,
      deliveryDays: 7,
      revisions: 'Unlimited',
      description: 'Complete solution',
      features: ['5 concept designs', 'Unlimited revisions', 'Source files', 'Commercial license', 'Priority support', '3D mockups']
    },
    
    // Step 3: Extras
    extras: [
      { name: 'Express Delivery', price: 50, description: 'Delivery in 24 hours' },
      { name: 'Additional Revisions', price: 30, description: '5 extra revisions' },
      { name: 'Source Files', price: 75, description: 'All source files included' }
    ],
    
    // Step 4: Requirements
    requirements: ['Clear project brief', 'Brand guidelines', 'Examples of work you like']
  });

  const steps = [
    { id: 1, title: 'Overview', description: 'Basic info about your service' },
    { id: 2, title: 'Pricing', description: 'Set your packages and prices' },
    { id: 3, title: 'Gallery', description: 'Upload images and videos' },
    { id: 4, title: 'Publish', description: 'Review and launch your gig' }
  ];

  const categories = [
    'Graphics & Design',
    'Digital Marketing',
    'Writing & Translation',
    'Video & Animation',
    'Music & Audio',
    'Programming & Tech',
    'Business',
    'Lifestyle'
  ];

  const deliveryTimes = [
    { label: '24 Hours', value: 1 },
    { label: '3 Days', value: 3 },
    { label: '5 Days', value: 5 },
    { label: '7 Days', value: 7 },
    { label: '14 Days', value: 14 }
  ];

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
    }));
    
    setUploadedImages(prev => [...prev, ...newImages]);
  };

  const handleRemoveImage = (id) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePublish = () => {
    setIsPublishing(true);
    
    // Simulate publishing process
    setTimeout(() => {
      setIsPublishing(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePackageChange = (packageType, field, value) => {
    setFormData(prev => ({
      ...prev,
      [packageType]: {
        ...prev[packageType],
        [field]: value
      }
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8 animate-fadeInUp">
            {/* Gig Title */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Gig Title
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="What will you offer in this service?"
                className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                maxLength="80"
              />
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-500">
                  Example: "I will design a modern website UI/UX"
                </p>
                <span className={`text-sm ${formData.title.length >= 80 ? 'text-red-500' : 'text-gray-500'}`}>
                  {formData.title.length}/80
                </span>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Category
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleInputChange('category', category)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                      formData.category === category
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Gig Description
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe what you'll do for the buyer..."
                rows="6"
                className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                maxLength="1200"
              />
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-500">
                  Be specific about what you'll deliver
                </p>
                <span className={`text-sm ${formData.description.length >= 1200 ? 'text-red-500' : 'text-gray-500'}`}>
                  {formData.description.length}/1200
                </span>
              </div>
            </div>

            {/* Tip */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">💡</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-blue-900">Writing Tips</h4>
                  <ul className="mt-2 space-y-1 text-sm text-blue-800">
                    <li>• Start with "I will..." to make it action-oriented</li>
                    <li>• Be specific about what you deliver</li>
                    <li>• Mention your unique value proposition</li>
                    <li>• Include keywords buyers might search for</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8 animate-fadeInUp">
            {/* Basic Package */}
            <div className="border-2 border-green-500 rounded-2xl p-6 bg-green-50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Basic Package</h3>
                  <p className="text-gray-600">Essential service for small projects</p>
                </div>
                <Badge variant="success">Recommended</Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={formData.basicPackage.price}
                      onChange={(e) => handlePackageChange('basicPackage', 'price', parseInt(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time</label>
                  <div className="flex flex-wrap gap-2">
                    {deliveryTimes.map((time) => (
                      <button
                        key={time.value}
                        type="button"
                        onClick={() => handlePackageChange('basicPackage', 'deliveryDays', time.value)}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                          formData.basicPackage.deliveryDays === time.value
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {time.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Package Description</label>
                  <input
                    type="text"
                    value={formData.basicPackage.description}
                    onChange={(e) => handlePackageChange('basicPackage', 'description', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="What's included in this package?"
                  />
                </div>
              </div>
            </div>

            {/* Standard Package */}
            <div className="border-2 border-gray-300 rounded-2xl p-6 hover:border-green-400 transition-colors duration-300">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Standard Package</h3>
                  <p className="text-gray-600">Most popular choice for buyers</p>
                </div>
                <Badge variant="warning">Most Popular</Badge>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={formData.standardPackage.price}
                      onChange={(e) => handlePackageChange('standardPackage', 'price', parseInt(e.target.value))}
                      className="w-32 pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Delivery Time</label>
                  <div className="flex gap-2">
                    {deliveryTimes.slice(0, 3).map((time) => (
                      <button
                        key={time.value}
                        type="button"
                        onClick={() => handlePackageChange('standardPackage', 'deliveryDays', time.value)}
                        className={`px-3 py-1 rounded-lg transition-all duration-300 hover:scale-105 ${
                          formData.standardPackage.deliveryDays === time.value
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {time.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Package */}
            <div className="border-2 border-gray-300 rounded-2xl p-6 hover:border-purple-400 transition-colors duration-300">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Premium Package</h3>
                  <p className="text-gray-600">Complete solution for complex projects</p>
                </div>
                <Badge variant="error">Premium</Badge>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={formData.premiumPackage.price}
                      onChange={(e) => handlePackageChange('premiumPackage', 'price', parseInt(e.target.value))}
                      className="w-32 pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Delivery Time</label>
                  <div className="flex gap-2">
                    {deliveryTimes.slice(2).map((time) => (
                      <button
                        key={time.value}
                        type="button"
                        onClick={() => handlePackageChange('premiumPackage', 'deliveryDays', time.value)}
                        className={`px-3 py-1 rounded-lg transition-all duration-300 hover:scale-105 ${
                          formData.premiumPackage.deliveryDays === time.value
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {time.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Guidelines */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <DollarIcon className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-yellow-900">Pricing Guidelines</h4>
                  <ul className="mt-2 space-y-1 text-sm text-yellow-800">
                    <li>• Basic: $5-50 (simple tasks, 1-3 day delivery)</li>
                    <li>• Standard: $50-200 (most popular, 3-7 day delivery)</li>
                    <li>• Premium: $200+ (complex projects, premium features)</li>
                    <li>• Include clear value at each price point</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8 animate-fadeInUp">
            {/* Main Gig Image */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Main Gig Image
                <span className="text-red-500 ml-1">*</span>
              </label>
              <p className="text-gray-600 mb-4">This will be the first image buyers see</p>
              
              <div className="relative">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-500 hover:scale-105 ${
                    uploadedImages.length > 0
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
                  }`}
                >
                  {uploadedImages.length > 0 ? (
                    <div className="space-y-4">
                      <div className="w-20 h-20 mx-auto bg-green-100 rounded-xl flex items-center justify-center">
                        <CheckCircleIcon className="h-10 w-10 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Image Uploaded Successfully!</h4>
                        <p className="text-gray-600">Click to change or add more images</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-20 h-20 mx-auto bg-gray-100 rounded-xl flex items-center justify-center">
                        <UploadIcon className="h-10 w-10 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Drag & Drop or Click to Upload</h4>
                        <p className="text-gray-600">Recommended: 1280x720px or larger</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Gallery Images */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Gallery Images
              </label>
              <p className="text-gray-600 mb-4">Add up to 3 more images to showcase your work</p>
              
              {uploadedImages.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={image.id} className="relative group animate-fadeInUp">
                      <div className="aspect-video rounded-xl overflow-hidden border border-gray-200">
                        <img
                          src={image.preview}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <button
                        onClick={() => handleRemoveImage(image.id)}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      >
                        <XIcon className="h-4 w-4" />
                      </button>
                      <div className="mt-2">
                        <p className="text-sm text-gray-900 truncate">{image.name}</p>
                        <p className="text-xs text-gray-500">{image.size}</p>
                      </div>
                    </div>
                  ))}
                  
                  {uploadedImages.length < 4 && (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-video border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-green-400 hover:bg-gray-50 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-3">
                        <span className="text-2xl">+</span>
                      </div>
                      <p className="text-sm font-medium text-gray-700">Add Image</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ImageIcon className="h-10 w-10 text-gray-400" />
                  </div>
                  <p className="text-gray-600">No images uploaded yet</p>
                </div>
              )}
            </div>

            {/* Video Section */}
            <div className="border-t border-gray-200 pt-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Video Introduction (Optional)
              </label>
              <p className="text-gray-600 mb-4">Add a short video to increase conversions by up to 40%</p>
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <VideoIcon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-900 mb-2">Why add a video?</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Gigs with videos earn up to 2x more</li>
                      <li>• Helps buyers understand your service better</li>
                      <li>• Builds trust and shows your personality</li>
                      <li>• 60-90 seconds is ideal length</li>
                    </ul>
                  </div>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 hover:scale-105">
                    Upload Video
                  </button>
                </div>
              </div>
            </div>

            {/* Image Guidelines */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <CameraIcon className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-purple-900">Image Guidelines</h4>
                  <ul className="mt-2 space-y-1 text-sm text-purple-800">
                    <li>• Use high-quality, professional images</li>
                    <li>• Show your work, not just stock photos</li>
                    <li>• Include before/after comparisons if relevant</li>
                    <li>• Keep text on images minimal and clean</li>
                    <li>• Recommended format: JPG or PNG, 1280x720px or larger</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8 animate-fadeInUp">
            {/* Gig Preview */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Preview Your Gig</h3>
              
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                {/* Preview Image */}
                <div className="relative h-64 bg-gradient-to-r from-green-400 to-blue-500">
                  {uploadedImages[0] ? (
                    <img
                      src={uploadedImages[0].preview}
                      alt="Gig preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <CameraIcon className="h-16 w-16 text-white opacity-50 mx-auto mb-4" />
                        <p className="text-white opacity-75">Gig Image Preview</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge variant="success">New</Badge>
                  </div>
                </div>

                {/* Preview Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">
                        {formData.title || "Your Gig Title Here"}
                      </h4>
                      <div className="flex items-center text-gray-600">
                        <span>⭐ 4.9 (128 reviews)</span>
                        <span className="mx-2">•</span>
                        <span>{formData.category || "Category"}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">
                        ${formData.basicPackage.price}
                      </div>
                      <div className="text-sm text-gray-500">Starting at</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-8">
                    {formData.description || "Your gig description will appear here..."}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Basic Package */}
                    <div className="border border-gray-200 rounded-xl p-6 hover:border-green-500 transition-colors duration-300">
                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-900 mb-1">Basic</h5>
                        <div className="text-2xl font-bold text-gray-900">${formData.basicPackage.price}</div>
                        <p className="text-sm text-gray-500">{formData.basicPackage.deliveryDays} days delivery</p>
                      </div>
                      <ul className="space-y-2">
                        {formData.basicPackage.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Standard Package */}
                    <div className="border-2 border-green-500 rounded-xl p-6 bg-green-50">
                      <div className="mb-4">
                        <div className="flex items-center justify-between">
                          <h5 className="font-semibold text-gray-900">Standard</h5>
                          <Badge variant="success">Most Popular</Badge>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">${formData.standardPackage.price}</div>
                        <p className="text-sm text-gray-500">{formData.standardPackage.deliveryDays} days delivery</p>
                      </div>
                      <ul className="space-y-2">
                        {formData.standardPackage.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Premium Package */}
                    <div className="border border-gray-200 rounded-xl p-6 hover:border-purple-500 transition-colors duration-300">
                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-900 mb-1">Premium</h5>
                        <div className="text-2xl font-bold text-gray-900">${formData.premiumPackage.price}</div>
                        <p className="text-sm text-gray-500">{formData.premiumPackage.deliveryDays} days delivery</p>
                      </div>
                      <ul className="space-y-2">
                        {formData.premiumPackage.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-8">
                    <h5 className="font-semibold text-gray-900 mb-4">What You'll Need</h5>
                    <div className="flex flex-wrap gap-3">
                      {formData.requirements.map((req, index) => (
                        <Badge key={index} variant="success">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Checklist */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Ready to Publish? Let's review:</h4>
              
              <div className="space-y-4">
                {[
                  { condition: formData.title.length >= 10, text: 'Gig title is descriptive and compelling' },
                  { condition: formData.category, text: 'Category is selected' },
                  { condition: formData.description.length >= 100, text: 'Description provides clear value' },
                  { condition: formData.basicPackage.price > 0, text: 'Pricing is set for all packages' },
                  { condition: uploadedImages.length >= 1, text: 'At least one image is uploaded' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      item.condition ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {item.condition ? (
                        <CheckCircleIcon className="h-4 w-4 text-green-600" />
                      ) : (
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      )}
                    </div>
                    <span className={item.condition ? 'text-gray-900' : 'text-gray-500'}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Publish Button */}
            <div className="text-center">
              <Button
                variant="primary"
                size="lg"
                loading={isPublishing}
                onClick={handlePublish}
                className="px-12 py-4 text-lg group hover:scale-105 transition-all duration-300 animate-pulseGlow"
                disabled={!formData.title || !formData.category || uploadedImages.length === 0}
              >
                {isPublishing ? (
                  <>
                    Publishing Your Gig...
                    <span className="ml-3 animate-spin">⟳</span>
                  </>
                ) : (
                  <>
                    Publish Gig & Go Live
                    <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">🚀</span>
                  </>
                )}
              </Button>
              <p className="text-gray-500 mt-3">
                You can edit your gig anytime from your dashboard
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout userRole="seller">
      {/* Header */}
      <div className="mb-8 animate-fadeInUp">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create a New Gig</h1>
            <p className="text-gray-600 mt-2">
              Follow the steps below to create your service offering
            </p>
          </div>
          <Button
            variant="outline"
            className="group hover:scale-105 transition-transform duration-300"
            onClick={() => navigate('/dashboard/gigs')}
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Gigs
          </Button>
        </div>

        {/* Progress Stepper */}
        <div className="relative mb-12">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-full bg-green-500 transition-all duration-1000 ease-in-out"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  transition-all duration-500 ease-in-out
                  ${currentStep >= step.id 
                    ? 'bg-green-500 text-white scale-110 shadow-lg' 
                    : 'bg-white border-2 border-gray-300 text-gray-400'
                  }
                  ${currentStep === step.id ? 'ring-4 ring-green-200' : ''}
                `}>
                  {currentStep > step.id ? (
                    <CheckCircleIcon className="h-6 w-6" />
                  ) : (
                    <span className="font-semibold">{step.id}</span>
                  )}
                </div>
                <div className="mt-3 text-center">
                  <div className="text-sm font-semibold text-gray-900">{step.title}</div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
     {currentStep < steps.length && (
  <div className="flex justify-between mt-8">
    {currentStep > 1 && (
      <Button
        variant="outline"
        onClick={handlePrevStep}
        className="group hover:scale-105 transition-transform duration-300"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Previous Step
      </Button>
    )}
    <Button
      variant="primary"
      onClick={handleNextStep}
      className={`group hover:scale-105 transition-transform duration-300 ${currentStep > 1 ? '' : 'ml-auto'}`}
      disabled={
        (currentStep === 1 && (!formData.title || !formData.category)) ||
        (currentStep === 3 && uploadedImages.length === 0)
      }
    >
      Next Step
      <ArrowRightIcon className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
    </Button>
  </div>
)}
      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate('/dashboard/gigs');
        }}
        title="🎉 Gig Published Successfully!"
      >
        <div className="text-center p-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="h-12 w-12 text-green-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Your Gig is Live!</h3>
          <p className="text-gray-600 mb-6">
            Congratulations! Your service is now available for buyers to discover and order.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="font-semibold text-gray-900 mb-1">What happens next?</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Buyers can discover your gig in search results</li>
                <li>• You'll start receiving orders and messages</li>
                <li>• Promote your gig to get your first order faster</li>
              </ul>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setShowSuccessModal(false);
                navigate('/dashboard/gigs');
              }}
            >
              View My Gigs
            </Button>
            <Button
              variant="primary"
              className="flex-1 group hover:scale-105 transition-transform duration-300"
              onClick={() => {
                setShowSuccessModal(false);
                navigate('/dashboard');
              }}
            >
              Go to Dashboard
              <ArrowRightIcon className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration duration-300" />
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default CreateGig;