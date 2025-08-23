import React, { useState, useEffect } from 'react';
import { UseAppContext } from '../context/context';
import { useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import BusinessTypeModal from '../components/BusinessTypeModal';

const Login = () => {
  const { login, register, updateBusinessType } = UseAppContext();
  const navigate = useNavigate();
  const [tab, setTab] = useState('vendor');
  const [signup, setSignup] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showBusinessTypeModal, setShowBusinessTypeModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Debug modal state changes
  useEffect(() => {
    console.log('🔍 Debug - Modal state changed to:', showBusinessTypeModal);
    console.log('🔍 Debug - loggedInUser state:', loggedInUser);
  }, [showBusinessTypeModal, loggedInUser]);

  // Vendor signup handler
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (!signup.name || !signup.email || !signup.password) {
      setError('Please fill all fields');
      return;
    }
    setLoading(true);
    const success = await register(signup.name, signup.email, signup.password, 'vendor');
    setLoading(false);
    if (success) {
      alert('Signup successful! Please login.');
      setTab('vendor-login');
    }
  };

  // Vendor login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!loginData.email || !loginData.password) {
      setError('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      const user = await login(loginData.email, loginData.password);
      setLoading(false);
      
      console.log('🔍 Debug - Full user object from login:', user);
      console.log('🔍 Debug - User role:', user?.role);
      console.log('🔍 Debug - User businessType:', user?.businessType);
      console.log('🔍 Debug - businessType type:', typeof user?.businessType);
      console.log('🔍 Debug - businessType === undefined:', user?.businessType === undefined);
      console.log('🔍 Debug - businessType === null:', user?.businessType === null);
      console.log('🔍 Debug - !businessType:', !user?.businessType);
      
      if (user) {
        if (user.role === 'admin') {
          console.log('🔍 Debug - Admin user, redirecting to admin dashboard');
          navigate('/admin/dashboard');
        } else if (user.role === 'vendor') {
          // For vendors, check if they need to set business type
          console.log('🔍 Debug - Vendor login, businessType:', user.businessType);
          console.log('🔍 Debug - Should show modal:', !user.businessType);
          
          // TEMPORARY: Force modal to show for testing
          console.log('🔍 Debug - FORCING MODAL TO SHOW FOR TESTING');
          setLoggedInUser(user);
          setShowBusinessTypeModal(true);
          console.log('🔍 Debug - Modal state set to true, loggedInUser set');
          console.log('🔍 Debug - Current showBusinessTypeModal state:', showBusinessTypeModal);
          
          // ORIGINAL LOGIC (commented out for testing):
          // if (!user.businessType) {
          //   console.log('🔍 Debug - Setting loggedInUser and showing modal');
          //   setLoggedInUser(user);
          //   setShowBusinessTypeModal(true);
          // } else {
          //   console.log('🔍 Debug - Business type already set, redirecting to dashboard');
          //   navigate('/vendor/dashboard');
          // }
        }
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  // Handle business type selection
  const handleBusinessTypeSelect = async (updatedUser) => {
    try {
      // Update the user's business type
      await updateBusinessType(updatedUser.businessType);
      // Close modal and redirect to dashboard
      setShowBusinessTypeModal(false);
      navigate('/vendor/dashboard');
    } catch (err) {
      setError('Failed to set business type. Please try again.');
    }
  };

  const handleCloseBusinessTypeModal = () => {
    setShowBusinessTypeModal(false);
    // If they close without setting business type, still redirect to dashboard
    // They can set it later from the dashboard
    if (loggedInUser) {
      navigate('/vendor/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 to-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <div className="flex mb-8 gap-2">
          <button className={`flex-1 py-2 rounded-t-lg transition-all duration-150 ${tab === 'vendor' ? 'font-bold border-b-2 border-primary text-primary bg-primary/10' : 'text-gray-500 bg-gray-50'}`} onClick={() => setTab('vendor')}>Vendor Signup</button>
          <button className={`flex-1 py-2 rounded-t-lg transition-all duration-150 ${tab === 'vendor-login' ? 'font-bold border-b-2 border-primary text-primary bg-primary/10' : 'text-gray-500 bg-gray-50'}`} onClick={() => setTab('vendor-login')}>Vendor Login</button>
        </div>
        {error && <div className="mb-4 text-red-500 text-center font-medium">{error}</div>}
        {tab === 'vendor' && (
          <form onSubmit={handleSignup} className="flex flex-col gap-5">
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Business Name</label>
              <input type="text" placeholder="Business Name" value={signup.name} onChange={e => setSignup({ ...signup, name: e.target.value })} className="border p-2 rounded w-full focus:ring-2 focus:ring-primary focus:border-transparent" />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Email</label>
              <input type="email" placeholder="Email" value={signup.email} onChange={e => setSignup({ ...signup, email: e.target.value })} className="border p-2 rounded w-full focus:ring-2 focus:ring-primary focus:border-transparent" />
            </div>
            <div className="relative">
              <label className="block mb-1 text-gray-700 font-medium">Password</label>
              <input type={showSignupPassword ? 'text' : 'password'} placeholder="Password" value={signup.password} onChange={e => setSignup({ ...signup, password: e.target.value })} className="border p-2 rounded w-full focus:ring-2 focus:ring-primary focus:border-transparent pr-10" />
              <button type="button" className="absolute right-3 top-9 text-gray-400 hover:text-primary" tabIndex={-1} onClick={() => setShowSignupPassword(v => !v)}>
                {showSignupPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
            <button type="submit" className="bg-primary hover:bg-primary-dull text-white py-2 rounded font-semibold transition" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
          </form>
        )}
        {tab === 'vendor-login' && (
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Email</label>
              <input type="email" placeholder="Email" value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} className="border p-2 rounded w-full focus:ring-2 focus:ring-primary focus:border-transparent" />
            </div>
            <div className="relative">
              <label className="block mb-1 text-gray-700 font-medium">Password</label>
              <input type={showLoginPassword ? 'text' : 'password'} placeholder="Password" value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} className="border p-2 rounded w-full focus:ring-2 focus:ring-primary focus:border-transparent pr-10" />
              <button type="button" className="absolute right-3 top-9 text-gray-400 hover:text-primary" tabIndex={-1} onClick={() => setShowLoginPassword(v => !v)}>
                {showLoginPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
            <button type="submit" className="bg-primary hover:bg-primary-dull text-white py-2 rounded font-semibold transition" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          </form>
        )}
      </div>
      {showBusinessTypeModal && (
        <BusinessTypeModal
          isOpen={showBusinessTypeModal}
          onClose={handleCloseBusinessTypeModal}
          onBusinessTypeSelect={handleBusinessTypeSelect}
          user={loggedInUser}
        />
      )}
    </div>
  );
};

export default Login;