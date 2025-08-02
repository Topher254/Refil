import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { UseAppContext } from '../../context/context';
import { HiLocationMarker, HiClock, HiPhone, HiTruck, HiShieldCheck, HiCreditCard, HiHome } from 'react-icons/hi';
import { BsStarFill } from 'react-icons/bs';
import Productcard from '../../components/Product/Productcard';

const VendorDetails = () => {
  const { category } = useParams();
  const { getVendorsByCategory, selectCategory } = UseAppContext();
  
  // Set the selected category when component mounts
  React.useEffect(() => {
    selectCategory(category);
  }, [category, selectCategory]);

  const vendors = getVendorsByCategory(category);

  if (!vendors || vendors.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No vendors found</h2>
          <p className="text-gray-500">No vendors available for this category.</p>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link to="/" className="flex items-center space-x-1 hover:text-primary transition">
          <HiHome className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">
          {category === 'gas' ? 'Cooking Gas' : 'Water Refills'}
        </span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {category === 'gas' ? 'Cooking Gas' : 'Water Refills'} Vendors
        </h1>
        <p className="text-gray-600">Choose from our trusted vendors in your area</p>
      </div>

      <div className="space-y-8">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            {/* Vendor Header */}
            <div className="bg-gradient-to-r from-primary to-primary-dull p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={vendor.vendorImage} 
                    alt={vendor.vendorName}
                    className="w-16 h-16 rounded-full border-2 border-white"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">{vendor.vendorName}</h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <HiLocationMarker className="w-4 h-4" />
                      <span className="text-sm">{vendor.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <BsStarFill className="w-5 h-5 text-yellow-300" />
                    <span className="font-semibold">{vendor.rating}</span>
                    <span className="text-sm opacity-90">({vendor.totalReviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <HiShieldCheck className="w-4 h-4" />
                    <span className="text-sm">{vendor.safetyCertification}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vendor Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Delivery Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <HiTruck className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-gray-800">Delivery</h3>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Radius:</span> {vendor.deliveryRadius}</p>
                    <p><span className="font-medium">Time:</span> {vendor.deliveryTime}</p>
                    <p><span className="font-medium">Fee:</span> Kshs {vendor.deliveryFee}</p>
                    <p><span className="font-medium">Min Order:</span> Kshs {vendor.minimumOrder}</p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <HiClock className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-gray-800">Hours</h3>
                  </div>
                  <p className="text-sm text-gray-600">{vendor.operatingHours}</p>
                </div>

                {/* Contact */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <HiPhone className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-gray-800">Contact</h3>
                  </div>
                  <p className="text-sm text-gray-600">{vendor.contact}</p>
                </div>

                {/* Payment Methods */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <HiCreditCard className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-gray-800">Payment</h3>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {vendor.paymentMethods.map((method, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Products</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vendor.products.map((product) => (
                    <div key={product._id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-center mb-4">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-20 h-20 object-contain"
                        />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">{product.name}</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>{product.description.line1}</p>
                        <p>{product.description.line2}</p>
                        <p>{product.description.line3}</p>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Base Price:</span>
                          <span className="line-through text-gray-500">Kshs {product.basePrice}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Offer Price:</span>
                          <span className="font-semibold text-primary">Kshs {product.offerPrice}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Delivery Fee:</span>
                          <span className="text-gray-600">Kshs {vendor.deliveryFee}</span>
                        </div>
                        <div className="flex justify-between items-center border-t pt-2">
                          <span className="font-semibold text-gray-800">Final Price:</span>
                          <span className="font-bold text-lg text-primary">Kshs {product.finalPrice}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.features.map((feature, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        <button 
                          className={`w-full py-2 px-4 rounded-lg font-medium transition ${
                            product.inStock 
                              ? 'bg-primary hover:bg-primary-dull text-white' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                          disabled={!product.inStock}
                        >
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorDetails; 