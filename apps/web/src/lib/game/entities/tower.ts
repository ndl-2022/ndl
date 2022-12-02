import { getTowerType } from '../sprites';
import { Entity } from './entity';

// Tower entity
export class GameTower extends Entity {
  public towerType: string;

  constructor(id: string, towerType: string) {
    const typeData = getTowerType(towerType);

    if (!typeData) {
      throw new Error(`No sprite found for enemy ${towerType}`);
    }

    super(id, typeData.sprite);

    this.towerType = towerType;
  }
}
