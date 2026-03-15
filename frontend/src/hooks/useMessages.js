import { useChat } from '../context/ChatContext';

export const useMessages = () => {
  const { messages, setMessages } = useChat();
  
  const sendMessage = (text, threadId) => {
    // API call logic will go here
    const newMsg = { id: Date.now(), text, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), isIncoming: false };
    setMessages(prev => [...prev, newMsg]);
  };

  return { messages, sendMessage };
};
