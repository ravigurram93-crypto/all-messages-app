import React from 'react';

const ThreadList = ({ threads, activeId, onSelect }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {threads.map((thread) => (
        <div 
          key={thread.id}
          onClick={() => onSelect(thread.id)}
          className={`
            p-4 border-b border-gray-100 cursor-pointer transition-all duration-200
            ${activeId === thread.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : 'hover:bg-gray-50 border-l-4 border-l-transparent'}
          `}
        >
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-semibold text-gray-900 truncate">
              {thread.title}
            </h4>
            {thread.unread && (
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-1"></span>
            )}
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <PlatformBadge platform={thread.platform} />
            <span className="text-xs text-gray-400">10:42 AM</span>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            <span className="font-medium text-indigo-600 mr-1">✨ AI:</span>
            {thread.summary}
          </p>
        </div>
      ))}
    </div>
  );
};

const PlatformBadge = ({ platform }) => {
  const colors = {
    email: 'bg-red-100 text-red-700',
    telegram: 'bg-sky-100 text-sky-700',
    slack: 'bg-purple-100 text-purple-700',
  };
  
  const labels = {
    email: 'Email',
    telegram: 'Telegram',
    slack: 'Slack',
  }

  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${colors[platform] || 'bg-gray-200 text-gray-700'}`}>
      {labels[platform] || platform}
    </span>
  );
};

export default ThreadList;
