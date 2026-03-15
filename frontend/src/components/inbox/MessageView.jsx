import React, { useState } from 'react';

const MessageView = ({ threadId }) => {
  const [replyText, setReplyText] = useState('');
  
  // Mock Data
  const messages = [
    { id: 1, sender: 'Alex Johnson', text: 'Can we meet at 3 PM tomorrow to discuss the new feature?', time: '10:42 AM', isIncoming: true, intent: 'important' },
    { id: 2, sender: 'You', text: 'I have another meeting at 3, how about 4 PM?', time: '10:55 AM', isIncoming: false },
    { id: 3, sender: 'Alex Johnson', text: '4 PM works great! Talk to you then.', time: '11:02 AM', isIncoming: true, intent: 'normal' },
  ];

  const smartReplies = [
    "Sounds like a plan.",
    "Looking forward to it.",
    "I'll send an invite."
  ];

  return (
    <div className="flex flex-col h-full bg-white shadow-sm rounded-tl-2xl border-t border-l border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white/50 backdrop-blur-md rounded-tl-2xl z-10 sticky top-0">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900">Alex Johnson</h2>
          <p className="text-sm text-gray-500 font-medium">via Telegram &bull; Online</p>
        </div>
        <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border border-indigo-100">
          Important
        </div>
      </div>

      {/* Message History */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isIncoming ? 'justify-start' : 'justify-end'} relative z-10`}>
            <div className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${
              msg.isIncoming 
                ? 'bg-white border border-gray-100 text-gray-800 rounded-tl-none' 
                : 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-tr-none'
            }`}>
              <p className="text-[15px] leading-relaxed mb-1">{msg.text}</p>
              <div className={`text-xs text-right mt-2 ${msg.isIncoming ? 'text-gray-400' : 'text-indigo-200'}`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Compose Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        {/* Smart Replies */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center text-indigo-500 mr-2 shrink-0">
            <span className="text-sm mr-1">✨</span>
            <span className="text-xs font-bold uppercase tracking-wider">AI Suggests:</span>
          </div>
          {smartReplies.map((reply, i) => (
            <button 
              key={i} 
              onClick={() => setReplyText(reply)}
              className="whitespace-nowrap bg-white border border-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-50 hover:border-indigo-200 transition-all shadow-sm shrink-0"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input Field */}
        <div className="flex items-end gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a message..."
            className="w-full bg-transparent resize-none outline-none p-3 text-gray-700 placeholder-gray-400"
            rows={1}
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-3 shadow-md hover:shadow-lg transition-all flex shrink-0 items-center justify-center m-1 group">
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageView;
