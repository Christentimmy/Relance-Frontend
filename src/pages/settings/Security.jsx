import React, { useState } from 'react';
import { FiLock, FiEye, FiEyeOff, FiShield, FiGlobe, FiLogOut } from 'react-icons/fi';

const Security = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const activeSessions = [
    {
      id: 1,
      device: 'MacBook Pro (Chrome)',
      location: 'New York, USA',
      ip: '192.168.1.1',
      lastActive: '2 hours ago',
      current: true
    },
    {
      id: 2,
      device: 'iPhone 14 (Safari)',
      location: 'New York, USA',
      ip: '192.168.1.2',
      lastActive: '1 day ago',
      current: false
    },
    {
      id: 3,
      device: 'Windows PC (Firefox)',
      location: 'London, UK',
      ip: '192.168.1.3',
      lastActive: '1 week ago',
      current: false
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // In real app, this would make an API call
    console.log('Changing password:', formData);
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleLogoutSession = (sessionId) => {
    console.log('Logging out session:', sessionId);
  };

  const handleLogoutAll = () => {
    console.log('Logging out all sessions');
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Settings</h3>
        <p className="text-gray-600">Manage your account security and access.</p>
      </div>

      <div className="space-y-8">
        {/* Change Password Section */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FiLock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Change Password</h4>
              <p className="text-gray-600">Update your password to keep your account secure</p>
            </div>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-all"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FiShield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h4>
                <p className="text-gray-600">Add an extra layer of security to your account</p>
              </div>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${twoFactorEnabled ? 'bg-green-500' : 'bg-gray-300'}
              `}
            >
              <span className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}
              `} />
            </button>
          </div>

          <div className={`p-4 rounded-xl ${twoFactorEnabled ? 'bg-green-50 border border-green-200' : 'bg-gray-100'}`}>
            <p className={`text-sm ${twoFactorEnabled ? 'text-green-700' : 'text-gray-600'}`}>
              {twoFactorEnabled 
                ? '✅ Two-factor authentication is enabled. You will be required to enter a verification code when signing in.'
                : 'Two-factor authentication adds an extra layer of security. When enabled, you\'ll need to enter a verification code from your authenticator app.'}
            </p>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FiGlobe className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Active Sessions</h4>
                <p className="text-gray-600">Manage your active login sessions</p>
              </div>
            </div>
            <button
              onClick={handleLogoutAll}
              className="px-4 py-2 border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-colors"
            >
              Logout All
            </button>
          </div>

          <div className="space-y-4">
            {activeSessions.map((session) => (
              <div key={session.id} className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h5 className="font-medium text-gray-900">{session.device}</h5>
                          {session.current && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                              Current Session
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{session.location}</span>
                          <span>•</span>
                          <span>IP: {session.ip}</span>
                          <span>•</span>
                          <span>Last active: {session.lastActive}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!session.current && (
                    <button
                      onClick={() => handleLogoutSession(session.id)}
                      className="ml-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;