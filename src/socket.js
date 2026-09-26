import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL, { autoConnect: false });

export const joinAdminRoom = () => {
  if (!socket.connected) socket.connect();
  socket.emit('join_room', { role: 'admin' });
};

export default socket;
