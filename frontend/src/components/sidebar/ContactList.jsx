import React from 'react';
import ContactRow from './ContactRow';

const ContactList = ({ threads, activeId, onSelect }) => {
  if (!threads?.length) {
    return (
      <div className="p-8 text-center text-slate-500 text-sm">
        No conversations found.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {threads.map((thread) => (
        <ContactRow 
          key={thread.id} 
          thread={thread} 
          isActive={activeId === thread.id}
          onClick={() => onSelect(thread.id)}
        />
      ))}
    </div>
  );
};

export default ContactList;
