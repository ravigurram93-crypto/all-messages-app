import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SignupPage = ({ onNavigate }) => {
  const [step, setStep] = useState(1);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0B0F19] overflow-hidden font-sans">
      
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[150px]" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px' 
          }} 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-[90%] max-w-[420px]"
      >
        {/* Glass Container */}
        <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-[2rem] p-8 md:p-10 relative overflow-hidden">
          
          {/* Subtle inner top highlight */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" />

          {/* Logo / Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/25 ring-1 ring-white/10">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
               </svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Create Account</h1>
            <p className="text-sm text-slate-400">Join Universal Inbox and centralize your life.</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onNavigate('dashboard');}}>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Jane Doe" 
                  className="w-full bg-white/[0.03] border border-white/[0.08] text-white rounded-xl px-4 py-3 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full bg-white/[0.03] border border-white/[0.08] text-white rounded-xl px-4 py-3 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
                  required
                />
              </div>
            </div>

            <div>
               <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-white/[0.03] border border-white/[0.08] text-white rounded-xl px-4 py-3 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all font-mono tracking-widest text-lg h-[50px]"
                  required
                />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-xl py-3.5 mt-4 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all flex items-center justify-center gap-2"
            >
              Sign Up Free
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </form>

        </div>

        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <button onClick={() => onNavigate('login')} className="text-white hover:text-pink-400 font-medium transition-colors">
            Sign in
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
