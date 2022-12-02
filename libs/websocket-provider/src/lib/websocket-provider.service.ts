import {
  ClientMessageType,
  JoinRoom,
  ServerMessageType,
  ServerRoom,
} from '@ndl/shared';
import { NotImplementedException } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WebsocketProviderGateway } from './websocket-provider.gateway';

export class WebsocketProviderService {
  private roomCode = '';

  constructor(
    private readonly websocketProviderGateway: WebsocketProviderGateway,
    private readonly serverRoom: ServerRoom
  ) {
    this.roomCode = serverRoom.code;
  }

  public event<T>(eventType: ClientMessageType, socket: Socket, data?: T) {
    switch (eventType) {
      case ClientMessageType.JoinRoom:
        this.joinRoom(data as JoinRoom, socket);
        break;
      case ClientMessageType.LeaveRoom:
        this.leaveRoom(data, socket);
        break;
      case ClientMessageType.Pause:
        this.pause();
        break;
      case ClientMessageType.PlaceTower:
        this.placeTower();
        break;
      case ClientMessageType.Ready:
        this.ready();
        break;
      case ClientMessageType.UpgradeTower:
        this.upgradeTower();
        break;
      default:
        throw new NotImplementedException(eventType);
    }
  }

  joinRoom(data: JoinRoom, socket: Socket) {
    const { username } = data;
    this.serverRoom.users.push({ username, socket });
    socket.join(this.roomCode);
    this.send(
      ServerMessageType.UserJoined,
      this.serverRoom.users.map((u) => u.username)
    );
  }

  leaveRoom(_, socket: Socket) {
    const { id } = socket;
    this.serverRoom.users = this.serverRoom.users.filter(
      (user) => user.socket.id !== id
    );

    socket.leave(this.roomCode);
    this.websocketProviderGateway.sendToRoom(
      this.roomCode,
      ServerMessageType.UserLeft,
      this.serverRoom.users
    );
  }

  pause() {
    this.send(ServerMessageType.Pause, undefined);
  }

  ready() {
    throw new NotImplementedException();
  }

  placeTower() {
    throw new NotImplementedException();
  }

  upgradeTower() {
    throw new NotImplementedException();
  }

  send(messageType: ServerMessageType, data: unknown) {
    this.websocketProviderGateway.sendToRoom(this.roomCode, messageType, data);
  }
}
