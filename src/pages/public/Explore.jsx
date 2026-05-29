// src/pages/public/Explore.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import GigCard from '../../components/GigCard';
import Badge from '../../components/Badge';
import SkeletonLoader from '../../components/SkeletonLoader';
import EmptyState from '../../components/EmptyState';
import { FilterIcon, XIcon, ChevronDownIcon, CheckCircleIcon } from '../../components/Icons';

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gigs, setGigs] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    deliveryTime: '',
  });
  const filterRef = useRef(null);

  const categories = [
    'Graphics & Design',
    'Digital Marketing',
    'Writing & Translation',
    'Video & Animation',
    'Music & Audio',
    'Programming & Tech',
    'Business',
    'Lifestyle',
  ];

  const priceRanges = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $250', min: 100, max: 250 },
    { label: '$250 - $500', min: 250, max: 500 },
    { label: '$500+', min: 500, max: 10000 },
  ];

  const ratingOptions = [
    { label: '4.5+ Stars', value: 4.5 },
    { label: '4.0+ Stars', value: 4.0 },
    { label: '3.5+ Stars', value: 3.5 },
  ];

  const deliveryTimes = [
    { label: '24 Hours', value: 1 },
    { label: '3 Days', value: 3 },
    { label: '7 Days', value: 7 },
    { label: 'Anytime', value: 999 },
  ];

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    const timer = setTimeout(() => {
      setGigs([
        {
          id: 1,
          image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
          title: 'I will design a modern website UI/UX',
          seller: { name: 'Alex Designer', isVerified: true },
          rating: 4.9,
          reviews: 128,
          price: 299,
          deliveryTime: '3 Days',
          isFavorite: false,
        },
        {
          id: 2,
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
          title: 'I will create your social media marketing strategy',
          seller: { name: 'Sarah Marketing', isVerified: true },
          rating: 4.8,
          reviews: 96,
          price: 199,
          deliveryTime: '2 Days',
          isFavorite: true,
        },
        {
          id: 3,
          image: 'https://images.unsplash.com/photo-1551434678-e076c223a692',
          title: 'I will build a responsive React application',
          seller: { name: 'Mike Developer', isVerified: true },
          rating: 5.0,
          reviews: 156,
          price: 499,
          deliveryTime: '5 Days',
          isFavorite: false,
        },
        {
          id: 4,
          image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698',
          title: 'I will write engaging blog posts for your business',
          seller: { name: 'Emma Writer', isVerified: true },
          rating: 4.7,
          reviews: 78,
          price: 149,
          deliveryTime: '1 Day',
          isFavorite: false,
        },
        {
          id: 5,
          image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
          title: 'I will create professional logo design',
          seller: { name: 'David Creative', isVerified: true },
          rating: 4.9,
          reviews: 203,
          price: 249,
          deliveryTime: '4 Days',
          isFavorite: false,
        },
        {
          id: 6,
          image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698',
          title: 'I will edit your videos professionally',
          seller: { name: 'Lisa Editor', isVerified: true },
          rating: 4.6,
          reviews: 92,
          price: 179,
          deliveryTime: '3 Days',
          isFavorite: false,
        },
      ]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeFilters]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    setActiveFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      deliveryTime: '',
    });
    setSearchParams({});
  };

  const activeFilterCount = Object.values(activeFilters).filter(v => v).length;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fadeInUp">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore Services
            </h1>
            <p className="text-xl text-gray-600">
              Discover thousands of professional services from trusted freelancers
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar (Desktop) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-green-600 hover:text-green-700 transition-colors duration-300"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleFilterChange('category', category)}
                        className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 ${
                          activeFilters.category === category
                            ? 'bg-green-50 text-green-700'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <span>{category}</span>
                        {activeFilters.category === category && (
                          <CheckCircleIcon className="h-4 w-4 text-green-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => handleFilterChange('minPrice', range.min)}
                        className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 ${
                          activeFilters.minPrice === range.min
                            ? 'bg-green-50 text-green-700'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <span>{range.label}</span>
                        {activeFilters.minPrice === range.min && (
                          <CheckCircleIcon className="h-4 w-4 text-green-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Minimum Rating</h4>
                  <div className="space-y-2">
                    {ratingOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleFilterChange('rating', option.value)}
                        className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 ${
                          activeFilters.rating === option.value
                            ? 'bg-green-50 text-green-700'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="mr-2">⭐</span>
                          <span>{option.label}</span>
                        </div>
                        {activeFilters.rating === option.value && (
                          <CheckCircleIcon className="h-4 w-4 text-green-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {activeFilterCount > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Active Filters</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(activeFilters).map(([key, value]) => {
                      if (!value) return null;
                      return (
                        <Badge
                          key={key}
                          variant="success"
                          className="flex items-center gap-1 group hover:scale-105 transition-transform duration-300"
                        >
                          {key === 'category' && 'Category:'}
                          {key === 'minPrice' && 'Price:'}
                          {key === 'rating' && 'Rating:'}
                          {key === 'deliveryTime' && 'Delivery:'}
                          {value}
                          <button
                            onClick={() => handleFilterChange(key, '')}
                            className="ml-1 hover:text-white"
                          >
                            <XIcon className="h-3 w-3" />
                          </button>
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Mobile Filter Bar */}
            <div className="lg:hidden mb-6">
              <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors duration-300"
                >
                  <FilterIcon className="h-5 w-5" />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-green-600 hover:text-green-700 transition-colors duration-300"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Mobile Filter Dropdown */}
              {isFilterOpen && (
                <div
                  ref={filterRef}
                  className="absolute left-4 right-4 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 animate-slideDown"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold text-gray-900">Filters</h3>
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                      >
                        <XIcon className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Mobile Filter Content */}
                    <div className="space-y-6 max-h-96 overflow-y-auto">
                      {/* Category Filter */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {categories.map((category) => (
                            <button
                              key={category}
                              onClick={() => handleFilterChange('category', category)}
                              className={`px-3 py-2 rounded-lg transition-colors duration-300 text-sm ${
                                activeFilters.category === category
                                  ? 'bg-green-50 text-green-700 border border-green-200'
                                  : 'border border-gray-200 hover:border-green-300'
                              }`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Price Filter */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                        <div className="space-y-2">
                          {priceRanges.map((range) => (
                            <button
                              key={range.label}
                              onClick={() => handleFilterChange('minPrice', range.min)}
                              className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 ${
                                activeFilters.minPrice === range.min
                                  ? 'bg-green-50 text-green-700'
                                  : 'hover:bg-gray-50'
                              }`}
                            >
                              <span>{range.label}</span>
                              {activeFilters.minPrice === range.min && (
                                <CheckCircleIcon className="h-4 w-4 text-green-600" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeFilters.category ? activeFilters.category : 'All Services'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {gigs.length} services available
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-300">
                  <option value="recommended">Recommended</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <SkeletonLoader key={i} type="card" />
                ))}
              </div>
            ) : gigs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gigs.map((gig) => (
                  <GigCard
                    key={gig.id}
                    gig={gig}
                    onClick={() => console.log('Clicked gig', gig.id)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon="🔍"
                title="No services found"
                description="Try adjusting your filters to find what you're looking for"
                actionText="Clear Filters"
                onAction={clearFilters}
              />
            )}

            {/* Load More Button */}
            {gigs.length > 0 && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  className="hover:scale-105 transition-transform duration-300 group"
                >
                  Load More Services
                  <ChevronDownIcon className="ml-2 h-5 w-5 transform group-hover:translate-y-1 transition-transform duration-300" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;