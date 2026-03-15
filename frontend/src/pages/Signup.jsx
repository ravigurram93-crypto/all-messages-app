import React, { useState } from 'react';
import AuthLayout from '../components/auth/AuthLayout';

const Signup = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API registration
    setTimeout(() => {
      setIsLoading(false);
      onNavigate('dashboard');
    }, 1500);
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join Universal Inbox & centralize your life.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
          <input 
            type="text" 
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder-slate-500"
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder-slate-500"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder-slate-500"
            placeholder="Create a strong password"
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl px-4 py-3 pb-3 mt-6 transition-all shadow-lg shadow-purple-500/25 flex justify-center items-center group overflow-hidden relative"
        >
          <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
          <span className="relative flex items-center gap-2">
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Sign Up'}
          </span>
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{' '}
        <button onClick={() => onNavigate('login')} className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
          Sign In
        </button>
      </div>
    </AuthLayout>
  );
};

export default Signup;
