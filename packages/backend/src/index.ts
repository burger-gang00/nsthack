import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { BundlerService } from './services/bundler.js';
import { AIAgent } from './services/aiAgent.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

const bundler = new BundlerService();
const aiAgents = new Map<string, AIAgent>(); // One agent per socket connection

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Create AI agent for this connection
  const aiAgent = new AIAgent();
  aiAgents.set(socket.id, aiAgent);

  socket.on('code:update', async ({ code }) => {
    try {
      console.log('Bundling code...');
      const bundledCode = await bundler.bundle(code);
      socket.emit('bundle:ready', { code: bundledCode });
      socket.emit('console:log', { 
        type: 'info', 
        message: 'Bundle compiled successfully' 
      });
    } catch (error: any) {
      console.error('Bundle error:', error);
      socket.emit('bundle:ready', { 
        error: error.message || 'Failed to bundle code' 
      });
      socket.emit('console:log', { 
        type: 'error', 
        message: error.message || 'Bundle failed' 
      });
    }
  });

  // AI Agent endpoints
  socket.on('ai:chat', async ({ message, context }) => {
    try {
      const agent = aiAgents.get(socket.id);
      if (!agent) {
        socket.emit('ai:response', { error: 'AI agent not initialized' });
        return;
      }

      const response = await agent.chat(message, context);
      socket.emit('ai:response', { message: response });
    } catch (error: any) {
      console.error('AI chat error:', error);
      socket.emit('ai:response', { error: error.message });
    }
  });

  socket.on('ai:generate', async ({ description, type }) => {
    try {
      const agent = aiAgents.get(socket.id);
      if (!agent) {
        socket.emit('ai:generated', { error: 'AI agent not initialized' });
        return;
      }

      const code = await agent.generateCode(description, type);
      socket.emit('ai:generated', { code });
    } catch (error: any) {
      console.error('AI generate error:', error);
      socket.emit('ai:generated', { error: error.message });
    }
  });

  socket.on('ai:explain', async ({ code }) => {
    try {
      const agent = aiAgents.get(socket.id);
      if (!agent) {
        socket.emit('ai:explained', { error: 'AI agent not initialized' });
        return;
      }

      const explanation = await agent.explainCode(code);
      socket.emit('ai:explained', { explanation });
    } catch (error: any) {
      console.error('AI explain error:', error);
      socket.emit('ai:explained', { error: error.message });
    }
  });

  socket.on('ai:debug', async ({ code, error }) => {
    try {
      const agent = aiAgents.get(socket.id);
      if (!agent) {
        socket.emit('ai:debugged', { error: 'AI agent not initialized' });
        return;
      }

      const solution = await agent.debugCode(code, error);
      socket.emit('ai:debugged', { solution });
    } catch (error: any) {
      console.error('AI debug error:', error);
      socket.emit('ai:debugged', { error: error.message });
    }
  });

  socket.on('ai:improve', async ({ code }) => {
    try {
      const agent = aiAgents.get(socket.id);
      if (!agent) {
        socket.emit('ai:improved', { error: 'AI agent not initialized' });
        return;
      }

      const improvements = await agent.improveCode(code);
      socket.emit('ai:improved', { improvements });
    } catch (error: any) {
      console.error('AI improve error:', error);
      socket.emit('ai:improved', { error: error.message });
    }
  });

  socket.on('ai:test', async ({ code }) => {
    try {
      const agent = aiAgents.get(socket.id);
      if (!agent) {
        socket.emit('ai:tested', { error: 'AI agent not initialized' });
        return;
      }

      const tests = await agent.generateTests(code);
      socket.emit('ai:tested', { tests });
    } catch (error: any) {
      console.error('AI test error:', error);
      socket.emit('ai:tested', { error: error.message });
    }
  });

  socket.on('ai:refactor', async ({ code }) => {
    try {
      const agent = aiAgents.get(socket.id);
      if (!agent) {
        socket.emit('ai:refactored', { error: 'AI agent not initialized' });
        return;
      }

      const suggestions = await agent.suggestRefactoring(code);
      socket.emit('ai:refactored', { suggestions });
    } catch (error: any) {
      console.error('AI refactor error:', error);
      socket.emit('ai:refactored', { error: error.message });
    }
  });

  socket.on('ai:clear', () => {
    const agent = aiAgents.get(socket.id);
    if (agent) {
      agent.clearHistory();
      socket.emit('ai:cleared', { success: true });
    }
  });

  // Collaboration endpoints
  socket.on('collaboration:join', ({ roomId, userName, color }) => {
    socket.join(roomId);
    const user = {
      id: socket.id,
      name: userName,
      color,
    };
    
    // Notify others in room
    socket.to(roomId).emit('collaboration:user-joined', user);
    
    // Send existing users to new user
    io.in(roomId).fetchSockets().then((sockets) => {
      const users = sockets.map((s: any) => ({
        id: s.id,
        name: s.data?.userName || 'Anonymous',
        color: s.data?.color || '#4ECDC4',
      }));
      socket.emit('collaboration:users', users);
    });
    
    socket.data = { userName, color, roomId };
  });

  socket.on('collaboration:leave', ({ roomId }) => {
    socket.leave(roomId);
    socket.to(roomId).emit('collaboration:user-left', {
      userId: socket.id,
      userName: socket.data?.userName || 'Anonymous',
    });
  });

  socket.on('collaboration:chat', ({ roomId, message }) => {
    const chatMessage = {
      id: Date.now().toString(),
      userId: socket.id,
      userName: socket.data?.userName || 'Anonymous',
      message,
      timestamp: Date.now(),
    };
    io.in(roomId).emit('collaboration:chat-message', chatMessage);
  });

  socket.on('collaboration:code-change', ({ roomId, fileId, content }) => {
    socket.to(roomId).emit('collaboration:code-updated', { fileId, content });
  });

  socket.on('collaboration:cursor', ({ roomId, cursor }) => {
    socket.to(roomId).emit('collaboration:cursor-update', {
      userId: socket.id,
      cursor,
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    aiAgents.delete(socket.id);
    
    // Notify room members
    if (socket.data?.roomId) {
      socket.to(socket.data.roomId).emit('collaboration:user-left', {
        userId: socket.id,
        userName: socket.data.userName || 'Anonymous',
      });
    }
  });
});

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
