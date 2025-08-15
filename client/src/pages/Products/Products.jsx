import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { UseAppContext } from '../../context/context';
import { HiFilter, HiSearch, HiArrowLeft, HiStar, HiTruck, HiLocationMarker } from 'react-icons/hi';
import { BsStarFill } from 'react-icons/bs';

const Products = () => {
  const { products, addtoCart, navigate } = UseAppContext();
  const [searchParams] = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState('gas');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price-low');

  // Handle category from URL query parameter
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  // Use products from context
  const allProducts = products;

  // Filter products based on selections
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = product.category.toLowerCase().includes(selectedCategory);
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    const matchesSize = selectedSize === 'all' || product.size === selectedSize;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesBrand && matchesSize && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.finalPrice - b.finalPrice;
      case 'price-high':
        return b.finalPrice - a.finalPrice;
      case 'rating':
        return b.vendor.rating - a.vendor.rating;
      case 'delivery-time':
        return parseInt(a.vendor.deliveryTime.split('-')[0]) - parseInt(b.vendor.deliveryTime.split('-')[0]);
      default:
        return 0;
    }
  });

  // Get unique brands and sizes for filters
  const getUniqueBrands = () => {
    const brands = new Set();
    allProducts.forEach(product => {
      if (product.category.toLowerCase().includes(selectedCategory)) {
        brands.add(product.brand);
      }
    });
    return Array.from(brands).sort();
  };

  const getUniqueSizes = () => {
    const sizes = new Set();
    allProducts.forEach(product => {
      if (product.category.toLowerCase().includes(selectedCategory) && 
          (selectedBrand === 'all' || product.brand === selectedBrand)) {
        sizes.add(product.size);
      }
    });
    return Array.from(sizes).sort((a, b) => {
      // Sort by numeric value if possible
      const aNum = parseInt(a);
      const bNum = parseInt(b);
      if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
      return a.localeCompare(b);
    });
  };

  const brands = getUniqueBrands();
  const sizes = getUniqueSizes();

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedBrand('all');
    setSelectedSize('all');
  };

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
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <p className="text-gray-600 mt-2">
          Browse and compare {selectedCategory === 'gas' ? 'cooking gas' : 'water refill'} products from trusted vendors
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="gas">Cooking Gas</option>
              <option value="water">Water Refills</option>
            </select>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setSelectedSize('all');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Size Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Sizes</option>
              {sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="delivery-time">Fastest Delivery</option>
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <HiSearch className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {sortedProducts.length} {selectedCategory === 'gas' ? 'gas' : 'water'} product{sortedProducts.length !== 1 ? 's' : ''}
          {selectedBrand !== 'all' && ` from ${selectedBrand}`}
          {selectedSize !== 'all' && ` in ${selectedSize} size`}
        </p>
      </div>

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <HiSearch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div 
              key={product._id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              {/* Product Image */}
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-contain p-4"
                />
                {!product.inStock && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Out of Stock
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Brand and Size */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary">{product.brand}</span>
                  <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {product.size}
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>

                {/* Vendor Info */}
                <div className="flex items-center gap-2 mb-3">
                  <img 
                    src={product.vendor.vendorImage} 
                    alt={product.vendor.vendorName}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-600">{product.vendor.vendorName}</span>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-1 mb-3">
                  <BsStarFill className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium">{product.vendor.rating}</span>
                  <span className="text-sm text-gray-500">({product.vendor.totalReviews})</span>
                </div>

                {/* Delivery Info */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <HiTruck className="w-3 h-3" />
                    <span>{product.vendor.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HiLocationMarker className="w-3 h-3" />
                    <span>{product.vendor.deliveryRadius}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-lg font-bold text-primary">
                      Kshs {product.finalPrice}
                    </div>
                    {product.basePrice !== product.offerPrice && (
                      <span className="text-gray-500/60 md:text-sm text-xs line-through">Kshs{product.basePrice}</span>
                    )}
                    <div className="text-xs text-gray-500">+ Kshs {product.vendor.deliveryFee} delivery</div>
                  </div>
                  <div className="text-indigo-500">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (product.inStock) {
                          addtoCart(product._id);
                        }
                      }}
                      disabled={!product.inStock}
                      className={`flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium ${
                        !product.inStock ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-200'
                      }`}
                    >
                      {product.inStock ? 'Add' : 'Out'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products; 