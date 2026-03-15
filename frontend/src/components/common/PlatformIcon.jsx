import React from 'react';

const icons = {
  email: '📧',
  telegram: '✈️',
  whatsapp: '💬',
  slack: '💼',
  sms: '📱',
  instagram: '📸',
  twitter: '🐦',
  facebook: '📘'
};

const PlatformIcon = ({ platform, className = "text-base" }) => {
  return (
    <span className={className}>
      {icons[platform] || '💬'}
    </span>
  );
};

export default PlatformIcon;
