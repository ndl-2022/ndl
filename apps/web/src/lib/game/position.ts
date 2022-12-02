export const GAME_WIDTH = 3200;
export const GAME_HEIGHT = 1600;

export const BOARD_WIDTH = 32;
export const BOARD_HEIGHT = 16;

export const PADDING_RIGHT = 100;
export const PADDING_BOTTOM = 50;
export const PADDING_LEFT = 100;
export const PADDING_TOP = 50;

export const TILE_WIDTH =
  (GAME_WIDTH - PADDING_LEFT - PADDING_RIGHT) / BOARD_WIDTH;
export const TILE_HEIGHT =
  (GAME_HEIGHT - PADDING_TOP - PADDING_BOTTOM) / BOARD_HEIGHT;

console.log('TILE_WIDTH', TILE_WIDTH);
console.log('TILE_HEIGHT', TILE_HEIGHT);

export function pixelToTiles(x: number, y: number) {
  return [
    Math.floor((x - PADDING_LEFT) / TILE_WIDTH),
    Math.floor((y - PADDING_TOP) / TILE_HEIGHT),
  ];
}

export function tilesToPixel(x: number, y: number) {
  return [x * TILE_WIDTH + PADDING_LEFT, y * TILE_HEIGHT + PADDING_TOP];
}
