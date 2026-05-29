import React, { useState } from 'react';
import { FiCamera, FiMail, FiPhone, FiMapPin, FiSave } from 'react-icons/fi';
import Avatar from '../../components/Avatar';

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    bio: 'Professional graphic designer with 5+ years of experience specializing in logo design and branding.',
    jobTitle: 'Senior Graphic Designer',
    website: 'https://johndoe.design',
    languages: ['English', 'Spanish']
  });

  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=John');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In real app, this would make an API call
    console.log('Saving profile:', formData);
  };

  const handleAvatarEdit = () => {
    // Mock file input for avatar
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setAvatarUrl(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
        {/* Left Column - Avatar & Basic Info */}
        <div className="lg:w-1/3 mb-8 lg:mb-0">
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Avatar
                  src={avatarUrl}
                  alt={formData.fullName}
                  size="xl"
                  className="border-4 border-white shadow-lg"
                />
                <button
                  onClick={handleAvatarEdit}
                  className="absolute bottom-2 right-2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-all duration-300 hover:scale-110"
                >
                  <FiCamera className="w-5 h-5" />
                </button>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900">{formData.fullName}</h2>
              <p className="text-green-600 font-medium">{formData.jobTitle}</p>
              
              <div className="mt-4 space-y-2 w-full">
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <FiMail className="w-4 h-4" />
                  <span>{formData.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <FiPhone className="w-4 h-4" />
                  <span>{formData.phone}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <FiMapPin className="w-4 h-4" />
                  <span>{formData.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="lg:w-2/3">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Information</h3>
            <p className="text-gray-600">Update your personal information and preferences.</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500"
                  />
                  <FiMail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                  <FiPhone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                  <FiMapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Title
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="e.g., Senior Graphic Designer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio / Description
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website / Portfolio
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-all flex items-center space-x-2"
                >
                  <FiSave className="w-5 h-5" />
                  <span>Save Changes</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-all"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;