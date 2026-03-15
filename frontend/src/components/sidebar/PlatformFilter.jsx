import React from 'react';

const platforms = [
  { id: 'all', label: 'All' },
  { id: 'email', label: 'Email' },
  { id: 'telegram', label: 'Telegram' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'slack', label: 'Slack' },
];

const PlatformFilter = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-none border-b border-gray-100 bg-white">
      {platforms.map(platform => (
        <button
          key={platform.id}
          onClick={() => onFilterChange(platform.id)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            activeFilter === platform.id
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {platform.label}
        </button>
      ))}
    </div>
  );
};

export default PlatformFilter;
