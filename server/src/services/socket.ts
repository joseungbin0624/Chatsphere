// E:\project\Chatsphere\server\src\services\socket.ts
import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

const setupSocket = (server: HttpServer): void => {
    const io = new Server(server, {
        cors: {
            origin: "*", // 클라이언트 애플리케이션의 호스트를 적절하게 설정하세요
            methods: ["GET", "POST"],
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected');

        // 메시지 받기
        socket.on('sendMessage', (message: any) => { // 여기서 `any` 대신 더 구체적인 타입을 사용할 수 있습니다.
            console.log('Received message:', message);

            // 모든 클라이언트에 메시지 방송
            io.emit('message', message);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

export default setupSocket;
