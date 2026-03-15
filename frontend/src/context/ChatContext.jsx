import React, { createContext, useState, useContext, useEffect } from 'react';
import { socket } from '../services/socket';

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [messages, setMessages] = useState([]);
  
  // Initial Mock Data
  const [threads, setThreads] = useState([
    { id: '1', title: 'Stripe Update', platform: 'email', summary: 'Your payout is on the way.', unreadCount: 1, lastActivity: '12:05 PM', isOnline: false },
    { id: '2', title: 'Alex Johnson', platform: 'telegram', intent: 'important', lastMessage: '4 PM works great! Talk to you then.', unreadCount: 0, lastActivity: '11:02 AM', isOnline: true },
    { id: 't_mock', title: 'Live Telegram Feed', platform: 'telegram', summary: 'Waiting for messages...', unreadCount: 0, lastActivity: 'Just now', isOnline: true }
  ]);

  useEffect(() => {
    socket.on('newMessage', (msg) => {
      console.log('Incoming live message:', msg);
      
      // 1. Add to messages if we are viewing this thread
      if (activeThreadId === msg.threadId || activeThreadId === 't_mock') {
         setMessages(prev => [...prev, msg]);
      }

      // 2. Update the Thread list
      setThreads(prevThreads => {
        const existingThread = prevThreads.find(t => t.id === msg.threadId || t.id === 't_mock');
        
        if (existingThread) {
          return prevThreads.map(t => 
             (t.id === msg.threadId || t.id === 't_mock') ? { ...t, lastMessage: msg.content, lastActivity: 'Just now', unreadCount: activeThreadId === t.id ? 0 : t.unreadCount + 1 } : t
          );
        } else {
          return [{
             id: msg.threadId, 
             title: msg.senderName || 'Unknown', 
             platform: msg.platform, 
             lastMessage: msg.content, 
             unreadCount: 1, 
             lastActivity: 'Just now', 
             isOnline: true
          }, ...prevThreads];
        }
      });
    });

    return () => {
      socket.off('newMessage');
    };
  }, [activeThreadId]);

  const value = {
    activeThreadId, setActiveThreadId,
    messages, setMessages,
    threads, setThreads
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
