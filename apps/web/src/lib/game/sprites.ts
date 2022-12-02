import { Enemy, TileType, Tower } from '@ndl/shared';
import { Assets } from 'pixi.js';

const ErrSpritesNotLoaded = new Error('Sprites not loaded');

let spritesLoaded = false;
export const tilesSprites: Record<TileType, string> = {
  base: 'assets/tiles/base.png',
  female: 'assets/tiles/female.png',
  male: 'assets/tiles/male.png',
  path: 'assets/tiles/path.png',
};
let towerTypes: Tower[] = [];
let enemyTypes: Enemy[] = [];

// Load the entity types and sprites from the server
export async function loadEntities() {
  if (spritesLoaded) {
    return;
  }

  // fetch tower types
  towerTypes = await fetch('http://localhost:3333/api/towers').then((res) => res.json());
  // fetch enemy types
  enemyTypes = await fetch('http://localhost:3334/api/enemy').then((res) => res.json());
  // load tower sprites
  towerTypes.forEach((tower) => {
    Assets.load(tower.sprite);
  });

  // load enemy sprites
  enemyTypes.forEach((enemy) => {
    Assets.load(enemy.sprite);
  });

  // load tiles sprites
  Object.values(tilesSprites).forEach((sprite) => {
    Assets.load(sprite);
  });

  spritesLoaded = true;
}

// Get the list of tower types
export function getTowerTypes() {
  if (!spritesLoaded) throw ErrSpritesNotLoaded;

  return towerTypes;
}

// Get the data fo a tower type
export function getTowerType(id: string) {
  if (!spritesLoaded) throw ErrSpritesNotLoaded;

  return towerTypes.find((t) => t.id === id);
}

// Get the list of enemy types
export function getEnemyTypes() {
  if (!spritesLoaded) throw ErrSpritesNotLoaded;

  return enemyTypes;
}

// Get a specific enemy type
export function getEnemyType(id: string) {
  if (!spritesLoaded) throw ErrSpritesNotLoaded;

  return enemyTypes.find((e) => e.id === id);
}
