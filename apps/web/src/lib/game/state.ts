import { EnemyInstance, Tile, TileType } from '@ndl/shared';
import { Container } from 'pixi.js';
import { GameEnemy } from './entities/enemy';
import { GameTile } from './entities/tile';
import { BOARD_HEIGHT, BOARD_WIDTH } from './position';

// Class storing the game state
export class GameState {
  tiles: GameTile[][];
  enemies: GameEnemy[];

  boardContainer: Container;
  hudContainer: Container;

  globalContainer: Container;

  constructor() {
    this.tiles = [];

    this.enemies = [];

    this.globalContainer = new Container();
    this.globalContainer.sortableChildren = true;

    this.boardContainer = new Container();
    this.boardContainer.zIndex = 0;
    this.hudContainer = new Container();
    this.hudContainer.zIndex = 1;

    this.globalContainer.addChild(this.boardContainer);
    this.globalContainer.addChild(this.hudContainer);

    // fill the board
    this.generateBoard();
  }

  // Generate the board with tiles
  generateBoard() {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      this.tiles[x] = [];
      for (let y = 0; y < BOARD_HEIGHT; y++) {
        this.tiles[x][y] = new GameTile({
          x,
          y,
          type: TileType.Path,
        });
        this.boardContainer.addChild(this.tiles[x][y].getSprite());
      }
    }
  }

  getGlobalContainer() {
    return this.globalContainer;
  }

  async getTowerPlacement() {
    return new Promise<{ x: number; y: number }>((resolve) => {
      this.tiles.forEach((row, x) => {
        row.forEach((tile, y) => {
          // unregister everything and return
          const res = () => {
            this.tiles.forEach((row) => {
              row.forEach((tile) => {
                if (!tile.tower) {
                  tile.sprite.interactive = false;
                  tile.sprite.off('click', res);
                }
              });
            });
            resolve({ x, y });
          };

          tile.getSprite().interactive = true;

          // register the click
          tile.getSprite().on('click', () => res());
        });
      });
    });
  }

  // merge with the new state
  mergeEnemies(enemies: EnemyInstance[], enemiesToRemove: string[]) {
    enemiesToRemove.forEach((id) => this.removeEnemy(id));

    enemies.forEach((enemy) => {
      const existingEnemy = this.enemies.find((e) => e.id === enemy.id);
      if (existingEnemy) {
        existingEnemy.copyInstance(enemy);
      } else {
        this.addEnemy(enemy.id, enemy, enemy.x, enemy.y);
      }
    });
  }

  // update the tiles state
  mergeTiles(tiles: Tile[]) {
    tiles.forEach((tile) => {
      this.tiles[tile.x][tile.y].copyInstance(tile);
    });
  }

  // enemies management

  addEnemy(id: string, instance: EnemyInstance, x: number, y: number) {
    const enemy = new GameEnemy(instance);
    enemy.x = x;
    enemy.y = y;
    this.enemies.push(enemy);
    this.boardContainer.addChild(enemy.getSprite());
  }
  removeEnemy(id: string) {
    const index = this.enemies.findIndex((e) => e.id === id);
    if (index !== -1) {
      this.boardContainer.removeChild(this.enemies[index].getSprite());
      this.enemies.splice(index, 1);
    }
  }
}
