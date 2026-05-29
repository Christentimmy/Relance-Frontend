// src/pages/dashboard/SellerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/Button';
import OrderCard from '../../components/OrderCard';
import GigCard from '../../components/GigCard';
import Badge from '../../components/Badge';
import SkeletonLoader from '../../components/SkeletonLoader';
import EmptyState from '../../components/EmptyState';
import Modal from '../../components/Modal';
import { 
  DollarIcon, 
  TrendingUpIcon, 
  UserIcon, 
  CalendarIcon,
  VideoIcon,
  StarIcon,
  BarChartIcon,
  ZapIcon,
  TargetIcon,
  ClockIcon
} from '../../components/Icons';

const SellerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [activeGigs, setActiveGigs] = useState([]);
  const [inProgressOrders, setInProgressOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [callStatus, setCallStatus] = useState('ready');
  const [earningsData, setEarningsData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [1200, 1800, 2400, 2100, 2800, 3200]
  });

  useEffect(() => {
    // Simulate API calls
    setIsLoading(true);
    
    setTimeout(() => {
      setStats({
        availableBalance: 2850.75,
        pendingClearance: 1200.50,
        totalEarnings: 15420.25,
        platformFees: 771.01,
        activeGigs: 5,
        activeOrders: 8,
        responseRate: '98%',
        avgRating: 4.9,
        totalClients: 42,
        repeatClients: 28,
      });

      setActiveGigs([
        {
          id: 1,
          image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
          title: 'Professional Website UI/UX Design',
          seller: { name: 'You', isVerified: true },
          rating: 4.9,
          reviews: 128,
          price: 499,
          deliveryTime: '5 Days',
          status: 'active',
        },
        {
          id: 2,
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
          title: 'Mobile App Design with Prototype',
          seller: { name: 'You', isVerified: true },
          rating: 5.0,
          reviews: 96,
          price: 799,
          deliveryTime: '7 Days',
          status: 'active',
        },
      
      ]);

      setInProgressOrders([
        {
          id: 1,
          title: 'E-commerce Dashboard Design',
          status: 'in_progress',
          buyer: { name: 'TechStart Inc' },
          seller: { name: 'You' },
          amount: 850,
          deadline: '2024-02-12',
          progress: 75,
          actions: ['Deliver', 'Request Extension'],
        },
        {
          id: 2,
          title: 'Mobile Banking App UI',
          status: 'in_progress',
          buyer: { name: 'Finance Corp' },
          seller: { name: 'You' },
          amount: 1200,
          deadline: '2024-02-18',
          progress: 40,
          actions: ['Update', 'Message'],
        },
       
      ]);

      setIsLoading(false);
    }, 1500);
  }, []);

  const handleStartCall = () => {
    setIsCallModalOpen(true);
    setCallStatus('connecting');
    
    // Simulate call connection
    setTimeout(() => {
      setCallStatus('connected');
    }, 2000);
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      setIsCallModalOpen(false);
      setCallStatus('ready');
    }, 1000);
  };

  const handleGigAction = (gigId, action) => {
    console.log(`Action ${action} on gig ${gigId}`);
    // Handle gig actions (pause, edit, etc.)
  };

  if (isLoading) {
    return (
      <DashboardLayout userRole="seller">
        <div className="space-y-6">
          <SkeletonLoader type="card" count={1} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SkeletonLoader type="card" count={1} />
            <SkeletonLoader type="card" count={1} />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="seller">
      {/* 🔹 Section 1: Dashboard Header */}
      <div className="animate-fadeInUp">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <div className="flex items-center mb-2">
             
             
             
            </div>
           
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button
              variant="outline"
              className="group hover:scale-105 transition-transform duration-300"
              onClick={() => console.log('Analytics')}
            >
              <BarChartIcon className="h-5 w-5 mr-2" />
              Analytics
            </Button>
            <Button
              variant="primary"
              className="group hover:scale-105 transition-transform duration-300"
              onClick={() => console.log('Create New Gig')}
            >
              <span className="mr-2">+</span>
              Create New Gig
            </Button>
          </div>
        </div>
      </div>

      {/* 🔹 Section 2: Earnings Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
            {/* Available Balance */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <DollarIcon className="h-6 w-6 text-white" />
                </div>
                <Badge variant="success" className="bg-white/20 text-white border-0 animate-pulse">
                  Available
                </Badge>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">
                ${stats.availableBalance.toLocaleString()}
              </h3>
              <p className="text-green-100">Available Balance</p>
              <div className="mt-6 pt-6 border-t border-green-400/30">
                <Button
                  variant="outline"
                  className="w-full bg-white text-green-600 hover:bg-gray-100 hover:scale-105 transition-transform duration-300"
                >
                  Withdraw Funds
                </Button>
              </div>
            </div>

            {/* Pending Clearance */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <ClockIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <Badge variant="warning">{stats.activeOrders} orders</Badge>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                ${stats.pendingClearance.toLocaleString()}
              </h3>
              <p className="text-gray-600">Pending Clearance</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  Clears in 3-5 days
                </div>
              </div>
            </div>
          </div>

          {/* Total Earnings & Platform Fees */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-xl mr-4">
                  <TrendingUpIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Total Earnings</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    ${stats.totalEarnings.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  style={{ width: '85%' }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>This month</span>
                <span>+12.5%</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-100 rounded-xl mr-4">
                  <TargetIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Platform Fees</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    ${stats.platformFees.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <div className="flex justify-between mb-1">
                  <span>Service fee (10%)</span>
                  <span>${(stats.totalEarnings * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing fee (2%)</span>
                  <span>${(stats.totalEarnings * 0.02).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 h-full">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Performance</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <StarIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Rating</div>
                    <div className="text-sm text-gray-500">{stats.avgRating}/5.0</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600">{stats.avgRating}</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <ZapIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Response Rate</div>
                    <div className="text-sm text-gray-500">Last 30 days</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600">{stats.responseRate}</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <UserIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Clients</div>
                    <div className="text-sm text-gray-500">Total & repeat</div>
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{stats.totalClients}</div>
                  <div className="text-sm text-gray-500">{stats.repeatClients} repeat</div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <Link
                  to="/dashboard/analytics"
                  className="flex items-center justify-center text-green-600 hover:text-green-700 font-medium text-sm py-2 hover:scale-105 transition-transform duration-300"
                >
                  View detailed analytics →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 🔹 Section 3: Active Gigs */}
        <div>
          <div className="mb-6 flex items-center justify-between animate-fadeInUp" style={{ animationDelay: '400ms' }}>
            <h2 className="text-2xl font-bold text-gray-900">Active Gigs</h2>
            <div className="flex items-center space-x-2">
              <Badge variant="success">{stats.activeGigs} Active</Badge>
              <Link to="/dashboard/gigs" className="text-green-600 hover:text-green-700 font-medium text-sm">
                Manage all
              </Link>
            </div>
          </div>

          {activeGigs.length > 0 ? (
            <div className="space-y-6 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
              {activeGigs.map((gig, index) => (
                <div
                  key={gig.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold text-gray-900 mr-3">{gig.title}</h3>
                          <Badge variant={gig.status === 'active' ? 'success' : 'warning'}>
                            {gig.status === 'active' ? 'Active' : 'Paused'}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <StarIcon className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-semibold">{gig.rating}</span>
                          <span className="ml-1">({gig.reviews} reviews)</span>
                          <span className="mx-2">•</span>
                          <span>${gig.price}</span>
                          <span className="mx-2">•</span>
                          <span>{gig.deliveryTime}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <img
                          src={gig.image}
                          alt={gig.title}
                          className="w-20 h-20 rounded-lg object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 hover:scale-105 transition-transform duration-300"
                        onClick={() => handleGigAction(gig.id, 'edit')}
                      >
                        Edit
                      </Button>
                      <Button
                        variant={gig.status === 'active' ? 'outline' : 'primary'}
                        size="sm"
                        className="flex-1 hover:scale-105 transition-transform duration-300"
                        onClick={() => handleGigAction(gig.id, gig.status === 'active' ? 'pause' : 'activate')}
                      >
                        {gig.status === 'active' ? 'Pause' : 'Activate'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:scale-105 transition-transform duration-300"
                      >
                        Analytics
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon="🎨"
              title="No active gigs"
              description="Create your first service to start earning"
              actionText="Create New Gig"
            />
          )}

          {/* Quick Gig Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 animate-fadeInUp" style={{ animationDelay: '900ms' }}>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md transition-shadow duration-300">
              <div className="text-lg font-bold text-gray-900">128</div>
              <div className="text-xs text-gray-600">Total Orders</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md transition-shadow duration-300">
              <div className="text-lg font-bold text-gray-900">96%</div>
              <div className="text-xs text-gray-600">Completion Rate</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md transition-shadow duration-300">
              <div className="text-lg font-bold text-gray-900">2.1</div>
              <div className="text-xs text-gray-600">Avg. Delivery Days</div>
            </div>
          </div>
        </div>

        {/* 🔹 Section 4: Orders In Progress & Call CTA */}
        <div>
          {/* Orders In Progress */}
          <div className="mb-8">
            <div className="mb-6 flex items-center justify-between animate-fadeInUp" style={{ animationDelay: '400ms' }}>
              <h2 className="text-2xl font-bold text-gray-900">Orders In Progress</h2>
              <Badge variant="warning">{inProgressOrders.length} Active</Badge>
            </div>

            {inProgressOrders.length > 0 ? (
              <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
                {inProgressOrders.map((order, index) => (
                  <div
                    key={order.id}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                  >
                    <OrderCard order={order} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon=""
                title="No orders in progress"
                description="When you receive orders, they'll appear here"
                actionText="Promote Your Gigs"
              />
            )}
          </div>

          {/* 🔹 Section 5: Call Client */}
         
        </div>
      </div>

      {/* Call Modal */}
      <Modal
        isOpen={isCallModalOpen}
        onClose={() => {
          if (callStatus !== 'connecting') {
            setIsCallModalOpen(false);
            setCallStatus('ready');
          }
        }}
        title={callStatus === 'connected' ? 'Call in Progress' : 'Connecting Call...'}
      >
        <div className="text-center p-8">
          {callStatus === 'connecting' && (
            <>
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-6 animate-pulse">
                <VideoIcon className="h-16 w-16 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Connecting to client...</h3>
              <p className="text-gray-600 mb-6">Please wait while we establish the connection</p>
              <div className="flex justify-center">
                <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
              </div>
            </>
          )}

          {callStatus === 'connected' && (
            <>
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto">
                  <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-purple-600">JD</span>
                  </div>
                </div>
                <div className="absolute bottom-2 right-1/4 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Connected with John Doe</h3>
              <p className="text-gray-600 mb-2">Website Redesign Project</p>
              <p className="text-3xl font-bold text-gray-900 mb-8">14:32</p>
              
              <div className="flex justify-center space-x-4">
                <button className="w-12 h-12 bg-red-500 text-white rounded-full hover:scale-110 transition-transform duration-300">
                  <span className="text-lg">✕</span>
                </button>
                <button className="w-12 h-12 bg-green-500 text-white rounded-full hover:scale-110 transition-transform duration-300">
                  <span className="text-lg">✓</span>
                </button>
                <button className="w-12 h-12 bg-blue-500 text-white rounded-full hover:scale-110 transition-transform duration-300">
                  <span className="text-lg">⏸</span>
                </button>
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Note:</span> This call is being recorded for quality assurance.
                </p>
              </div>
            </>
          )}

          {callStatus === 'ended' && (
            <>
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <VideoIcon className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Ended</h3>
              <p className="text-gray-600 mb-6">Duration: 14 minutes 32 seconds</p>
              <Button
                variant="primary"
                className="w-full hover:scale-105 transition-transform duration-300"
                onClick={() => setIsCallModalOpen(false)}
              >
                Close
              </Button>
            </>
          )}
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default SellerDashboard;