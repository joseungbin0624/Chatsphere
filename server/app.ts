import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import http from 'http';
import routes from './src/routes/index'; // 라우트 설정을 임포트합니다.
import setupSocket from './src/services/socket'; // setupSocket 함수를 임포트합니다.

const app = express();
// 포트 설정은 여기서 하지 않습니다.

// 기본 미들웨어 설정
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// API 라우트 설정
app.use('/api', routes);

// 서버 인스턴스 생성
const server = http.createServer(app);

// setupSocket 함수를 호출하여 Socket.IO 설정을 적용합니다.
setupSocket(server);

// 여기서는 서버 리스닝을 시작하지 않습니다.

export { app, server };
