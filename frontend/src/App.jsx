import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import { ChatProvider } from './context/ChatContext';

function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'signup', 'dashboard'

  if (currentView === 'login') return <LoginPage onNavigate={setCurrentView} />;
  if (currentView === 'signup') return <SignupPage onNavigate={setCurrentView} />;

  return (
    <ChatProvider>
      <HomePage />
    </ChatProvider>
  );
}

export default App;
