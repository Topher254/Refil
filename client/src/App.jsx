import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import VendorDetails from './pages/VendorDetails/VendorDetails'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import OrderSuccess from './pages/OrderSuccess/OrderSuccess'
import Products from './pages/Products/Products'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer/Footer'

const App = () => {
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
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App