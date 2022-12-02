import { Tower, UserRole } from '@ndl/shared';
import { Application, Graphics } from 'pixi.js';
import UsernameMenu from '../menus/UsernameMenu';
import TowerModal from '../modals/towerModal';
import { User } from '@ndl/shared';
import WaitingRoomMenu from '../menus/WaitingRoomMenu';
import JoinRoomMenu from '../menus/JoinRoomMenu';
import RoomMenu from '../menus/RoomMenu';

import React, { useEffect } from 'react';
import { GAME_HEIGHT, GAME_WIDTH } from '../lib/game/position';
import { GameState } from '../lib/game/state';
import {
  connect,
  onJoin,
  sendJoinRoom,
  sendPlaceTower,
} from '@ndl/websocketclient';
import { Socket } from 'socket.io-client';
import { Button } from '@mui/material';

const app = new Application({
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: 0x1099bb,
});

enum GameMenu {
  USERNAME,
  ROOM,
  WAITINGROOM,
  JOINROOM,
  GAME,
}

const game = new GameState();
interface Modals {
  tower: boolean;
}

export default function Game() {
  const [socket, setSocket] = React.useState<Socket | undefined>(undefined);
  const [currentMenu, setCurrentMenu] = React.useState<GameMenu>(
    GameMenu.USERNAME
  );
  const [users, setUsers] = React.useState<User[]>([]);
  const [modals, setModals] = React.useState<Modals>({ tower: false });
  const [tower, setTower] = React.useState<Tower | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      app.stage.addChild(game.getGlobalContainer());
      console.log(game.getGlobalContainer());

      const container = containerRef.current;

      container.appendChild(app.view as HTMLCanvasElement);
      app.start();

      const roomsocket = connect('http://localhost:4000/');
      onJoin(roomsocket, handleUserJoin);
      setSocket(roomsocket);

      return () => {
        app.stop();
        container.removeChild(app.view as unknown as Node);
      };
    }
    return undefined;
  }, []);

  const handleUserJoin = setUsers;

  const handleSetUsername = (username: string) => {
    setUsers([...users, { username, role: UserRole.Male }]);
    setCurrentMenu(GameMenu.ROOM);
  };

  const handleJoinRoomQuit = (roomCode: string) => {
    if (socket) {
      sendJoinRoom(socket, { room: roomCode, username: users[0].username });
    }
    setCurrentMenu(GameMenu.WAITINGROOM);
  };

  const handleJoinRoom = () => {
    setCurrentMenu(GameMenu.JOINROOM);
  };

  const handleReady = () => {
    setCurrentMenu(GameMenu.GAME);
  };

  const getCurrentMenu = () => {
    switch (currentMenu) {
      case GameMenu.USERNAME:
        return <UsernameMenu onSubmit={handleSetUsername} />;
      case GameMenu.ROOM:
        return <RoomMenu onJoinRoom={handleJoinRoom} />;
      case GameMenu.WAITINGROOM:
        return <WaitingRoomMenu users={users} onReady={handleReady} />;
      case GameMenu.JOINROOM:
        return <JoinRoomMenu onSubmit={handleJoinRoomQuit} />;
      case GameMenu.GAME:
        return <div>Game</div>;
      default:
        return <div>Username</div>;
    }
  };

  const handleAddTower = async () => {
    if (!socket) return;
    const pos = await game.getTowerPlacement();

    sendPlaceTower(socket, {
      towerType: 'test',
      x: pos.x,
      y: pos.y,
    });
  };

  return (
    <>
      {!(currentMenu === GameMenu.GAME) ? (
        <div className="modal-container">
          {getCurrentMenu()}
          {modals.tower && tower && <TowerModal tower={tower} />}
        </div>
      ) : (
        <div style={{ position: 'absolute' }}>
          <Button variant="contained" onClick={handleAddTower}>
            Add tower
          </Button>
        </div>
      )}
      <div ref={containerRef} className={'game-container'} />
    </>
  );
}
