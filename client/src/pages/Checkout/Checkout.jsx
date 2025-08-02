import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UseAppContext } from '../../context/context';
import { HiArrowLeft, HiLocationMarker, HiPhone, HiCreditCard, HiCash, HiShieldCheck, HiTruck } from 'react-icons/hi';
import { BsStarFill } from 'react-icons/bs';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { 
    CartItems, 
    getProductWithVendor,
    navigate,
    clearCart
  } = UseAppContext();

  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    additionalInfo: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [isProcessing, setIsProcessing] = useState(false);

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
  }).filter(item => item !== null);

  const subtotal = cartItemsWithDetails.reduce((total, item) => total + item.totalPrice, 0);
  const platformFee = subtotal * 0.015; // 1.5% platform fee
  const total = subtotal + platformFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const validateForm = () => {
    if (!deliveryInfo.fullName || !deliveryInfo.phone || !deliveryInfo.address || !deliveryInfo.city) {
      toast.error('Please fill in all required fields');
      return false;
    }
    if (cartItemCount === 0) {
      toast.error('Your cart is empty');
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Handle different payment methods
      switch (paymentMethod) {
        case 'mpesa':
          // Simulate M-Pesa STK Push
          toast.success('M-Pesa STK Push sent to your phone. Please complete payment.');
          break;
        case 'card':
          toast.success('Redirecting to card payment gateway...');
          break;
        case 'cash':
          toast.success('Order placed successfully! Pay on delivery.');
          break;
        default:
          toast.success('Order placed successfully!');
      }

      // Clear cart and redirect to success page
      clearCart();
      setTimeout(() => {
        navigate('/order-success');
      }, 1500);

    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItemCount === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some products to checkout!</p>
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
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition"
          >
            <HiArrowLeft className="w-5 h-5" />
            Back to Cart
          </button>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
        <p className="text-gray-600 mt-2">Complete your order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Delivery Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <HiLocationMarker className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-gray-800">Delivery Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={deliveryInfo.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={deliveryInfo.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., +254 700 123 456"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={deliveryInfo.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Street address, apartment, suite, etc."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={deliveryInfo.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Nairobi"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <input
                  type="text"
                  name="additionalInfo"
                  value={deliveryInfo.additionalInfo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Landmarks, building name, etc."
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <HiCreditCard className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-gray-800">Payment Method</h2>
            </div>
            
            <div className="space-y-4">
              {/* M-Pesa */}
              <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="mpesa"
                  checked={paymentMethod === 'mpesa'}
                  onChange={() => handlePaymentMethodChange('mpesa')}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">M-Pesa</h3>
                      <p className="text-sm text-gray-600">Pay with M-Pesa STK Push</p>
                    </div>
                    <div className="text-sm text-gray-500">Instant</div>
                  </div>
                </div>
              </label>

              {/* Card */}
              <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => handlePaymentMethodChange('card')}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Credit/Debit Card</h3>
                      <p className="text-sm text-gray-600">Visa, Mastercard, American Express</p>
                    </div>
                    <div className="text-sm text-gray-500">Secure</div>
                  </div>
                </div>
              </label>

              {/* Cash on Delivery */}
              <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={() => handlePaymentMethodChange('cash')}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Cash on Delivery</h3>
                      <p className="text-sm text-gray-600">Pay when you receive your order</p>
                    </div>
                    <div className="text-sm text-gray-500">+ Kshs 50</div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
            
            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {cartItemsWithDetails.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-12 h-12 object-contain rounded border border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-1 py-0.5 rounded">
                        {item.brand}
                      </span>
                      <span className="text-xs text-gray-600 bg-gray-100 px-1 py-0.5 rounded">
                        {item.size}
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-800 truncate text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-xs text-gray-500">{item.vendor.vendorName}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-800 text-sm">Kshs {item.totalPrice}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartItemCount} items)</span>
                <span>Kshs {subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Platform Fee (1.5%)</span>
                <span>Kshs {platformFee.toFixed(2)}</span>
              </div>

              {paymentMethod === 'cash' && (
                <div className="flex justify-between text-gray-600">
                  <span>Cash on Delivery Fee</span>
                  <span>Kshs 50.00</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total</span>
                  <span>Kshs {(paymentMethod === 'cash' ? total + 50 : total).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-2">
                <HiShieldCheck className="w-5 h-5 text-primary mt-0.5" />
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-800 mb-1">Secure Payment</p>
                  <p>Your payment information is encrypted and secure. We never store your card details.</p>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full mt-6 py-3 px-4 bg-primary hover:bg-primary-dull disabled:bg-gray-400 text-white font-medium rounded-lg transition"
            >
              {isProcessing ? 'Processing...' : `Place Order - Kshs ${(paymentMethod === 'cash' ? total + 50 : total).toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 