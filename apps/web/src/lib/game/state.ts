import { Container } from 'pixi.js';
import { GameEnemy } from './entities/enemy';
import { GameTower } from './entities/tower';

// Class storing the game state
export class GameState {
  towers: GameTower[];
  enemies: GameEnemy[];

  boardContainer: Container;

  constructor() {
    this.towers = [];
    this.enemies = [];

    this.boardContainer = new Container();
  }

  getBoardContainer() {
    return this.boardContainer;
  }

  // towers management

  addTower(id: string, typeId: string, x: number, y: number) {
    const tower = new GameTower(id, typeId);
    tower.x = x;
    tower.y = y;
    this.towers.push(tower);
    this.boardContainer.addChild(tower.getSprite());
  }
  removeTower(id: string) {
    const index = this.towers.findIndex((t) => t.getId() === id);
    if (index !== -1) {
      this.boardContainer.removeChild(this.towers[index].getSprite());
      this.towers.splice(index, 1);
    }
  }

  // enemies management

  addEnemy(id: string, typeId: string, x: number, y: number) {
    const enemy = new GameEnemy(id, typeId);
    enemy.x = x;
    enemy.y = y;
    this.enemies.push(enemy);
    this.boardContainer.addChild(enemy.getSprite());
  }
  removeEnemy(id: string) {
    const index = this.enemies.findIndex((e) => e.getId() === id);
    if (index !== -1) {
      this.boardContainer.removeChild(this.enemies[index].getSprite());
      this.enemies.splice(index, 1);
    }
  }
}
