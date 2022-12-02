import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';

export enum TowerEntitySex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum TowerEntityDamageType {
  PHYSICAL = 'physical',
}

@Table({
  tableName: 'tower',
  freezeTableName: true,
})
export class TowerEntity extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.ENUM({
      values: Object.values(TowerEntitySex),
    }),
    allowNull: false,
  })
  declare sex: TowerEntitySex;

  @Column({
    type: DataType.INTEGER,
    validate: {
      min: 0.01,
      // TODO: max: maxAttackRange
    },
    allowNull: false,
  })
  declare attackRange: number;

  @Column({
    type: DataType.INTEGER,
    validate: {
      min: 0.01,
    },
    allowNull: false,
  })
  declare damage: number;

  @Column({
    type: DataType.INTEGER,
    validate: {
      min: 0.01,
      // TODO: only exclude 0
    },
    allowNull: false,
  })
  declare attackSpeed: number;

  @Column({
    type: DataType.INTEGER,
    validate: {
      min: 0,
    },
    allowNull: false,
  })
  declare slowness: number;

  @Column
  declare damageType: TowerEntityDamageType;

  @Column({
    type: DataType.INTEGER,
    validate: {
      min: 0.01,
    },
    allowNull: false,
  })
  declare maxAttackRange: number;

  @Column({
    type: DataType.INTEGER,
    validate: {
      min: 0.01,
    },
    allowNull: false,
  })
  declare maxDamage: number;

  @Column({
    type: DataType.INTEGER,
    validate: {
      min: 0.01,
    },
    allowNull: false,
  })
  declare maxAttackSpeed: number;

  @Column({
    type: DataType.INTEGER,
    validate: {
      min: 0,
    },
    allowNull: false,
  })
  declare maxSlowness: number;
}