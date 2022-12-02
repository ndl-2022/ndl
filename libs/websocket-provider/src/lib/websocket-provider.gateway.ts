import { LoggingInterceptor } from '@ndl/logging';
import {
  ClientMessageType,
  JoinRoom,
  PlaceTower,
  ServerMessageType,
  ServerRoom,
  UpgradeTower,
} from '@ndl/shared';
import {
  Inject,
  Injectable,
  PipeTransform,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebsocketProviderGuard } from './websocket-provider.guard';
import { WebsocketProviderService } from './websocket-provider.service';

@Injectable()
export class ParseJSON implements PipeTransform {
  transform(value: string) {
    return value;
    return JSON.parse(value);
  }
}

@UseInterceptors(LoggingInterceptor)
@UseGuards(WebsocketProviderGuard)
@WebSocketGateway(4000, {
  cors: {
    origin: '*',
  },
})
export class WebsocketProviderGateway {
  @WebSocketServer()
  private readonly server!: Server;
  private rooms: {
    handler: WebsocketProviderService;
    room: ServerRoom;
  }[] = [];

  constructor(
    @Inject('WEBSOCKET_HANDLER_FACTORY')
    private handler: {
      create: (
        websocketProviderGateway: WebsocketProviderGateway,
        room: ServerRoom
      ) => WebsocketProviderService;
    }
  ) {}

  @SubscribeMessage(ClientMessageType.JoinRoom)
  joinRoom(
    @MessageBody(new ParseJSON()) joinRoomRequest: JoinRoom,
    @ConnectedSocket() socket: Socket
  ) {
    socket.emit('testing', 'testing');
    const { room: roomCode } = joinRoomRequest;
    this.createRoomIfDontExist(roomCode);
    const room = this.rooms.find((r) => r.room.code === roomCode);
    room?.handler.event<JoinRoom>(
      ClientMessageType.JoinRoom,
      socket,
      joinRoomRequest
    );
  }

  @SubscribeMessage(ClientMessageType.LeaveRoom)
  leaveRoom(@ConnectedSocket() socket: Socket) {
    this.sendToHandler<undefined>(ClientMessageType.LeaveRoom, socket);
  }

  @SubscribeMessage(ClientMessageType.Pause)
  pause(@ConnectedSocket() socket: Socket) {
    this.sendToHandler<undefined>(ClientMessageType.Pause, socket);
  }

  @SubscribeMessage(ClientMessageType.PlaceTower)
  placeTower(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: PlaceTower
  ) {
    this.sendToHandler<PlaceTower>(ClientMessageType.PlaceTower, socket, data);
  }

  @SubscribeMessage(ClientMessageType.Ready)
  ready(@ConnectedSocket() socket: Socket) {
    this.sendToHandler<undefined>(ClientMessageType.Ready, socket);
  }

  @SubscribeMessage(ClientMessageType.UpgradeTower)
  upgradeTower(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: UpgradeTower
  ) {
    this.sendToHandler<UpgradeTower>(
      ClientMessageType.UpgradeTower,
      socket,
      data
    );
  }

  sendToRoom(roomCode: string, message: ServerMessageType, data: unknown) {
    this.server.to(roomCode).emit(message, data);
  }

  sendToHandler<T>(messageType: ClientMessageType, socket: Socket, data?: T) {
    const room = this.findRoomFromUser(socket);
    room?.handler.event<T>(messageType, socket, data);
  }

  createRoomIfDontExist(roomCode: string) {
    if (this.rooms.find((r) => r.room.code === roomCode)) {
      return;
    }
    const room: ServerRoom = {
      code: roomCode,
      users: [],
    };
    const handler = this.handler.create(this, room);
    this.rooms.push({ handler, room });
  }

  findRoom(roomCode: string) {
    return this.rooms.find((r) => r.room.code === roomCode);
  }

  findUser(socket: Socket) {
    const room = this.findRoom(socket.rooms[0]);
    return room?.room.users.find((u) => u.username === socket.id);
  }

  findRoomFromUser(socket: Socket) {
    return this.findRoom(socket.rooms[0]);
  }
}
