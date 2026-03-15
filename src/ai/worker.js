import prisma from '../config/db.js';
import { classifyMessageIntent, summarizeThread } from './aiService.js';

// A simple worker that polls for unclassified messages.
// In a highly-scaled production app, we would use Redis Queues (e.g. BullMQ).

export const startAiWorker = () => {
  console.log('AI Worker started (Mock Mode pending API key)');
  
  setInterval(async () => {
    try {
      // 1. Find unclassified messages
      const unclassified = await prisma.message.findMany({
        where: { aiClassification: null, isIncoming: true },
        take: 10
      });

      for (const msg of unclassified) {
        // Classify Intents
        const intent = await classifyMessageIntent(msg.content);
        
        await prisma.message.update({
          where: { id: msg.id },
          data: { aiClassification: intent }
        });

        console.log(`Classified Message ${msg.id} as ${intent}`);

        // 2. Update Thread Summary
        // Grab last 5 messages in thread
        const threadMessages = await prisma.message.findMany({
          where: { threadId: msg.threadId },
          orderBy: { createdAt: 'desc' },
          take: 5
        });

        // summarizeThread expects chronologically ordered messages
        const summary = await summarizeThread(threadMessages.reverse());

        if (summary) {
          await prisma.thread.update({
            where: { id: msg.threadId },
            data: { aiSummary: summary }
          });
          console.log(`Updated Thread Summary for ${msg.threadId}`);
        }
      }

    } catch (error) {
      console.error('AI Worker Error:', error);
    }
  }, 10000); // Run every 10 seconds
};
