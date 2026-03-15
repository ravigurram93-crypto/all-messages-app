import React, { useState } from 'react';

const smartRepliesMock = [
  "Sounds like a plan.",
  "Looking forward to it.",
  "I'll send an invite."
];

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    if (onSend) onSend(text);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white/90 backdrop-blur-lg border-t border-slate-100 z-20 sticky bottom-0">
      
      {/* AI Smart Replies Layer */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-none items-center">
        <div className="flex items-center text-indigo-500 mr-2 shrink-0 bg-indigo-50/50 px-2 py-1 rounded-md border border-indigo-100/50">
          <span className="text-sm mr-1">✨</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">AI Suggests</span>
        </div>
        {smartRepliesMock.map((reply, i) => (
          <button 
            key={i} 
            onClick={() => setText(reply)}
            className="whitespace-nowrap bg-white border border-slate-200 text-slate-700 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-all shadow-sm shrink-0"
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Main Input Area */}
      <div className="flex items-end gap-3 bg-slate-50/80 p-2 rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all shadow-inner">
        
        {/* Attachment Button (Placeholder) */}
        <button className="p-2.5 text-slate-400 hover:text-indigo-500 transition-colors rounded-xl hover:bg-white shrink-0">
           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
        </button>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a message... (Press Enter to send)"
          className="w-full bg-transparent resize-none outline-none p-2.5 text-slate-800 placeholder-slate-400 text-[15px] leading-relaxed"
          rows={1}
          style={{ minHeight: '44px', maxHeight: '120px' }}
        />
        
        {/* Send Button */}
        <button 
          onClick={handleSend}
          disabled={!text.trim()}
          className={`p-3 rounded-xl shadow-md transition-all flex shrink-0 items-center justify-center m-1 group ${
            text.trim() 
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25 cursor-pointer' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <svg className={`w-5 h-5 transform transition-transform ${text.trim() ? 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
      
    </div>
  );
};

export default MessageInput;
