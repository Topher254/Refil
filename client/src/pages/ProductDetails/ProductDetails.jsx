import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UseAppContext } from '../../context/context';
import { HiArrowLeft, HiLocationMarker, HiClock, HiPhone, HiTruck, HiShieldCheck, HiStar, HiCheck } from 'react-icons/hi';
import { BsStarFill } from 'react-icons/bs';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { productId } = useParams();
  const { vendors, addtoCart, updateCartItems, removeItem, CartItems, navigate } = UseAppContext();
  
  const [product, setProduct] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Find product and vendor from vendors data
    let foundProduct = null;
    let foundVendor = null;

    Object.values(vendors).forEach(categoryVendors => {
      categoryVendors.forEach(vendor => {
        const product = vendor.products.find(p => p._id === productId);
        if (product) {
          foundProduct = product;
          foundVendor = vendor;
        }
      });
    });

    if (foundProduct && foundVendor) {
      setProduct(foundProduct);
      setVendor(foundVendor);
    } else {
      navigate('/products');
      toast.error('Product not found');
    }
  }, [productId, vendors, navigate]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (!product.inStock) return;
    
    // Add the product quantity times
    for (let i = 0; i < quantity; i++) {
      addtoCart(product._id);
    }
    toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`);
  };

  const getCartQuantity = () => {
    return CartItems[product._id] || 0;
  };

  if (!product || !vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  const totalPrice = product.finalPrice * quantity;
  const cartQuantity = getCartQuantity();

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
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary transition">Products</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image and Basic Info */}
        <div className="space-y-6">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-96 object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {product.brand}
                </span>
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {product.size}
                </span>
              </div>
              {!product.inStock && (
                <span className="text-sm text-red-600 bg-red-100 px-3 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <BsStarFill className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold">{vendor.rating}</span>
              <span className="text-gray-500">({vendor.totalReviews} reviews)</span>
            </div>

            {/* Description */}
            <div className="space-y-2 mb-6">
              <p className="text-gray-600">{product.description.line1}</p>
              <p className="text-gray-600">{product.description.line2}</p>
              <p className="text-gray-600">{product.description.line3}</p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <HiCheck className="w-4 h-4 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Info and Purchase */}
        <div className="space-y-6">
          {/* Vendor Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={vendor.vendorImage} 
                alt={vendor.vendorName}
                className="w-16 h-16 rounded-full border-2 border-gray-200"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-800">{vendor.vendorName}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <HiLocationMarker className="w-4 h-4" />
                  <span>{vendor.location}</span>
                </div>
              </div>
            </div>

            {/* Vendor Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold text-primary">{vendor.rating}</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold text-primary">{vendor.totalReviews}</div>
                <div className="text-sm text-gray-600">Reviews</div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <HiTruck className="w-4 h-4" />
                  <span>Delivery Time</span>
                </div>
                <span className="font-medium">{vendor.deliveryTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <HiLocationMarker className="w-4 h-4" />
                  <span>Delivery Radius</span>
                </div>
                <span className="font-medium">{vendor.deliveryRadius}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <HiShieldCheck className="w-4 h-4" />
                  <span>Certification</span>
                </div>
                <span className="font-medium">{vendor.safetyCertification}</span>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <HiPhone className="w-4 h-4" />
              <span>{vendor.contact}</span>
            </div>
          </div>

          {/* Pricing and Purchase */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pricing</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Price</span>
                <span className="line-through text-gray-500">Kshs {product.basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Offer Price</span>
                <span className="font-semibold text-primary">Kshs {product.offerPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="text-gray-600">Kshs {vendor.deliveryFee}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">Final Price</span>
                  <span className="text-xl font-bold text-primary">Kshs {product.finalPrice}</span>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-primary transition"
                >
                  -
                </button>
                <span className="w-16 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-primary transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price */}
            {quantity > 1 && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">Total ({quantity} items)</span>
                  <span className="text-xl font-bold text-primary">Kshs {totalPrice}</span>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-3 px-4 rounded-lg font-medium transition mb-4 ${
                product.inStock 
                  ? 'bg-primary hover:bg-primary-dull text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {/* Cart Quantity Display */}
            {cartQuantity > 0 && (
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700">
                  {cartQuantity} {cartQuantity === 1 ? 'item' : 'items'} in cart
                </p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <button
                    onClick={() => updateCartItems(product._id, cartQuantity - 1)}
                    className="w-8 h-8 border border-green-300 rounded flex items-center justify-center text-green-600 hover:bg-green-100 transition"
                  >
                    -
                  </button>
                  <span className="font-medium text-green-700">{cartQuantity}</span>
                  <button
                    onClick={() => updateCartItems(product._id, cartQuantity + 1)}
                    className="w-8 h-8 border border-green-300 rounded flex items-center justify-center text-green-600 hover:bg-green-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Specifications</h3>
            <div className="space-y-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 