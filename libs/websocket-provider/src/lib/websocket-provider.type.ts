import { User } from '@ndl/shared';

export interface Room {
  roomCode: string;
  users: User[];
}
