import { Tile, TileType, TowerInstance } from '@ndl/shared';
import { Texture } from 'pixi.js';
import { getTowerType, tilesSprites } from '../sprites';
import { Entity } from './entity';

// Tile entity
export class GameTile extends Entity implements Tile {
  public type!: TileType;
  public tower?: TowerInstance;

  constructor(instance: Tile) {
    const typeData = tilesSprites[instance.type];

    if (!typeData) {
      throw new Error(`No sprite found for enemy ${instance.type}`);
    }

    super(typeData);

    // copy the position once

    this.x = instance.x;
    this.y = instance.y;

    this.copyInstance(instance);
  }

  copyInstance(instance: Tile) {
    this.type = instance.type;

    this.tower = instance.tower;
    if (instance.tower) {
      const towerData = getTowerType(instance.tower.type);
      if (towerData) {
        this.sprite.texture = Texture.from(towerData.sprite);
      }
    } else {
      this.sprite.texture = Texture.from(tilesSprites[instance.type]);
    }
  }
}
