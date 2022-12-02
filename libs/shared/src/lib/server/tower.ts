export interface Tower {
  id: string;
  sex: TowerSex;
  attackRange: number;
  damage: number;
  attackSpeed: number;
  slowness: number;
  cost: number;
  damageType: TowerDamageType;
  maxAttackRange: number;
  maxDamage: number;
  maxAttackSpeed: number;
  maxSlowness: number;
  sprite: string;
}

export interface TowerInstance {
  id: string;
  type: string;

  currentAttackRange: number;
  currentDamage: number;
  currentAttackSpeed: number;
  currentSlowness: number;
}

export enum TowerSex {
  MALE = 'male',
  FEMALE = 'female',
}

export enum TowerDamageType {
  PHYSICAL = 'physical',
}

export enum StatType {
  ATTACK = 'attack',
  RANGE = 'range',
  DAMAGE = 'damage',
  ATTACK_SPEED = 'attackSpeed',
  SLOWNESS = 'slowness',
}
