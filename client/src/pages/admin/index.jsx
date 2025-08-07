import React, { useState } from 'react';
import { UseAppContext } from '../../context/context';
import DashboardSidebar from '../../components/DashboardSidebar';
import { MdDashboard, MdGroup, MdShoppingCart, MdPayments, MdStarRate, MdAnalytics } from 'react-icons/md';
import toast from 'react-hot-toast';

const adminTabs = [
  { label: 'Dashboard', key: 'dashboard', icon: <MdDashboard size={22} /> },
  { label: 'Users', key: 'users', icon: <MdGroup size={22} /> },
  { label: 'Orders', key: 'orders', icon: <MdShoppingCart size={22} /> },
  { label: 'Payments', key: 'payments', icon: <MdPayments size={22} /> },
  { label: 'Reviews', key: 'reviews', icon: <MdStarRate size={22} /> },
  { label: 'Analytics', key: 'analytics', icon: <MdAnalytics size={22} /> },
];

const UsersTab = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', type: 'Customer', status: 'Active' },
    { id: 2, name: 'Bob', type: 'Vendor', status: 'Pending' },
    { id: 3, name: 'Carol', type: 'Vendor', status: 'Active' },
  ]);
  const deactivateUser = (idx) => {
    setUsers(users => users.map((u, i) => i === idx ? { ...u, status: 'Deactivated' } : u));
    toast.success('User deactivated');
  };
  const approveVendor = (idx) => {
    setUsers(users => users.map((u, i) => i === idx ? { ...u, status: 'Active' } : u));
    toast.success('Vendor approved');
  };
  const blacklistUser = (idx) => {
    setUsers(users => users.map((u, i) => i === idx ? { ...u, status: 'Blacklisted' } : u));
    toast.success('User blacklisted');
  };
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id} className="border-b">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.type}</td>
                <td className="p-2">{user.status}</td>
                <td className="p-2 flex gap-2">
                  <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => deactivateUser(idx)}>Deactivate</button>
                  {user.type === 'Vendor' && user.status === 'Pending' && (
                    <button className="px-2 py-1 bg-green-100 rounded" onClick={() => approveVendor(idx)}>Approve</button>
                  )}
                  <button className="px-2 py-1 bg-red-100 rounded" onClick={() => blacklistUser(idx)}>Blacklist</button>
                </td>
              </tr>
            ))}
            {users.length === 0 && <tr><td colSpan={4} className="p-4 text-center text-gray-400">No users yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const OrdersTab = () => {
  const [orders, setOrders] = useState([
    { id: 1, vendor: 'Pro Gas Station', location: 'Westlands', status: 'Ongoing' },
    { id: 2, vendor: 'SeaGas', location: 'Kilimani', status: 'Completed' },
    { id: 3, vendor: 'Total', location: 'CBD', status: 'Ongoing' },
  ]);
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? orders : orders.filter(o => o.status === filter);
  const updateStatus = (idx) => {
    setOrders(orders => orders.map((o, i) => i === idx ? { ...o, status: o.status === 'Ongoing' ? 'Completed' : 'Ongoing' } : o));
    toast.success('Order status updated');
  };
  const deleteOrder = (idx) => {
    if (window.confirm('Delete this order?')) {
      setOrders(orders => orders.filter((_, i) => i !== idx));
      toast.success('Order deleted');
    }
  };
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Order Monitoring</h2>
      <div className="mb-2">
        <label className="mr-2">Filter by status:</label>
        <select className="border p-1 rounded" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Vendor</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order, idx) => (
              <tr key={order.id} className="border-b">
                <td className="p-2">{order.vendor}</td>
                <td className="p-2">{order.location}</td>
                <td className="p-2">{order.status}</td>
                <td className="p-2 flex gap-2">
                  <button className="px-2 py-1 bg-blue-100 rounded" onClick={() => updateStatus(idx)}>
                    Mark as {order.status === 'Ongoing' ? 'Completed' : 'Ongoing'}
                  </button>
                  <button className="px-2 py-1 bg-red-100 rounded" onClick={() => deleteOrder(idx)}>Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={4} className="p-4 text-center text-gray-400">No orders yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PaymentsTab = () => {
  const [payments, setPayments] = useState([
    { id: 1, vendor: 'Pro Gas Station', type: 'M-Pesa', amount: 1399, status: 'Received' },
    { id: 2, vendor: 'SeaGas', type: 'Cash on Delivery', amount: 2500, status: 'Pending' },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ vendor: '', type: 'M-Pesa', amount: '', status: 'Received' });
  const openModal = (idx = null) => {
    setEditIdx(idx);
    if (idx !== null) {
      setForm(payments[idx]);
    } else {
      setForm({ vendor: '', type: 'M-Pesa', amount: '', status: 'Received' });
    }
    setModalOpen(true);
  };
  const savePayment = (e) => {
    e.preventDefault();
    if (!form.vendor || !form.type || !form.amount || !form.status) {
      toast.error('All fields required');
      return;
    }
    let updated;
    if (editIdx !== null) {
      updated = payments.map((p, i) => (i === editIdx ? { ...form, id: p.id } : p));
      toast.success('Payment updated');
    } else {
      updated = [...payments, { ...form, id: Date.now() }];
      toast.success('Payment added');
    }
    setPayments(updated);
    setModalOpen(false);
  };
  const deletePayment = (idx) => {
    if (window.confirm('Delete this payment?')) {
      setPayments(payments.filter((_, i) => i !== idx));
      toast.success('Payment deleted');
    }
  };
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Payments Reconciliation</h2>
        <button className="flex items-center gap-1 px-3 py-2 bg-primary text-white rounded" onClick={() => openModal()}>Add Payment</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Vendor</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Amount (KES)</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr key={payment.id} className="border-b">
                <td className="p-2">{payment.vendor}</td>
                <td className="p-2">{payment.type}</td>
                <td className="p-2">{payment.amount}</td>
                <td className="p-2">{payment.status}</td>
                <td className="p-2 flex gap-2">
                  <button className="text-blue-600" onClick={() => openModal(idx)} title="Edit">Edit</button>
                  <button className="text-red-600" onClick={() => deletePayment(idx)} title="Delete">Delete</button>
                </td>
              </tr>
            ))}
            {payments.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-gray-400">No payments yet.</td></tr>}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form className="bg-white rounded shadow-lg p-6 w-full max-w-md" onSubmit={savePayment}>
            <h3 className="text-lg font-bold mb-4">{editIdx !== null ? 'Edit Payment' : 'Add Payment'}</h3>
            <div className="mb-2">
              <label className="block mb-1">Vendor</label>
              <input className="border p-2 rounded w-full" value={form.vendor} onChange={e => setForm({ ...form, vendor: e.target.value })} />
            </div>
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
            <div className="flex gap-2 justify-end mt-4">
              <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={() => setModalOpen(false)}>Cancel</button>
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const ReviewsTab = () => {
  const [reviews, setReviews] = useState([
    { id: 1, vendor: 'Pro Gas Station', customer: 'Alice', rating: 5, comment: 'Great service!', flagged: false },
    { id: 2, vendor: 'SeaGas', customer: 'Bob', rating: 2, comment: 'Late delivery.', flagged: true },
  ]);
  const moderateReview = (idx) => {
    setReviews(reviews => reviews.map((r, i) => i === idx ? { ...r, flagged: !r.flagged } : r));
    toast.success('Review moderated');
  };
  const deleteReview = (idx) => {
    if (window.confirm('Delete this review?')) {
      setReviews(reviews => reviews.filter((_, i) => i !== idx));
      toast.success('Review deleted');
    }
  };
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Reviews & Complaints</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Vendor</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Comment</th>
              <th className="p-2 text-left">Rating</th>
              <th className="p-2 text-left">Flagged</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, idx) => (
              <tr key={review.id} className="border-b">
                <td className="p-2">{review.vendor}</td>
                <td className="p-2">{review.customer}</td>
                <td className="p-2">{review.comment}</td>
                <td className="p-2">{review.rating}/5</td>
                <td className="p-2">{review.flagged ? <span className="text-red-500">Yes</span> : 'No'}</td>
                <td className="p-2 flex gap-2">
                  <button className="px-2 py-1 bg-yellow-100 rounded" onClick={() => moderateReview(idx)}>{review.flagged ? 'Unflag' : 'Flag'}</button>
                  <button className="px-2 py-1 bg-red-100 rounded" onClick={() => deleteReview(idx)}>Delete</button>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && <tr><td colSpan={6} className="p-4 text-center text-gray-400">No reviews yet.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <b>Highlight top-rated vendors on homepage</b>
      </div>
    </div>
  );
};

const AnalyticsTab = () => {
  const mockAnalytics = {
    revenue: { daily: 10000, weekly: 70000, monthly: 300000 },
    activeVendors: 12,
    activeCustomers: 120,
    mostOrdered: 'ProGas 6kg',
    retention: '85%'
  };
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Analytics & Reporting</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <div><b>Daily Revenue:</b> KES {mockAnalytics.revenue.daily}</div>
          <div><b>Weekly Revenue:</b> KES {mockAnalytics.revenue.weekly}</div>
          <div><b>Monthly Revenue:</b> KES {mockAnalytics.revenue.monthly}</div>
          <div><b>Active Vendors:</b> {mockAnalytics.activeVendors}</div>
          <div><b>Active Customers:</b> {mockAnalytics.activeCustomers}</div>
          <div><b>Most Ordered Product:</b> {mockAnalytics.mostOrdered}</div>
          <div><b>Customer Retention Rate:</b> {mockAnalytics.retention}</div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { getAllOrders, getAllPayments, getAllReviews, analytics } = UseAppContext();
  const orders = getAllOrders();
  const payments = getAllPayments();
  const reviews = getAllReviews();
  const [activeTab, setActiveTab] = useState('dashboard');

  let tabContent;
  if (activeTab === 'dashboard') {
    tabContent = (
      <div>
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <MdShoppingCart className="text-primary mb-2" size={36} />
            <div className="text-lg font-semibold">{orders.length}</div>
            <div className="text-gray-500 text-sm">Orders</div>
          </div>
          <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <MdPayments className="text-primary mb-2" size={36} />
            <div className="text-lg font-semibold">{payments.length}</div>
            <div className="text-gray-500 text-sm">Payments</div>
          </div>
          <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <MdStarRate className="text-primary mb-2" size={36} />
            <div className="text-lg font-semibold">{reviews.length}</div>
            <div className="text-gray-500 text-sm">Reviews</div>
          </div>
          <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <MdAnalytics className="text-primary mb-2" size={36} />
            <div className="text-lg font-semibold">KES {analytics.revenue.monthly}</div>
            <div className="text-gray-500 text-sm">Revenue (Monthly)</div>
          </div>
        </div>
        {/* Chart Placeholder */}
        <div className="bg-white rounded shadow p-6 mb-8">
          <div className="font-semibold mb-2">Sales & Revenue (Chart Coming Soon)</div>
          <div className="h-40 flex items-center justify-center text-gray-400">[Chart Placeholder]</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Recent Orders</h3>
            <ul className="bg-white rounded shadow p-4 divide-y">
              {orders.slice(0, 5).map(order => (
                <li key={order.id} className="py-2 flex justify-between items-center">
                  <span>{order.product} for {order.customer} by {order.vendor}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{order.status}</span>
                </li>
              ))}
              {orders.length === 0 && <li className="py-2 text-gray-400">No orders yet.</li>}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Recent Reviews</h3>
            <ul className="bg-white rounded shadow p-4 divide-y">
              {reviews.slice(0, 5).map(review => (
                <li key={review.id} className="py-2 flex justify-between items-center">
                  <span>{review.vendor} - {review.customer}: {review.comment}</span>
                  <span className="text-xs bg-yellow-100 px-2 py-1 rounded">{review.rating}/5</span>
                </li>
              ))}
              {reviews.length === 0 && <li className="py-2 text-gray-400">No reviews yet.</li>}
            </ul>
          </div>
        </div>
      </div>
    );
  } else if (activeTab === 'users') {
    tabContent = <UsersTab />;
  } else if (activeTab === 'orders') {
    tabContent = <OrdersTab />;
  } else if (activeTab === 'payments') {
    tabContent = <PaymentsTab />;
  } else if (activeTab === 'reviews') {
    tabContent = <ReviewsTab />;
  } else if (activeTab === 'analytics') {
    tabContent = <AnalyticsTab />;
  } else {
    tabContent = <div className="p-4">Tab coming soon...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <DashboardSidebar
        links={adminTabs.map(tab => ({
          ...tab,
          onClick: () => setActiveTab(tab.key),
          isActive: activeTab === tab.key,
        }))}
        title="Admin"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main className="flex-1 ml-20 lg:ml-64 p-6 transition-all">
        {tabContent}
      </main>
    </div>
  );
};

export default AdminDashboard;