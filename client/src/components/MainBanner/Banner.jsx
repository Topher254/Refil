import React from 'react';
import delivery_sm from '../../assets/delivery_sm.jpg';
import delivery_md from '../../assets/delivery_md.jpg';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Star, Shield, Truck } from 'lucide-react';

const Banner = () => {
  const benefits = [
    { icon: <Clock className="w-5 h-5" />, text: "30 Min Delivery" },
    { icon: <Star className="w-5 h-5" />, text: "4.8★ Rating" },
    { icon: <Shield className="w-5 h-5" />, text: "100% Safe" },
    { icon: <Truck className="w-5 h-5" />, text: "Free Delivery" }
  ];

  return (
    <div className='relative'>
      <img
        src={delivery_md}
        alt='banner'
        className='w-full hidden md:block rounded-lg'
      />
      <img
        src={delivery_sm}
        alt='banner_for_mobile'
        className='w-full md:hidden rounded-lg'
      />

      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-center text-white px-4 md:px-8'>
        {/* Urgency Badge */}
        <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse">
          🔥 LIMITED TIME: Free Delivery on Orders Above KES 2,000
        </div>

        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15 mb-4'>
          Refill your gas and water lazily, <span className="text-yellow-300">Quality You Can Trust</span>
        </h1>

        <p className="text-lg md:text-xl text-center md:text-left mb-6 max-w-md opacity-90">
          Join 10,000+ happy customers who trust us for fast, safe, and reliable gas & water delivery
        </p>

        {/* Benefits Row */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center md:justify-start">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-2 rounded-full">
              {benefit.icon}
              <span className="text-sm font-medium">{benefit.text}</span>
            </div>
          ))}
        </div>

        <div className='flex flex-col sm:flex-row items-center gap-4 font-medium'>
          <Link
            to='/products'
            className='group flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dull transition-all duration-300 rounded-xl text-white cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105'
          >
            Order Now - 30 Min Delivery
            <ArrowRight className='transition-transform group-hover:translate-x-1' />
          </Link>
          <Link
            to='/products'
            className='group flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 transition-all duration-300 rounded-xl cursor-pointer hover:bg-white/30'
          >
            View All Products
            <ArrowRight className='transition-transform group-hover:translate-x-1' />
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 text-center md:text-left">
          <p className="text-sm opacity-75 mb-2">Trusted by families across Nairobi</p>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm">4.8/5</span>
            </div>
            <div className="text-sm opacity-75">•</div>
            <span className="text-sm opacity-75">10,000+ Orders</span>
            <div className="text-sm opacity-75">•</div>
            <span className="text-sm opacity-75">KEBS Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
