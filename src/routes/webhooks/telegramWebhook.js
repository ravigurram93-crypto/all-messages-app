import express from 'express';
import prisma from '../../config/db.js';

const router = express.Router();

// Telegram Webhook Endpoint
router.post('/telegram', async (req, res) => {
  try {
    const { message } = req.body;
    
    // Acknowledge the webhook quickly
    res.status(200).send('OK');

    if (!message) return;

    const telegramUserId = message.from.id.toString();
    const text = message.text || '';
    const messageId = message.message_id.toString();

    // 1. Find the PlatformConnection for this Telegram user
    // Note: In MVP, we might need a way to link Telegram IDs to our Users.
    // For now, if a connection isn't found, we can't save it to a user's inbox.
    // Real implementation requires an authorization flow (e.g. sending a start command with a token).
    
    const connection = await prisma.platformConnection.findFirst({
      where: { platform: 'telegram', identifier: telegramUserId }
    });

    if (!connection) {
      console.log(`Unlinked Telegram message from ${telegramUserId}`);
      return;
    }

    // 2. Find or Create Thread
    // For MVP, one thread per contact is sufficient.
    let thread = await prisma.thread.findFirst({
      where: { userId: connection.userId } // Simplified: user has one global Telegram thread
    });

    if (!thread) {
      thread = await prisma.thread.create({
        data: { userId: connection.userId, title: `Telegram Chat` }
      });
    }

    // 3. Save Message to Database
    const newMessage = await prisma.message.create({
      data: {
        threadId: thread.id,
        connectionId: connection.id,
        originalId: messageId,
        senderName: message.from.first_name,
        senderIdentifier: telegramUserId,
        content: text,
        isIncoming: true,
      }
    });

    console.log(`Saved Telegram message to thread ${thread.id}`);
    
    // Broadcast live over WebSockets
    const io = req.app.get('io');
    if (io) {
      io.emit('newMessage', {
        id: newMessage.id,
        threadId: thread.id,
        platform: 'telegram',
        senderName: newMessage.senderName,
        content: text,
        isIncoming: true,
        createdAt: newMessage.createdAt
      });
    }
    
    // 4. (Future) Trigger AI processing queue here

  } catch (error) {
    console.error('Error processing Telegram webhook:', error);
  }
});

export default router;
