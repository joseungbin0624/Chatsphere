// /routes/index.ts
import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/userController';
import { getMessages, postMessage } from '../controllers/messageController';

const router = Router();

// 사용자 인증 라우트
router.post('/register', registerUser);
router.post('/login', loginUser);

// 메시지 관련 라우트
router.get('/messages', getMessages);
router.post('/message', postMessage);

export default router;
