// src/pages/public/SellerProfile.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import GigCard from '../../components/GigCard';
import Loader from '../../components/Loader';
import { StarIcon, CheckCircleIcon, MessageIcon, CalendarIcon, GlobeIcon } from '../../components/Icons';

const SellerProfile = () => {
  const { username } = useParams();
  const [seller, setSeller] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('gigs');
  const [reviews] = useState([
    {
      id: 1,
      buyer: { name: 'John Client', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' },
      rating: 5,
      comment: 'Absolutely fantastic work! The design exceeded my expectations. Very professional and communicative.',
      date: '2 weeks ago',
      gig: 'Website UI/UX Design',
    },
    {
      id: 2,
      buyer: { name: 'Sarah Business', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786' },
      rating: 5,
      comment: 'Great attention to detail and delivered ahead of schedule. Will definitely work with again!',
      date: '1 month ago',
      gig: 'Mobile App Design',
    },
    {
      id: 3,
      buyer: { name: 'Mike Startup', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
      rating: 4,
      comment: 'Good work overall. A few revisions were needed but very responsive to feedback.',
      date: '2 months ago',
      gig: 'Dashboard Design',
    },
  ]);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    const timer = setTimeout(() => {
      setSeller({
        id: 1,
        name: 'Alex Designer',
        username: 'alex-designer',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
        title: 'Professional UI/UX Designer',
        isVerified: true,
        isPro: true,
        level: 'Top Rated Seller',
        rating: 4.9,
        reviews: 128,
        completedJobs: 156,
        responseRate: '100%',
        responseTime: '1 hour',
        deliveryTime: '3 days',
        memberSince: 'January 2020',
        location: 'New York, USA',
        languages: ['English', 'Spanish'],
        skills: ['UI Design', 'UX Research', 'Figma', 'Prototyping', 'Wireframing', 'Design Systems'],
        bio: `I'm a professional UI/UX designer with 5+ years of experience creating beautiful and functional digital products. I specialize in website design, mobile applications, and dashboard interfaces for startups and enterprises.

My design philosophy focuses on creating intuitive user experiences backed by research and best practices. I believe good design should not only look beautiful but also solve real problems for users.

I've worked with clients ranging from small startups to Fortune 500 companies, delivering designs that help them achieve their business goals.`,
        gigs: [
          {
            id: 1,
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
            title: 'I will design a modern website UI/UX',
            rating: 4.9,
            reviews: 128,
            price: 299,
            deliveryTime: '3 Days',
          },
          {
            id: 2,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
            title: 'I will design mobile app UI/UX',
            rating: 5.0,
            reviews: 96,
            price: 499,
            deliveryTime: '5 Days',
          },
          {
            id: 3,
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692',
            title: 'I will create dashboard design',
            rating: 4.8,
            reviews: 78,
            price: 399,
            deliveryTime: '4 Days',
          },
        ],
        stats: {
          onTimeDelivery: '98%',
          orderCompletion: '100%',
          repeatBuyers: '85%',
        },
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [username]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader fullscreen text="Loading seller profile..." />
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">👤</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Seller Not Found</h2>
          <p className="text-gray-600 mb-4">The seller profile you're looking for doesn't exist.</p>
          <Button variant="primary" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-green-400 to-blue-500 overflow-hidden">
        <img
          src={seller.coverImage}
          alt="Cover"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8 mb-8 animate-fadeInUp">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start space-x-6">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={seller.avatar}
                  alt={seller.name}
                  className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg"
                />
                {seller.isPro && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    PRO
                  </div>
                )}
              </div>

              {/* Info */}
              <div>
                <div className="flex items-center flex-wrap gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{seller.name}</h1>
                  {seller.isVerified && (
                    <Badge variant="success" className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 mr-1" />
                      Verified
                    </Badge>
                  )}
                  <Badge variant="warning">{seller.level}</Badge>
                </div>
                <p className="text-xl text-gray-600 mb-4">{seller.title}</p>
                
                <div className="flex items-center flex-wrap gap-4 text-gray-600">
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold text-gray-900">{seller.rating}</span>
                    <span className="ml-1">({seller.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <GlobeIcon className="h-5 w-5 text-gray-400 mr-1" />
                    <span>{seller.location}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 text-gray-400 mr-1" />
                    <span>Member since {seller.memberSince}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button
                variant="primary"
                className="group hover:scale-105 transition-transform duration-300"
              >
                <MessageIcon className="h-5 w-5 mr-2" />
                Contact Me
              </Button>
              <Button
                variant="outline"
                className="group hover:scale-105 transition-transform duration-300"
              >
                Follow
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          {[
            { label: 'On-time Delivery', value: seller.stats.onTimeDelivery, icon: '' },
            { label: 'Order Completion', value: seller.stats.orderCompletion, icon: '' },
            { label: 'Repeat Buyers', value: seller.stats.repeatBuyers, icon: '' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-8 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['gigs', 'about', 'reviews', 'portfolio'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    py-4 px-1 font-medium text-sm border-b-2 transition-colors duration-300
                    ${activeTab === tab
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          {/* Gigs Tab */}
          {activeTab === 'gigs' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Services Offered</h2>
                <p className="text-gray-600">Browse all services offered by {seller.name}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {seller.gigs.map((gig) => (
                  <GigCard
                    key={gig.id}
                    gig={{ ...gig, seller: { name: seller.name, isVerified: seller.isVerified } }}
                    onClick={() => console.log('Clicked gig', gig.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="space-y-8">
              {/* Bio */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About Me</h2>
                <p className="text-gray-600 whitespace-pre-line text-lg leading-relaxed">{seller.bio}</p>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills & Expertise</h2>
                <div className="flex flex-wrap gap-3">
                  {seller.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="success"
                      className="text-base py-2 px-4 hover:scale-105 transition-transform duration-300 cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Languages</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {seller.languages.map((language) => (
                    <div key={language} className="flex items-center">
                      <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3" />
                      <span className="text-lg text-gray-900">{language}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Client Reviews</h2>
                <p className="text-gray-600">{seller.reviews} reviews with an average rating of {seller.rating} stars</p>
              </div>

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={review.buyer.avatar}
                          alt={review.buyer.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.buyer.name}</h4>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{review.comment}</p>
                    <div className="text-sm text-gray-500">
                      Service: <span className="text-green-600">{review.gig}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;