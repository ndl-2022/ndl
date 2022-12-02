import { Enemy, TileType, Tower } from '@ndl/shared';

const ErrSpritesNotLoaded = new Error('Sprites not loaded');

let spritesLoaded = true;
export const tilesSprites: Record<TileType, string> = {
  base: 'assets/tiles/base.png',
  female: 'assets/tiles/female.png',
  male: 'assets/tiles/male.png',
  path: 'assets/tiles/path.png',
};
const towerTypes: Tower[] = [];
const enemyTypes: Enemy[] = [
  {
    id: 'test',
    health: 100,
    reward: 10,
    sprite: 'https://pixijs.io/guides/static/images/sample.png',
    name: 'Test',
    speed: 1,
    description: 'Test',
    externalResourceLink: 'https://en.wikipedia.org/wiki/Test',
  },
];

// Load the entity types and sprites from the server
export async function loadEntities() {
  if (spritesLoaded) {
    return;
  }

  // TODO :

  // fetch tower types
  // fetch enemy types
  // load tower sprites
  // load enemy sprites
  // load tiles sprites

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
