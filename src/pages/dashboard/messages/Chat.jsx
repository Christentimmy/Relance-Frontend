// src/pages/Chat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { Button, Avatar, Badge, Input, Modal, CallModal } from '../../../components';

import { 
  FiSearch, 
  FiChevronLeft, 
  FiPaperclip, 
  FiSend,
  FiPhone,
  FiVideo,
  FiMoreVertical,
  FiCheck,
  FiCheckCircle,
  FiSmile,
  FiImage,
  FiFile,
  FiMic,
  FiVideoOff,
  FiCornerDownLeft,
  FiClock
} from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';

const Chat = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCallModal, setShowCallModal] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [activeMessageMenu, setActiveMessageMenu] = useState(null);

  // Mock user data
  const currentUser = {
    id: 'user1',
    name: 'You',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You'
  };

  // Mock chat partner data
  const chatPartner = {
    id: '2',
    name: 'Sarah Williams',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    online: true,
    isSeller: false,
    rating: 4.9,
    completedOrders: 42
  };

  // Mock messages
  const mockMessages = [
    {
      id: 1,
      senderId: '2',
      text: 'Hi! I saw your gig for logo design. I need a logo for my startup.',
      timestamp: '10:15 AM',
      read: true,
      attachments: []
    },
    {
      id: 2,
      senderId: 'user1',
      text: 'Hello! I\'d love to help with your logo. What\'s your brand about?',
      timestamp: '10:16 AM',
      read: true,
      attachments: []
    },
    {
      id: 3,
      senderId: '2',
      text: 'We\'re a sustainable fashion brand focusing on eco-friendly materials.',
      timestamp: '10:18 AM',
      read: true,
      attachments: []
    },
    {
      id: 4,
      senderId: 'user1',
      text: 'That sounds amazing! I have some initial ideas. Would you like to see some concept sketches first?',
      timestamp: '10:20 AM',
      read: true,
      attachments: []
    },
    {
      id: 5,
      senderId: 'user1',
      text: '',
      timestamp: '10:21 AM',
      read: true,
      attachments: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
          name: 'concept-1.jpg',
          size: '2.4 MB'
        },
        {
          type: 'file',
          url: '#',
          name: 'moodboard.pdf',
          size: '4.2 MB'
        }
      ]
    },
    {
      id: 6,
      senderId: '2',
      text: 'Yes, that would be perfect! Can we schedule a quick call to discuss the details?',
      timestamp: '10:22 AM',
      read: true,
      attachments: []
    },
    {
      id: 7,
      senderId: 'user1',
      text: 'Absolutely! I\'m available tomorrow between 2-4 PM. Would that work?',
      timestamp: '10:25 AM',
      read: true,
      attachments: []
    },
    {
      id: 8,
      senderId: '2',
      text: '2 PM works great! Looking forward to it.',
      timestamp: '10:30 AM',
      read: true,
      attachments: []
    }
  ];

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 800);
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      senderId: 'user1',
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      attachments: []
    };

    setMessages(prev => [...prev, { ...message, animate: true }]);
    setNewMessage('');

    // Simulate typing indicator
    setIsTyping(true);
    
    // Simulate reply after 1-3 seconds
    setTimeout(() => {
      setIsTyping(false);
      const reply = {
        id: messages.length + 2,
        senderId: '2',
        text: 'Thanks for your message! I\'ll get back to you shortly.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
        attachments: []
      };
      setMessages(prev => [...prev, { ...reply, animate: true }]);
    }, 1500 + Math.random() * 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleStartCall = () => {
    setShowCallModal(true);
    setIsCallActive(true);
    
    // Simulate call ending after 30 seconds
    setTimeout(() => {
      setIsCallActive(false);
    }, 30000);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setShowCallModal(false);
  };

  const handleAttachmentSelect = (type) => {
    // Handle different attachment types
    console.log(`Selected ${type} attachment`);
    setShowAttachmentMenu(false);
  };

  const MessageBubble = ({ message, isOwnMessage }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div 
        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4 animate-slide-in`}
        style={{ animationDelay: `${message.id * 0.05}s` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`flex max-w-[85%] md:max-w-[75%] ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} items-end`}>
          {!isOwnMessage && (
            <Avatar
              src={chatPartner.avatar}
              alt={chatPartner.name}
              size="sm"
              className="mb-1 mr-2 transition-transform duration-300 hover:scale-110"
            />
          )}
          
          <div className="relative group">
            {isHovered && (
              <button
                onClick={() => setActiveMessageMenu(activeMessageMenu === message.id ? null : message.id)}
                className={`absolute -top-2 ${isOwnMessage ? '-left-8' : '-right-8'} z-10 p-1.5 bg-white shadow-lg rounded-full border border-gray-200 hover:bg-gray-50 transition-all duration-200`}
              >
                <BsThreeDots className="w-4 h-4 text-gray-500" />
              </button>
            )}
            
            {activeMessageMenu === message.id && (
              <div className={`absolute ${isOwnMessage ? 'right-0' : 'left-0'} -top-10 z-20 bg-white shadow-lg rounded-lg border border-gray-200 p-2 min-w-32`}>
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded">
                  Reply
                </button>
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded">
                  Forward
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
                  Delete
                </button>
              </div>
            )}
            
            <div className={`relative rounded-2xl px-4 py-3 transition-all duration-300 hover:shadow-md ${
              isOwnMessage 
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white rounded-br-sm chat-bubble-tail-right' 
                : 'bg-gray-100 text-gray-800 rounded-bl-sm chat-bubble-tail-left'
            }`}>
              {message.attachments && message.attachments.length > 0 && (
                <div className="mb-3 space-y-2">
                  {message.attachments.map((attachment, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-lg border ${isOwnMessage ? 'bg-white/20 border-white/30' : 'bg-white border-gray-200'} transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
                    >
                      {attachment.type === 'image' ? (
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                            <img src={attachment.url} alt={attachment.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium truncate">{attachment.name}</p>
                            <p className="text-xs opacity-75">{attachment.size}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 ${isOwnMessage ? 'bg-white/20' : 'bg-green-50'} rounded-lg flex items-center justify-center`}>
                            <FiFile className={`w-6 h-6 ${isOwnMessage ? 'text-white' : 'text-green-600'}`} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium truncate">{attachment.name}</p>
                            <p className="text-xs opacity-75">{attachment.size}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {message.text && (
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
              )}
              
              <div className={`flex items-center justify-end mt-2 text-xs space-x-2 ${
                isOwnMessage ? 'text-green-100' : 'text-gray-500'
              }`}>
                <span className="opacity-75">{message.timestamp}</span>
                {isOwnMessage && (
                  message.read ? (
                    <FiCheckCircle className="w-3.5 h-3.5 opacity-75" />
                  ) : (
                    <FiCheck className="w-3.5 h-3.5 opacity-75" />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ChatSkeletonLoader = () => (
    <div className="flex-1 p-6 space-y-6">
      {[1, 2, 3, 4, 5].map((n) => (
        <div 
          key={n} 
          className={`flex ${n % 2 === 0 ? 'justify-end' : 'justify-start'} animate-pulse`}
          style={{ animationDelay: `${n * 0.1}s` }}
        >
          <div className={`w-3/4 ${n % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'} h-20 rounded-2xl`}></div>
        </div>
      ))}
    </div>
  );

  const TypingIndicator = () => (
    <div className="flex items-center space-x-1 mb-4">
      <Avatar
        src={chatPartner.avatar}
        alt={chatPartner.name}
        size="sm"
      />
      <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );

  // Add custom CSS for animations
  const styles = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
    }
    
    @keyframes pulse-glow {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
      }
      70% {
        box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
      }
    }
    
    .animate-slide-in {
      animation: slideIn 0.3s ease-out forwards;
    }
    
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    
    .animate-pulse-glow {
      animation: pulse-glow 2s infinite;
    }
    
    /* Chat bubble tails */
    .chat-bubble-tail-right::after {
      content: '';
      position: absolute;
      right: -8px;
      bottom: 0;
      width: 0;
      height: 0;
      border-left: 8px solid #10b981;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
    }
    
    .chat-bubble-tail-left::before {
      content: '';
      position: absolute;
      left: -8px;
      bottom: 0;
      width: 0;
      height: 0;
      border-right: 8px solid #f3f4f6;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
    }
    
    /* Custom scrollbar */
    .chat-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    
    .chat-scrollbar::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }
    
    .chat-scrollbar::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 10px;
    }
    
    .chat-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #a1a1a1;
    }
    
    /* Message hover effect */
    .message-hover-effect {
      transition: all 0.3s ease-in-out;
    }
    
    .message-hover-effect:hover {
      transform: translateY(-2px);
    }
  `;

  return (
    <DashboardLayout>
      <style>{styles}</style>
      
      <div className="flex flex-col h-[calc(100vh-80px)] bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white transition-all duration-300 hover:shadow-sm">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard/messages')}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar
                  src={chatPartner.avatar}
                  alt={chatPartner.name}
                  size="lg"
                  className="transition-all duration-300 hover:scale-105"
                />
                {chatPartner.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                )}
              </div>
              
              <div>
                <h2 className="font-bold text-gray-900 text-lg">{chatPartner.name}</h2>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <span className={`flex items-center ${chatPartner.online ? 'text-green-500' : 'text-gray-400'} transition-colors duration-300`}>
                    <div className={`w-2 h-2 rounded-full mr-1 ${chatPartner.online ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                    {chatPartner.online ? 'Online' : 'Offline'}
                  </span>
                  <span>•</span>
                  <span>{chatPartner.isSeller ? 'Seller' : 'Buyer'}</span>
                  <span>•</span>
                  <span>⭐ {chatPartner.rating}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={handleStartCall}
              className="flex items-center space-x-2 hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse-glow"
            >
              <FiVideo className="w-4 h-4" />
              <span>Video Call</span>
            </Button>
            
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95">
              <FiMoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100/30 p-4 md:p-6 chat-scrollbar"
        >
          {loading ? (
            <ChatSkeletonLoader />
          ) : (
            <div className="space-y-4">
              {/* Date separator */}
              <div className="text-center my-6">
                <span className="inline-block px-4 py-1 bg-white/50 text-sm text-gray-500 rounded-full border border-gray-200">
                  Today
                </span>
              </div>
              
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwnMessage={message.senderId === currentUser.id}
                />
              ))}
              
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>

        {/* Message Input Area */}
        <div className="p-4 md:p-6 border-t border-gray-200 bg-white transition-all duration-300">
          {showAttachmentMenu && (
            <div className="absolute bottom-20 left-4 bg-white rounded-xl shadow-2xl border border-gray-200 p-3 animate-slide-in z-50">
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={() => handleAttachmentSelect('image')}
                  className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                    <FiImage className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-600">Photo</span>
                </button>
                <button 
                  onClick={() => handleAttachmentSelect('file')}
                  className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                    <FiFile className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-xs text-gray-600">File</span>
                </button>
                <button 
                  onClick={() => handleAttachmentSelect('audio')}
                  className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                    <FiMic className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-xs text-gray-600">Audio</span>
                </button>
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button
                onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                className={`p-3 rounded-xl transition-all duration-300 hover:shadow-md ${showAttachmentMenu ? 'bg-green-50 text-green-600 rotate-90' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              >
                <FiPaperclip className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Type your message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pr-12 pl-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
              />
              
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110">
                  <FiSmile className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>
            
            <Button
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ''}
              variant="primary"
              className="px-5 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 animate-float"
            >
              <FiSend className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <FiCornerDownLeft className="w-3 h-3 mr-1" />
                Enter to send
              </span>
              <span>Shift + Enter for new line</span>
            </div>
            <div className="flex items-center">
              <FiClock className="w-3 h-3 mr-1" />
              <span>Messages are encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Call Modal */}
      <CallModal
        isOpen={showCallModal}
        onClose={() => setShowCallModal(false)}
        onEndCall={handleEndCall}
        isCallActive={isCallActive}
        callerName={chatPartner.name}
        callerAvatar={chatPartner.avatar}
      />
      
    </DashboardLayout>
  );
};

export default Chat;