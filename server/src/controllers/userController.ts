// /server/src/controllers/userController.ts
import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtHelpers';

// 사용자 등록
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ _id: user.id, username: user.username, token: generateToken(user.id) });
  } catch (error) {
    res.status(500).json({ message: "Unable to register user" });
  }
};

// 사용자 로그인
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ _id: user.id, username: user.username, token: generateToken(user.id) });
  } catch (error) {
    res.status(500).json({ message: "Unable to log in" });
  }
};
