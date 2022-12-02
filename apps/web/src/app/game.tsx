import { Tower } from '@ndl/shared';
import { Application, Container, Graphics, Sprite } from 'pixi.js';
import React, { useEffect, useState } from 'react';
import TowerModal from '../modals/towerModal';
import TowerMenu from '../modals/towerModal';

const sprite = Sprite.from('https://pixijs.io/guides/static/images/sample.png');

const width = 3200;
const height = 1600;

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
  const [currentMenu, setCurrentMenu] = useState<GameMenu>(GameMenu.USERNAME);
  const [modals, setModals] = useState<Modals>({ tower: false });
  const [tower, setTower] = useState<Tower | null>(null);
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

  return (
    <>
      <div className="modal-container">
        {modals.tower && tower && <TowerModal tower={tower} />}
      </div>
      <div ref={containerRef} className={'game-container'} />;
    </>
  );
}
