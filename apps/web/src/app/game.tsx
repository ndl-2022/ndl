import { Tower } from '@ndl/shared';
import { Application } from 'pixi.js';
import React from 'react';
import UsernameMenu from '../menus/UsernameMenu';
import TowerModal from '../modals/towerModal';
import { User } from '@ndl/shared';

function pixelToTiles(x: number, y: number) {
  return [Math.floor(x / 32), Math.floor(y / 16)];
}

function tilesToPixel(x: number, y: number) {
  return [x * 32, y * 16];
}

const app = new Application({
  width: 3200,
  height: 1600,
  backgroundColor: 0x1099bb,
});

enum GameMenu {
  USERNAME,
  ROOM,
  CREATEROOM,
  JOINROOM,
  GAME,
}

interface Modals {
  tower: boolean;
}

export default function Game() {
  const [currentMenu, setCurrentMenu] = React.useState<GameMenu>(
    GameMenu.USERNAME
  );
  const [users, setUsers] = React.useState<User[]>([]);
  const [modals, setModals] = React.useState<Modals>({ tower: false });
  const [tower, setTower] = React.useState<Tower | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;

      container.appendChild(app.view as HTMLCanvasElement);
      app.start();

      return () => {
        app.stop();
        container.removeChild(app.view as unknown as Node);
        console.log('unmount');
      };
    }
    return undefined;
  }, []);

  const handleSetUsername = (username: string) => {
    setUsers([...users, { username }]);
    setCurrentMenu(GameMenu.ROOM);
  };

  const getCurrentMenu = () => {
    switch (currentMenu) {
      case GameMenu.USERNAME:
        return <UsernameMenu onSubmit={handleSetUsername} />;
      case GameMenu.ROOM:
        return <div>Room</div>;
      case GameMenu.CREATEROOM:
        return <div>Create Room</div>;
      case GameMenu.JOINROOM:
        return <div>Join Room</div>;
      case GameMenu.GAME:
        return <div>Game</div>;
      default:
        return <div>Username</div>;
    }
  };

  return (
    <>
      <div className="modal-container">
        {getCurrentMenu()}
        {modals.tower && tower && <TowerModal tower={tower} />}
      </div>
      <div ref={containerRef} className={'game-container'} />;
    </>
  );
}
