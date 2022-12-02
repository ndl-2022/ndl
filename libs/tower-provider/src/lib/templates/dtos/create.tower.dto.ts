import { IsEnum, IsNumber, IsString, IsUrl, Min } from 'class-validator';

export enum TowerSex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum TowerDamageType {
  PHYSICAL = 'physical',
}

export class CreateTowerDTO {
  @IsString()
  id?: string;

  @IsEnum(TowerSex)
  sex: TowerSex;

  @IsNumber()
  @Min(0.01)
  attackRange: number;

  @IsNumber()
  @Min(0.01)
  damage: number;

  @IsNumber()
  @Min(0.01)
  attackSpeed: number;

  @IsNumber()
  @Min(0)
  slowness: number;

  @IsEnum(TowerDamageType)
  damageType: TowerDamageType;

  @IsNumber()
  @Min(0.01)
  maxAttackRange: number;

  @IsNumber()
  @Min(0.01)
  maxDamage: number;

  @IsNumber()
  @Min(0.01)
  maxAttackSpeed: number;

  @IsNumber()
  @Min(0)
  maxSlowness: number;

  @IsUrl()
  sprite: string;
}
