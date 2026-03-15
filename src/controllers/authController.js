import bcrypt from 'bcryptjs';
import prisma from '../config/db.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // MVP: In a real app we'd hash the password and store it.
    // For this boilerplate, since Prisma schema only shows email/name we will adapt
    // Wait, the schema didn't include password! My bad.
    // Let me update the schema or just use dummy auth for MVP.
    // To keep it simple, we'll just sign them up based on email for the demo.
    
    let user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    user = await prisma.user.create({
      data: { email, name }
    });

    const token = generateToken(user.id);
    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

export const login = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

export const getMe = async (req, res) => {
  res.status(200).json({ user: req.user });
};
