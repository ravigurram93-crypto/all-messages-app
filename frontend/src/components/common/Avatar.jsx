import React from 'react';
import PlatformIcon from './PlatformIcon';

const Avatar = ({ name, url, platform, isOnline, size = "md" }) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-xl"
  };

  const getInitials = (n) => n?.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() || '?';

  return (
    <div className="relative inline-block">
      {url ? (
        <img src={url} alt={name} className={`${sizes[size]} rounded-full object-cover shadow-sm bg-slate-100 border border-slate-200`} />
      ) : (
        <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 border border-indigo-200 flex items-center justify-center shadow-sm`}>
          <span className="font-bold text-indigo-700 tracking-wider">
            {getInitials(name)}
          </span>
        </div>
      )}
      
      {/* Platform Badge Overlay */}
      {platform && (
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
           <PlatformIcon platform={platform} className="text-[10px]" />
        </div>
      )}

      {/* Online Dot Overlay */}
      {isOnline && (
        <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
      )}
    </div>
  );
};

export default Avatar;
