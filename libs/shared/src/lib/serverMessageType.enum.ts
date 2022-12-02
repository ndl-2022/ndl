/* Defining the types of messages that can be sent from the server to the client. */
export enum ServerMessageType {
  UserJoined = 'userJoined',
  UserLeft = 'userLeft',
  Enemies = 'enemies', // { enemies: Enemy[], deadEnemies: Enemy[] }
  NewEnemyInfo = 'newEnemyInfo', // { name: string, description: string, wikiLink: string }
  GameState = 'gameState', // { gold: number, health: number, wave: number }
  Attack = 'attack',
  Pause = 'pause',
  MapState = 'mapState',
}
