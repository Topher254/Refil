import React from 'react';
import { Clock, Flame, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const UrgencySection = () => {
  const offers = [
    {
      icon: <Flame className="w-6 h-6 text-red-500" />,
      title: "Limited Time Offer",
      description: "Free delivery on orders above KES 2,000",
      validUntil: "Today Only",
      color: "from-red-50 to-red-100"
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Flash Sale",
      description: "20% off on water refills",
      validUntil: "Next 2 hours",
      color: "from-yellow-50 to-yellow-100"
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: "Express Delivery",
      description: "Order now, delivered in 30 minutes",
      validUntil: "24/7 Available",
      color: "from-blue-50 to-blue-100"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Don't Miss Out on These Amazing Offers!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Order now and enjoy lightning-fast delivery, exclusive discounts, and premium quality gas & water
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {offers.map((offer, index) => (
            <div key={index} className={`bg-gradient-to-br ${offer.color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
              <div className="flex items-center gap-3 mb-4">
                {offer.icon}
                <h3 className="text-xl font-bold text-gray-800">{offer.title}</h3>
              </div>
              <p className="text-gray-700 mb-3">{offer.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-600">
                  Valid: {offer.validUntil}
                </span>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              🚀 Ready to Get Started?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Join thousands of satisfied customers who trust us for their daily gas and water needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dull text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Order Now
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/products"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-primary border-2 border-primary font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View All Products
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrgencySection;
