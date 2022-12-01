import { StatType } from '../server/tower';

export interface UpgradeTower {
  towerId: string;
  stat: StatType;
  value: number;
}
