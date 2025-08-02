import React from 'react';
import { Link } from 'react-router-dom';
import { UseAppContext } from '../../context/context';
import { HiCheckCircle, HiHome, HiShoppingBag } from 'react-icons/hi';

const OrderSuccess = () => {
  const { navigate } = UseAppContext();

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6">
          <HiCheckCircle className="w-20 h-20 text-green-500 mx-auto" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for your order. We've received your payment and will begin processing your order immediately.
        </p>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">What's Next?</h3>
            <ul className="text-sm text-gray-600 space-y-1 text-left">
              <li>• You'll receive an order confirmation email</li>
              <li>• We'll notify you when your order is ready</li>
              <li>• Delivery will be made within the specified timeframe</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/" 
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dull text-white rounded-lg transition"
            >
              <HiHome className="w-4 h-4" />
              Continue Shopping
            </Link>
            
            <button 
              onClick={() => navigate('/orders')}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 hover:border-primary text-gray-700 hover:text-primary rounded-lg transition"
            >
              <HiShoppingBag className="w-4 h-4" />
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess; 