import React from 'react';
import { Shield, Clock, Truck, Star, Users, Award } from 'lucide-react';

const TrustIndicators = () => {
  const stats = [
    {
      icon: <Truck className="w-8 h-8 text-blue-600" />,
      number: "30",
      label: "Minutes Delivery",
      description: "Fastest in Nairobi"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      number: "10K+",
      label: "Happy Customers",
      description: "Trusted by families"
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      number: "100%",
      label: "Safety Guaranteed",
      description: "KEBS Certified"
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      number: "4.8",
      label: "Customer Rating",
      description: "Excellent service"
    }
  ];

  const certifications = [
    { name: "KEBS Certified", icon: <Award className="w-5 h-5 text-green-600" /> },
    { name: "ISO 9001", icon: <Award className="w-5 h-5 text-blue-600" /> },
    { name: "Safety First", icon: <Shield className="w-5 h-5 text-purple-600" /> },
    { name: "24/7 Support", icon: <Clock className="w-5 h-5 text-orange-600" /> }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                {stat.number}
              </div>
              <div className="text-sm font-semibold text-gray-700 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-gray-500">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-6">
            Trusted & Certified by Leading Authorities
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
                {cert.icon}
                <span className="text-sm font-medium text-gray-700">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;
