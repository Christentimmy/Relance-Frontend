// src/pages/public/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import GigCard from '../../components/GigCard';
import Badge from '../../components/Badge';
import { SearchIcon, ArrowRightIcon, CheckCircleIcon, StarIcon } from '../../components/Icons';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
 const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const categories = [
  
  { 
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop&crop=center', 
    title: 'Digital Marketing', 
    description: 'SEO, social media, content marketing' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop&crop=center', 
    title: 'Writing & Translation', 
    description: 'Articles, translation, copywriting' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop&crop=center', 
    title: 'Video & Animation', 
    description: 'Explainer videos, animation, editing' 
  },
 
  { 
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&crop=center', 
    title: 'Programming & Tech', 
    description: 'Web development, apps, automation' 
  },

];

  const featuredGigs = [
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
  ];

 const steps = [
  { 
    number: '01', 
    title: 'Post a Job', 
    description: 'Describe your project and requirements', 
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center' // Writing/planning image
  },
  { 
    number: '02', 
    title: 'Hire Freelancers', 
    description: 'Review proposals and choose the best fit', 
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&crop=center' // Team/meeting image
  },
  { 
    number: '03', 
    title: 'Secure Payment', 
    description: 'Pay safely with our escrow system', 
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center' // Payment/transaction image
  },
  { 
    number: '04', 
    title: 'Get Work Done', 
    description: 'Collaborate and receive your project', 
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop&crop=center' // Completed project image
  },
];

  return (
    <div className="min-h-screen">
      {/* 🔹 Section 1: Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-green-50 to-emerald-50 pt-24 pb-20 md:pt-32 md:pb-28">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Column */}
            <div className="lg:w-1/2 animate-fadeInUp">
              <div className="mb-6">
                <Badge variant="success" className="mb-4 animate-bounce">✨ Trusted by 10,000+ businesses</Badge>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                  Hire trusted{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10">freelancers</span>
                    <div className="absolute bottom-2 left-0 w-full h-3 bg-green-200 -rotate-1 transform -skew-x-12 z-0"></div>
                  </span>
                  . Get work done{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10">faster</span>
                    <div className="absolute bottom-2 left-0 w-full h-3 bg-blue-200 rotate-1 transform skew-x-12 z-0"></div>
                  </span>
                  .
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                  Connect with top freelance talent for your next project. From design to development, we've got you covered.
                </p>
              </div>

              {/* Search Bar */}
             

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="group hover:scale-105 transition-all duration-300"
                >
                  Find Talent
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="group hover:scale-105 transition-all duration-300"
                >
                  Become a Seller
                  <span className="ml-2 group-hover:rotate-90 transition-transform duration-300">→</span>
                </Button>
              </div>
            </div>

            {/* Right Column - Illustration */}
            <div className="lg:w-1/2 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
              <div className="relative">
                <div className="relative z-10 bg-white rounded-3xl shadow-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978"
                    alt="Freelancer working"
                    className="w-full h-64 md:h-96 object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">
                      
                        </div>
                        <div>
                         
                        </div>
                      </div>
                     
                    </div>
                   
                  </div>
                </div>

                {/* Floating Cards */}
{/* Floating Cards */}
<div className="absolute -top-6 -left-6 animate-float z-30"> {/* Added z-30 */}
  <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-200 w-48">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-gray-500">Completed</span>
      <span className="text-green-600 font-bold">128</span>
    </div>
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-green-500 w-3/4"></div>
    </div>
  </div>
</div>

<div className="absolute -bottom-6 -right-6 animate-float z-30" style={{ animationDelay: '1s' }}> {/* Added z-30 */}
  <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-200 w-48">
    <div className="flex items-center mb-2">
      <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
      <span className="ml-2 font-bold">4.9</span>
      <span className="ml-1 text-gray-500">(96 reviews)</span>
    </div>
    <div className="text-sm text-gray-500">Top Rated Seller</div>
  </div>
</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Section 2: Categories */}
     <section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12 animate-fadeInUp">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Find the perfect service for your needs from our diverse categories
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <div
          key={category.title}
          className="group bg-white rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-500 ease-in-out hover:-translate-y-2 animate-fadeInUp overflow-hidden cursor-pointer"
          style={{ animationDelay: `${index * 100}ms` }}
          onClick={() => navigate(`/explore?category=${category.title}`)}
        >
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            <img 
              src={category.image} 
              alt={category.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            {/* Dark Overlay on Hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
            {/* Category Count Badge */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium shadow-sm">
              {category.count || '2k+'} services
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
              {category.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4">{category.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-green-600 text-sm font-medium group-hover:underline">
                Explore Category
              </span>
              <ArrowRightIcon className="h-4 w-4 text-green-600 transform group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* 🔹 Section 4: How It Works */}
<section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12 animate-fadeInUp">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Simple steps to get your project done by top professionals
      </p>
    </div>

    <div className="relative">
      {/* Connecting Line (Desktop) */}
      <div className="hidden lg:block absolute top-32 left-0 right-0 h-0.5 bg-gray-200 transform translate-y-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="relative group animate-fadeInUp"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            {/* Step Number */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="w-16 h-16 bg-white border-4 border-green-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-green-600">{step.number}</span>
              </div>
            </div>

            {/* Step Card */}
            <div className="bg-white pt-16 pb-8 px-6 rounded-2xl border border-gray-200 group-hover:border-green-300 group-hover:shadow-xl transition-all duration-500 ease-in-out h-full">
              {/* Image Container - Added this section */}
              <div className="w-full h-40 mb-6 overflow-hidden rounded-xl">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Optional overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{step.title}</h3>
              <p className="text-gray-600 text-center">{step.description}</p>
            </div>

            {/* Arrow for Desktop */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-32 right-0 transform translate-x-1/2 translate-y-8">
                <div className="w-8 h-8 bg-white border border-gray-200 rotate-45 transform origin-center group-hover:border-green-300 transition-colors duration-300"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* 🔹 Section 5: CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          {/* Background Elements */}
         <div className="absolute top-0 left-0 w-20 h-20 sm:w-40 sm:h-40 md:w-64 md:h-64 bg-white bg-opacity-10
          text-black rounded-full -translate-x-1/2 -translate-y-1/2"></div>
<div className="absolute bottom-0 right-0 w-24 h-24 sm:w-48 sm:h-48 translate-y-1/2 md:w-96 md:h-96 md:translate-y-1/4 text-black bg-white 
bg-opacity-5 rounded-full translate-x-1/2 "></div>

          <div className="relative z-10 text-center max-w-3xl mx-auto animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to bring your ideas to life?
            </h2>
            <p className="text-xl text-green-100 mb-8 opacity-90">
              Join thousands of businesses and freelancers already growing with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 group"
              >
                Start Hiring
                <ArrowRightIcon className="ml-2 h-5 w-5 transform group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-green-600 hover:scale-105 transition-all duration-300"
              >
                Become a Seller
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-green-500 border-opacity-30">
              {[
                { value: '10K+', label: 'Active Freelancers' },
                { value: '50K+', label: 'Projects Completed' },
                { value: '4.9', label: 'Avg. Rating' },
                { value: '99%', label: 'Satisfaction Rate' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-white mb-1 animate-count" data-count={stat.value}>
                    0
                  </div>
                  <div className="text-green-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;