import React from 'react'
import { categories } from '../../assets/assets'
import { UseAppContext } from '../../context/context';
import { ArrowRight, Star, Clock, Shield } from 'lucide-react';

const Categories = () => {
  const { navigate, selectCategory } = UseAppContext()
  
  const handleCategoryClick = (category) => {
    selectCategory(category.path.toLowerCase());
    // Navigate to products page with category filter
    navigate(`/products?category=${category.path.toLowerCase()}`);
    scrollTo(0, 0);
  }

  const categoryFeatures = {
    gas: {
      icon: <Star className="w-5 h-5 text-yellow-500" />,
      features: ["KEBS Certified", "30 Min Delivery", "Free Installation"]
    },
    Water: {
      icon: <Shield className="w-5 h-5 text-blue-500" />,
      features: ["Pure & Clean", "Fast Refill", "Eco-Friendly"]
    }
  }

  return (
    <div className='mt-16 mb-16'>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Choose Your Category
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select from our premium gas cylinders and pure water refills. All products are certified and delivered safely to your doorstep.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8'>
        {categories.map((category, index) => {
          const features = categoryFeatures[category.path] || categoryFeatures.gas;
          return (
            <div
              key={index}
              className='group cursor-pointer bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100'
              onClick={() => handleCategoryClick(category)}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center`} style={{ backgroundColor: category.bgColor }}>
                  <img src={category.image} alt={category.name} className='w-12 h-12 group-hover:scale-110 transition-transform duration-300' />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{category.name}</h3>
                  <p className="text-gray-600">Premium quality, fast delivery</p>
                </div>
              </div>
              
              {/* Features */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  {features.icon}
                  <span className="font-semibold text-gray-700">Key Features:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {features.features.map((feature, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary font-semibold">
                  Explore {category.name}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="text-sm text-gray-500">
                  Click to browse
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary-dull/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Section */}
      <div className="text-center mt-16">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Not Sure What You Need? 🤔
          </h3>
          <p className="text-gray-600 mb-6">
            Our experts are here to help you choose the right product for your needs. 
            Get personalized recommendations and expert advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-primary hover:bg-primary-dull text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Expert Advice
            </button>
            <button className="px-8 py-4 bg-white hover:bg-gray-50 text-primary border-2 border-primary font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              View All Products
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories