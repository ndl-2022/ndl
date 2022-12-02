import {
  Attack,
  EnemiesEvent,
  GameState,
  NewEnemyInfo,
  ServerMessageType,
  Tile,
} from '@ndl/shared';
import { Socket } from 'socket.io-client';

export function onEnemiesUpdate(
  socket: Socket,
  callback: (payload: EnemiesEvent) => void
) {
  socket.on(ServerMessageType.Enemies, callback);
}

export function onNewEnemyInfo(
  socket: Socket,
  callback: (payload: NewEnemyInfo) => void
) {
  socket.on(ServerMessageType.NewEnemyInfo, callback);
}

export function onMapStateUpdate(
  socket: Socket,
  callback: (payload: Tile[]) => void
) {
  socket.on(ServerMessageType.MapState, callback);
}

export function onGameStateUpdate(
  socket: Socket,
  callback: (payload: GameState) => void
) {
  socket.on(ServerMessageType.GameState, callback);
}

export function onAttack(socket: Socket, callback: (payload: Attack) => void) {
  socket.on(ServerMessageType.Attack, callback);
}

export function onPause(socket: Socket, callback: () => void) {
  socket.on(ServerMessageType.Pause, callback);
}
