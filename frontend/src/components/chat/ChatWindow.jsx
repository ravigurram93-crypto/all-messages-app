import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useChat } from '../../context/ChatContext';

const ChatWindow = ({ activeThread }) => {
  const { messages, setMessages } = useChat();

  if (!activeThread) return null;

  const handleSend = (text) => {
    // Optimistic UI update
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      time: 'Just now',
      isIncoming: false
    }]);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white shadow-sm border-l border-slate-200 relative">
      <ChatHeader thread={activeThread} />
      <MessageList messages={messages} />
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
