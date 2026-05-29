// src/pages/dashboard/orders/OrderDetails.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../../layouts/DashboardLayout';
import Button from '../../../components/Button';
import Badge from '../../../components/Badge';
import Modal from '../../../components/Modal';
import Loader from '../../../components/Loader';
import { 
  ArrowLeftIcon,
  DownloadIcon,
  UploadIcon,
  MessageIcon,
  VideoIcon,
  CheckCircleIcon,
  ClockIcon,
  DollarIcon,
  ShieldIcon,
  FileIcon,
  EyeIcon,
  StarIcon,
  CalendarIcon,
  UserIcon
} from '../../../components/Icons';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [isDeliverModalOpen, setIsDeliverModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [callStatus, setCallStatus] = useState('ready');
  const [deliveredFiles, setDeliveredFiles] = useState([]);
  const [newDelivery, setNewDelivery] = useState({
    message: '',
    files: [],
  });
  const [userRole] = useState('buyer'); // 'buyer' or 'seller'

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'deliverables', label: 'Deliverables' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'payments', label: 'Payments' },
    { id: 'messages', label: 'Messages' },
  ];

  const timelineSteps = [
    { id: 1, label: 'Order Placed', status: 'completed', date: 'Feb 1, 2024', time: '10:30 AM' },
    { id: 2, label: 'Work Started', status: 'completed', date: 'Feb 2, 2024', time: '2:15 PM' },
    { id: 3, label: 'In Progress', status: 'current', date: 'Feb 5, 2024', time: '9:00 AM' },
    { id: 4, label: 'Delivered', status: 'pending', date: 'Feb 15, 2024', time: 'Estimated' },
    { id: 5, label: 'Completed', status: 'pending', date: 'After approval', time: '' },
  ];

  const paymentBreakdown = {
    totalAmount: 1200,
    breakdown: [
      { label: 'Service Fee (10%)', amount: 120 },
      { label: 'Processing Fee (2%)', amount: 24 },
    ],
    escrow: {
      released: 600,
      held: 600,
      pending: 420,
    },
    status: 'active',
  };

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setOrder({
        id: 1,
        title: 'Website Redesign for E-commerce Store',
        description: 'Complete redesign of e-commerce website with modern UI/UX, responsive design, and improved user flow.',
        status: 'active',
        orderId: 'ORD-2024-00123',
        buyer: {
          name: 'John Smith',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
          rating: 4.9,
          completedOrders: 42,
        },
        seller: {
          name: 'DesignPro Studio',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786',
          rating: 4.9,
          completedOrders: 156,
          responseTime: '1 hour',
        },
        amount: 1200,
        orderDate: '2024-02-01',
        deadline: '2024-02-15',
        deliveryDate: null,
        progress: 65,
        requirements: [
          'Modern and clean design',
          'Mobile responsive',
          'E-commerce functionality',
          'SEO optimized',
          'Fast loading times',
        ],
        messages: [
          { id: 1, sender: 'buyer', message: 'Can we include dark mode?', time: '2 hours ago' },
          { id: 2, sender: 'seller', message: 'Yes, I can add dark mode to the design', time: '1 hour ago' },
        ],
      });

      setDeliveredFiles([
        { id: 1, name: 'homepage-design.fig', size: '2.4 MB', type: 'figma', uploaded: '2024-02-05' },
        { id: 2, name: 'wireframes.pdf', size: '1.8 MB', type: 'pdf', uploaded: '2024-02-04' },
        { id: 3, name: 'style-guide.pdf', size: '3.2 MB', type: 'pdf', uploaded: '2024-02-03' },
      ]);

      setIsLoading(false);
    }, 1500);
  }, [id]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type.split('/')[1] || 'file',
    }));
    
    setNewDelivery(prev => ({
      ...prev,
      files: [...prev.files, ...newFiles]
    }));
  };

  const handleRemoveFile = (fileId) => {
    setNewDelivery(prev => ({
      ...prev,
      files: prev.files.filter(f => f.id !== fileId)
    }));
  };

  const handleDeliverOrder = () => {
    setIsDeliverModalOpen(false);
    // Simulate delivery
    setDeliveredFiles(prev => [...prev, ...newDelivery.files]);
    setNewDelivery({ message: '', files: [] });
    // Show success message
  };

  const handleStartCall = () => {
    setIsCallModalOpen(true);
    setCallStatus('connecting');
    
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

  const handleCompleteOrder = () => {
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = () => {
    setIsReviewModalOpen(false);
    // Show success message
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green';
      case 'in_progress': return 'blue';
      case 'delivered': return 'yellow';
      case 'completed': return 'green';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'in_progress': return 'In Progress';
      case 'delivered': return 'Delivered';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout userRole={userRole}>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader text="Loading order details..." />
        </div>
      </DashboardLayout>
    );
  }

  if (!order) {
    return (
      <DashboardLayout userRole={userRole}>
        <div className="text-center py-12">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">The order you're looking for doesn't exist or you don't have permission to view it.</p>
          <Button variant="primary" onClick={() => navigate('/dashboard/orders')}>
            Back to Orders
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole={userRole}>
      {/* Header */}
      <div className="mb-8 animate-fadeInUp">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button
              variant="outline"
              className="mr-4 group hover:scale-105 transition-transform duration-300"
              onClick={() => navigate('/dashboard/orders')}
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Orders
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
              <p className="text-gray-600 mt-1">Order ID: {order.orderId}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant={getStatusColor(order.status)} className="text-lg py-2 px-6">
              {getStatusText(order.status)}
            </Badge>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`
                  py-4 px-1 font-medium text-sm border-b-2 transition-all duration-300
                  ${activeSection === section.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2">
          {/* Order Overview */}
          {activeSection === 'overview' && (
            <div className="space-y-8 animate-fadeInUp">
              {/* Order Header Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-8">
                  <div className="mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{order.title}</h2>
                    <p className="text-gray-600">{order.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-green-600 mb-2">${order.amount}</div>
                    <div className="text-gray-600">Total Amount</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress: {order.progress}%</span>
                    <span>{order.deadline} deadline</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000 ease-out"
                      style={{ width: `${order.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Order Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Order Date</div>
                    <div className="font-semibold text-gray-900">{order.orderDate}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Deadline</div>
                    <div className="font-semibold text-gray-900">{order.deadline}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Progress</div>
                    <div className="font-semibold text-gray-900">{order.progress}%</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Status</div>
                    <Badge variant={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* User Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Buyer Card */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                      {order.buyer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Buyer</h3>
                      <p className="text-gray-600">{order.buyer.name}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <StarIcon className="h-4 w-4 text-yellow-400 fill-current mr-2" />
                      <span>{order.buyer.rating}/5 Rating</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      <span>{order.buyer.completedOrders} orders completed</span>
                    </div>
                  </div>
                </div>

                {/* Seller Card */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                      {order.seller.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Seller</h3>
                      <p className="text-gray-600">{order.seller.name}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <StarIcon className="h-4 w-4 text-yellow-400 fill-current mr-2" />
                      <span>{order.seller.rating}/5 Rating ({order.seller.completedOrders} orders)</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <ClockIcon className="h-4 w-4 text-blue-500 mr-2" />
                      <span>Response time: {order.seller.responseTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Project Requirements</h3>
                <div className="space-y-3">
                  {order.requirements.map((req, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Deliverables */}
          {activeSection === 'deliverables' && (
            <div className="space-y-8 animate-fadeInUp">
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Deliverables</h3>
                    <p className="text-gray-600 mt-1">
                      {userRole === 'seller' 
                        ? 'Upload files to deliver this order'
                        : 'Download files delivered by the seller'
                      }
                    </p>
                  </div>
                  {userRole === 'seller' && order.status === 'active' && (
                    <Button
                      variant="primary"
                      className="group hover:scale-105 transition-transform duration-300"
                      onClick={() => setIsDeliverModalOpen(true)}
                    >
                      <UploadIcon className="h-5 w-5 mr-2" />
                      Deliver Files
                      <span className="ml-2 transform group-hover:translate-y-1 transition-transform duration-300">↑</span>
                    </Button>
                  )}
                </div>

                {deliveredFiles.length > 0 ? (
                  <div className="space-y-4">
                    {deliveredFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-sm transition-all duration-300 group"
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                            <FileIcon className="h-6 w-6 text-gray-400" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{file.name}</h4>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <span className="mr-4">{file.size}</span>
                              <span>Uploaded: {file.uploaded}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:scale-105 transition-transform duration-300"
                          >
                            <EyeIcon className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            className="hover:scale-105 transition-transform duration-300"
                          >
                            <DownloadIcon className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <UploadIcon className="h-10 w-10 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">No files delivered yet</h4>
                    <p className="text-gray-600">
                      {userRole === 'seller'
                        ? 'Upload files to complete this order'
                        : 'Files will appear here once delivered by the seller'
                      }
                    </p>
                  </div>
                )}

                {userRole === 'buyer' && deliveredFiles.length > 0 && order.status === 'delivered' && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3" />
                        <h4 className="font-semibold text-green-900">Ready to Review</h4>
                      </div>
                      <p className="text-green-800 mb-4">
                        The seller has delivered the final files. Please review them carefully before approving the order.
                      </p>
                      <div className="flex space-x-3">
                        <Button
                          variant="outline"
                          className="border-green-300 text-green-700 hover:bg-green-50 hover:scale-105 transition-transform duration-300"
                          onClick={() => setIsDeliverModalOpen(true)}
                        >
                          Request Revision
                        </Button>
                        <Button
                          variant="primary"
                          className="hover:scale-105 transition-transform duration-300"
                          onClick={handleCompleteOrder}
                        >
                          Approve & Complete
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Timeline */}
          {activeSection === 'timeline' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 animate-fadeInUp">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Order Timeline</h3>
              
              {/* Desktop Timeline */}
              <div className="hidden md:block relative">
                {/* Progress Line */}
                <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200">
                  <div 
                    className="h-full bg-green-500 transition-all duration-1000 ease-in-out"
                    style={{ width: '60%' }}
                  ></div>
                </div>

                {/* Steps */}
                <div className="relative flex justify-between">
                  {timelineSteps.map((step) => (
                    <div key={step.id} className="flex flex-col items-center">
                      <div className={`
                        w-16 h-16 rounded-full flex items-center justify-center mb-4
                        transition-all duration-500 ease-in-out
                        ${step.status === 'completed' 
                          ? 'bg-green-500 text-white scale-110 shadow-lg' 
                          : step.status === 'current'
                          ? 'bg-white border-4 border-green-500 scale-110 shadow-lg'
                          : 'bg-white border-2 border-gray-300 text-gray-400'
                        }
                      `}>
                        {step.status === 'completed' ? (
                          <CheckCircleIcon className="h-8 w-8" />
                        ) : (
                          <span className="font-bold">{step.id}</span>
                        )}
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{step.label}</div>
                        <div className="text-sm text-gray-600">{step.date}</div>
                        <div className="text-xs text-gray-500">{step.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Timeline */}
              <div className="md:hidden">
                <div className="relative">
                  {/* Vertical Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200">
                    <div 
                      className="w-0.5 bg-green-500 transition-all duration-1000 ease-in-out"
                      style={{ height: '60%' }}
                    ></div>
                  </div>

                  {/* Steps */}
                  <div className="space-y-8">
                    {timelineSteps.map((step) => (
                      <div key={step.id} className="flex items-start">
                        <div className={`
                          w-12 h-12 rounded-full flex items-center justify-center mr-4 z-10
                          transition-all duration-500 ease-in-out
                          ${step.status === 'completed' 
                            ? 'bg-green-500 text-white scale-110 shadow-lg' 
                            : step.status === 'current'
                            ? 'bg-white border-4 border-green-500 scale-110 shadow-lg'
                            : 'bg-white border-2 border-gray-300 text-gray-400'
                          }
                        `}>
                          {step.status === 'completed' ? (
                            <CheckCircleIcon className="h-6 w-6" />
                          ) : (
                            <span className="font-bold">{step.id}</span>
                          )}
                        </div>
                        <div className="flex-1 pt-2">
                          <div className="font-semibold text-gray-900">{step.label}</div>
                          <div className="text-sm text-gray-600">{step.date}</div>
                          <div className="text-xs text-gray-500">{step.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timeline Legend */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Completed</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-white border-4 border-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Current</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payments */}
          {activeSection === 'payments' && (
            <div className="space-y-8 animate-fadeInUp">
              {/* Payment Breakdown */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Payment Breakdown</h3>
                
                {/* Total Amount */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-600 mb-2">
                      ${paymentBreakdown.totalAmount}
                    </div>
                    <div className="text-lg text-gray-900">Total Order Value</div>
                    <Badge variant="success" className="mt-3">
                      <ShieldIcon className="h-4 w-4 mr-2" />
                      Protected by Realance
                    </Badge>
                  </div>
                </div>

                {/* Fee Breakdown */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Fee Breakdown</h4>
                  <div className="space-y-3">
                    {paymentBreakdown.breakdown.map((fee, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600">{fee.label}</span>
                        <span className="font-semibold text-gray-900">${fee.amount}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">Net to Seller</span>
                      <span className="font-semibold text-gray-900">
                        ${paymentBreakdown.totalAmount - paymentBreakdown.breakdown.reduce((sum, fee) => sum + fee.amount, 0)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Escrow Status */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <DollarIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Escrow Protection</h4>
                      <p className="text-sm text-blue-800">Your payment is securely held until you approve the work</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">Released to Seller</div>
                          <div className="text-sm text-gray-600">50% upfront to start work</div>
                        </div>
                      </div>
                      <div className="text-xl font-bold text-green-600">
                        ${paymentBreakdown.escrow.released}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ShieldIcon className="h-5 w-5 text-blue-500 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">In Escrow</div>
                          <div className="text-sm text-gray-600">50% held for delivery</div>
                        </div>
                      </div>
                      <div className="text-xl font-bold text-blue-600">
                        ${paymentBreakdown.escrow.held}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ClockIcon className="h-5 w-5 text-yellow-500 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">Pending Release</div>
                          <div className="text-sm text-gray-600">35% after final approval</div>
                        </div>
                      </div>
                      <div className="text-xl font-bold text-yellow-600">
                        ${paymentBreakdown.escrow.pending}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-blue-200">
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">How escrow works:</p>
                      <ul className="space-y-1">
                        <li>• 50% released to seller to start work</li>
                        <li>• 50% held securely in escrow</li>
                        <li>• 35% released after you approve delivery</li>
                        <li>• 15% held for 14 days for any revisions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment History */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment History</h3>
                <div className="space-y-4">
                  {[
                    { id: 1, description: 'Initial payment (50%)', amount: 600, date: 'Feb 1, 2024', status: 'completed' },
                    { id: 2, description: 'Escrow deposit (50%)', amount: 600, date: 'Feb 1, 2024', status: 'held' },
                    { id: 3, description: 'Final release (35%)', amount: 420, date: 'After approval', status: 'pending' },
                  ].map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                          payment.status === 'completed' ? 'bg-green-100' :
                          payment.status === 'held' ? 'bg-blue-100' :
                          'bg-yellow-100'
                        }`}>
                          {payment.status === 'completed' && <CheckCircleIcon className="h-5 w-5 text-green-600" />}
                          {payment.status === 'held' && <ShieldIcon className="h-5 w-5 text-blue-600" />}
                          {payment.status === 'pending' && <ClockIcon className="h-5 w-5 text-yellow-600" />}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{payment.description}</div>
                          <div className="text-sm text-gray-600">{payment.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">${payment.amount}</div>
                        <Badge variant={
                          payment.status === 'completed' ? 'success' :
                          payment.status === 'held' ? 'pending' :
                          'warning'
                        }>
                          {payment.status === 'completed' ? 'Completed' :
                           payment.status === 'held' ? 'In Escrow' :
                           'Pending'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Actions & Info */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
            {/* Action Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Actions</h3>
              
              <div className="space-y-3">
                {userRole === 'seller' ? (
                  <>
                    {order.status === 'active' && (
                      <Button
                        variant="primary"
                        className="w-full group hover:scale-105 transition-transform duration-300"
                        onClick={() => setIsDeliverModalOpen(true)}
                      >
                        <UploadIcon className="h-5 w-5 mr-2" />
                        Deliver Order
                        <span className="ml-2 transform group-hover:translate-y-1 transition-transform duration-300">↑</span>
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      className="w-full group hover:scale-105 transition-transform duration-300"
                      onClick={() => console.log('Update progress')}
                    >
                      <ClockIcon className="h-5 w-5 mr-2" />
                      Update Progress
                    </Button>
                  </>
                ) : (
                  <>
                    {order.status === 'delivered' && (
                      <Button
                        variant="primary"
                        className="w-full group hover:scale-105 transition-transform duration-300"
                        onClick={handleCompleteOrder}
                      >
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        Approve & Complete
                        <span className="ml-2 transform group-hover:rotate-90 transition-transform duration-300">✓</span>
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      className="w-full group hover:scale-105 transition-transform duration-300"
                      onClick={() => console.log('Request revision')}
                    >
                      <RefreshIcon className="h-5 w-5 mr-2" />
                      Request Revision
                    </Button>
                  </>
                )}

                <Button
                  variant="outline"
                  className="w-full group hover:scale-105 transition-transform duration-300"
                  onClick={() => console.log('Message user')}
                >
                  <MessageIcon className="h-5 w-5 mr-2" />
                  Message {userRole === 'seller' ? 'Buyer' : 'Seller'}
                </Button>

                <Button
                  variant="outline"
                  className="w-full group hover:scale-105 transition-transform duration-300"
                  onClick={handleStartCall}
                >
                  <VideoIcon className="h-5 w-5 mr-2" />
                  Start Video Call
                </Button>

                {userRole === 'buyer' && order.status === 'active' && (
                  <Button
                    variant="danger"
                    className="w-full group hover:scale-105 transition-transform duration-300"
                    onClick={() => console.log('Cancel order')}
                  >
                    Cancel Order
                  </Button>
                )}
              </div>
            </div>

            {/* Call Option */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <VideoIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Instant Call</h3>
                <p className="text-purple-100">
                  Connect instantly to discuss project details
                </p>
              </div>

              <Button
                variant="primary"
                className="w-full bg-white text-purple-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 group"
                onClick={handleStartCall}
              >
                <VideoIcon className="h-5 w-5 mr-2" />
                Start Video Call
                <span className="ml-2 transform group-hover:scale-110 transition-transform duration-300">▶</span>
              </Button>

              <div className="mt-6 text-center">
                <p className="text-sm text-purple-100">
                  <ShieldIcon className="h-4 w-4 inline mr-1" />
                  All calls are recorded for quality assurance
                </p>
              </div>
            </div>

            {/* Order Info */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Information</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Order ID</div>
                  <div className="font-mono font-semibold text-gray-900">{order.orderId}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-1">Placed On</div>
                  <div className="flex items-center text-gray-900">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {order.orderDate}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-1">Deadline</div>
                  <div className="flex items-center text-gray-900">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    {order.deadline}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-1">Delivery Method</div>
                  <div className="flex items-center text-gray-900">
                    <UploadIcon className="h-4 w-4 mr-2" />
                    Digital Delivery
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <Link
                  to="/dashboard/help/orders"
                  className="block text-center text-green-600 hover:text-green-700 font-medium text-sm py-2 hover:scale-105 transition-transform duration-300"
                >
                  Need Help? Contact Support →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deliver Modal */}
      <Modal
        isOpen={isDeliverModalOpen}
        onClose={() => setIsDeliverModalOpen(false)}
        title="Deliver Order"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Message
            </label>
            <textarea
              value={newDelivery.message}
              onChange={(e) => setNewDelivery({...newDelivery, message: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              rows="4"
              placeholder="Add a message for the buyer..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Files
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple
              className="hidden"
            />
            
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-400 hover:bg-gray-50 transition-all duration-300"
            >
              <UploadIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="font-semibold text-gray-900">Drag & Drop or Click to Upload</p>
              <p className="text-sm text-gray-600 mt-1">Maximum file size: 100MB per file</p>
            </div>

            {/* Uploaded Files Preview */}
            {newDelivery.files.length > 0 && (
              <div className="mt-4 space-y-2">
                {newDelivery.files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <FileIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{file.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFile(file.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsDeliverModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1 group hover:scale-105 transition-transform duration-300"
              onClick={handleDeliverOrder}
              disabled={newDelivery.files.length === 0}
            >
              Deliver Order
              <CheckCircleIcon className="h-5 w-5 ml-2 transform group-hover:scale-110 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </Modal>

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
        <div className="text-center p-6">
          {callStatus === 'connecting' && (
            <>
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-6 animate-pulse">
                <VideoIcon className="h-16 w-16 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Connecting...</h3>
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
                    <UsersIcon className="h-16 w-16 text-purple-600" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-1/4 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Connected with {userRole === 'seller' ? order.buyer.name : order.seller.name}</h3>
              <p className="text-gray-600 mb-2">Order: {order.title}</p>
              <p className="text-3xl font-bold text-gray-900 mb-8">14:32</p>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleEndCall}
                  className="w-12 h-12 bg-red-500 text-white rounded-full hover:scale-110 transition-transform duration-300"
                >
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
                  <ShieldIcon className="h-4 w-4 inline mr-1" />
                  This call is being recorded for quality assurance.
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

      {/* Review Modal */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="Complete Order & Review"
      >
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Complete Order?</h3>
            <p className="text-gray-600">
              Approving the order will release the remaining payment to the seller
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Payment Release</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Amount in escrow</span>
                <span className="font-semibold">${paymentBreakdown.escrow.held}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">To be released now</span>
                <span className="font-semibold text-green-600">${paymentBreakdown.escrow.pending}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span className="font-semibold text-gray-900">Seller receives</span>
                <span className="text-xl font-bold text-green-600">${paymentBreakdown.escrow.pending}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Leave a Review (Optional)
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              rows="3"
              placeholder="Share your experience with the seller..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Rate the Service
            </label>
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} className="text-3xl hover:scale-110 transition-transform duration-300">
                  <StarIcon className="h-8 w-8 text-yellow-400 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsReviewModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1 group hover:scale-105 transition-transform duration-300"
              onClick={handleSubmitReview}
            >
              Complete Order
              <CheckCircleIcon className="h-5 w-5 ml-2 transform group-hover:scale-110 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default OrderDetails;