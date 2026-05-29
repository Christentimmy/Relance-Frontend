// src/pages/dashboard/gigs/MyGigs.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../../layouts/DashboardLayout';
import Button from '../../../components/Button';
import Badge from '../../../components/Badge';
import Modal from '../../../components/Modal';
import EmptyState from '../../../components/EmptyState';
import SkeletonLoader from '../../../components/SkeletonLoader';
import { 
  EditIcon, 
  PauseIcon, 
  PlayIcon, 
  EyeIcon,
  BarChartIcon,
  MoreVerticalIcon,
  FilterIcon,
  SearchIcon,
  TrendingUpIcon,
  StarIcon
} from '../../../components/Icons';

const MyGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [filteredGigs, setFilteredGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGig, setSelectedGig] = useState(null);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState('');

  const filters = [
    { id: 'all', label: 'All Gigs', count: 12 },
    { id: 'active', label: 'Active', count: 8 },
    { id: 'paused', label: 'Paused', count: 2 },
    { id: 'pending', label: 'Pending Approval', count: 1 },
    { id: 'draft', label: 'Drafts', count: 1 },
  ];

  const stats = {
    totalEarnings: 15420.25,
    activeOrders: 8,
    avgRating: 4.9,
    viewsThisMonth: 1248,
    conversionRate: '12.5%'
  };

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      const mockGigs = [
        {
          id: 1,
          title: 'I will design a modern website UI/UX with Figma',
          image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
          price: 299,
          category: 'Graphics & Design',
          status: 'active',
          orders: 128,
          rating: 4.9,
          earnings: 38520,
          views: 2456,
          impressions: 12560,
          lastUpdated: '2 hours ago',
        },
        {
          id: 2,
          title: 'I will create professional logo design',
          image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
          price: 149,
          category: 'Graphics & Design',
          status: 'active',
          orders: 96,
          rating: 5.0,
          earnings: 14280,
          views: 1987,
          impressions: 8920,
          lastUpdated: '1 day ago',
        },
        {
          id: 3,
          title: 'I will build a responsive React application',
          image: 'https://images.unsplash.com/photo-1551434678-e076c223a692',
          price: 499,
          category: 'Programming & Tech',
          status: 'paused',
          orders: 56,
          rating: 4.8,
          earnings: 27944,
          views: 1567,
          impressions: 7230,
          lastUpdated: '3 days ago',
        },
        {
          id: 4,
          title: 'I will write engaging blog posts for your business',
          image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698',
          price: 99,
          category: 'Writing & Translation',
          status: 'active',
          orders: 203,
          rating: 4.7,
          earnings: 20097,
          views: 3124,
          impressions: 15420,
          lastUpdated: '5 hours ago',
        },
        {
          id: 5,
          title: 'I will create social media marketing strategy',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
          price: 199,
          category: 'Digital Marketing',
          status: 'pending',
          orders: 0,
          rating: 0,
          earnings: 0,
          views: 128,
          impressions: 560,
          lastUpdated: '1 week ago',
        },
        {
          id: 6,
          title: 'I will edit your videos professionally',
          image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698',
          price: 179,
          category: 'Video & Animation',
          status: 'draft',
          orders: 0,
          rating: 0,
          earnings: 0,
          views: 0,
          impressions: 0,
          lastUpdated: '2 weeks ago',
        },
      ];
      
      setGigs(mockGigs);
      setFilteredGigs(mockGigs);
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    let filtered = gigs;
    
    // Apply status filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(gig => gig.status === selectedFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(gig => 
        gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gig.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredGigs(filtered);
  }, [selectedFilter, searchQuery, gigs]);

  const handleGigAction = (gig, action) => {
    setSelectedGig(gig);
    setActionType(action);
    setIsActionModalOpen(true);
  };

  const confirmAction = () => {
    // Handle the action (pause, activate, delete, etc.)
    console.log(`${actionType} gig ${selectedGig.id}`);
    setIsActionModalOpen(false);
    setSelectedGig(null);
    setActionType('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" className="animate-pulse">Active</Badge>;
      case 'paused':
        return <Badge variant="warning">Paused</Badge>;
      case 'pending':
        return <Badge variant="pending">Pending</Badge>;
      case 'draft':
        return <Badge variant="error">Draft</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getActionText = (action) => {
    switch (action) {
      case 'pause':
        return 'Pause Gig';
      case 'activate':
        return 'Activate Gig';
      case 'delete':
        return 'Delete Gig';
      case 'promote':
        return 'Promote Gig';
      default:
        return 'Manage Gig';
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'pause':
        return <PauseIcon className="h-5 w-5" />;
      case 'activate':
        return <PlayIcon className="h-5 w-5" />;
      default:
        return <EditIcon className="h-5 w-5" />;
    }
  };

  return (
    <DashboardLayout userRole="seller">
      {/* Header */}
      <div className="mb-8 animate-fadeInUp">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Gigs</h1>
            <p className="text-gray-600 mt-2">
              Manage your services, track performance, and edit gig details
            </p>
          </div>
          <Link to="/dashboard/gigs/create">
            <Button
              variant="primary"
              className="mt-4 md:mt-0 group hover:scale-105 transition-transform duration-300"
            >
              + Create New Gig
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300">
            <div className="text-2xl font-bold text-gray-900">${stats.totalEarnings.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Earnings</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300">
            <div className="text-2xl font-bold text-gray-900">{stats.activeOrders}</div>
            <div className="text-sm text-gray-600">Active Orders</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300">
            <div className="text-2xl font-bold text-gray-900">{stats.avgRating}</div>
            <div className="text-sm text-gray-600">Avg. Rating</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300">
            <div className="text-2xl font-bold text-gray-900">{stats.viewsThisMonth}</div>
            <div className="text-sm text-gray-600">Monthly Views</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300">
            <div className="text-2xl font-bold text-gray-900">{stats.conversionRate}</div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                  selectedFilter === filter.id
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="font-medium">{filter.label}</span>
                <span className={`ml-2 text-xs ${
                  selectedFilter === filter.id ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search gigs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full md:w-64"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Gigs Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonLoader key={i} type="card" />
          ))}
        </div>
      ) : filteredGigs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeInUp stagger-list">
          {filteredGigs.map((gig) => (
            <div
              key={gig.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
            >
              {/* Gig Header */}
              <div className="relative h-48 bg-gray-100">
                <img
                  src={gig.image}
                  alt={gig.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                  {getStatusBadge(gig.status)}
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="text-2xl font-bold text-white drop-shadow-lg">
                    ${gig.price}
                  </div>
                </div>
              </div>

              {/* Gig Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                      {gig.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <span>{gig.category}</span>
                      <span className="mx-2">•</span>
                      <span>Updated {gig.lastUpdated}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                      <MoreVerticalIcon className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{gig.orders}</div>
                    <div className="text-xs text-gray-600">Orders</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{gig.views}</div>
                    <div className="text-xs text-gray-600">Views</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">${gig.earnings.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Earnings</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center">
                      <StarIcon className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-bold">{gig.rating || '--'}</span>
                    </div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link
                    to={`/gig/${gig.id}`}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      className="w-full group hover:scale-105 transition-transform duration-300"
                    >
                      <EyeIcon className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </Link>
                  
                  <Link
                    to={`/dashboard/gigs/edit/${gig.id}`}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      className="w-full group hover:scale-105 transition-transform duration-300"
                    >
                      <EditIcon className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  
                  <Button
                    variant={gig.status === 'active' ? 'outline' : 'primary'}
                    className="flex-1 group hover:scale-105 transition-transform duration-300"
                    onClick={() => handleGigAction(gig, gig.status === 'active' ? 'pause' : 'activate')}
                  >
                    {gig.status === 'active' ? (
                      <>
                        <PauseIcon className="h-4 w-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <PlayIcon className="h-4 w-4 mr-2" />
                        Activate
                      </>
                    )}
                  </Button>
                </div>

                {/* Quick Analytics */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    to={`/dashboard/gigs/analytics/${gig.id}`}
                    className="flex items-center justify-center text-green-600 hover:text-green-700 text-sm font-medium group"
                  >
                    <BarChartIcon className="h-4 w-4 mr-2" />
                    View Analytics
                    <TrendingUpIcon className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="🎨"
          title={searchQuery ? "No gigs found" : "No gigs yet"}
          description={
            searchQuery 
              ? "Try adjusting your search criteria"
              : "Create your first service to start earning on the platform"
          }
          actionText="Create Your First Gig"
          onAction={() => window.location.href = '/dashboard/gigs/create'}
        />
      )}

      {/* Performance Tips */}
      

      {/* Action Confirmation Modal */}
      <Modal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        title={selectedGig ? getActionText(actionType) : 'Confirm Action'}
      >
        <div className="p-6">
          {selectedGig && (
            <div className="mb-6">
              <div className="flex items-start space-x-4">
                <img
                  src={selectedGig.image}
                  alt={selectedGig.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 line-clamp-2">{selectedGig.title}</h4>
                  <div className="text-sm text-gray-600">${selectedGig.price} • {selectedGig.category}</div>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <p className="text-gray-600">
              {actionType === 'pause' && 'Pausing your gig will hide it from search results. Existing orders will continue.'}
              {actionType === 'activate' && 'Activating your gig will make it visible to buyers and available for orders.'}
              {actionType === 'delete' && 'Deleting your gig will remove it permanently. This action cannot be undone.'}
              {actionType === 'promote' && 'Promoting your gig will give it more visibility in search results for 7 days.'}
            </p>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsActionModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant={actionType === 'delete' ? 'danger' : 'primary'}
              className="flex-1 group hover:scale-105 transition-transform duration-300"
              onClick={confirmAction}
            >
              {getActionText(actionType)}
              {actionType === 'activate' && (
                <PlayIcon className="h-5 w-5 ml-2 transform group-hover:scale-110 transition-transform duration-300" />
              )}
              {actionType === 'pause' && (
                <PauseIcon className="h-5 w-5 ml-2 transform group-hover:scale-110 transition-transform duration-300" />
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default MyGigs;