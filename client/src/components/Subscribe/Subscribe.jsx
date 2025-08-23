import { useState } from 'react';
import { Truck, Droplets, DollarSign, Users, Gift, ArrowRight, Star, Clock } from 'lucide-react';
import delivery_md_3 from '../../assets/delivery_md_3.jpg'

export default function Subscribe() {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email) {
      alert('Thank you for subscribing! You\'ll receive exclusive offers and updates.');
      setEmail('');
    }
  };

  const benefits = [
    { icon: <Gift className="w-6 h-6 text-green-600" />, text: "Exclusive Discounts" },
    { icon: <Clock className="w-6 h-6 text-blue-600" />, text: "Early Access to Deals" },
    { icon: <Star className="w-6 h-6 text-yellow-500" />, text: "VIP Customer Status" },
    { icon: <Truck className="w-6 h-6 text-purple-600" />, text: "Priority Delivery" }
  ];

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
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl font-bold text-green-500 mb-8">
                  Stay Updated & Save Big! 💰
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  Subscribe to our newsletter and be the first to know about exclusive offers, 
                  flash sales, and special discounts on gas and water delivery.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/50 rounded-lg p-3">
                    {benefit.icon}
                    <span className="text-sm font-medium text-gray-700">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Subscribe Form */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                  🎉 Get 20% OFF Your First Order!
                </h3>
                <p className="text-gray-600 text-center mb-4">
                  Subscribe now and receive an exclusive discount code
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSubscribe}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center gap-2 justify-center"
                  >
                    Subscribe & Save
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 text-center mt-3">
                  🔒 We respect your privacy. Unsubscribe at any time.
                </p>
              </div>

              {/* Urgency Element */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-red-500" />
                  <span className="text-red-700 font-semibold">Limited Time Offer!</span>
                </div>
                <p className="text-red-600 text-sm">
                  First 100 subscribers get an additional 10% discount on their next order!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}