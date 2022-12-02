import { getEnemyType } from '../sprites';
import { Entity } from './entity';


// Enemy entity
export class GameEnemy extends Entity {
  public health: number;
  public enemyType: string;

  constructor(id: string, enemyType: string) {
    const typeData = getEnemyType(enemyType);

    if (!typeData) {
      throw new Error(`No sprite found for enemy ${enemyType}`);
    }

    super(id, typeData.sprite);

    this.enemyType = enemyType;
    this.health = typeData.health;
  }
}
