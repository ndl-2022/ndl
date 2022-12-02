import { EnemyConsumerService } from '@ndl/enemy-consumer';
import {
  ClientMessageType,
  GameState,
  JoinRoom,
  ServerMessageType,
  ServerRoom,
  Tile,
  TileType,
  User,
  Map,
  UserRole,
  Enemy,
  EnemyInstance,
} from '@ndl/shared';
import { NotImplementedException } from '@nestjs/common';
import { Socket } from 'socket.io';
import * as Timer from 'timer-machine';
import { WebsocketProviderGateway } from './websocket-provider.gateway';

export type UserInstance = User & { ready: boolean };
export class GameData {
  users: UserInstance[] = [];
  gameState: GameState = {
    gold: 200,
    health: 100,
    wave: 0,
    started: false,
    paused: true,
  };
  map: Map = map;
  timer = new Timer(false);
  enemies: EnemyInstance[] = [];
  interval?: NodeJS.Timeout;
}

const p = (x: number, y: number): Tile => {
  return { x, y, type: TileType.Path };
};
const m = (x: number, y: number): Tile => {
  return { x, y, type: TileType.Male };
};
const f = (x: number, y: number): Tile => {
  return { x, y, type: TileType.Female };
};

const map = [
  [
    f(0, 0),
    f(0, 1),
    f(0, 2),
    f(0, 3),
    f(0, 4),
    f(0, 5),
    f(0, 6),
    f(0, 7),
    f(0, 8),
    p(0, 9),
    m(0, 10),
    m(0, 11),
    m(0, 12),
    m(0, 13),
    m(0, 14),
    m(0, 15),
  ],
  [
    f(1, 0),
    f(1, 1),
    f(1, 2),
    f(1, 3),
    f(1, 4),
    f(1, 5),
    f(1, 6),
    f(1, 7),
    f(1, 8),
    p(1, 9),
    m(1, 10),
    m(1, 11),
    m(1, 12),
    m(1, 13),
    m(1, 14),
    m(1, 15),
  ],
  [
    f(2, 0),
    f(2, 1),
    f(2, 2),
    f(2, 3),
    f(2, 4),
    f(2, 5),
    f(2, 6),
    f(2, 7),
    p(2, 8),
    p(2, 9),
    m(2, 10),
    m(2, 11),
    m(2, 12),
    m(2, 13),
    m(2, 14),
    m(2, 15),
  ],
  [
    f(3, 0),
    f(3, 1),
    f(3, 2),
    f(3, 3),
    f(3, 4),
    f(3, 5),
    f(3, 6),
    f(3, 7),
    p(3, 8),
    m(3, 9),
    m(3, 10),
    m(3, 11),
    m(3, 12),
    m(3, 13),
    m(3, 14),
    m(3, 15),
  ],
  [
    f(4, 0),
    f(4, 1),
    f(4, 2),
    f(4, 3),
    f(4, 4),
    f(4, 5),
    f(4, 6),
    f(4, 7),
    p(4, 8),
    m(4, 9),
    m(4, 10),
    m(4, 11),
    m(4, 12),
    m(4, 13),
    m(4, 14),
    m(4, 15),
  ],
  [
    f(5, 0),
    f(5, 1),
    f(5, 2),
    f(5, 3),
    f(5, 4),
    f(5, 5),
    f(5, 6),
    f(5, 7),
    p(5, 8),
    m(5, 9),
    m(5, 10),
    m(5, 11),
    m(5, 12),
    m(5, 13),
    m(5, 14),
    m(5, 15),
  ],
  [
    f(6, 0),
    f(6, 1),
    f(6, 2),
    f(6, 3),
    f(6, 4),
    f(6, 5),
    f(6, 6),
    f(6, 7),
    p(6, 8),
    m(6, 9),
    m(6, 10),
    m(6, 11),
    m(6, 12),
    m(6, 13),
    m(6, 14),
    m(6, 15),
  ],
  [
    f(7, 0),
    f(7, 1),
    f(7, 2),
    f(7, 3),
    f(7, 4),
    f(7, 5),
    f(7, 6),
    f(7, 7),
    p(7, 8),
    m(7, 9),
    m(7, 10),
    m(7, 11),
    m(7, 12),
    m(7, 13),
    m(7, 14),
    m(7, 15),
  ],
  [
    f(8, 0),
    f(8, 1),
    f(8, 2),
    f(8, 3),
    f(8, 4),
    f(8, 5),
    f(8, 6),
    f(8, 7),
    p(8, 8),
    m(8, 9),
    m(8, 10),
    m(8, 11),
    m(8, 12),
    m(8, 13),
    m(8, 14),
    m(8, 15),
  ],
  [
    f(9, 0),
    f(9, 1),
    f(9, 2),
    f(9, 3),
    f(9, 4),
    f(9, 5),
    f(9, 6),
    f(9, 7),
    p(9, 8),
    m(9, 9),
    m(9, 10),
    m(9, 11),
    m(9, 12),
    m(9, 13),
    m(9, 14),
    m(9, 15),
  ],
  [
    f(10, 0),
    f(10, 1),
    f(10, 2),
    f(10, 3),
    f(10, 4),
    p(10, 5),
    p(10, 6),
    p(10, 7),
    p(10, 8),
    m(10, 9),
    m(10, 10),
    m(10, 11),
    m(10, 12),
    m(10, 13),
    m(10, 14),
    m(10, 15),
  ],
  [
    f(11, 0),
    f(11, 1),
    f(11, 2),
    f(11, 3),
    f(11, 4),
    p(11, 5),
    m(11, 6),
    m(11, 7),
    m(11, 8),
    m(11, 9),
    m(11, 10),
    m(11, 11),
    m(11, 12),
    m(11, 13),
    m(11, 14),
    m(11, 15),
  ],
  [
    f(12, 0),
    f(12, 1),
    f(12, 2),
    f(12, 3),
    f(12, 4),
    p(12, 5),
    m(12, 6),
    m(12, 7),
    m(12, 8),
    m(12, 9),
    m(12, 10),
    m(12, 11),
    m(12, 12),
    m(12, 13),
    m(12, 14),
    m(12, 15),
  ],
  [
    f(13, 0),
    f(13, 1),
    f(13, 2),
    f(13, 3),
    f(13, 4),
    p(13, 5),
    m(13, 6),
    m(13, 7),
    m(13, 8),
    m(13, 9),
    m(13, 10),
    m(13, 11),
    m(13, 12),
    m(13, 13),
    m(13, 14),
    m(13, 15),
  ],
  [
    f(14, 0),
    f(14, 1),
    f(14, 2),
    f(14, 3),
    f(14, 4),
    p(14, 5),
    m(14, 6),
    m(14, 7),
    m(14, 8),
    m(14, 9),
    m(14, 10),
    m(14, 11),
    m(14, 12),
    m(14, 13),
    m(14, 14),
    m(14, 15),
  ],
  [
    f(15, 0),
    f(15, 1),
    f(15, 2),
    f(15, 3),
    f(15, 4),
    p(15, 5),
    m(15, 6),
    m(15, 7),
    m(15, 8),
    m(15, 9),
    m(15, 10),
    m(15, 11),
    m(15, 12),
    m(15, 13),
    m(15, 14),
    m(15, 15),
  ],
  [
    f(16, 0),
    f(16, 1),
    f(16, 2),
    f(16, 3),
    f(16, 4),
    p(16, 5),
    p(16, 6),
    p(16, 7),
    p(16, 8),
    p(16, 9),
    p(16, 10),
    p(16, 11),
    p(16, 12),
    p(16, 13),
    m(16, 14),
    m(16, 15),
  ],
  [
    f(16, 0),
    f(16, 1),
    f(16, 2),
    f(16, 3),
    f(16, 4),
    f(16, 5),
    f(16, 6),
    f(16, 7),
    f(16, 8),
    f(16, 9),
    f(16, 10),
    f(16, 11),
    f(16, 12),
    p(16, 13),
    m(16, 14),
    m(16, 15),
  ],
  [
    f(17, 0),
    f(17, 1),
    f(17, 2),
    f(17, 3),
    f(17, 4),
    f(17, 5),
    f(17, 6),
    f(17, 7),
    f(17, 8),
    f(17, 9),
    f(17, 10),
    f(17, 11),
    f(17, 12),
    p(17, 13),
    m(17, 14),
    m(17, 15),
  ],
  [
    f(18, 0),
    f(18, 1),
    f(18, 2),
    f(18, 3),
    f(18, 4),
    f(18, 5),
    f(18, 6),
    f(18, 7),
    f(18, 8),
    p(18, 9),
    p(18, 10),
    p(18, 11),
    p(18, 12),
    p(18, 13),
    m(18, 14),
    m(18, 15),
  ],
  [
    f(18, 0),
    f(18, 1),
    f(18, 2),
    f(18, 3),
    f(18, 4),
    f(18, 5),
    f(18, 6),
    f(18, 7),
    f(18, 8),
    p(18, 9),
    m(18, 10),
    m(18, 11),
    m(18, 12),
    m(18, 13),
    m(18, 14),
    m(18, 15),
  ],
  [
    f(19, 0),
    f(19, 1),
    f(19, 2),
    f(19, 3),
    f(19, 4),
    f(19, 5),
    f(19, 6),
    f(19, 7),
    f(19, 8),
    p(19, 9),
    m(19, 10),
    m(19, 11),
    m(19, 12),
    m(19, 13),
    m(19, 14),
    m(19, 15),
  ],
  [
    f(20, 0),
    f(20, 1),
    f(20, 2),
    f(20, 3),
    f(20, 4),
    f(20, 5),
    f(20, 6),
    f(20, 7),
    f(20, 8),
    p(20, 9),
    m(20, 10),
    m(20, 11),
    m(20, 12),
    m(20, 13),
    m(20, 14),
    m(20, 15),
  ],
  [
    f(21, 0),
    f(21, 1),
    f(21, 2),
    f(21, 3),
    f(21, 4),
    f(21, 5),
    f(21, 6),
    f(21, 7),
    f(21, 8),
    p(21, 9),
    m(21, 10),
    m(21, 11),
    m(21, 12),
    m(21, 13),
    m(21, 14),
    m(21, 15),
  ],
  [
    f(22, 0),
    f(22, 1),
    f(22, 2),
    f(22, 3),
    f(22, 4),
    f(22, 5),
    f(22, 6),
    f(22, 7),
    f(22, 8),
    p(22, 9),
    m(22, 10),
    m(22, 11),
    m(22, 12),
    m(22, 13),
    m(22, 14),
    m(22, 15),
  ],
  [
    f(23, 0),
    f(23, 1),
    f(23, 2),
    f(23, 3),
    f(23, 4),
    f(23, 5),
    f(23, 6),
    f(23, 7),
    f(23, 8),
    p(23, 9),
    m(23, 10),
    m(23, 11),
    m(23, 12),
    m(23, 13),
    m(23, 14),
    m(23, 15),
  ],
  [
    f(24, 0),
    f(24, 1),
    f(24, 2),
    f(24, 3),
    f(24, 4),
    f(24, 5),
    f(24, 6),
    f(24, 7),
    f(24, 8),
    p(24, 9),
    m(24, 10),
    m(24, 11),
    m(24, 12),
    m(24, 13),
    m(24, 14),
    m(24, 15),
  ],
  [
    f(25, 0),
    f(25, 1),
    f(25, 2),
    f(25, 3),
    f(25, 4),
    f(25, 5),
    f(25, 6),
    f(25, 7),
    f(25, 8),
    p(25, 9),
    m(25, 10),
    m(25, 11),
    m(25, 12),
    m(25, 13),
    m(25, 14),
    m(25, 15),
  ],
  [
    f(26, 0),
    f(26, 1),
    f(26, 2),
    f(26, 3),
    f(26, 4),
    f(26, 5),
    f(26, 6),
    f(26, 7),
    f(26, 8),
    p(26, 9),
    m(26, 10),
    m(26, 11),
    m(26, 12),
    m(26, 13),
    m(26, 14),
    m(26, 15),
  ],
  [
    f(27, 0),
    f(27, 1),
    f(27, 2),
    f(27, 3),
    f(27, 4),
    p(27, 5),
    p(27, 6),
    p(27, 7),
    p(27, 8),
    p(27, 9),
    m(27, 10),
    m(27, 11),
    m(27, 12),
    m(27, 13),
    m(27, 14),
    m(27, 15),
  ],
  [
    f(28, 0),
    f(28, 1),
    f(28, 2),
    f(28, 3),
    f(28, 4),
    p(28, 5),
    m(28, 6),
    m(28, 7),
    m(28, 8),
    m(28, 9),
    m(28, 10),
    m(28, 11),
    m(28, 12),
    m(28, 13),
    m(28, 14),
    m(28, 15),
  ],
  [
    f(29, 0),
    f(29, 1),
    f(29, 2),
    f(29, 3),
    f(29, 4),
    p(29, 5),
    m(29, 6),
    m(29, 7),
    m(29, 8),
    m(29, 9),
    m(29, 10),
    m(29, 11),
    m(29, 12),
    m(29, 13),
    m(29, 14),
    m(29, 15),
  ],
  [
    f(30, 0),
    f(30, 1),
    f(30, 2),
    f(30, 3),
    f(30, 4),
    p(30, 5),
    m(30, 6),
    m(30, 7),
    m(30, 8),
    m(30, 9),
    m(30, 10),
    m(30, 11),
    m(30, 12),
    m(30, 13),
    m(30, 14),
    m(30, 15),
  ],
  [
    f(31, 0),
    f(31, 1),
    f(31, 2),
    f(31, 3),
    f(31, 4),
    { x: 31, y: 5, type: TileType.Base },
    m(31, 6),
    m(31, 7),
    m(31, 8),
    m(31, 9),
    m(31, 10),
    m(31, 11),
    m(31, 12),
    m(31, 13),
    m(31, 14),
    m(31, 15),
  ],
];

export class WebsocketProviderService {
  private roomCode = '';
  private gameData = new GameData();
  private enemies: Enemy[] = [];
  private deadThisTickEnemies: string[] = [];

  constructor(
    private readonly enemyConsumerService: EnemyConsumerService,
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
        this._placeTower();
        break;
      case ClientMessageType.Ready:
        this._ready(socket);
        break;
      case ClientMessageType.UpgradeTower:
        this._upgradeTower();
        break;
      default:
        throw new NotImplementedException(eventType);
    }
  }

  joinRoom(data: JoinRoom, socket: Socket) {
    const { username } = data;
    this.serverRoom.users.push({ username, socket });
    socket.join(this.roomCode);
    if (this.serverRoom.users.length === 0)
      this.gameData.users.push({
        username,
        ready: false,
        role: UserRole.Female,
      });
    else if (this.serverRoom.users.length === 1)
      this.gameData.users.push({ username, ready: false, role: UserRole.Male });
    this._send(
      ServerMessageType.UserJoined,
      this.gameData.users.map((u) => ({ username: u.username, role: u.role }))
    );
  }

  leaveRoom(_, socket: Socket) {
    const { id } = socket;
    this.serverRoom.users = this.serverRoom.users.filter(
      (user) => user.socket.id !== id
    );

    socket.leave(this.roomCode);
    this._send(
      ServerMessageType.UserLeft,
      this.gameData.users.map((u) => ({ username: u.username, role: u.role }))
    );
  }

  tick() {
    this.deadThisTickEnemies = [];
    this.gameData.enemies = this.gameData.enemies
      .map((enemy) => {
        return this.moveEnemy(enemy);
      })
      .filter((enemy) => enemy);

    this.sendEnemyState();
  }

  baseHit(damage: number) {
    this.gameData.gameState.health -= damage;
    if (this.gameData.gameState.health <= 0) {
      this.pause();
    } else {
      this.sendGameState();
    }
  }

  moveEnemy(enemy: EnemyInstance): EnemyInstance {
    const { x, y } = enemy;
    const type = this.getEnemyType(enemy);
    if (this.gameData.map[x][y].type === TileType.Base) {
      this.baseHit(5);
      this.deadThisTickEnemies.push(enemy.id);
      return;
    }
    const [up, right, down] = [
      this.gameData.map[x][y + 1],
      this.gameData.map[x + 1][y],
      this.gameData.map[x][y - 1],
    ];
    const nextTile = [up, right, down].find(
      (tile) => tile.type === TileType.Path
    );
    const speed = type.speed / 10;

    // Next tile up or down but not quite in the middle of the tile yet
    if ((nextTile === up || nextTile === down) && enemy.x < nextTile.x + 0.25) {
      enemy.x += speed;
    } else if (nextTile === up) {
      enemy.y += speed;
    } else if (nextTile === down) {
      enemy.y -= speed;
    } else {
      enemy.x += speed;
    }
    return enemy;
  }

  getEnemyType(enemy: EnemyInstance): Enemy {
    return this.enemies.find((e) => e.id === enemy.type);
  }

  ready(user: UserInstance) {
    user.ready = true;
    if (this.gameData.users.every((u) => u.ready)) {
      if (this.gameData.gameState.started === false) {
        this.startGame();
      } else {
        this.gameData.gameState.paused = false;
        this.sendGameState();
      }
    }
  }

  async startGame() {
    debugger;
    this.enemies = await this.enemyConsumerService.getEnemies();

    this.gameData.gameState.started = true;
    this.gameData.gameState.paused = false;
    this.gameData.timer.start();
    this.gameData.interval = setInterval(this.tick, 100);

    this.sendGameState();
  }

  pause() {
    this.gameData.timer.stop();
    clearInterval(this.gameData.interval);
    this._send(ServerMessageType.Pause, undefined);
    this.sendGameState();
    this.sendMapState();
  }

  sendGameState() {
    this._send(ServerMessageType.GameState, this.gameData.gameState);
  }

  sendMapState() {
    this._send(ServerMessageType.MapState, { map: this.gameData.map });
  }

  sendEnemyState() {
    this._send(ServerMessageType.Enemies, {
      enemies: this.gameData.enemies,
      deadEnemies: this.deadThisTickEnemies,
    });
  }

  _ready(socket: Socket) {
    this.ready(this._socketToUser(socket));
  }

  _placeTower() {
    throw new NotImplementedException();
  }

  _upgradeTower() {
    throw new NotImplementedException();
  }

  _send(messageType: ServerMessageType, data: unknown) {
    this.websocketProviderGateway.sendToRoom(this.roomCode, messageType, data);
  }

  _socketToUser(socket: Socket): UserInstance {
    const foundUser = this.serverRoom.users.find(
      (user) => user.socket.id === socket.id
    );
    return this.gameData.users.find(
      (user) => user.username === foundUser.username
    );
  }
}
