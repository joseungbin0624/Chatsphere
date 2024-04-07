// /server/src/controllers/messageController.ts
import { Request, Response } from 'express';
import Message from '../models/Message';

// 메시지 저장
export const postMessage = async (req: Request, res: Response) => {
  try {
    const { sender, content } = req.body;
    const message = new Message({ sender, content });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Unable to send message" });
  }
};

// 모든 메시지 조회
export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve messages" });
  }
};
