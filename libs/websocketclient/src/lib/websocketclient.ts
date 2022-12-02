import { io } from 'socket.io-client';

export function connect(url: string) {
  const socket = io(url, {
    reconnectionDelayMax: 10000,
  });
  return socket;
}
