import React, { useState } from 'react';
import { FiUpload, FiFile, FiImage, FiCheck, FiX } from 'react-icons/fi';

const UploadCard = ({
  title,
  description,
  acceptedFormats,
  icon = <FiUpload className="w-8 h-8" />,
  onFileSelect,
  uploadedFile = null,
  onRemove,
  status = 'empty', // 'empty', 'uploading', 'uploaded', 'error'
}) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="border-2 border-dashed rounded-2xl p-6 transition-all duration-300 hover:border-green-400">
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-4">
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center
            ${status === 'uploaded' ? 'bg-green-100 text-green-600' : 
              status === 'error' ? 'bg-red-100 text-red-600' : 
              status === 'uploading' ? 'bg-blue-100 text-blue-600' :
              'bg-gray-100 text-gray-400'}
            transition-all duration-300
          `}>
            {status === 'uploaded' ? (
              <FiCheck className="w-8 h-8" />
            ) : status === 'error' ? (
              <FiX className="w-8 h-8" />
            ) : (
              icon
            )}
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 max-w-md">{description}</p>

        {/* Accepted Formats */}
        <p className="text-sm text-gray-500 mb-6">
          Accepted formats: {acceptedFormats}
        </p>

        {/* File Preview (if uploaded) */}
        {uploadedFile && (
          <div className="w-full mb-6">
            <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  {uploadedFile.type?.startsWith('image/') ? (
                    <FiImage className="w-5 h-5 text-blue-600" />
                  ) : (
                    <FiFile className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm truncate max-w-xs">
                    {uploadedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(uploadedFile.size)}
                  </p>
                </div>
              </div>
              {onRemove && (
                <button
                  onClick={onRemove}
                  className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Upload Area */}
        {!uploadedFile && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              w-full border-2 border-dashed rounded-xl p-8 mb-4
              transition-all duration-300 cursor-pointer
              ${dragOver ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400'}
            `}
            onClick={() => document.getElementById(`file-input-${title}`)?.click()}
          >
            <div className="flex flex-col items-center">
              <FiUpload className="w-10 h-10 text-gray-400 mb-3" />
              <p className="text-gray-700 font-medium mb-1">
                Drag & drop files here
              </p>
              <p className="text-gray-500 text-sm">or click to browse</p>
            </div>
            <input
              id={`file-input-${title}`}
              type="file"
              className="hidden"
              onChange={handleFileInput}
              accept={acceptedFormats.split(',').map(f => f.trim().replace('*.', '.')).join(',')}
            />
          </div>
        )}

        {/* Upload Button */}
        {!uploadedFile ? (
          <button
            onClick={() => document.getElementById(`file-input-${title}`)?.click()}
            className="px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            {status === 'uploading' ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Uploading...</span>
              </div>
            ) : (
              'Upload File'
            )}
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={() => document.getElementById(`file-input-${title}`)?.click()}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Replace
            </button>
            {onRemove && (
              <button
                onClick={onRemove}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadCard;