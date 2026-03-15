import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-16 md:w-64 bg-slate-900 border-r border-slate-700 flex flex-col h-full text-white">
      <div className="p-4 flex flex-col items-center md:items-start border-b border-slate-800">
        <span className="text-2xl mb-1">🌠</span>
        <span className="text-xs md:text-sm font-semibold tracking-wider text-slate-400 uppercase hidden md:block">Universal</span>
      </div>

      <div className="flex-1 py-4 flex flex-col gap-2">
        <NavItem icon="💬" label="All Messages" active />
        <NavItem icon="📧" label="Email" />
        <NavItem icon="✈️" label="Telegram" />
        <NavItem icon="🤖" label="AI Rules" />
      </div>
      
      <div className="p-4 mb-4 border-t border-slate-800">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 mx-auto md:mx-0 ring-2 ring-slate-800 shadow shadow-indigo-500/50"></div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active }) => (
  <button 
    className={`w-full flex items-center p-3 transition-colors ${
      active 
        ? 'bg-slate-800 text-white' 
        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
    }`}
  >
    <div className="w-10 flex justify-center">{icon}</div>
    <span className="hidden md:block font-medium text-sm">{label}</span>
  </button>
);

export default Sidebar;
