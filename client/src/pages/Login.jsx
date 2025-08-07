import React, { useState } from 'react';
import { UseAppContext } from '../context/context';
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = 'adminrefil@gmail.com';
const ADMIN_PASSWORD = '12345678';

const Login = () => {
  const { setUser, setisSeller } = UseAppContext();
  const navigate = useNavigate();
  const [tab, setTab] = useState('vendor');
  // Vendor signup/login state
  const [vendorSignup, setVendorSignup] = useState({
    businessName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [vendorLogin, setVendorLogin] = useState({
    email: '',
    password: '',
  });
  const [registeredVendors, setRegisteredVendors] = useState([]);
  const [adminLogin, setAdminLogin] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  // Vendor signup handler
  const handleVendorSignup = (e) => {
    e.preventDefault();
    if (!vendorSignup.businessName || !vendorSignup.email || !vendorSignup.phone || !vendorSignup.password) {
      setError('Please fill all fields');
      return;
    }
    setRegisteredVendors([...registeredVendors, vendorSignup]);
    setError('');
    alert('Signup successful! Please login.');
    setTab('vendor-login');
  };

  // Vendor login handler
  const handleVendorLogin = (e) => {
    e.preventDefault();
    const found = registeredVendors.find(v => v.email === vendorLogin.email && v.password === vendorLogin.password);
    if (found) {
      setUser({ ...found, role: 'vendor' });
      setisSeller(true);
      setError('');
      navigate('/vendor/dashboard');
    } else {
      setError('Invalid vendor credentials or not registered.');
    }
  };

  // Admin login handler
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminLogin.email === ADMIN_EMAIL && adminLogin.password === ADMIN_PASSWORD) {
      setUser({ email: ADMIN_EMAIL, role: 'admin' });
      setisSeller(false);
      setError('');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="flex mb-6">
          <button className={`flex-1 py-2 ${tab === 'vendor' ? 'font-bold border-b-2 border-primary' : ''}`} onClick={() => setTab('vendor')}>Vendor Signup</button>
          <button className={`flex-1 py-2 ${tab === 'vendor-login' ? 'font-bold border-b-2 border-primary' : ''}`} onClick={() => setTab('vendor-login')}>Vendor Login</button>
          <button className={`flex-1 py-2 ${tab === 'admin' ? 'font-bold border-b-2 border-primary' : ''}`} onClick={() => setTab('admin')}>Admin Login</button>
        </div>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {tab === 'vendor' && (
          <form onSubmit={handleVendorSignup} className="flex flex-col gap-3">
            <input type="text" placeholder="Business Name" value={vendorSignup.businessName} onChange={e => setVendorSignup({ ...vendorSignup, businessName: e.target.value })} className="border p-2 rounded" />
            <input type="email" placeholder="Email" value={vendorSignup.email} onChange={e => setVendorSignup({ ...vendorSignup, email: e.target.value })} className="border p-2 rounded" />
            <input type="text" placeholder="Phone Number" value={vendorSignup.phone} onChange={e => setVendorSignup({ ...vendorSignup, phone: e.target.value })} className="border p-2 rounded" />
            <input type="password" placeholder="Password" value={vendorSignup.password} onChange={e => setVendorSignup({ ...vendorSignup, password: e.target.value })} className="border p-2 rounded" />
            <button type="submit" className="bg-primary text-white py-2 rounded">Sign Up</button>
          </form>
        )}
        {tab === 'vendor-login' && (
          <form onSubmit={handleVendorLogin} className="flex flex-col gap-3">
            <input type="email" placeholder="Email" value={vendorLogin.email} onChange={e => setVendorLogin({ ...vendorLogin, email: e.target.value })} className="border p-2 rounded" />
            <input type="password" placeholder="Password" value={vendorLogin.password} onChange={e => setVendorLogin({ ...vendorLogin, password: e.target.value })} className="border p-2 rounded" />
            <button type="submit" className="bg-primary text-white py-2 rounded">Login</button>
          </form>
        )}
        {tab === 'admin' && (
          <form onSubmit={handleAdminLogin} className="flex flex-col gap-3">
            <input type="email" placeholder="Admin Email" value={adminLogin.email} onChange={e => setAdminLogin({ ...adminLogin, email: e.target.value })} className="border p-2 rounded" />
            <input type="password" placeholder="Password" value={adminLogin.password} onChange={e => setAdminLogin({ ...adminLogin, password: e.target.value })} className="border p-2 rounded" />
            <button type="submit" className="bg-primary text-white py-2 rounded">Login</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;