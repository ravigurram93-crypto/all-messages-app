import React from 'react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-900 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 -left-20 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Starfield overlay pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

      <div className="w-full max-w-md p-8 relative z-10">
        {/* Glassmorphism Card */}
        <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
          
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 mb-6 ring-1 ring-white/20">
              <span className="text-3xl text-white">🌠</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
            <p className="text-slate-400 mt-2 text-sm">{subtitle}</p>
          </div>

          {children}
        </div>
        
        <p className="text-center text-slate-500 text-xs mt-8 font-medium">
          &copy; {new Date().getFullYear()} Universal Inbox. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
