import React, { useState } from 'react';
import { MdWaterDrop, MdLocalGasStation, MdBusiness } from 'react-icons/md';
import { toast } from 'react-hot-toast';

const BusinessTypeModal = ({ isOpen, onClose, onBusinessTypeSelect, user }) => {
  const [selectedType, setSelectedType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const businessTypes = [
    {
      id: 'gas',
      name: 'Gas Business',
      description: 'Sell cooking gas cylinders and related products',
      icon: <MdLocalGasStation size={48} className="text-orange-500" />,
      color: 'border-orange-200 bg-orange-50 hover:bg-orange-100'
    },
    {
      id: 'water',
      name: 'Water Business',
      description: 'Sell drinking water, water dispensers, and water services',
      icon: <MdWaterDrop size={48} className="text-blue-500" />,
      color: 'border-blue-200 bg-blue-50 hover:bg-blue-100'
    },
    {
      id: 'both',
      name: 'Both Gas & Water',
      description: 'Sell both gas and water products',
      icon: <MdBusiness size={48} className="text-purple-500" />,
      color: 'border-purple-200 bg-purple-50 hover:bg-purple-100'
    }
  ];

  const handleSubmit = async () => {
    if (!selectedType) {
      toast.error('Please select a business type');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/business-type', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ businessType: selectedType })
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Business type set successfully!');
        onBusinessTypeSelect(data.user);
        onClose();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to update business type');
      }
    } catch (error) {
      toast.error('Failed to update business type');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome to Refil, {user?.name}! 🎉
            </h2>
            <p className="text-gray-600">
              Please select your business type to customize your experience
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {businessTypes.map((type) => (
              <div
                key={type.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedType === type.id
                    ? 'border-primary bg-primary/5'
                    : type.color
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {type.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {type.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {type.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      selectedType === type.id
                        ? 'border-primary bg-primary'
                        : 'border-gray-300'
                    }`}>
                      {selectedType === type.id && (
                        <div className="w-2 h-2 bg-white rounded-full m-auto mt-1"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              disabled={isSubmitting}
            >
              Skip for now
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedType || isSubmitting}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                selectedType && !isSubmitting
                  ? 'bg-primary hover:bg-primary-dull text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Setting...' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessTypeModal;
