import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    try {
      await redisClient.connect();
    } catch (error) {
      console.warn('⚠️  Redis connection failed. Running without caching/rate-limiting:', error.message);
    }
  }
};

export default redisClient;
