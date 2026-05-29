// src/pages/Messages.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { Button, Avatar, Badge, Input, SkeletonLoader } from '../../../components';
import { FiSearch, FiMessageSquare, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Messages = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Mock data - replace with API call
  const mockConversations = [
    {
      id: '1',
      userId: 'john_doe',
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      lastMessage: 'I loved the logo design! When can we discuss the revisions?',
      timestamp: '10:30 AM',
      unreadCount: 3,
      online: true,
      isSeller: true
    },
    {
      id: '2',
      userId: 'sarah_williams',
      name: 'Sarah Williams',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      lastMessage: 'The website mockup looks great!',
      timestamp: 'Yesterday',
      unreadCount: 0,
      online: true,
      isSeller: false
    },
    {
      id: '3',
      userId: 'mike_chen',
      name: 'Mike Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      lastMessage: 'Can you share the source files?',
      timestamp: '2 days ago',
      unreadCount: 1,
      online: false,
      isSeller: true
    },
    {
      id: '4',
      userId: 'emma_jackson',
      name: 'Emma Jackson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      lastMessage: 'Payment has been sent!',
      timestamp: '1 week ago',
      unreadCount: 0,
      online: false,
      isSeller: false
    },
    {
      id: '5',
      userId: 'alex_smith',
      name: 'Alex Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      lastMessage: 'Looking forward to working with you!',
      timestamp: '2 weeks ago',
      unreadCount: 0,
      online: true,
      isSeller: true
    },
  ];

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setConversations(mockConversations);
      setFilteredConversations(mockConversations);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredConversations(conversations);
    } else {
      const filtered = conversations.filter(conv =>
        conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredConversations(filtered);
    }
  }, [searchQuery, conversations]);

  const handleChatSelect = (chatId) => {
    setActiveChat(chatId);
    setIsMobileSidebarOpen(false);
    navigate(`/dashboard/messages/${chatId}`);
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full py-12 text-center">
      <div className="mb-6 p-8 bg-gray-100 rounded-full">
        <FiMessageSquare className="w-16 h-16 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">No conversations yet</h3>
      <p className="text-gray-500 mb-6 max-w-md">
        When you start a conversation with a buyer or seller, it will appear here.
      </p>
      <Button
        variant="primary"
        onClick={() => navigate('/explore')}
        className="px-6 py-3"
      >
        Start a New Chat
      </Button>
    </div>
  );

  const ConversationSkeletonLoader = () => (
    <div className="p-4 space-y-4">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="flex items-center space-x-3 animate-pulse">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-80px)] bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Conversations Sidebar */}
        <div className={`
          ${isMobileSidebarOpen ? 'absolute inset-0 z-50' : 'hidden'}
          md:relative md:flex md:flex-col
          w-full md:w-96 border-r border-gray-200 bg-white
        `}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <ConversationSkeletonLoader />
            ) : filteredConversations.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">No conversations found</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => handleChatSelect(conversation.id)}
                  className={`
                    flex items-center p-4 border-b border-gray-100 cursor-pointer
                    hover:bg-gray-50 transition-all duration-300 ease-in-out
                    ${activeChat === conversation.id ? 'bg-green-50 border-l-4 border-l-green-500' : ''}
                    group
                  `}
                >
                  <div className="relative">
                    <Avatar
                      src={conversation.avatar}
                      alt={conversation.name}
                      size="lg"
                      className="ring-2 ring-offset-2 ring-transparent group-hover:ring-green-200 transition-all"
                    />
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="ml-4 flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {conversation.timestamp}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <Badge
                          count={conversation.unreadCount}
                          variant="primary"
                          className="ml-2 flex-shrink-0"
                        />
                      )}
                    </div>
                    
                    <div className="mt-1">
                      <span className={`
                        text-xs px-2 py-1 rounded-full
                        ${conversation.isSeller 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-purple-100 text-purple-700'
                        }
                      `}>
                        {conversation.isSeller ? 'Seller' : 'Buyer'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Chat Area or Empty State */}
        <div className="flex-1 flex flex-col">
          {!activeChat ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="w-48 h-48 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                  <FiMessageSquare className="w-24 h-24 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Select a conversation
                </h2>
                <p className="text-gray-600 mb-6">
                  Choose a conversation from the sidebar to start messaging, or start a new chat with a freelancer.
                </p>
                <Button
                  variant="outline"
                  onClick={() => navigate('/explore')}
                  className="inline-flex items-center"
                >
                  <FiSearch className="mr-2" />
                  Find Freelancers
                </Button>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center text-gray-500">
              Chat window will open here
            </div>
          )}
          
          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="md:hidden fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;