import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';

@Table({
  tableName: 'enemy',
  freezeTableName: true,
})
export class EnemyEntity extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    validate: {
      len: [1, 50],
    },
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.INTEGER,
    validate: {
      min: 1,
    },
    allowNull: false,
  })
  declare health: number;

  @Column({
    type: DataType.INTEGER,
    validate: {
      min: 1,
    },
    allowNull: false,
  })
  declare speed: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare sprite: string; // path to sprite

  @Column({
    type: DataType.STRING,
    validate: {
      len: [0, 500],
    },
    defaultValue: '',
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.STRING,
    defaultValue: '',
    allowNull: false,
  })
  declare externalResourceLink: string;
}
