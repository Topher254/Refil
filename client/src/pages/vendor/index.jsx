import React, { useState } from 'react';
import { UseAppContext } from '../../context/context';
import DashboardSidebar from '../../components/DashboardSidebar';
import { MdDashboard, MdPerson, MdInventory, MdShoppingCart, MdPayments, MdStarRate, MdWorkspacePremium, MdGrade, MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import toast from 'react-hot-toast';
import { HiMenuAlt3 } from 'react-icons/hi';

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
  const { products, user, fetchProducts } = UseAppContext();
  const vendorProducts = products.filter(p => p.vendor && p.vendor._id === user?._id);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ name: '', size: '', finalPrice: '', brand: '', category: 'Cooking Gas' });
  const [loading, setLoading] = useState(false);

  const API_BASE = 'http://localhost:5000/api';

  const openModal = (idx = null) => {
    setEditIdx(idx);
    if (idx !== null) {
      setForm(vendorProducts[idx]);
    } else {
      setForm({ name: '', size: '', finalPrice: '', brand: '', category: 'Cooking Gas' });
    }
    setModalOpen(true);
  };

  // Add or Edit product
  const saveProduct = async (e) => {
    e.preventDefault();
    if (!form.name || !form.size || !form.finalPrice || !form.brand) {
      toast.error('All fields required');
      return;
    }
    setLoading(true);
    try {
      if (editIdx !== null) {
        // Edit
        await fetch(`${API_BASE}/products/${vendorProducts[editIdx]._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, vendor: user._id }),
        });
        toast.success('Product updated');
      } else {
        // Add
        await fetch(`${API_BASE}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, vendor: user._id }),
        });
        toast.success('Product added');
      }
      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      toast.error('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const deleteProduct = async (idx) => {
    if (!window.confirm('Delete this product?')) return;
    setLoading(true);
    try {
      await fetch(`${API_BASE}/products/${vendorProducts[idx]._id}`, { method: 'DELETE' });
      toast.success('Product deleted');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Product Management</h2>
        <button className="flex items-center gap-1 px-3 py-2 bg-primary text-white rounded" onClick={() => openModal()}><MdAdd /> Add Product</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Brand</th>
              <th className="p-2 text-left">Size</th>
              <th className="p-2 text-left">Price (KES)</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendorProducts.map((product, idx) => (
              <tr key={product._id} className="border-b">
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.brand}</td>
                <td className="p-2">{product.size}</td>
                <td className="p-2">{product.finalPrice}</td>
                <td className="p-2 flex gap-2">
                  <button className="text-blue-600" onClick={() => openModal(idx)} title="Edit"><MdEdit /></button>
                  <button className="text-red-600" onClick={() => deleteProduct(idx)} title="Delete"><MdDelete /></button>
                </td>
              </tr>
            ))}
            {vendorProducts.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-gray-400">No products yet.</td></tr>}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form className="bg-white rounded shadow-lg p-6 w-full max-w-md" onSubmit={saveProduct}>
            <h3 className="text-lg font-bold mb-4">{editIdx !== null ? 'Edit Product' : 'Add Product'}</h3>
            <div className="mb-2">
              <label className="block mb-1">Name</label>
              <input className="border p-2 rounded w-full" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Brand</label>
              <input className="border p-2 rounded w-full" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Size</label>
              <input className="border p-2 rounded w-full" value={form.size} onChange={e => setForm({ ...form, size: e.target.value })} />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Price (KES)</label>
              <input type="number" className="border p-2 rounded w-full" value={form.finalPrice} onChange={e => setForm({ ...form, finalPrice: e.target.value })} />
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
  const { user, vendors, getVendorOrders, getVendorPayments, getVendorReviews } = UseAppContext();
  const vendorName = user?.businessName || vendors?.gas?.[0]?.vendorName || 'Vendor';
  const orders = getVendorOrders(vendorName);
  const payments = getVendorPayments(vendorName);
  const reviews = getVendorReviews(vendorName);
  const avgRating = reviews.length ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : '-';
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Tab content switcher
  let tabContent;
  if (activeTab === 'dashboard') {
    tabContent = (
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Welcome, <span className="text-primary">{vendorName}</span>!</h1>
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
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <HiMenuAlt3 size={24} />
      </button>
      <DashboardSidebar
        links={vendorTabs.map(tab => ({
          ...tab,
          onClick: () => {
            setActiveTab(tab.key);
            setSidebarOpen(false);
          },
          isActive: activeTab === tab.key,
        }))}
        title="Vendor"
        open={sidebarOpen || window.innerWidth >= 1024}
        onClose={() => setSidebarOpen(false)}
      />
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <main className="flex-1 ml-0 lg:ml-64 p-6 transition-all w-full">
        {tabContent}
      </main>
    </div>
  );
};

export default VendorDashboard;