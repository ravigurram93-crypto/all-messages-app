import React from 'react';

const TopBar = ({ title, children }) => {
  return (
    <div className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-indigo-600">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        {children}
      </div>
    </div>
  );
};

export default TopBar;
