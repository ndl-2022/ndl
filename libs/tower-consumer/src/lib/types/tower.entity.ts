export class TowerEntity {
  id: string;
  sex: TowerSex;
  cost: number;
  attackRange: number;
  damage: number;
  attackSpeed: number;
  slowness: number;
  damageType: TowerDamageType;
  maxAttackRange: number;
  maxDamage: number;
  maxAttackSpeed: number;
  maxSlowness: number;
  sprite: string;
}

export enum TowerSex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum TowerDamageType {
  PHYSICAL = 'physical',
}
