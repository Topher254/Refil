import React from 'react';
import { Link } from 'react-router-dom';
import { UseAppContext } from '../../context/context';
import { HiTrash, HiArrowLeft, HiShoppingBag, HiLocationMarker, HiTruck } from 'react-icons/hi';
import { BsStarFill } from 'react-icons/bs';

const Cart = () => {
  const { 
    CartItems, 
    getProductWithVendor,
    updateCartItems, 
    removeItem, 
    navigate 
  } = UseAppContext();

  // Calculate cart totals
  const cartItemCount = Object.values(CartItems).reduce((total, quantity) => total + quantity, 0);
  
  // Get cart items with product and vendor details
  const cartItemsWithDetails = Object.entries(CartItems).map(([productId, quantity]) => {
    const productWithVendor = getProductWithVendor(productId);
    if (!productWithVendor) return null;
    
    return {
      ...productWithVendor,
      quantity,
      totalPrice: productWithVendor.finalPrice * quantity
    };
  }).filter(item => item !== null); // Filter out any null items

  const subtotal = cartItemsWithDetails.reduce((total, item) => total + item.totalPrice, 0);
  const platformFee = subtotal * 0.015; // 1.5% platform fee
  const total = subtotal + platformFee;

  const handleCheckout = () => {
    if (cartItemCount === 0) {
      return;
    }
    navigate('/checkout');
  };

  if (cartItemCount === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <HiShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some products to get started!</p>
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dull text-white rounded-lg transition"
          >
            <HiArrowLeft className="w-4 h-4" />
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition"
          >
            <HiArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
        <p className="text-gray-600 mt-2">{cartItemCount} item{cartItemCount !== 1 ? 's' : ''} in your cart</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Cart Items</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {cartItemsWithDetails.map((item) => (
                <div key={item._id} className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-contain rounded-lg border border-gray-200"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                              {item.brand}
                            </span>
                            <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              {item.size}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                          
                          {/* Vendor Info */}
                          <div className="flex items-center gap-2 mb-2">
                            <img 
                              src={item.vendor.vendorImage} 
                              alt={item.vendor.vendorName}
                              className="w-5 h-5 rounded-full"
                            />
                            <span className="text-sm text-gray-600">{item.vendor.vendorName}</span>
                          </div>
                          
                          {/* Rating */}
                          <div className="flex items-center gap-1 mb-3">
                            <BsStarFill className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-gray-600">{item.vendor.rating} ({item.vendor.totalReviews} reviews)</span>
                          </div>

                          {/* Delivery Info */}
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <HiTruck className="w-4 h-4" />
                              <span>{item.vendor.deliveryTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <HiLocationMarker className="w-4 h-4" />
                              <span>{item.vendor.deliveryRadius}</span>
                            </div>
                          </div>

                          {/* Description */}
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>{item.description?.line1}</p>
                            <p>{item.description?.line2}</p>
                            <p>{item.description?.line3}</p>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right ml-4">
                          <div className="text-lg font-semibold text-primary">
                            Kshs {item.finalPrice}
                          </div>
                          {item.basePrice !== item.offerPrice && (
                            <div className="text-sm text-gray-500 line-through">
                              Kshs {item.basePrice}
                            </div>
                          )}
                          <div className="text-xs text-gray-500 mt-1">
                            + Kshs {item.vendor.deliveryFee} delivery
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-700">Quantity:</span>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => {
                                if (item.quantity === 1) {
                                  removeItem(item._id);
                                } else {
                                  updateCartItems(item._id, item.quantity - 1);
                                }
                              }}
                              className="px-3 py-1 text-gray-600 hover:text-primary transition"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 border-x border-gray-300 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartItems(item._id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:text-primary transition"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm text-gray-600">Total:</div>
                            <div className="text-lg font-semibold text-primary">
                              Kshs {item.totalPrice}
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(item._id)}
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            <HiTrash className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartItemCount} items)</span>
                <span>Kshs {subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Platform Fee (1.5%)</span>
                <span>Kshs {platformFee.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total</span>
                  <span>Kshs {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-6 py-3 px-4 bg-primary hover:bg-primary-dull text-white font-medium rounded-lg transition"
            >
              Proceed to Checkout
            </button>

            <div className="mt-4 text-center">
              <Link 
                to="/products" 
                className="text-primary hover:text-primary-dull text-sm transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 