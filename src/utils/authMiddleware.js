import { verifyToken } from '../utils/jwt.js';
import prisma from '../config/db.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded || !decoded.id) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }

  const user = await prisma.user.findUnique({ where: { id: decoded.id } });
  
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: User not found' });
  }

  req.user = user;
  next();
};
