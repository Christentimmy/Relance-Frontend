// src/components/CallModal.jsx (with inline animations)
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { FiPhoneOff, FiMic, FiMicOff, FiVideo, FiVideoOff, FiVolume2, FiUser } from 'react-icons/fi';

const CallModal = ({ 
  isOpen, 
  onClose, 
  onEndCall, 
  isCallActive, 
  callerName, 
  callerAvatar 
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let interval;
    if (isCallActive && isOpen) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    
    return () => clearInterval(interval);
  }, [isCallActive, isOpen]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCallAction = (action) => {
    switch(action) {
      case 'mute':
        setIsMuted(!isMuted);
        break;
      case 'video':
        setIsVideoOn(!isVideoOn);
        break;
      case 'end':
        onEndCall();
        onClose();
        break;
      default:
        break;
    }
  };

  // Inline CSS for animations
  const animationStyles = `
    @keyframes slideIn {
      from {
        transform: translateY(10px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    @keyframes ping-slow {
      75%, 100% {
        transform: scale(2);
        opacity: 0;
      }
    }
    
    .animate-slide-in {
      animation: slideIn 0.3s ease-out;
    }
    
    .animate-ping-slow {
      animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
    
    .animate-pulse-slow {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isCallActive ? 'Ongoing Call' : 'Calling...'}
            </h2>
            <p className="text-gray-600">
              {isCallActive 
                ? `Connected with ${callerName}` 
                : `Starting call with ${callerName}`
              }
            </p>
          </div>

          {/* Caller Info */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
                  src={callerAvatar}
                  alt={callerName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Pulse Animation for Calling State - using inline animation class */}
              {!isCallActive && (
                <div className="absolute inset-0 rounded-full border-4 border-green-500 animate-ping-slow opacity-20"></div>
              )}
              
              {/* Call Status Indicator */}
              <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                isCallActive ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {isCallActive ? 'Live' : 'Calling...'}
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-1 animate-slide-in">
              {callerName}
            </h3>
            {isCallActive ? (
              <p className="text-lg text-gray-600 font-mono">{formatDuration(callDuration)}</p>
            ) : (
              <p className="text-gray-500">Waiting for answer...</p>
            )}
          </div>

          {/* Local Video Preview (Mock) */}
          {isVideoOn && isCallActive && (
            <div 
              className="absolute top-4 right-4 w-48 h-36 rounded-xl overflow-hidden border-2 border-white shadow-lg animate-slide-in"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <FiUser className="w-12 h-12 text-white" />
              </div>
              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                You
              </div>
            </div>
          )}

          {/* Call Controls */}
          <div className="flex justify-center space-x-6">
            {/* Mute Button */}
            <button
              onClick={() => handleCallAction('mute')}
              className={`
                p-4 rounded-full transition-all duration-300 
                hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                ${isMuted 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {isMuted ? (
                <FiMicOff className="w-6 h-6" />
              ) : (
                <FiMic className="w-6 h-6" />
              )}
            </button>

            {/* Video Toggle Button */}
            <button
              onClick={() => handleCallAction('video')}
              className={`
                p-4 rounded-full transition-all duration-300 
                hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                ${!isVideoOn 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {isVideoOn ? (
                <FiVideo className="w-6 h-6" />
              ) : (
                <FiVideoOff className="w-6 h-6" />
              )}
            </button>

            {/* End Call Button */}
            <button
              onClick={() => handleCallAction('end')}
              className="
                p-4 bg-red-500 text-white rounded-full 
                hover:bg-red-600 hover:scale-110 hover:shadow-lg
                transition-all duration-300 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
              "
            >
              <FiPhoneOff className="w-6 h-6" />
            </button>

            {/* Volume Button */}
            <button
              className="
                p-4 bg-gray-100 text-gray-700 rounded-full 
                hover:bg-gray-200 hover:scale-110
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
              "
            >
              <FiVolume2 className="w-6 h-6" />
            </button>
          </div>

          {/* Call Status Messages */}
          <div className="mt-8 space-y-2">
            {!isCallActive && (
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-full animate-pulse-slow">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-700 text-sm">Ringing...</span>
                </div>
              </div>
            )}
            
            <div className="text-center text-sm text-gray-500 mt-4">
              <p>This is a demo call interface</p>
              <p className="text-xs mt-1">Real call functionality would be implemented with WebRTC</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CallModal;