import { Application, Sprite } from 'pixi.js';
import React, { useEffect } from 'react';

const sprite = Sprite.from('https://pixijs.io/guides/static/images/sample.png');

const app = new Application({
  width: 3200,
  height: 1600,
  backgroundColor: 0x1099bb,
});

export default function Game() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [elapsed, setElapsed] = React.useState(0);

  React.useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;

      container.appendChild(app.view as unknown as Node);
      app.start();
      app.stage.addChild(sprite);

      app.ticker.add((delta) => {
        setElapsed((a) => a + delta);
      });

      return () => {
        app.stop();
        container.removeChild(app.view as unknown as Node);
      };
    }
    return undefined;
  }, [containerRef]);

  useEffect(() => {
    sprite.x = 100 + Math.cos(elapsed / 11.0) * 100.0;
  }, [elapsed]);

  return <div ref={containerRef} className={'game-container'} />;
}
