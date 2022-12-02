import {
  ClientMessageType,
  JoinRoom,
  PlaceTower,
  UpgradeTower,
} from '@ndl/shared';
import { Socket } from 'socket.io-client';

export function sendPlaceTower(socket: Socket, request: PlaceTower) {
  socket.emit(ClientMessageType.PlaceTower, request);
}

export function sendUpgradeTower(socket: Socket, request: UpgradeTower) {
  socket.emit(ClientMessageType.UpgradeTower, request);
}

export function sendJoinRoom(socket: Socket, request: JoinRoom) {
  socket.emit(ClientMessageType.JoinRoom, request);
}

export function sendLeaveRoom(socket: Socket) {
  socket.emit(ClientMessageType.LeaveRoom, {});
}

export function sendReady(socket: Socket) {
  socket.emit(ClientMessageType.Ready, {});
}

export function sendPause(socket: Socket) {
  socket.emit(ClientMessageType.Pause, {});
}
