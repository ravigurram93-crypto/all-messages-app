import React from 'react';

const MessageBubble = ({ message }) => {
  const isIncoming = message.isIncoming;

  return (
    <div className={`flex ${isIncoming ? 'justify-start' : 'justify-end'} relative z-10 w-full mb-6 group`}>
      <div 
        className={`max-w-[75%] md:max-w-[60%] rounded-2xl p-4 shadow-sm relative ${
          isIncoming 
            ? 'bg-white border border-slate-100 text-slate-800 rounded-tl-sm' 
            : 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-tr-sm'
        }`}
      >
        <p className={`text-[15px] leading-relaxed whitespace-pre-wrap ${!isIncoming && 'font-medium tracking-wide'}`}>
          {message.text}
        </p>

        {/* Message Metadata (Time/Status) */}
        <div className={`flex items-center gap-1.5 text-[10px] font-medium mt-2 select-none ${isIncoming ? 'text-slate-400 justify-start' : 'text-indigo-200 justify-end'}`}>
          <span>{message.time}</span>
          {!isIncoming && (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        
        {/* Floating actions on hover (Reply, React, Share) - Only visible on hover */}
        <div className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${isIncoming ? '-right-14 border border-slate-100 bg-white rounded-full px-2 py-1 shadow-sm' : '-left-14 border border-slate-100 bg-white rounded-full px-2 py-1 shadow-sm'}`}>
            <button className="text-slate-400 hover:text-indigo-500 transition-colors hidden md:block">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
            </button>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
