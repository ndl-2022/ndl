import { TowerInstance } from './tower';

export interface MapState {
  map: Map;
}

export enum TileType {
  Male = 'male',
  Female = 'female',
  Path = 'path',
  Base = 'base',
}
export interface Tile {
  x: number;
  y: number;
  type: TileType;
  tower?: TowerInstance;
}

export type Map = Tile[][];
