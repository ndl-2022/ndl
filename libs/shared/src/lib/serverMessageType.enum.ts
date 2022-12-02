/* Defining the types of messages that can be sent from the server to the client. */
export enum ServerMessageType {
  UserJoined = 'userJoined',
  UserLeft = 'userJoined',
  Enemies = 'enemies', // { enemies: Enemy[], deadEnemies: Enemy[] }
  NewEnemyInfo = 'newEnemyInfo', // { name: string, description: string, wikiLink: string }
  Towers = 'towers',
  GameState = 'gameState', // { gold: number, health: number, wave: number }
  Attack = 'attack',
  Pause = 'pause',
}
