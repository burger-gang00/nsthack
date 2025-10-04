import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { BundlerService } from './services/bundler.js';

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

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

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

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
