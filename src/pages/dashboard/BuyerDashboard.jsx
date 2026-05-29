// src/pages/dashboard/BuyerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/Button';
import OrderCard from '../../components/OrderCard';
import Badge from '../../components/Badge';
import SkeletonLoader from '../../components/SkeletonLoader';
import EmptyState from '../../components/EmptyState';
import Modal from '../../components/Modal';
import { 
  MessageIcon, 
  WalletIcon, 
  PackageIcon, 
  ClockIcon,
  ArrowUpRightIcon,
  TrendingUpIcon,
  BellIcon,
  CreditCardIcon
} from '../../components/Icons';

const BuyerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [activeOrders, setActiveOrders] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [newJobData, setNewJobData] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '7',
  });

  useEffect(() => {
    // Simulate API calls
    setIsLoading(true);
    
    setTimeout(() => {
      setStats({
        activeOrders: 3,
        pendingDeliveries: 2,
        unreadMessages: 5,
        walletBalance: 1250.50,
        totalSpent: 4850.00,
        savedGigs: 12,
        completedOrders: 28,
      });

      setActiveOrders([
        {
          id: 1,
          title: 'Website Redesign for E-commerce Store',
          status: 'in_progress',
          buyer: { name: 'You' },
          seller: { name: 'DesignPro Studio' },
          amount: 1200,
          deadline: '2024-02-15',
          progress: 65,
          actions: ['View Details', 'Message'],
        },
        {
          id: 2,
          title: 'Social Media Marketing Campaign',
          status: 'pending',
          buyer: { name: 'You' },
          seller: { name: 'Growth Marketing Co' },
          amount: 800,
          deadline: '2024-02-10',
          actions: ['Approve', 'Request Revision'],
        },
        {
          id: 3,
          title: 'Mobile App UI/UX Design',
          status: 'delivered',
          buyer: { name: 'You' },
          seller: { name: 'Creative Design Agency' },
          amount: 1500,
          deadline: '2024-02-05',
          actions: ['Review', 'Release Payment'],
        },
      ]);

      setRecentMessages([
        {
          id: 1,
          sender: { name: 'DesignPro Studio', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' },
          lastMessage: 'I\'ve sent the initial wireframes. Let me know your thoughts!',
          time: '2 hours ago',
          unread: true,
        },
        {
          id: 2,
          sender: { name: 'Growth Marketing Co', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786' },
          lastMessage: 'The campaign analytics are looking great so far!',
          time: '1 day ago',
          unread: false,
        },
        {
          id: 3,
          sender: { name: 'Creative Design Agency', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
          lastMessage: 'Thank you for the prompt payment!',
          time: '3 days ago',
          unread: false,
        },
      ]);

      setIsLoading(false);
    }, 1500);
  }, []);

  const handlePostJob = () => {
    setIsPostJobModalOpen(true);
  };

  const handleSubmitJob = () => {
    // Handle job posting logic
    setIsPostJobModalOpen(false);
    setNewJobData({
      title: '',
      description: '',
      budget: '',
      deadline: '7',
    });
  };

  if (isLoading) {
    return (
      <DashboardLayout userRole="buyer">
        <div className="space-y-6">
          <SkeletonLoader type="card" count={1} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
          <SkeletonLoader type="card" count={2} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="buyer">
      {/* 🔹 Section 1: Dashboard Header */}
      <div className="animate-fadeInUp">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
           
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button
              variant="outline"
              className="group hover:scale-105 transition-transform duration-300"
              onClick={() => console.log('Explore gigs')}
            >
              Explore Gigs
              <ArrowUpRightIcon className="ml-2 h-5 w-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Button>
            <Button
              variant="primary"
              className="group hover:scale-105 transition-transform duration-300"
              onClick={handlePostJob}
            >
              Post a Job
              <span className="ml-2 transform group-hover:rotate-90 transition-transform duration-300">+</span>
            </Button>
          </div>
        </div>
      </div>

      {/* 🔹 Section 2: Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
        {/* Active Orders */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <PackageIcon className="h-6 w-6 text-blue-600" />
            </div>
            <Badge variant="success" className="animate-pulse">{stats.activeOrders} Active</Badge>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.activeOrders}</h3>
          <p className="text-gray-600">Active Orders</p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-sm text-blue-600">
              <TrendingUpIcon className="h-4 w-4 mr-1" />
              <span>+2 this week</span>
            </div>
          </div>
        </div>

        {/* Pending Deliveries */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <Badge variant="warning">{stats.pendingDeliveries} Pending</Badge>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.pendingDeliveries}</h3>
          <p className="text-gray-600">Pending Deliveries</p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-600">
              <ClockIcon className="h-4 w-4 mr-1" />
              <span>Next: 2 days</span>
            </div>
          </div>
        </div>

        {/* Unread Messages */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <MessageIcon className="h-6 w-6 text-purple-600" />
            </div>
            {stats.unreadMessages > 0 && (
              <Badge variant="error" className="animate-pulse">{stats.unreadMessages} New</Badge>
            )}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.unreadMessages}</h3>
          <p className="text-gray-600">Unread Messages</p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link to="/dashboard/messages" className="flex items-center text-sm text-purple-600 hover:text-purple-700">
              View messages
              <ArrowUpRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Wallet Balance */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 group">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
              <WalletIcon className="h-6 w-6 text-white" />
            </div>
            <Badge variant="success" className="bg-white/20 text-white border-0">Active</Badge>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">${stats.walletBalance.toLocaleString()}</h3>
          <p className="text-green-100">Wallet Balance</p>
          <div className="mt-6 pt-6 border-t border-green-400/30">
            <div className="flex items-center justify-between">
              <span className="text-green-100 text-sm">Total spent</span>
              <span className="text-white font-semibold">${stats.totalSpent.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 🔹 Section 3: Active Orders */}
        <div className="lg:col-span-2">
          <div className="mb-6 flex items-center justify-between animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl font-bold text-gray-900">Active Orders</h2>
            <Link to="/dashboard/orders" className="text-green-600 hover:text-green-700 font-medium flex items-center group">
              View all
              <ArrowUpRightIcon className="ml-1 h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Link>
          </div>

          {activeOrders.length > 0 ? (
            <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
              {activeOrders.map((order, index) => (
                <div
                  key={order.id}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <OrderCard order={order} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon=""
              title="No active orders"
              description="When you place orders, they'll appear here"
              actionText="Explore Services"
            />
          )}

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fadeInUp" style={{ animationDelay: '700ms' }}>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md transition-shadow duration-300">
              <div className="text-2xl font-bold text-gray-900">{stats.completedOrders}</div>
              <div className="text-sm text-gray-600">Completed Orders</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md transition-shadow duration-300">
              <div className="text-2xl font-bold text-gray-900">{stats.savedGigs}</div>
              <div className="text-sm text-gray-600">Saved Gigs</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md transition-shadow duration-300">
              <div className="text-2xl font-bold text-gray-900">4.8</div>
              <div className="text-sm text-gray-600">Avg. Seller Rating</div>
            </div>
          </div>
        </div>

        {/* 🔹 Section 4: Messages Preview */}
        <div>
          <div className="mb-6 flex items-center justify-between animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl font-bold text-gray-900">Recent Messages</h2>
            <Badge variant="error" className="animate-pulse">{stats.unreadMessages} unread</Badge>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-fadeInUp" style={{ animationDelay: '300ms' }}>
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Conversations</h3>
                <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-300">
                  New Message
                </Button>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {recentMessages.map((message, index) => (
                <Link
                  key={message.id}
                  to={`/dashboard/messages/${message.id}`}
                  className={`block p-4 hover:bg-gray-50 transition-colors duration-300 animate-fadeInUp ${
                    message.unread ? 'bg-blue-50 hover:bg-blue-100' : ''
                  }`}
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={message.sender.avatar}
                        alt={message.sender.name}
                        className="w-12 h-12 rounded-full border-2 border-white"
                      />
                      {message.unread && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 truncate">
                          {message.sender.name}
                          {message.unread && (
                            <span className="ml-2 text-xs font-semibold text-red-600 animate-pulse">NEW</span>
                          )}
                        </h4>
                        <span className="text-xs text-gray-500">{message.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {message.lastMessage}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <Link
                to="/dashboard/messages"
                className="block text-center text-green-600 hover:text-green-700 font-medium text-sm py-2 hover:scale-105 transition-transform duration-300"
              >
                View all conversations →
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 space-y-4 animate-fadeInUp" style={{ animationDelay: '800ms' }}>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-xl mr-4">
                  <BellIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Notifications</h4>
                  <p className="text-sm text-gray-600">Stay updated on your orders</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full hover:scale-105 transition-transform duration-300">
                Configure Alerts
              </Button>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-100 rounded-xl mr-4">
                  <CreditCardIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Payment Methods</h4>
                  <p className="text-sm text-gray-600">Add or manage payment options</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full hover:scale-105 transition-transform duration-300">
                Manage Payments
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Post Job Modal */}
      <Modal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        title="Post a New Job"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <input
              type="text"
              value={newJobData.title}
              onChange={(e) => setNewJobData({...newJobData, title: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
              placeholder="e.g., Website Redesign for E-commerce Store"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={newJobData.description}
              onChange={(e) => setNewJobData({...newJobData, description: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
              rows="4"
              placeholder="Describe your project requirements..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget ($)
              </label>
              <input
                type="number"
                value={newJobData.budget}
                onChange={(e) => setNewJobData({...newJobData, budget: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                placeholder="500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deadline (days)
              </label>
              <select
                value={newJobData.deadline}
                onChange={(e) => setNewJobData({...newJobData, deadline: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
              >
                <option value="3">3 days</option>
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="30">30 days</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsPostJobModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1 group hover:scale-105 transition-transform duration-300"
              onClick={handleSubmitJob}
              disabled={!newJobData.title || !newJobData.description}
            >
              Post Job
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default BuyerDashboard;