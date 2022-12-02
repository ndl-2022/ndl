import { Sprite } from 'pixi.js';

// abstract entity definition, the entity has a sprite and an id
export abstract class Entity {
  id: string;
  sprite: Sprite;

  constructor(id: string, spriteUrl: string) {
    this.id = id;
    this.sprite = Sprite.from(spriteUrl);
  }

  get x() {
    return this.sprite.x;
  }
  set x(x: number) {
    this.sprite.x = x;
  }
  get y() {
    return this.sprite.y;
  }
  set y(y: number) {
    this.sprite.y = y;
  }
  getSprite() {
    return this.sprite;
  }
  getId() {
    return this.id;
  }
}
