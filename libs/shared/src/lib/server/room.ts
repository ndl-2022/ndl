import { Socket } from 'socket.io';

export interface CreateRoomResponse {
  roomCode: string;
}

export interface ServerRoom {
  code: string;
  users: { username: string; socket: Socket }[];
}
