import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';

const MessageList = ({ messages }) => {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 bg-[#f8fafc] relative">
      {/* Subtle dotted background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #0f172a 1px, transparent 0)', backgroundSize: '32px 32px' }}
      ></div>
      
      {/* Date Divider Example */}
      <div className="flex justify-center mb-6 relative z-10 select-none">
        <span className="bg-white border border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
          Today
        </span>
      </div>

      <div className="flex flex-col">
        {messages?.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {/* Invisible div to scroll to */}
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
};

export default MessageList;
