// src/pages/dashboard/orders/Orders.jsx
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import DashboardLayout from '../../../layouts/DashboardLayout';
import Button from '../../../components/Button';
import OrderCard from '../../../components/OrderCard';
import Badge from '../../../components/Badge';
import EmptyState from '../../../components/EmptyState';
import SkeletonLoader from '../../../components/SkeletonLoader';
import { 
  FilterIcon, 
  SearchIcon, 
  DownloadIcon,
  CalendarIcon,
  TrendingUpIcon,
  RefreshIcon
} from '../../../components/Icons';

const Orders = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [stats, setStats] = useState(null);

  const tabs = [
    { id: 'all', label: 'All Orders', count: 12 },
    { id: 'active', label: 'Active', count: 3 },
    { id: 'in_progress', label: 'In Progress', count: 5 },
    { id: 'delivered', label: 'Delivered', count: 2 },
    { id: 'completed', label: 'Completed', count: 8 },
    { id: 'cancelled', label: 'Cancelled', count: 1 },
  ];

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      const mockOrders = [
        {
          id: 1,
          title: 'Website Redesign for E-commerce Store',
          status: 'active',
          buyer: { name: 'You' },
          seller: { name: 'DesignPro Studio' },
          amount: 1200,
          deadline: '2024-02-15',
          progress: 65,
          orderDate: '2024-02-01',
          deliveryDate: '2024-02-15',
          actions: ['View Details', 'Message'],
        },
        {
          id: 2,
          title: 'Social Media Marketing Campaign',
          status: 'in_progress',
          buyer: { name: 'You' },
          seller: { name: 'Growth Marketing Co' },
          amount: 800,
          deadline: '2024-02-10',
          progress: 40,
          orderDate: '2024-01-25',
          deliveryDate: '2024-02-10',
          actions: ['Track Progress', 'Request Update'],
        },
        {
          id: 3,
          title: 'Mobile App UI/UX Design',
          status: 'delivered',
          buyer: { name: 'You' },
          seller: { name: 'Creative Design Agency' },
          amount: 1500,
          deadline: '2024-02-05',
          orderDate: '2024-01-20',
          deliveryDate: '2024-02-05',
          actions: ['Review & Approve', 'Request Revision'],
        },
        {
          id: 4,
          title: 'Logo and Brand Identity Package',
          status: 'completed',
          buyer: { name: 'TechStart Inc' },
          seller: { name: 'You' },
          amount: 450,
          deadline: '2024-01-30',
          orderDate: '2024-01-15',
          deliveryDate: '2024-01-30',
          actions: ['View Details', 'Contact Buyer'],
        },
        {
          id: 5,
          title: 'E-commerce Website Development',
          status: 'active',
          buyer: { name: 'Retail Solutions' },
          seller: { name: 'You' },
          amount: 2500,
          deadline: '2024-03-01',
          progress: 30,
          orderDate: '2024-02-01',
          deliveryDate: '2024-03-01',
          actions: ['Update Progress', 'Message'],
        },
        {
          id: 6,
          title: 'Content Writing - 10 Blog Posts',
          status: 'cancelled',
          buyer: { name: 'You' },
          seller: { name: 'Content Creators Ltd' },
          amount: 600,
          deadline: '2024-01-25',
          orderDate: '2024-01-10',
          deliveryDate: '2024-01-25',
          actions: ['View Details', 'Reorder'],
        },
      ];

      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      
      setStats({
        totalOrders: 12,
        activeOrders: 3,
        totalRevenue: 15420,
        pendingClearance: 2850,
        avgDeliveryTime: '4.2 days',
        completionRate: '96%',
      });
      
      setIsLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    // Update URL when tab changes
    if (activeTab) {
      setSearchParams({ tab: activeTab });
    }
  }, [activeTab, setSearchParams]);

  useEffect(() => {
    // Filter orders based on active tab and search query
    let filtered = orders;

    // Apply tab filter
    if (activeTab !== 'all') {
      filtered = filtered.filter(order => order.status === activeTab);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.buyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.seller.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  }, [activeTab, searchQuery, orders]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportOrders = () => {
    console.log('Exporting orders...');
    // Export logic would go here
  };

  return (
    <DashboardLayout userRole="buyer">
      {/* Header Section */}
      <div className="mb-8 animate-fadeInUp">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-600 mt-2">
              Track, manage, and review all your orders in one place
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button
              variant="outline"
              className="group hover:scale-105 transition-transform duration-300"
              onClick={handleExportOrders}
            >
              <DownloadIcon className="h-5 w-5 mr-2" />
              Export
            </Button>
            <Link to="/explore">
              <Button
                variant="primary"
                className="group hover:scale-105 transition-transform duration-300"
              >
                Order New Service
                <span className="ml-2 transform group-hover:rotate-90 transition-transform duration-300">+</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
            <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300">
              <div className="text-2xl font-bold text-gray-900">{stats.totalOrders}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300">
              <div className="text-2xl font-bold text-gray-900">{stats.activeOrders}</div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300">
              <div className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300">
              <div className="text-2xl font-bold text-gray-900">${stats.pendingClearance.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300">
              <div className="text-2xl font-bold text-gray-900">{stats.avgDeliveryTime}</div>
              <div className="text-sm text-gray-600">Avg. Delivery</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300">
              <div className="text-2xl font-bold text-gray-900">{stats.completionRate}</div>
              <div className="text-sm text-gray-600">Completion Rate</div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs and Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Tabs */}
          <div className="overflow-x-auto">
            <div className="flex space-x-1 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`
                    relative px-4 py-3 font-medium text-sm transition-all duration-300
                    ${activeTab === tab.id
                      ? 'text-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                    }
                  `}
                >
                  <span className="flex items-center">
                    {tab.label}
                    <span className={`
                      ml-2 px-2 py-0.5 text-xs rounded-full
                      ${activeTab === tab.id
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                      }
                    `}>
                      {tab.count}
                    </span>
                  </span>
                  
                  {/* Animated underline */}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 animate-slideInRight"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full lg:w-64"
              />
            </div>
            <Button
              variant="outline"
              className="hover:scale-105 transition-transform duration-300"
              onClick={() => console.log('Open filters')}
            >
              <FilterIcon className="h-5 w-5 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="animate-fadeInUp" style={{ animationDelay: '300ms' }}>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-4 stagger-list">
            {filteredOrders.map((order, index) => (
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
            icon="📦"
            title={searchQuery ? "No orders found" : "No orders yet"}
            description={
              searchQuery
                ? "Try adjusting your search or filter criteria"
                : activeTab === 'all'
                ? "When you place orders, they'll appear here"
                : `You don't have any ${tabs.find(t => t.id === activeTab)?.label?.toLowerCase()} orders`
            }
            actionText={activeTab === 'all' ? "Explore Services" : "View All Orders"}
            onAction={() => activeTab === 'all' ? window.location.href = '/explore' : handleTabChange('all')}
          />
        )}
      </div>

      {/* Help Card */}
      {!isLoading && filteredOrders.length > 0 && (
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-8 animate-fadeInUp" style={{ animationDelay: '800ms' }}>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <RefreshIcon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-900 mb-2">Need Help With an Order?</h3>
              <p className="text-blue-800 mb-4">
                Our support team is here to help resolve any issues with your orders
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className="bg-white border-blue-300 text-blue-700 hover:bg-blue-50 hover:scale-105 transition-transform duration-300"
                >
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="bg-white border-blue-300 text-blue-700 hover:bg-blue-50 hover:scale-105 transition-transform duration-300"
                >
                  Dispute Resolution
                </Button>
                <Button
                  variant="outline"
                  className="bg-white border-blue-300 text-blue-700 hover:bg-blue-50 hover:scale-105 transition-transform duration-300"
                >
                  Refund Policy
                </Button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-900">24/7</div>
                <div className="text-blue-800">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Orders;