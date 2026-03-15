import React, { useState } from 'react';
import AuthLayout from '../components/auth/AuthLayout';

const Login = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      onNavigate('dashboard');
    }, 1500);
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Log in to access your Universal Inbox">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder-slate-500"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-slate-300">Password</label>
            <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</a>
          </div>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder-slate-500"
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl px-4 py-3 pb-3 mt-4 transition-all shadow-lg shadow-indigo-500/25 flex justify-center items-center group overflow-hidden relative"
        >
          <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
          <span className="relative flex items-center gap-2">
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Sign In'}
          </span>
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-400">
        Don't have an account?{' '}
        <button onClick={() => onNavigate('signup')} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
          Create one now
        </button>
      </div>
    </AuthLayout>
  );
};

export default Login;
