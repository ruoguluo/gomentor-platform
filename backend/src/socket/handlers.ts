import { Server as SocketIOServer } from 'socket.io';
import jwt from 'jsonwebtoken';

export const setupSocketHandlers = (io: SocketIOServer) => {
  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication required'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      socket.data.userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.data.userId}`);

    // Join user room for private notifications
    socket.join(`user:${socket.data.userId}`);

    // Join session room
    socket.on('join-session', (sessionId: string) => {
      socket.join(`session:${sessionId}`);
      console.log(`User ${socket.data.userId} joined session ${sessionId}`);
      
      // Notify others in the session
      socket.to(`session:${sessionId}`).emit('user-joined', {
        userId: socket.data.userId,
        timestamp: new Date()
      });
    });

    // Leave session room
    socket.on('leave-session', (sessionId: string) => {
      socket.leave(`session:${sessionId}`);
      console.log(`User ${socket.data.userId} left session ${sessionId}`);
      
      socket.to(`session:${sessionId}`).emit('user-left', {
        userId: socket.data.userId,
        timestamp: new Date()
      });
    });

    // Handle chat messages
    socket.on('send-message', (data: { sessionId: string; content: string }) => {
      const { sessionId, content } = data;
      
      // Broadcast to session room
      io.to(`session:${sessionId}`).emit('new-message', {
        senderId: socket.data.userId,
        content,
        timestamp: new Date()
      });
    });

    // Handle typing indicators
    socket.on('typing', (data: { sessionId: string; isTyping: boolean }) => {
      socket.to(`session:${data.sessionId}`).emit('user-typing', {
        userId: socket.data.userId,
        isTyping: data.isTyping
      });
    });

    // WebRTC signaling
    socket.on('offer', (data: { sessionId: string; offer: any; targetUserId: string }) => {
      io.to(`user:${data.targetUserId}`).emit('offer', {
        senderId: socket.data.userId,
        offer: data.offer
      });
    });

    socket.on('answer', (data: { sessionId: string; answer: any; targetUserId: string }) => {
      io.to(`user:${data.targetUserId}`).emit('answer', {
        senderId: socket.data.userId,
        answer: data.answer
      });
    });

    socket.on('ice-candidate', (data: { sessionId: string; candidate: any; targetUserId: string }) => {
      io.to(`user:${data.targetUserId}`).emit('ice-candidate', {
        senderId: socket.data.userId,
        candidate: data.candidate
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.data.userId}`);
    });
  });
};
