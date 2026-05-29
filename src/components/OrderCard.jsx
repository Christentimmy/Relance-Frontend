// src/components/OrderCard.jsx
import React from 'react';
import Button from './Button';
import Badge from './Badge';

const OrderCard = ({ order, onAction }) => {
  const {
    title,
    status,
    buyer,
    seller,
    amount,
    deadline,
    actions = ['View Details', 'Message'],
  } = order;

  const getStatusColor = (status) => {
    const statusMap = {
      completed: 'success',
      in_progress: 'warning',
      pending: 'pending',
      cancelled: 'error',
      delivered: 'success',
      revision: 'warning',
    };
    return statusMap[status] || 'pending';
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-green-200 transition-all duration-300 ease-in-out p-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-medium text-gray-900 line-clamp-1">{title}</h3>
            <Badge variant={getStatusColor(status)}>
              {status.replace('_', ' ')}
            </Badge>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Buyer</p>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                  <span className="text-xs font-semibold text-gray-600">
                    {buyer.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-900">{buyer.name}</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Seller</p>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <span className="text-xs font-semibold text-blue-600">
                    {seller.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-900">{seller.name}</span>
              </div>
            </div>
          </div>

          {/* Deadline */}
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Deadline: {deadline}</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end space-y-3">
          <div className="text-right">
            <p className="text-sm text-gray-500">Amount</p>
            <p className="text-2xl font-bold text-green-600">${amount}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            {actions.map((action) => (
              <Button
                key={action}
                variant="outline"
                size="sm"
                onClick={() => onAction && onAction(action, order)}
                className="min-w-[120px] group-hover:scale-105 transition-transform duration-300"
              >
                {action}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar for in_progress status */}
      {status === 'in_progress' && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>65%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: '65%' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;