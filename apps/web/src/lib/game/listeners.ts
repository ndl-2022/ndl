import { GameState } from './state';
import { onEnemiesUpdate, onMapStateUpdate } from '@ndl/websocketclient';
import { Socket } from 'socket.io-client';

export function addListeners(socket: Socket, state: GameState) {
  onEnemiesUpdate(socket, (enemies) => {
    state.mergeEnemies(enemies.enemies, enemies.deadEnemies);
  });

  onMapStateUpdate(socket, (tiles) => {
    state.mergeTiles(tiles);
  });
}
