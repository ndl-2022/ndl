import { EnemyInstance } from '@ndl/shared';
import { getEnemyType } from '../sprites';
import { Entity } from './entity';

// Enemy entity
export class GameEnemy
  extends Entity
  implements Omit<Omit<EnemyInstance, 'x'>, 'y'>
{
  public health!: number;
  public type: string;
  public id: string;

  constructor(instance: EnemyInstance) {
    const typeData = getEnemyType(instance.type);

    if (!typeData) {
      throw new Error(`No sprite found for enemy ${instance.type}`);
    }

    super(typeData.sprite);
    this.id = instance.id;

    this.type = instance.type;
    this.copyInstance(instance);
  }

  copyInstance(instance: EnemyInstance) {
    this.health = instance.health;
    this.x = instance.x;
    this.y = instance.y;
  }
}
