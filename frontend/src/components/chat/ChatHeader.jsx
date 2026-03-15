import React from 'react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';

const ChatHeader = ({ thread }) => {
  if (!thread) return null;

  return (
    <div className="flex items-center justify-between p-4 px-6 border-b border-gray-100 bg-white/80 backdrop-blur-xl z-20 sticky top-0 shadow-sm shadow-slate-200/20 shrink-0 h-[72px]">
      <div className="flex items-center gap-4">
        <Avatar name={thread.title} platform={thread.platform} isOnline={thread.isOnline} size="lg" />
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900 leading-tight flex items-center gap-2">
            {thread.title}
            {thread.intent && (
              <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-bold ${
                thread.intent === 'important' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {thread.intent}
              </span>
            )}
          </h2>
          <p className="text-xs text-slate-500 font-medium capitalize flex items-center gap-1.5 mt-0.5">
            <span className={`w-1.5 h-1.5 rounded-full ${thread.isOnline ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
            {thread.platform} &bull; {thread.isOnline ? 'Online' : 'Last seen recently'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
