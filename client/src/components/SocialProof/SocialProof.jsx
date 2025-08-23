import React, { useState, useEffect } from 'react';
import { Users, ShoppingCart, Clock, MapPin } from 'lucide-react';

const SocialProof = () => {
  const [recentOrders, setRecentOrders] = useState([
    { id: 1, customer: "Alice", product: "ProGas 6kg", location: "Westlands", time: "2 min ago" },
    { id: 2, customer: "Bob", product: "Water 20L", location: "Kilimani", time: "5 min ago" },
    { id: 3, customer: "Carol", product: "Total Gas 13kg", location: "Lavington", time: "8 min ago" },
    { id: 4, customer: "David", product: "SeaGas 50kg", location: "Karen", time: "12 min ago" }
  ]);

  const [liveStats, setLiveStats] = useState({
    onlineUsers: 127,
    ordersToday: 89,
    deliveryInProgress: 23
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        onlineUsers: prev.onlineUsers + Math.floor(Math.random() * 3) - 1,
        ordersToday: prev.ordersToday + Math.floor(Math.random() * 2),
        deliveryInProgress: prev.deliveryInProgress + Math.floor(Math.random() * 2) - 1
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Clock className="w-6 h-6 text-green-600" />,
      title: "Lightning Fast",
      description: "30-minute delivery guaranteed"
    },
    {
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      title: "Nationwide Coverage",
      description: "Available across Nairobi"
    },
    {
      icon: <ShoppingCart className="w-6 h-6 text-purple-600" />,
      title: "Easy Ordering",
      description: "Order in 3 clicks"
    },
    {
      icon: <Users className="w-6 h-6 text-orange-600" />,
      title: "24/7 Support",
      description: "Always here to help"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            See What's Happening Right Now! 🚀
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of customers who are ordering gas and water right now
          </p>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="flex justify-center mb-3">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {liveStats.onlineUsers}
            </div>
            <div className="text-gray-600">People Online Now</div>
            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mt-2 animate-pulse"></div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="flex justify-center mb-3">
              <ShoppingCart className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {liveStats.ordersToday}
            </div>
            <div className="text-gray-600">Orders Today</div>
            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mt-2 animate-pulse"></div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="flex justify-center mb-3">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {liveStats.deliveryInProgress}
            </div>
            <div className="text-gray-600">Deliveries in Progress</div>
            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mt-2 animate-pulse"></div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-12">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Recent Orders from Real Customers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="w-8 h-8 bg-primary rounded-full mx-auto mb-2 flex items-center justify-center text-white text-sm font-semibold">
                  {order.customer.charAt(0)}
                </div>
                <div className="text-sm font-medium text-gray-800">{order.customer}</div>
                <div className="text-xs text-gray-600 mb-1">{order.product}</div>
                <div className="text-xs text-gray-500">{order.location}</div>
                <div className="text-xs text-primary font-medium">{order.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-primary-dull rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Don't Wait - Order Now! ⚡
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join the thousands of customers ordering right now and get your gas & water delivered in 30 minutes
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                <span>Live Orders: {liveStats.ordersToday}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
                <span>Online Now: {liveStats.onlineUsers}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse"></div>
                <span>Fast Delivery: 30 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;
