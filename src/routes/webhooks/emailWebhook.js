import express from 'express';
import prisma from '../../config/db.js';

const router = express.Router();

// Email Webhook Endpoint (e.g. SendGrid Inbound Parse or similar service)
router.post('/email', async (req, res) => {
  try {
    // Acknowledge receipt
    res.status(200).send('OK');

    const { from, to, subject, text, messageId } = req.body;

    if (!from || !to) return;

    // 1. Find the PlatformConnection for this Email
    // The 'to' address would be the user's provisioned email address for this app.
    // For MVP, we assume 'from' is the contact and 'to' is tied to our user.
    const connection = await prisma.platformConnection.findFirst({
      where: { platform: 'email', identifier: to }
    });

    if (!connection) {
      console.log(`Unlinked Email message to ${to}`);
      return;
    }

    // 2. Find or Create Thread
    // We group by the 'subject' or the 'from' email address
    let thread = await prisma.thread.findFirst({
      where: { userId: connection.userId, title: subject }
    });

    if (!thread) {
      thread = await prisma.thread.create({
        data: { userId: connection.userId, title: subject || `Email from ${from}` }
      });
    }

    // 3. Save Message
    const newMessage = await prisma.message.create({
      data: {
        threadId: thread.id,
        connectionId: connection.id,
        originalId: messageId || `email_${Date.now()}`,
        senderIdentifier: from,
        content: text || '(No Content)',
        isIncoming: true,
      }
    });

    console.log(`Saved Email message to thread ${thread.id}`);
    
    // Broadcast live over WebSockets
    const io = req.app.get('io');
    if (io) {
      io.emit('newMessage', {
        id: newMessage.id,
        threadId: thread.id,
        platform: 'email',
        senderName: newMessage.senderIdentifier,
        content: newMessage.content,
        isIncoming: true,
        createdAt: newMessage.createdAt
      });
    }

    // 4. (Future) Trigger AI processing

  } catch (error) {
    console.error('Error processing Email webhook:', error);
  }
});

export default router;
