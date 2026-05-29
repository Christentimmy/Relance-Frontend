// src/pages/public/GigDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import { StarIcon, HeartIcon, ShareIcon, CheckCircleIcon, MessageIcon } from '../../components/Icons';

const GigDetails = () => {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState('basic');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    const timer = setTimeout(() => {
      setGig({
        id: 1,
        title: 'I will design a modern website UI/UX with Figma',
        description: `I will create modern, clean, and professional UI/UX designs for your website or mobile application. With 5+ years of experience in design, I focus on creating user-friendly interfaces that are both beautiful and functional.

What you'll get:
• Modern and clean UI design
• Responsive design for all devices
• User experience optimization
• Interactive prototypes
• Design system and component library
• Unlimited revisions
• Fast delivery

My design process:
1. Discovery call to understand your needs
2. Wireframing and prototyping
3. Design mockups
4. Feedback and revisions
5. Final delivery with all assets

I specialize in:
• Website design
• Mobile app design
• Dashboard design
• E-commerce design
• SaaS product design`,
        images: [
          'https://images.unsplash.com/photo-1551650975-87deedd944c3',
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
          'https://images.unsplash.com/photo-1551434678-e076c223a692',
        ],
        seller: {
          name: 'Alex Designer',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
          isVerified: true,
          level: 'Top Rated Seller',
          rating: 4.9,
          reviews: 128,
          completedJobs: 156,
          responseTime: '1 hour',
          memberSince: '2020',
          languages: ['English', 'Spanish'],
        },
        rating: 4.9,
        reviews: 128,
        deliveryTime: '3 Days',
        revisions: 'Unlimited',
        packages: {
          basic: {
            title: 'Basic',
            description: 'Simple website design',
            price: 299,
            features: ['1 page design', 'Responsive design', '2 revisions', '3 day delivery'],
          },
          standard: {
            title: 'Standard',
            description: 'Most popular',
            price: 499,
            features: ['3 page design', 'Responsive design', 'Unlimited revisions', 'Prototype', '5 day delivery'],
          },
          premium: {
            title: 'Premium',
            description: 'Complete solution',
            price: 899,
            features: ['5+ page design', 'Responsive design', 'Unlimited revisions', 'Interactive prototype', 'Design system', 'Priority support', '7 day delivery'],
          },
        },
        requirements: [
          'Project description',
          'Brand guidelines (if any)',
          'Content for the website',
          'Examples of designs you like',
        ],
        faqs: [
          { question: 'What file formats will I receive?', answer: 'You will receive Figma files, PDF mockups, and all necessary assets.' },
          { question: 'Do you offer revisions?', answer: 'Yes, I offer unlimited revisions for the standard and premium packages.' },
          { question: 'What is your delivery time?', answer: 'Delivery time depends on the package, ranging from 3-7 days.' },
        ],
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader fullscreen text="Loading gig details..." />
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Gig Not Found</h2>
          <p className="text-gray-600 mb-4">The service you're looking for doesn't exist.</p>
          <Link to="/explore">
            <Button variant="primary">Explore Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  const selectedPackageData = gig.packages[selectedPackage];
  const totalPrice = selectedPackageData.price * quantity;

  return (
    <div className="min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-green-600 transition-colors duration-300">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/explore" className="hover:text-green-600 transition-colors duration-300">Explore</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{gig.title.substring(0, 30)}...</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Content */}
          <div className="lg:w-2/3">
            {/* Title Section */}
            <div className="mb-8 animate-fadeInUp">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {gig.title}
                  </h1>
                  <div className="flex items-center flex-wrap gap-4">
                    <div className="flex items-center">
                      <StarIcon className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold text-gray-900">{gig.rating}</span>
                      <span className="text-gray-500 ml-1">({gig.reviews} reviews)</span>
                    </div>
                    <Badge variant="success">{gig.seller.level}</Badge>
                    <span className="text-gray-500">Delivery in {gig.deliveryTime}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-3 rounded-full hover:bg-gray-100 transition-colors duration-300 ${
                      isFavorite ? 'text-red-500' : 'text-gray-400'
                    }`}
                  >
                    <HeartIcon className="h-6 w-6" />
                  </button>
                  <button className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-300">
                    <ShareIcon className="h-6 w-6 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="mb-8 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              <div className="relative rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={gig.images[selectedImage]}
                  alt={gig.title}
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4">
                  <Badge variant="success">Featured</Badge>
                </div>
              </div>
              <div className="flex space-x-3 mt-3">
                {gig.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-1 h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? 'border-green-500 ring-2 ring-green-200'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Seller Info */}
            <div className="mb-8 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={gig.seller.avatar}
                      alt={gig.seller.name}
                      className="w-16 h-16 rounded-full border-2 border-green-500"
                    />
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-xl font-semibold text-gray-900 mr-2">{gig.seller.name}</h3>
                        {gig.seller.isVerified && (
                          <Badge variant="success" className="text-xs">Verified</Badge>
                        )}
                      </div>
                      <p className="text-gray-600">{gig.seller.level}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center space-x-4">
                    <Button variant="outline" className="group hover:scale-105 transition-transform duration-300">
                      <MessageIcon className="h-5 w-5 mr-2" />
                      Contact
                    </Button>
                    <Link to={`/seller/${gig.seller.name.toLowerCase().replace(' ', '-')}`}>
                      <Button variant="primary" className="hover:scale-105 transition-transform duration-300">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Seller Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900">{gig.seller.rating}</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900">{gig.seller.reviews}</div>
                    <div className="text-sm text-gray-600">Reviews</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900">{gig.seller.completedJobs}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900">{gig.seller.responseTime}</div>
                    <div className="text-sm text-gray-600">Response Time</div>
                  </div>
                </div>

                {/* Seller Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">About the Seller</h4>
                    <p className="text-gray-600">
                      Professional UI/UX designer with {new Date().getFullYear() - parseInt(gig.seller.memberSince)}+ years of experience.
                      Specialized in creating beautiful and functional digital products.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {gig.seller.languages.map((lang) => (
                        <Badge key={lang} variant="success">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Gig</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-600 whitespace-pre-line">{gig.description}</p>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-8 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What I Need From You</h2>
                <ul className="space-y-3">
                  {gig.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FAQ */}
            <div className="animate-fadeInUp" style={{ animationDelay: '500ms' }}>
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {gig.faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Pricing Card (Sticky) */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 animate-fadeInUp">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                {/* Package Selection */}
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Select Package</h3>
                  <div className="space-y-3">
                    {Object.entries(gig.packages).map(([key, pkg]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedPackage(key)}
                        className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                          selectedPackage === key
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-semibold text-gray-900">{pkg.title}</div>
                            <div className="text-sm text-gray-600">{pkg.description}</div>
                          </div>
                          <div className="text-2xl font-bold text-green-600">${pkg.price}</div>
                        </div>
                        <ul className="space-y-2 mt-3">
                          {pkg.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-gray-900">Quantity</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-300"
                      >
                        -
                      </button>
                      <span className="font-semibold text-gray-900 w-8 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Multiple copies of the same service
                  </div>
                </div>

                {/* Order Summary */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-xl font-bold text-gray-900">${totalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-gray-600">Delivery</span>
                    <span className="text-green-600 font-semibold">{gig.deliveryTime}</span>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full mb-3 group hover:scale-105 transition-transform duration-300"
                    onClick={() => setIsOrderModalOpen(true)}
                  >
                    Continue (${totalPrice})
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full group hover:scale-105 transition-transform duration-300"
                  >
                    <MessageIcon className="h-5 w-5 mr-2" />
                    Contact Seller
                  </Button>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 inline mr-1" />
                      Secure payment
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 inline mr-1" />
                      Money-back guarantee
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      <Modal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        title="Confirm Your Order"
      >
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-2">{gig.title}</h4>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{selectedPackageData.title} Package</span>
              <span className="font-semibold">${selectedPackageData.price}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-gray-600">Quantity</span>
              <span className="font-semibold">{quantity}</span>
            </div>
            <div className="border-t border-gray-200 mt-3 pt-3">
              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span className="text-green-600 text-lg">${totalPrice}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Delivery Time</h4>
            <p className="text-gray-600">{gig.deliveryTime} delivery</p>
          </div>

          <div className="space-y-4">
            <Button
              variant="primary"
              className="w-full group hover:scale-105 transition-transform duration-300"
              onClick={() => {
                setIsOrderModalOpen(false);
                // Handle order placement
              }}
            >
              Place Order & Pay Now
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsOrderModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GigDetails;