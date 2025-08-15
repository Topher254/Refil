import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE } from '../config';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setisSeller] = useState(false);
  const [showUserLogin, setshowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [CartItems, setCartItems] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [vendors, setVendors] = useState({});
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [analytics, setAnalytics] = useState({});

  // Auth: login
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      const data = res.data;
      localStorage.setItem('token', data.token);
      setUser(data.user);
      toast.success('Login successful');
      return data.user; // Return the user object
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
      return null;
    }
  };

  // Auth: register
  const register = async (name, email, password, role = 'customer') => {
    try {
      await axios.post(`${API_BASE}/auth/register`, { name, email, password, role });
      toast.success('Registration successful');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
      return false;
    }
  };

  // Auth: logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out');
  };

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/products`);
      setProducts(res.data);
    } catch (err) {
      toast.error('Failed to fetch products');
    }
  };

  // Fetch vendors from backend
  const fetchVendors = async () => {
    try {
      const res = await axios.get(`${API_BASE}/vendors`);
      // Group vendors by category for compatibility
      const grouped = {};
      res.data.forEach(vendor => {
        const cat = vendor.category.toLowerCase();
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(vendor);
      });
      setVendors(grouped);
    } catch (err) {
      toast.error('Failed to fetch vendors');
    }
  };

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE}/orders`);
      setOrders(res.data);
    } catch (err) {
      toast.error('Failed to fetch orders');
    }
  };

  // Fetch payments from backend
  const fetchPayments = async () => {
    try {
      const res = await axios.get(`${API_BASE}/payments`);
      setPayments(res.data);
    } catch (err) {
      toast.error('Failed to fetch payments');
    }
  };

  // Fetch reviews from backend
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_BASE}/reviews`);
      setReviews(res.data);
    } catch (err) {
      toast.error('Failed to fetch reviews');
    }
  };

  // Fetch all on mount
  useEffect(() => {
    fetchProducts();
    fetchVendors();
    fetchOrders();
    fetchPayments();
    fetchReviews();
  }, []);

  // Cart logic (unchanged)
  const addtoCart = (ItemId) => {
    let cartdata = structuredClone(CartItems);
    if (cartdata[ItemId]) {
      cartdata[ItemId] += 1;
    } else {
      cartdata[ItemId] = 1;
    }
    setCartItems(cartdata);
    toast.success('Added to cart');
  };
  const updateCartItems = (ItemId, quantity) => {
    let cartdata = structuredClone(CartItems);
    cartdata[ItemId] = quantity;
    setCartItems(cartdata);
    toast.success('Cart Updated');
  };
  const removeItem = (ItemId) => {
    let cartdata = structuredClone(CartItems);
    if (cartdata[ItemId]) {
      cartdata[ItemId] -= 1;
      if (cartdata[ItemId] <= 0) {
        delete cartdata[ItemId];
      }
    }
    toast.success('Removed from cart');
    setCartItems(cartdata);
  };
  const clearCart = () => {
    setCartItems({});
    toast.success('Cart cleared');
  };

  // Vendor/category helpers (unchanged)
  const getVendorsByCategory = (category) => {
    const categoryKey = category.toLowerCase();
    return vendors[categoryKey] || [];
  };
  const selectCategory = (category) => {
    setSelectedCategory(category);
  };
  const getVendorDetails = (vendorId) => {
    for (const category in vendors) {
      const vendor = vendors[category].find((v) => v._id === vendorId);
      if (vendor) return vendor;
    }
    return null;
  };
  const getProductWithVendor = (productId) => {
    for (const category in vendors) {
      const categoryVendors = vendors[category];
      for (const vendor of categoryVendors) {
        const product = vendor.products.find((p) => p._id === productId);
        if (product) {
          return {
            ...product,
            vendor: vendor,
          };
        }
      }
    }
    return null;
  };
  const getAllProductsWithVendors = () => {
    const allProducts = [];
    Object.values(vendors).forEach((categoryVendors) => {
      categoryVendors.forEach((vendor) => {
        vendor.products.forEach((product) => {
          allProducts.push({
            ...product,
            vendor: vendor,
          });
        });
      });
    });
    return allProducts;
  };

  // Admin-specific getters
  const getAllOrders = () => orders;
  const getAllPayments = () => payments;
  const getAllReviews = () => reviews;
  const getAnalytics = () => analytics;

  // Vendor-specific getters
  const getVendorOrders = (vendorId) => orders.filter((o) => o.vendor && o.vendor._id === vendorId);
  const getVendorPayments = (vendorId) => payments.filter((p) => p.order && p.order.vendor === vendorId);
  const getVendorReviews = (vendorId) => reviews.filter((r) => r.vendor && r.vendor._id === vendorId);

  // Review moderation (example for backend)
  const moderateReview = async (reviewId) => {
    try {
      await axios.put(`${API_BASE}/reviews/${reviewId}`, { flagged: true });
      fetchReviews();
      toast.success('Review moderated');
    } catch (err) {
      toast.error('Failed to moderate review');
    }
  };

  // Value for context consumers
  const value = {
    navigate,
    user,
    setUser,
    setisSeller,
    isSeller,
    showUserLogin,
    setshowUserLogin,
    products,
    addtoCart,
    updateCartItems,
    removeItem,
    clearCart,
    CartItems,
    selectedCategory,
    selectCategory,
    getVendorsByCategory,
    getVendorDetails,
    getProductWithVendor,
    getAllProductsWithVendors,
    orders,
    payments,
    reviews,
    analytics,
    getAllOrders,
    getAllPayments,
    getAllReviews,
    getAnalytics,
    getVendorOrders,
    getVendorPayments,
    getVendorReviews,
    moderateReview,
    vendors,
    fetchProducts,
    fetchVendors,
    fetchOrders,
    fetchPayments,
    fetchReviews,
    login,
    register,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const UseAppContext = () => {
  return useContext(AppContext);
};