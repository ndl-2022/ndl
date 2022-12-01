import { Application, Container, Graphics, Sprite } from 'pixi.js';
import React, { useEffect } from 'react';

const sprite = Sprite.from('https://pixijs.io/guides/static/images/sample.png');

const app = new Application({
  width: 3200,
  height: 1600,
  backgroundColor: 0x1099bb,
});

export default function Game() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;

      container.appendChild(app.view as unknown as Node);
      app.start();

      return () => {
        app.stop();
        container.removeChild(app.view as unknown as Node);
        console.log('unmount');
      };
    }
    return undefined;
  }, []);

  return <div ref={containerRef} className={'game-container'} />;
}
