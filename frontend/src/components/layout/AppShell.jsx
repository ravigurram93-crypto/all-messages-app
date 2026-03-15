import React from 'react';
import Sidebar from './Sidebar';

const AppShell = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 font-sans">
      {/* Primary Navigation Shell */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden relative">
        {children}
      </main>
    </div>
  );
};

export default AppShell;
