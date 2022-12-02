import { Enemy, Tower } from '@ndl/shared';

const ErrSpritesNotLoaded = new Error('Sprites not loaded');

let spritesLoaded = false;
const towerTypes: Tower[] = [];
const enemyTypes: Enemy[] = [];

// Load the entity types and sprites from the server
export async function loadEntities() {
  if (spritesLoaded) {
    return;
  }

  // TODO :

  // fetch tower types
  // fetch enemy types
  // load sprites

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
