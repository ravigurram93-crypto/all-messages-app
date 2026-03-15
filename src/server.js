/*
 * AI Universal Inbox - Main Server Entry Point
 */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/authRoutes.js';
import telegramWebhook from './routes/webhooks/telegramWebhook.js';
import emailWebhook from './routes/webhooks/emailWebhook.js';
import { connectRedis } from './config/redis.js';

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 8001;

export const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173", 
      "http://localhost:5174", 
      "http://127.0.0.1:5173", 
      "http://127.0.0.1:5174",
      /\.vercel\.app$/
    ],
    methods: ["GET", "POST"]
  }
});
app.set('io', io);

io.on('connection', (socket) => {
  console.log('Client connected to WebSockets:', socket.id);
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/webhooks', telegramWebhook);
app.use('/api/webhooks', emailWebhook);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Universal Inbox API is running' });
});

import { startAiWorker } from './ai/worker.js';

// Start Server
const startServer = async () => {
  try {
    await connectRedis(); // Gracefully fails if Redis isn't running locally
    httpServer.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        startAiWorker(); // Fire off the background AI polling
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Trigger nodemon restart
