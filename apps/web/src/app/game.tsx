import { Tower } from '@ndl/shared';
import { Application, Graphics } from 'pixi.js';
import UsernameMenu from '../menus/UsernameMenu';
import TowerModal from '../modals/towerModal';
import { User } from '@ndl/shared';

import React, { useEffect } from 'react';
import { GAME_HEIGHT, GAME_WIDTH } from '../lib/game/position';
import { GameState } from '../lib/game/state';

const app = new Application({
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
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

  useEffect(() => {
    if (containerRef.current) {
      const app = new Application({
        width: 3200,
        height: 1600,
        backgroundColor: 0x1099bb,
      });

      const graphic = new Graphics();

      graphic.beginFill(0xff0000);
      graphic.drawRect(0, 0, 100, 100);
      graphic.endFill();
      graphic.interactive = true;

      const game = new GameState();

      graphic.on('click', () => {
        game.enemies[0].x += 10;
      });

      app.stage.addChild(game.getGlobalContainer());
      console.log(game.getGlobalContainer());
      app.stage.addChild(graphic);

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
      <div ref={containerRef} className={'game-container'} />
    </>
  );
}
