import React from 'react'
import Productcard from '../Product/Productcard'
import { UseAppContext } from '../../context/context'
import { Flame, Star, Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const BestSellers = () => {
  const { products } = UseAppContext()
  console.log("products", products)

  // Optional: handle loading
  if (!products || products.length === 0) {
    return <p className="mt-8">Loading best sellers...</p>
  }

  const bestSellers = products.slice(0, 5)

  return (
    <div className='mt-16 mb-16'>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Flame className="w-6 h-6 text-red-500" />
            <p className='text-2xl md:text-3xl font-bold text-gray-800'>Best Sellers</p>
          </div>
          <p className="text-gray-600">Most popular products our customers love</p>
        </div>
        
        <Link
          to="/products"
          className="group flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dull text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mt-4 md:mt-0"
        >
          View All Products
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Clock className="w-6 h-6 text-red-500" />
          <h3 className="text-lg font-semibold text-red-800">Limited Time Offer!</h3>
        </div>
        <p className="text-red-700 mb-3">
          Order now and get <strong>FREE DELIVERY</strong> on all orders above KES 2,000. 
          Plus, enjoy our fastest 30-minute delivery service!
        </p>
        <div className="flex items-center gap-4 text-sm text-red-600">
          <span>🔥 Free Delivery</span>
          <span>⚡ 30 Min Delivery</span>
          <span>🛡️ 100% Safe</span>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        {bestSellers.map((product, index) => (
          <div key={product._id} className="relative">
            {/* Best Seller Badge */}
            {index < 3 && (
              <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                #{index + 1} Best Seller
              </div>
            )}
            <Productcard product={product} />
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-primary to-primary-dull rounded-2xl p-8 text-white max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">
            Can't Find What You're Looking For? 🔍
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Browse our complete catalog of gas cylinders and water refills
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Explore All Products
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BestSellers
