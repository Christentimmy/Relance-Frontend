// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = {
    Platform: ['Explore', 'How it Works', 'Pricing', 'Blog'],
    Company: ['About', 'Careers', 'Press', 'Trust & Safety'],
    Support: ['Help Center', 'Community', 'Contact Us'],
    Legal: ['Terms', 'Privacy', 'Cookie Policy'],
  };

  const socialIcons = [
    { icon: 'facebook', label: 'Facebook' },
    { icon: 'twitter', label: 'Twitter' },
    { icon: 'instagram', label: 'Instagram' },
    { icon: 'linkedin', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Realance</span>
            </div>
            <p className="text-gray-600 max-w-md">
              Connect with talented freelancers and bring your creative projects to life.
              Join our community today.
            </p>
          </div>

          {/* Links Grid */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-gray-900 mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to={`/${link.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                      className="text-gray-600 hover:text-green-600 transition-colors duration-300 hover:pl-1 block"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social and Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              {socialIcons.map((social) => (
                <button
                  key={social.icon}
                  className="text-gray-400 hover:text-green-600 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <div className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-green-600 transition-colors duration-300">
                    <span className="font-semibold">{social.icon.charAt(0).toUpperCase()}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="text-gray-600 text-sm">
              <p>&copy; {new Date().getFullYear()} Realance. All rights reserved.</p>
              <p className="mt-1">Building the future of work, together.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;