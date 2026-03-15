import React from 'react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';

const ContactRow = ({ thread, isActive, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 flex gap-3 relative
        ${isActive ? 'bg-indigo-50/50' : 'hover:bg-gray-50'}
      `}
    >
      {/* Active Line Indicator */}
      {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-r-full"></div>}

      <Avatar 
        name={thread.title} 
        platform={thread.platform} 
        isOnline={thread.isOnline} 
      />

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-semibold text-gray-900 truncate text-sm">
            {thread.title}
          </h4>
          <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
            {thread.lastActivity || '10:42 AM'}
          </span>
        </div>
        
        <div className="flex justify-between items-start gap-2">
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {thread.summary ? (
              <><span className="font-medium text-indigo-600 mr-1">✨ AI:</span>{thread.summary}</>
            ) : (
              thread.lastMessage
            )}
          </p>
          
          {thread.unreadCount > 0 && (
             <Badge count={thread.unreadCount} className="mt-0.5" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactRow;
