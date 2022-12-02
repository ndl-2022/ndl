import { Socket } from 'socket.io';
export interface ServerRoom {
  code: string;
  users: { username: string; socket: Socket }[];
}
