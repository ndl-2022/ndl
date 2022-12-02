import { Sprite } from 'pixi.js';
import {
  pixelToTiles,
  tilesToPixel,
  TILE_HEIGHT,
  TILE_WIDTH,
} from '../position';

// abstract entity definition, the entity has a sprite and an id
export abstract class Entity {
  sprite: Sprite;

  constructor(spriteUrl: string) {
    this.sprite = Sprite.from(spriteUrl);
    this.sprite.interactive = true;
    this.sprite.width = TILE_WIDTH;
    this.sprite.height = TILE_HEIGHT;
  }

  get x() {
    return pixelToTiles(this.sprite.x, 0)[0];
  }
  set x(x: number) {
    this.sprite.x = tilesToPixel(x, 0)[0];
  }
  get y() {
    return pixelToTiles(0, this.sprite.y)[1];
  }
  set y(y: number) {
    this.sprite.y = tilesToPixel(0, y)[1];
  }
  getSprite() {
    return this.sprite;
  }
}
