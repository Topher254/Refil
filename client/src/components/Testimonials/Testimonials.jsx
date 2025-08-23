import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Mwangi",
      location: "Westlands, Nairobi",
      rating: 5,
      comment: "Amazing service! Ordered gas at 8 PM and it was delivered by 8:30 PM. The delivery person was so professional and the gas quality is excellent.",
      avatar: "SM",
      product: "ProGas 13kg"
    },
    {
      name: "John Kamau",
      location: "Kilimani, Nairobi",
      rating: 5,
      comment: "Best water delivery service in Nairobi. Always on time, clean water, and great customer service. Highly recommended!",
      avatar: "JK",
      product: "Water Refill 20L"
    },
    {
      name: "Mary Wanjiku",
      location: "Lavington, Nairobi",
      rating: 5,
      comment: "I've been using Refil for 6 months now. Never had any issues. The gas lasts longer and the delivery is always prompt.",
      avatar: "MW",
      product: "Total Gas 6kg"
    },
    {
      name: "David Ochieng",
      location: "Karen, Nairobi",
      rating: 5,
      comment: "Outstanding service! Ordered during a power outage and they still delivered. The team went above and beyond.",
      avatar: "DO",
      product: "SeaGas 50kg"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what thousands of satisfied customers have to say about our service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-3">
                {renderStars(testimonial.rating)}
              </div>
              
              <blockquote className="text-gray-700 mb-4 relative">
                <Quote className="w-4 h-4 text-gray-300 absolute -top-1 -left-1" />
                {testimonial.comment}
              </blockquote>
              
              <div className="text-sm text-primary font-medium">
                Ordered: {testimonial.product}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-primary-dull rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Join Our Happy Customer Family!
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Experience the same excellent service that our customers love
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-300 fill-current" />
                <span>4.8/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <span>•</span>
                <span>10,000+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <span>•</span>
                <span>30-Minute Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
