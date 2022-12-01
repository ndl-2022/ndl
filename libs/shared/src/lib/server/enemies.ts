export interface EnemiesEvent {
  enemies: Enemy[];
  deadEnemies: string[];
}

export interface EnemyInstance {
  id: string;
  type: string;
  x: number;
  y: number;
  health: number;
}

export interface Enemy {
  id: string;
  name: string;
  health: number;
  speed: number;
  sprite: string; // path to sprite
  description: string;
  externalResourceLink: string;
}
