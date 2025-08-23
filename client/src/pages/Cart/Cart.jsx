import React from 'react';
import { Link } from 'react-router-dom';
import { UseAppContext } from '../../context/context';
import { HiTrash, HiArrowLeft, HiShoppingBag, HiLocationMarker, HiTruck } from 'react-icons/hi';
import { BsStarFill } from 'react-icons/bs';
import { toast } from 'react-hot-toast';

const Cart = () => {
  const { 
    CartItems, 
    products, // Use the new products array instead of getProductWithVendor
    updateCartItems, 
    removeItem, 
    clearCart,
    navigate 
  } = UseAppContext();

  // Calculate cart totals
  const cartItemCount = Object.values(CartItems).reduce((total, quantity) => total + quantity, 0);
  
  // Get cart items with product details from the new products array
  const cartItemsWithDetails = Object.entries(CartItems).map(([productId, quantity]) => {
    const product = products.find(p => p._id === productId);
    if (!product) return null;
    
    return {
      ...product,
      quantity,
      totalPrice: product.finalPrice * quantity
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

  // Show loading state while calculating
  if (cartItemCount > 0 && cartItemsWithDetails.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cart items...</p>
        </div>
      </div>
    );
  }

  if (cartItemCount === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <HiShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-2">Looks like you haven't added any products yet.</p>
          <p className="text-gray-500 mb-8">Start shopping to fill your cart with amazing products!</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dull text-white rounded-lg transition-colors font-medium"
            >
              <HiArrowLeft className="w-4 h-4" />
              Browse Products
            </Link>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
            >
              Go to Home
            </Link>
          </div>
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
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <HiArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
            <p className="text-gray-600 mt-2">
              {cartItemCount} item{cartItemCount !== 1 ? 's' : ''} in your cart
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {cartItemCount} items
            </div>
          </div>
        </div>
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
                        src={item.image || '/assets/images/placeholder.jpg'} 
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
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-xs font-medium text-primary">
                                {item.vendor?.name?.charAt(0) || 'V'}
                              </span>
                            </div>
                            <span className="text-sm text-gray-600">{item.vendor?.name || 'Vendor'}</span>
                          </div>
                          
                          {/* Rating */}
                          <div className="flex items-center gap-1 mb-3">
                            <BsStarFill className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-gray-600">
                              {item.rating || 3} ({item.totalRatings || 0} reviews)
                            </span>
                          </div>

                          {/* Delivery Info */}
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <HiTruck className="w-4 h-4" />
                              <span>Same day delivery</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <HiLocationMarker className="w-4 h-4" />
                              <span>Nairobi & surrounding areas</span>
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
                            + Kshs {item.deliveryFee || 0} delivery
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-700">Quantity:</span>
                          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <button
                              onClick={() => {
                                if (item.quantity === 1) {
                                  removeItem(item._id);
                                } else {
                                  updateCartItems(item._id, item.quantity - 1);
                                }
                              }}
                              className="px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={item.quantity === 1}
                            >
                              -
                            </button>
                            <span className="px-4 py-2 border-x border-gray-300 font-medium bg-gray-50 min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartItems(item._id, item.quantity + 1)}
                              className="px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm text-gray-600">Total:</div>
                            <div className="text-lg font-semibold text-primary">
                              Kshs {item.totalPrice.toFixed(2)}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                toast.success(`${item.name} saved for later!`);
                                // TODO: Implement save for later functionality
                                console.log('Save for later:', item._id);
                              }}
                              className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Save for later"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => removeItem(item._id)}
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remove from cart"
                            >
                              <HiTrash className="w-5 h-5" />
                            </button>
                          </div>
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

            <div className="space-y-3 mt-6">
              <button
                onClick={handleCheckout}
                className="w-full py-3 px-4 bg-primary hover:bg-primary-dull text-white font-medium rounded-lg transition-colors"
              >
                Proceed to Checkout
              </button>
              
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear your cart? This action cannot be undone.')) {
                    clearCart();
                  }
                }}
                className="w-full py-2 px-4 border border-red-300 text-red-600 hover:bg-red-50 font-medium rounded-lg transition-colors"
              >
                Clear Cart
              </button>
            </div>

            <div className="mt-4 text-center">
              <Link 
                to="/products" 
                className="text-primary hover:text-primary-dull text-sm transition-colors"
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