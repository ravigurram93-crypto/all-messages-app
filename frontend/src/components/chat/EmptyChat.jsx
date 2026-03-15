import React from 'react';

const EmptyChat = () => {
  return (
    <div className="flex-1 flex items-center justify-center text-gray-400 bg-slate-50 relative z-0">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      <div className="text-center relative z-10">
        <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100">
           <span className="text-5xl">✨</span>
        </div>
        <h3 className="text-2xl font-semibold text-slate-800 tracking-tight mb-2">Universal Inbox</h3>
        <p className="text-slate-500 max-w-sm mx-auto">Select a conversation from the sidebar to start messaging across all your platforms.</p>
      </div>
    </div>
  );
};

export default EmptyChat;
