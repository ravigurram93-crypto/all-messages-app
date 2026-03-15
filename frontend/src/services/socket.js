import { io } from 'socket.io-client';

// In development, the Vite proxy might not handle WebSockets perfectly,
// so we'll connect directly to the backend port (8001).
// You can use environment variables for production.
const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

export const socket = io(SOCKET_URL, {
  autoConnect: true,
});

socket.on('connect', () => {
  console.log('Connected to real-time sync via WebSockets');
});

socket.on('disconnect', () => {
  console.log('Disconnected from real-time sync server');
});
