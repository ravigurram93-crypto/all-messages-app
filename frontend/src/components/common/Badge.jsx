import React from 'react';

const Badge = ({ count, className = "" }) => {
  if (!count) return null;
  return (
    <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-indigo-500 rounded-full shadow-sm ${className}`}>
      {count > 99 ? '99+' : count}
    </span>
  );
};

export default Badge;
