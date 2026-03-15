import React, { useState } from 'react';
import AppShell from '../components/layout/AppShell';
import TopBar from '../components/layout/TopBar';
import SearchBar from '../components/sidebar/SearchBar';
import PlatformFilter from '../components/sidebar/PlatformFilter';
import ContactList from '../components/sidebar/ContactList';
import EmptyChat from '../components/chat/EmptyChat';
import ChatWindow from '../components/chat/ChatWindow';
import { useChat } from '../context/ChatContext';

const HomePage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use real global state attached to WebSockets
  const { threads, activeThreadId, setActiveThreadId } = useChat();

  // Filter threads based on search and platform
  const filteredThreads = threads.filter(thread => {
    const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = activeFilter === 'all' || thread.platform === activeFilter;
    return matchesSearch && matchesPlatform;
  });

  const activeThread = threads.find(t => t.id === activeThreadId);

  return (
    <AppShell>
       {/* Sidebar / Contact List Area */}
       <div className="w-80 border-r border-slate-200 bg-white hidden md:flex flex-col shrink-0 overflow-hidden relative z-10 shadow-sm shadow-slate-200/50">
          <TopBar title="Inbox">
            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </button>
          </TopBar>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <PlatformFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          <ContactList 
            threads={filteredThreads} 
            activeId={activeThreadId} 
            onSelect={setActiveThreadId} 
          />
       </div>

       {/* Chat / Message Area */}
       <div className="flex-1 flex flex-col bg-slate-50 min-w-0 h-full">
         {activeThreadId ? (
           <ChatWindow activeThread={activeThread} />
         ) : (
           <EmptyChat />
         )}
       </div>
    </AppShell>
  );
};

export default HomePage;
