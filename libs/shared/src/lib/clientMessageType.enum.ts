export enum ClientMessageType {
  LeaveRoom = 'leaveRoom',
  PlaceTower = 'placeTower',
  UpgradeTower = 'upgradeTower',
  Ready = 'ready', // used to start the game and indicate they have seen the "new boss" message
  Pause = 'pause',
}
