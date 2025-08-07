import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import VendorDetails from './pages/VendorDetails/VendorDetails'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import OrderSuccess from './pages/OrderSuccess/OrderSuccess'
import Products from './pages/Products/Products'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import VendorDashboard from './pages/vendor/index';
import VendorProfile from './pages/vendor/Profile';
import VendorProducts from './pages/vendor/Products';
import VendorOrders from './pages/vendor/Orders';
import VendorPayments from './pages/vendor/Payments';
import VendorReviews from './pages/vendor/Reviews';
import VendorPremium from './pages/vendor/Premium';
import AdminDashboard from './pages/admin/index';
import AdminUsers from './pages/admin/Users';
import AdminOrders from './pages/admin/Orders';
import AdminPayments from './pages/admin/Payments';
import AdminReviews from './pages/admin/Reviews';
import AdminAnalytics from './pages/admin/Analytics';
import Login from './pages/Login';
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer/Footer'

const App = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/vendor') || location.pathname.startsWith('/admin');
  const isSellerpath = useLocation().pathname.includes("seller")
  return (
    <div>
      {isSellerpath ? null : <Navbar />}
      <Toaster />
      <div className={`${isSellerpath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/vendors/:category' element={<VendorDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/order-success' element={<OrderSuccess />} />
          <Route path='/products' element={<Products />} />
          <Route path='/product/:productId' element={<ProductDetails />} />
          <Route path='/login' element={<Login />} />
          {/* Vendor routes */}
          <Route path='/vendor/dashboard' element={<VendorDashboard />} />
          <Route path='/vendor/profile' element={<VendorProfile />} />
          <Route path='/vendor/products' element={<VendorProducts />} />
          <Route path='/vendor/orders' element={<VendorOrders />} />
          <Route path='/vendor/payments' element={<VendorPayments />} />
          <Route path='/vendor/reviews' element={<VendorReviews />} />
          <Route path='/vendor/premium' element={<VendorPremium />} />
          {/* Admin routes */}
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/users' element={<AdminUsers />} />
          <Route path='/admin/orders' element={<AdminOrders />} />
          <Route path='/admin/payments' element={<AdminPayments />} />
          <Route path='/admin/reviews' element={<AdminReviews />} />
          <Route path='/admin/analytics' element={<AdminAnalytics />} />
        </Routes>
      </div>
      {!isDashboard && <Footer/>}
    </div>
  )
}

export default App