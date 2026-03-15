import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  console.log('Seeding database for End-to-End test...');

  try {
    // 1. Create a test User
    const user = await prisma.user.create({
      data: {
        email: 'testuser@example.com',
        name: 'Test Setup User'
      }
    });
    console.log(`Created User: ${user.id}`);

    // 2. Create a Telegram Platform Connection linked to this user
    // We will use a dummy Telegram ID for testing: '123456789'
    const connection = await prisma.platformConnection.create({
      data: {
        userId: user.id,
        platform: 'telegram',
        identifier: '123456789', // This must match the sender ID in our mock webhook
        isActive: true
      }
    });
    console.log(`Created PlatformConnection: ${connection.id}`);

    // 3. Create an initial Thread for this user to ensure they have an inbox
    const thread = await prisma.thread.create({
      data: {
        userId: user.id,
        title: 'Live Telegram Feed'
      }
    });
    console.log(`Created initial Thread: ${thread.id}`);

    console.log('\nSeeding Complete! Database is ready for webhook simulation.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
