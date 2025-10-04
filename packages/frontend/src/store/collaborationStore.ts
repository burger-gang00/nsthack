import { create } from 'zustand';
import { Socket } from 'socket.io-client';

interface User {
  id: string;
  name: string;
  color: string;
  cursor?: { line: number; column: number };
  activeFile?: string;
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: number;
}

interface CollaborationState {
  roomId: string | null;
  users: User[];
  chatMessages: ChatMessage[];
  isCollaborating: boolean;
  
  joinRoom: (roomId: string, socket: Socket) => void;
  leaveRoom: (socket: Socket) => void;
  updateUserCursor: (userId: string, cursor: { line: number; column: number }) => void;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
  sendChatMessage: (message: string, socket: Socket) => void;
  addChatMessage: (message: ChatMessage) => void;
}

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];

export const useCollaborationStore = create<CollaborationState>((set, get) => ({
  roomId: null,
  users: [],
  chatMessages: [],
  isCollaborating: false,

  joinRoom: (roomId, socket) => {
    const userName = prompt('Enter your name:') || 'Anonymous';
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    socket.emit('collaboration:join', { roomId, userName, color });
    set({ roomId, isCollaborating: true });
  },

  leaveRoom: (socket) => {
    const { roomId } = get();
    if (roomId) {
      socket.emit('collaboration:leave', { roomId });
      set({ roomId: null, users: [], isCollaborating: false });
    }
  },

  updateUserCursor: (userId, cursor) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, cursor } : user
      ),
    }));
  },

  addUser: (user) => {
    set((state) => ({
      users: [...state.users.filter((u) => u.id !== user.id), user],
    }));
  },

  removeUser: (userId) => {
    set((state) => ({
      users: state.users.filter((u) => u.id !== userId),
    }));
  },

  sendChatMessage: (message, socket) => {
    const { roomId } = get();
    if (roomId && message.trim()) {
      socket.emit('collaboration:chat', { roomId, message });
    }
  },

  addChatMessage: (message) => {
    set((state) => ({
      chatMessages: [...state.chatMessages, message],
    }));
  },
}));
