import React, { useState, useEffect } from 'react';
import { UseAppContext } from '../../context/context';
import DashboardSidebar from '../../components/DashboardSidebar';
import { MdDashboard, MdPerson, MdInventory, MdShoppingCart, MdPayments, MdStarRate, MdWorkspacePremium, MdGrade, MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import toast from 'react-hot-toast';
import { HiMenuAlt3 } from 'react-icons/hi';
import { handleImageUpload, validateImage } from '../../utils/imageUpload';
import { MdStar } from 'react-icons/md';
import BusinessTypeModal from '../../components/BusinessTypeModal';

const vendorTabs = [
  { label: 'Dashboard', key: 'dashboard', icon: <MdDashboard size={22} /> },
  { label: 'Profile', key: 'profile', icon: <MdPerson size={22} /> },
  { label: 'Products', key: 'products', icon: <MdInventory size={22} /> },
  { label: 'Orders', key: 'orders', icon: <MdShoppingCart size={22} /> },
  { label: 'Payments', key: 'payments', icon: <MdPayments size={22} /> },
  { label: 'Reviews', key: 'reviews', icon: <MdStarRate size={22} /> },
  { label: 'Premium', key: 'premium', icon: <MdWorkspacePremium size={22} /> },
];

// Tab content components
const ProfileTab = () => {
  const { vendors } = UseAppContext();
  const vendor = vendors?.gas?.[0] || {};
  const [form, setForm] = useState({
    brand: vendor.brand || '',
    deliveryRadius: vendor.deliveryRadius || '',
    deliveryFee: vendor.deliveryFee || '',
    paymentDetails: vendor.paymentMethods?.join(', ') || '',
  });
  const [saving, setSaving] = useState(false);
  const saveProfile = (e) => {
    e.preventDefault();
    if (!form.brand || !form.deliveryRadius || !form.deliveryFee || !form.paymentDetails) {
      toast.error('All fields required');
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Profile updated (mock)');
    }, 800);
  };
  return (
    <form className="p-4 max-w-lg" onSubmit={saveProfile}>
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      <div className="mb-3">
        <label className="block mb-1">Brand(s) Sold</label>
        <input className="border p-2 rounded w-full" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Delivery Radius</label>
        <input className="border p-2 rounded w-full" value={form.deliveryRadius} onChange={e => setForm({ ...form, deliveryRadius: e.target.value })} />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Delivery Fee (KES)</label>
        <input className="border p-2 rounded w-full" value={form.deliveryFee} onChange={e => setForm({ ...form, deliveryFee: e.target.value })} />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Payment Details (Till/Paybill, etc.)</label>
        <input className="border p-2 rounded w-full" value={form.paymentDetails} onChange={e => setForm({ ...form, paymentDetails: e.target.value })} />
      </div>
      <button type="submit" className="px-4 py-2 bg-primary text-white rounded" disabled={saving}>{saving ? 'Saving...' : 'Save Profile'}</button>
    </form>
  );
};
// --- Products CRUD Tab ---
const ProductsTab = () => {
  const { products, user, fetchProducts, navigate, setUser } = UseAppContext();
  
  // Add loading state check
  const [isLoading, setIsLoading] = useState(true);
  
  // Get business type specific configurations
  const getBusinessTypeConfig = () => {
    switch (user?.businessType) {
      case 'water':
        return {
          defaultCategory: 'Drinking Water',
          defaultDescription: { line1: 'Pure & Safe', line2: 'Filtered', line3: '24/7 Available' },
          sizeOptions: ['5L', '10L', '20L', '50L', '100L', '500L', '1000L'],
          brandPlaceholder: 'Water Brand Name',
          categoryOptions: ['Drinking Water', 'Mineral Water', 'Purified Water', 'Spring Water', 'Water Dispensers', 'Water Filters']
        };
      case 'gas':
        return {
          defaultCategory: 'Cooking Gas',
          defaultDescription: { line1: 'High Quality', line2: 'Safe', line3: 'Long Lasting' },
          sizeOptions: ['3kg', '6kg', '13kg', '15kg', '50kg'],
          brandPlaceholder: 'Gas Brand Name',
          categoryOptions: ['Cooking Gas', 'Industrial Gas', 'Gas Accessories', 'Gas Cylinders']
        };
      case 'both':
        return {
          defaultCategory: 'Cooking Gas',
          defaultDescription: { line1: 'Quality Products', line2: 'Safe & Reliable', line3: 'Best Prices' },
          sizeOptions: ['3kg', '6kg', '13kg', '15kg', '50kg', '5L', '10L', '20L', '50L', '100L'],
          brandPlaceholder: 'Brand Name',
          categoryOptions: ['Cooking Gas', 'Drinking Water', 'Industrial Gas', 'Water Dispensers', 'Gas Accessories', 'Water Filters']
        };
      default:
        return {
          defaultCategory: 'Cooking Gas',
          defaultDescription: { line1: 'High Quality', line2: 'Safe', line3: 'Long Lasting' },
          sizeOptions: ['3kg', '6kg', '13kg', '15kg', '50kg'],
          brandPlaceholder: 'Brand Name',
          categoryOptions: ['Cooking Gas', 'Gas Accessories', 'Gas Cylinders']
        };
    }
  };

  const businessConfig = getBusinessTypeConfig();
  
  // Filter products for current vendor - handle both old and new structures
  const vendorProducts = products.filter(p => {
    if (!p || !user) return false;
    
    console.log('🔍 Filtering product:', p.name);
    console.log('  Product vendor:', p.vendor);
    console.log('  Product vendor type:', typeof p.vendor);
    console.log('  Current user ID:', user._id);
    
    // Check if product belongs to current vendor
    if (p.vendor && typeof p.vendor === 'object' && p.vendor._id) {
      // New structure: p.vendor is a populated User object with _id
      const matches = p.vendor._id === user._id;
      console.log('  Object vendor match:', matches);
      return matches;
    } else if (p.vendor && typeof p.vendor === 'string') {
      // Old structure: p.vendor is a string ID
      const matches = p.vendor === user._id;
      console.log('  String vendor match:', matches);
      return matches;
    } else if (p.vendor && p.vendor === user._id) {
      // Direct ID comparison
      const matches = true;
      console.log('  Direct ID match:', matches);
      return matches;
    }
    
    console.log('  No match found');
    return false;
  });
  
  console.log('🔍 Debug - All products:', products);
  console.log('🔍 Debug - Current user ID:', user?._id);
  console.log('🔍 Debug - Vendor products:', vendorProducts);
  console.log('🔍 Debug - Products length:', products.length);
  console.log('🔍 Debug - Vendor products length:', vendorProducts.length);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ 
    name: '', 
    size: '', 
    basePrice: '', 
    finalPrice: '', 
    brand: '', 
    category: 'Cooking Gas',
    image: '',
    description: { line1: '', line2: '', line3: '' },
    features: [],
    specifications: {}
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const API_BASE = 'http://localhost:5000/api';

  // Manual refresh function
  const refreshProducts = async () => {
    if (user && user._id && user.role === 'vendor') {
      console.log('🔄 Manual refresh triggered for vendor:', user._id);
      setIsLoading(true);
      await fetchProducts();
      setRefreshTrigger(prev => prev + 1);
      setIsLoading(false);
    }
  };

  // Check if user is authenticated
  useEffect(() => {
    console.log('🔍 Debug - User object:', user);
    console.log('🔍 Debug - User role:', user?.role);
    console.log('🔍 Debug - User ID:', user?._id);
    console.log('🔍 Debug - User keys:', user ? Object.keys(user) : 'No user');
    console.log('🔍 Debug - User stringified:', user ? JSON.stringify(user, null, 2) : 'No user');
    
    if (!user) {
      console.log('❌ No user found, redirecting to login');
      toast.error('Please login to access vendor features');
      navigate('/login');
      return;
    }
    
    if (user.role !== 'vendor') {
      console.log('❌ User is not a vendor, redirecting to login');
      toast.error('Access denied. Vendor account required.');
      navigate('/login');
      return;
    }
    
    // Check if user has _id
    if (!user._id) {
      console.log('❌ User object missing _id, checking for id field');
      if (user.id) {
        console.log('✅ Found user.id, updating user object');
        // Update user object to use _id instead of id
        setUser(prev => ({ ...prev, _id: prev.id }));
        return; // Exit early to let the effect run again with updated user
      } else {
        console.log('❌ No _id or id found in user object');
        toast.error('User authentication error. Please login again.');
        navigate('/login');
        return;
      }
    }
    
    console.log('✅ User authenticated as vendor');
  }, [user, navigate, setUser]);

  // Fetch products when component mounts and user is authenticated
  useEffect(() => {
    if (user && user._id && user.role === 'vendor') {
      console.log('🔄 User authenticated as vendor, products should be loaded from context');
      // Don't call fetchProducts here since context already fetches on mount
      // Just set loading to false since products should already be available
      setIsLoading(false);
    }
  }, [user, refreshTrigger]);

  // Debug: Log products changes
  useEffect(() => {
    console.log('🔍 Debug - Products state changed:', products);
    console.log('🔍 Debug - Current user:', user);
    console.log('🔍 Debug - Products length:', products.length);
    if (products.length > 0) {
      console.log('🔍 Debug - First product vendor:', products[0].vendor);
      console.log('🔍 Debug - First product vendor type:', typeof products[0].vendor);
      console.log('🔍 Debug - First product vendor ID:', products[0].vendor?._id);
    }
  }, [products, user]);

  // If user is not authenticated, show loading or redirect
  if (!user || user.role !== 'vendor') {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Loading vendor dashboard...</p>
      </div>
    );
  }

  // Show loading state while fetching products
  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  const openModal = (idx = null) => {
    setEditIdx(idx);
    if (idx !== null) {
      setForm(vendorProducts[idx]);
      setImagePreview(vendorProducts[idx].image || '');
    } else {
      // Initialize form with business type specific defaults
      const initialForm = {
        name: '', 
        size: businessConfig.sizeOptions[0] || '', // Set default size
        basePrice: '', 
        finalPrice: '', 
        brand: '', 
        category: businessConfig.defaultCategory,
        businessType: user?.businessType || 'gas', // Add business type
        image: '',
        description: businessConfig.defaultDescription,
        features: [],
        specifications: {}
      };
      setForm(initialForm);
      setImagePreview('');
    }
    setModalOpen(true);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate the image
      const errors = validateImage(file);
      if (errors.length > 0) {
        errors.forEach(error => toast.error(error));
        return;
      }

      try {
        setLoading(true);
        const result = await handleImageUpload(file);
        setForm({ ...form, image: result.url });
        setImagePreview(result.url);
        toast.success('Image uploaded successfully');
      } catch (error) {
        toast.error(error.message || 'Failed to upload image');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...form.features];
    newFeatures[index] = value;
    setForm({ ...form, features: newFeatures });
  };

  const addFeature = () => {
    setForm({ ...form, features: [...form.features, ''] });
  };

  const removeFeature = (index) => {
    const newFeatures = form.features.filter((_, i) => i !== index);
    setForm({ ...form, features: newFeatures });
  };

  // Add or Edit product
  const saveProduct = async (e) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!user || !user._id) {
      toast.error('Please login to add products');
      navigate('/login');
      return;
    }

    if (!form.name || !form.size || !form.basePrice || !form.finalPrice || !form.brand || !form.image) {
      toast.error('All fields required');
      return;
    }
    
    setLoading(true);
    try {
      const productData = {
        ...form,
        vendor: user._id,
        basePrice: Number(form.basePrice),
        finalPrice: Number(form.finalPrice)
      };

      console.log('🔄 Saving product with data:', productData);

      if (editIdx !== null) {
        // Edit
        const response = await fetch(`${API_BASE}/products/${vendorProducts[editIdx]._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
        
        if (!response.ok) {
          throw new Error('Failed to update product');
        }
        
        toast.success('Product updated successfully');
      } else {
        // Add
        const response = await fetch(`${API_BASE}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
        
        if (!response.ok) {
          throw new Error('Failed to add product');
        }
        
        const newProduct = await response.json();
        console.log('✅ New product created:', newProduct);
        toast.success('Product added successfully');
      }
      
      setModalOpen(false);
      
      // Refresh products list
      console.log('🔄 Refreshing products list...');
      await fetchProducts();
      
      // Trigger local refresh
      setRefreshTrigger(prev => prev + 1);
      
      // Wait a moment for state to update and then log the results
      setTimeout(() => {
        console.log('🔍 Debug - Products after refresh:', products);
        console.log('🔍 Debug - Current user ID:', user._id);
        console.log('🔍 Debug - Vendor products after refresh:', products.filter(p => {
          if (!p || !user) return false;
          if (p.vendor && typeof p.vendor === 'object' && p.vendor._id) {
            return p.vendor._id === user._id;
          } else if (p.vendor && typeof p.vendor === 'string') {
            return p.vendor === user._id;
          } else if (p.vendor && p.vendor === user._id) {
            return true;
          }
          return false;
        }));
      }, 1000);
      
    } catch (err) {
      console.error('❌ Error saving product:', err);
      toast.error(err.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const deleteProduct = async (idx) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    // Check if user is authenticated
    if (!user || !user._id) {
      toast.error('Please login to delete products');
      navigate('/login');
      return;
    }
    
    setLoading(true);
    try {
      await fetch(`${API_BASE}/products/${vendorProducts[idx]._id}`, { method: 'DELETE' });
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to delete product');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* Product Stats */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Product Overview</h3>
            <p className="text-sm text-gray-600">Manage your product catalog</p>
      </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{vendorProducts.length}</div>
            <div className="text-sm text-gray-500">Total Products</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
          <p className="text-gray-600">Manage your products and inventory</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              console.log('🔄 Manual refresh requested');
              refreshProducts();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            disabled={loading}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dull text-white rounded-lg transition-colors"
            onClick={() => openModal()}
          >
            <MdAdd size={20} /> Add New Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (KES)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                      <p>Loading products...</p>
                    </div>
                </td>
              </tr>
              ) : vendorProducts.length > 0 ? (
                vendorProducts.map((product, idx) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img className="h-12 w-12 rounded-lg object-cover" src={product.image} alt={product.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.brand}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="font-medium">KES {product.finalPrice}</span>
                      {product.basePrice && product.basePrice !== product.finalPrice && (
                        <span className="text-gray-500 line-through ml-2">KES {product.basePrice}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, i) => (
                          <MdStar 
                            key={i} 
                            className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="ml-1 text-sm text-gray-600">({product.rating})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => openModal(idx)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          title="Edit"
                        >
                          <MdEdit size={18} />
                        </button>
                        <button 
                          onClick={() => deleteProduct(idx)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          title="Delete"
                          disabled={loading}
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <MdInventory size={48} className="text-gray-300 mb-2" />
                      <p className="text-lg font-medium">No products yet</p>
                      <p className="text-sm">Start by adding your first product</p>
                    </div>
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
      </div>

      {/* Add/Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {editIdx !== null ? 'Edit Product' : 'Add New Product'}
              </h3>
            </div>
            
            <form onSubmit={saveProduct} className="px-6 py-4 space-y-4">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., ProGas 6kg Cylinder"
                    required
                  />
            </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
                  <input
                    type="text"
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={businessConfig.brandPlaceholder}
                    required
                  />
            </div>
            </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                    <input
                      type="text"
                      value={form.businessType === 'water' ? '💧 Water Business' : 
                             form.businessType === 'gas' ? '🔥 Gas Business' : 
                             '🏢 Both Gas & Water'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                      readOnly
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      {businessConfig.categoryOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image *</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required={!editIdx}
                    />
                    {imagePreview && (
                      <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Upload a clear image of your product</p>
                </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size *</label>
                  <select
                    value={form.size}
                    onChange={(e) => setForm({ ...form, size: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    {businessConfig.sizeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (KES) *</label>
                  <input
                    type="number"
                    value={form.basePrice}
                    onChange={(e) => setForm({ ...form, basePrice: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="1300"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Final Price (KES) *</label>
                  <input
                    type="number"
                    value={form.finalPrice}
                    onChange={(e) => setForm({ ...form, finalPrice: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="1199"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={form.description.line1 || ''}
                    onChange={(e) => setForm({ 
                      ...form, 
                      description: { ...form.description, line1: e.target.value } 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={businessConfig.defaultDescription.line1}
                  />
                  <input
                    type="text"
                    value={form.description.line2 || ''}
                    onChange={(e) => setForm({ 
                      ...form, 
                      description: { ...form.description, line2: e.target.value } 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={businessConfig.defaultDescription.line2}
                  />
                  <input
                    type="text"
                    value={form.description.line3 || ''}
                    onChange={(e) => setForm({ 
                      ...form, 
                      description: { ...form.description, line3: e.target.value } 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={businessConfig.defaultDescription.line3}
                  />
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                <div className="space-y-2">
                  {form.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="e.g., Free delivery"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="px-2 py-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <MdDelete size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-primary hover:text-primary-dull text-sm"
                  >
                    + Add Feature
                  </button>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-primary hover:bg-primary-dull text-white rounded-md transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (editIdx !== null ? 'Update Product' : 'Add Product')}
                </button>
            </div>
          </form>
          </div>
        </div>
      )}
    </div>
  );
};
const OrdersTab = () => {
  const { orders, user, fetchOrders } = UseAppContext();
  const vendorOrders = orders.filter(o => o.vendor && o.vendor._id === user?._id);
  const [statusFlow] = useState({
    'Incoming': 'Accepted',
    'Accepted': 'Processing',
    'Processing': 'Out for Delivery',
    'Out for Delivery': 'Delivered',
    'Delivered': null
  });
  const [loading, setLoading] = useState(false);
  const API_BASE = 'http://localhost:5000/api';

  // Update order status
  const updateStatus = async (idx) => {
    const order = vendorOrders[idx];
    const newStatus = statusFlow[order.deliveryStatus] || order.deliveryStatus;
    setLoading(true);
    try {
      await fetch(`${API_BASE}/orders/${order._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliveryStatus: newStatus }),
      });
      toast.success('Order status updated');
      fetchOrders();
    } catch (err) {
      toast.error('Failed to update order');
    } finally {
      setLoading(false);
    }
  };

  // Delete order
  const deleteOrder = async (idx) => {
    const order = vendorOrders[idx];
    if (!window.confirm('Delete this order?')) return;
    setLoading(true);
    try {
      await fetch(`${API_BASE}/orders/${order._id}`, { method: 'DELETE' });
      toast.success('Order deleted');
      fetchOrders();
    } catch (err) {
      toast.error('Failed to delete order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Order Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Product</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendorOrders.map((order, idx) => (
              <tr key={order._id} className="border-b">
                <td className="p-2">{order.products && order.products[0]?.product?.name}</td>
                <td className="p-2">{order.customer?.name}</td>
                <td className="p-2">{order.deliveryStatus}</td>
                <td className="p-2 flex gap-2">
                  {order.deliveryStatus !== 'Delivered' && (
                    <button className="px-2 py-1 bg-blue-100 rounded" onClick={() => updateStatus(idx)} disabled={loading}>
                      {statusFlow[order.deliveryStatus] ? `Mark as ${statusFlow[order.deliveryStatus]}` : 'Update'}
                    </button>
                  )}
                  <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => deleteOrder(idx)} disabled={loading}>Delete</button>
                </td>
              </tr>
            ))}
            {vendorOrders.length === 0 && <tr><td colSpan={4} className="p-4 text-center text-gray-400">No orders yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};
const PaymentsTab = () => {
  const { payments, user, fetchPayments } = UseAppContext();
  const vendorPayments = payments.filter(p => p.vendor && p.vendor._id === user?._id);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ type: 'M-Pesa', amount: '', status: 'Received', time: '' });
  const [loading, setLoading] = useState(false);
  const API_BASE = 'http://localhost:5000/api';

  const openModal = (idx = null) => {
    setEditIdx(idx);
    if (idx !== null) {
      setForm(vendorPayments[idx]);
    } else {
      setForm({ type: 'M-Pesa', amount: '', status: 'Received', time: '' });
    }
    setModalOpen(true);
  };

  // Add or Edit payment
  const savePayment = async (e) => {
    e.preventDefault();
    if (!form.type || !form.amount || !form.status) {
      toast.error('All fields required');
      return;
    }
    setLoading(true);
    try {
      if (editIdx !== null) {
        // Edit
        await fetch(`${API_BASE}/payments/${vendorPayments[editIdx]._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, vendor: user._id }),
        });
        toast.success('Payment updated');
      } else {
        // Add
        await fetch(`${API_BASE}/payments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, vendor: user._id }),
        });
        toast.success('Payment added');
      }
      setModalOpen(false);
      fetchPayments();
    } catch (err) {
      toast.error('Failed to save payment');
    } finally {
      setLoading(false);
    }
  };

  // Delete payment
  const deletePayment = async (idx) => {
    if (!window.confirm('Delete this payment?')) return;
    setLoading(true);
    try {
      await fetch(`${API_BASE}/payments/${vendorPayments[idx]._id}`, { method: 'DELETE' });
      toast.success('Payment deleted');
      fetchPayments();
    } catch (err) {
      toast.error('Failed to delete payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Payment Tracking</h2>
        <button className="flex items-center gap-1 px-3 py-2 bg-primary text-white rounded" onClick={() => openModal()}>Add Payment</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Amount (KES)</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendorPayments.map((payment, idx) => (
              <tr key={payment._id} className="border-b">
                <td className="p-2">{payment.type}</td>
                <td className="p-2">{payment.amount}</td>
                <td className="p-2">{payment.status}</td>
                <td className="p-2 flex gap-2">
                  <button className="text-blue-600" onClick={() => openModal(idx)} title="Edit">Edit</button>
                  <button className="text-red-600" onClick={() => deletePayment(idx)} title="Delete">Delete</button>
                </td>
              </tr>
            ))}
            {vendorPayments.length === 0 && <tr><td colSpan={4} className="p-4 text-center text-gray-400">No payments yet.</td></tr>}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form className="bg-white rounded shadow-lg p-6 w-full max-w-md" onSubmit={savePayment}>
            <h3 className="text-lg font-bold mb-4">{editIdx !== null ? 'Edit Payment' : 'Add Payment'}</h3>
            <div className="mb-2">
              <label className="block mb-1">Type</label>
              <select className="border p-2 rounded w-full" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                <option value="M-Pesa">M-Pesa</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-1">Amount (KES)</label>
              <input type="number" className="border p-2 rounded w-full" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Status</label>
              <select className="border p-2 rounded w-full" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option value="Received">Received</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="flex gap-2 justify-end">
              <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={() => setModalOpen(false)} disabled={loading}>Cancel</button>
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
const ReviewsTab = () => {
  const { reviews: initialReviews, user, fetchReviews } = UseAppContext();
  const vendorReviews = initialReviews.filter(r => r.vendor && r.vendor._id === user?._id);
  const [loading, setLoading] = useState(false);
  const API_BASE = 'http://localhost:5000/api';

  // Delete review
  const deleteReview = async (idx) => {
    if (!window.confirm('Delete this review?')) return;
    setLoading(true);
    try {
      await fetch(`${API_BASE}/reviews/${vendorReviews[idx]._id}`, { method: 'DELETE' });
      toast.success('Review deleted');
      fetchReviews();
    } catch (err) {
      toast.error('Failed to delete review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Reviews & Ratings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Comment</th>
              <th className="p-2 text-left">Rating</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendorReviews.map((review, idx) => (
              <tr key={review._id} className="border-b">
                <td className="p-2">{review.customer}</td>
                <td className="p-2">{review.comment}</td>
                <td className="p-2">{review.rating}/5</td>
                <td className="p-2">
                  <button className="px-2 py-1 bg-red-100 rounded" onClick={() => deleteReview(idx)} disabled={loading}>Delete</button>
                </td>
              </tr>
            ))}
            {vendorReviews.length === 0 && <tr><td colSpan={4} className="p-4 text-center text-gray-400">No reviews yet.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <b>Appear on homepage under Best Vendors (based on rating or premium)</b>
      </div>
    </div>
  );
};
const PremiumTab = () => (
  <div className="p-4">
    <h2 className="text-xl font-semibold mb-4">Premium Subscription</h2>
    <p>Feature coming soon! Vendors will be able to subscribe for featured placement and pay via M-Pesa.</p>
  </div>
);

const VendorDashboard = () => {
  const { user, setUser, updateBusinessType, orders = [], payments = [], reviews = [] } = UseAppContext();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showBusinessTypeModal, setShowBusinessTypeModal] = useState(false);

  // Calculate average rating
  const avgRating = reviews.length ? (reviews.reduce((a, r) => a + (r.rating || 0), 0) / reviews.length).toFixed(1) : '-';

  // Check if vendor needs to set business type (only if they somehow got here without setting it)
  useEffect(() => {
    console.log('🔍 Debug - User object:', user);
    console.log('🔍 Debug - User businessType:', user?.businessType);
    console.log('🔍 Debug - Should show modal:', user && user.role === 'vendor' && !user.businessType);
    
    if (user && user.role === 'vendor' && !user.businessType) {
      console.log('🔍 Debug - Showing business type modal');
      setShowBusinessTypeModal(true);
    }
  }, [user]);

  const handleBusinessTypeSelect = (updatedUser) => {
    setUser(updatedUser);
    setShowBusinessTypeModal(false);
  };

  const handleCloseBusinessTypeModal = () => {
    setShowBusinessTypeModal(false);
  };

  // Tab content switcher
  let tabContent;
  if (activeTab === 'dashboard') {
    tabContent = (
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            Welcome, <span className="text-primary">{user?.name}</span>! 🎉
          </h1>
          {user?.businessType && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Business Type:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                user.businessType === 'water' 
                  ? 'bg-blue-100 text-blue-800' 
                  : user.businessType === 'gas'
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {user.businessType === 'water' ? '💧 Water Business' :
                 user.businessType === 'gas' ? '🔥 Gas Business' :
                 '🏢 Both Gas & Water'}
              </span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <MdShoppingCart className="text-primary mb-2" size={36} />
            <div className="text-2xl font-bold">{orders.length}</div>
            <div className="text-gray-500 text-sm">Orders</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <MdPayments className="text-primary mb-2" size={36} />
            <div className="text-2xl font-bold">{payments.length}</div>
            <div className="text-gray-500 text-sm">Payments</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <MdStarRate className="text-primary mb-2" size={36} />
            <div className="text-2xl font-bold">{reviews.length}</div>
            <div className="text-gray-500 text-sm">Reviews</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <MdGrade className="text-primary mb-2" size={36} />
            <div className="text-2xl font-bold">{avgRating}</div>
            <div className="text-gray-500 text-sm">Avg. Rating</div>
          </div>
        </div>
        {/* Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-10">
          <div className="font-semibold mb-2 text-lg">Sales & Revenue (Chart Coming Soon)</div>
          <div className="h-40 flex items-center justify-center text-gray-400">[Chart Placeholder]</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-3 text-lg">Recent Orders</h3>
            <ul className="bg-white rounded-xl shadow p-4 divide-y">
              {orders.slice(0, 5).map(order => (
                <li key={order.id} className="py-3 flex justify-between items-center">
                  <span>{order.product} for {order.customer}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{order.status}</span>
                </li>
              ))}
              {orders.length === 0 && <li className="py-3 text-gray-400">No orders yet.</li>}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-lg">Recent Reviews</h3>
            <ul className="bg-white rounded-xl shadow p-4 divide-y">
              {reviews.slice(0, 5).map(review => (
                <li key={review.id} className="py-3 flex justify-between items-center">
                  <span>{review.customer}: {review.comment}</span>
                  <span className="text-xs bg-yellow-100 px-2 py-1 rounded">{review.rating}/5</span>
                </li>
              ))}
              {reviews.length === 0 && <li className="py-3 text-gray-400">No reviews yet.</li>}
            </ul>
          </div>
        </div>
      </div>
    );
  } else if (activeTab === 'profile') {
    tabContent = <ProfileTab />;
  } else if (activeTab === 'products') {
    tabContent = <ProductsTab />;
  } else if (activeTab === 'orders') {
    tabContent = <OrdersTab />;
  } else if (activeTab === 'payments') {
    tabContent = <PaymentsTab />;
  } else if (activeTab === 'reviews') {
    tabContent = <ReviewsTab />;
  } else if (activeTab === 'premium') {
    tabContent = <PremiumTab />;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hamburger menu for mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow border border-gray-200"
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <HiMenuAlt3 size={24} />
      </button>
      <DashboardSidebar
        links={vendorTabs.map(tab => ({
          ...tab,
          onClick: () => {
            setActiveTab(tab.key);
            setIsSidebarOpen(false);
          },
          isActive: activeTab === tab.key,
        }))}
        title="Vendor"
        open={isSidebarOpen || window.innerWidth >= 1024}
        onClose={() => setIsSidebarOpen(false)}
      />
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <main className="flex-1 ml-0 lg:ml-64 p-6 transition-all w-full">
        {tabContent}
      </main>
      {/* Business Type Modal */}
      {showBusinessTypeModal && (
        <BusinessTypeModal
          isOpen={showBusinessTypeModal}
          onClose={handleCloseBusinessTypeModal}
          onBusinessTypeSelect={handleBusinessTypeSelect}
          user={user}
        />
      )}
    </div>
  );
};

export default VendorDashboard;