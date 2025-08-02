import { useState } from 'react';
import { Truck, Droplets, DollarSign, Users } from 'lucide-react';
import delivery_md_3 from '../../assets/delivery_md_3.jpg'

export default function Subscribe() {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email) {
      alert('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 rounded-3xl">
      <div className="bg-gradient-to-br from-green-50 to-green-100 relative rounded-3xl shadow overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 opacity-10">
            <Truck className="w-12 h-12 text-green-700 transform rotate-12" />
          </div>
          <div className="absolute top-32 right-20 opacity-10">
            <Truck className="w-8 h-8 text-green-600 transform -rotate-12" />
          </div>
          <div className="absolute bottom-40 left-1/4 opacity-10">
            <Truck className="w-10 h-10 text-green-400 transform rotate-45" />
          </div>
          <div className="absolute top-1/2 right-10 opacity-10">
            <Truck className="w-6 h-6 text-green-500 transform -rotate-45" />
          </div>
          <div className="absolute bottom-20 right-1/3 opacity-10">
            <Truck className="w-14 h-14 text-green-600 transform rotate-12" />
          </div>
          <div className="absolute top-1/3 left-1/2 opacity-10">
            <Truck className="w-8 h-8 text-green-400 transform -rotate-12" />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-green-400 rounded-full w-80 h-80 mx-auto relative overflow-hidden">
                <img 
                  src={delivery_md_3}
                  alt="Happy delivery person with gas and water"
                  className="w-full h-full object-cover"
                />
              
              </div>
              
              <div className="absolute bottom-4 left-2/3 transform -translate-x-1/2 bg-white rounded-lg shadow-lg px-4 py-2 flex items-center space-x-2">
                <Truck className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="text-sm font-semibold text-blue-500">Fast Delivery</div>
                  <div className="text-xs text-gray-500">Gas & Water</div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-green-500 mb-8">
                Why We Are the Best?
              </h1>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 rounded-lg p-3 flex-shrink-0">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Fastest Delivery</h3>
                    <p className="text-gray-600">Gas and water delivered in under 30 minutes.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 rounded-lg p-3 flex-shrink-0">
                    <Droplets className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Quality Guaranteed</h3>
                    <p className="text-gray-600">Premium gas and pure water from trusted sources.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 rounded-lg p-3 flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Affordable Prices</h3>
                    <p className="text-gray-600">Quality gas and water at competitive prices.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 rounded-lg p-3 flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Trusted by Thousands</h3>
                    <p className="text-gray-600">Loved by 10,000+ happy customers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Never Miss a Deal!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to get the latest offers, new arrivals, and exclusive discounts on gas and water delivery
          </p>

          <div className="flex justify-center items-center mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email id"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              onClick={handleSubscribe}
              className="bg-green-500 hover:bg-green-600 text-white px-4 md:px-8 py-3 rounded-r-lg font-semibold transition-colors duration-200"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}