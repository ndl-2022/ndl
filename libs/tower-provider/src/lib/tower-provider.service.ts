import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TowerEntity } from '@ndl/shared';
import { CreateTowerDTO } from './templates/dtos/create.tower.dto';
import { UpdateTowerDTO } from './templates/dtos/update.tower.dto';
import { EmptyResultError } from 'sequelize';

export enum TowerProviderServiceError {
  INVALID_FILTER_OPTIONS = 'Invalid filter options',
  INVALID_SORT_OPTIONS = 'Invalid sort options',
  NOT_FOUND = 'Tower not found',
}

@Injectable()
export class TowerProviderService {
  constructor(
    @InjectModel(TowerEntity)
    private readonly towerEntity: typeof TowerEntity
  ) {}

  /**
   * It returns a promise that resolves to an object containing the data and total properties
   * @returns An object with two properties: data and total.
   */
  async getTowers() {
    try {
      return {
        data: await this.towerEntity.findAll(),
        total: await this.towerEntity.count(),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * It returns a tower by its id
   * @param {string} towerId - string - The id of the tower to be retrieved
   * @returns The tower entity
   */
  getTowerById(towerId: string) {
    try {
      return this.towerEntity.findByPk(towerId);
    } catch (e) {
      if (e instanceof EmptyResultError)
        throw new Error(TowerProviderServiceError.NOT_FOUND);
      throw new Error(e);
    }
  }

  /**
   * It takes a CreateTowerDTO object, logs it, and then creates a new tower entity with the data from
   * the DTO
   * @param {CreateTowerDTO} tower - CreateTowerDTO
   * @returns The towerEntity.create method is being called with the tower object.
   */
  createTower(tower: CreateTowerDTO) {
    Logger.debug(tower);
    try {
      return this.towerEntity.create({
        ...tower,
        attackRange:
          tower.attackRange > tower.maxAttackRange
            ? tower.maxAttackRange
            : tower.attackRange,
        attackSpeed:
          tower.attackSpeed > tower.maxAttackSpeed
            ? tower.maxAttackSpeed
            : tower.attackSpeed,
        damage: tower.damage > tower.maxDamage ? tower.maxDamage : tower.damage,
        slowness:
          tower.slowness > tower.maxSlowness
            ? tower.maxSlowness
            : tower.slowness,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * It updates a tower in the database
   * @param {string} towerId - The id of the tower to update
   * @param {UpdateTowerDTO} tower - UpdateTowerDTO - This is the data that we want to update.
   * @returns The updated tower
   */
  updateTower(towerId: string, tower: UpdateTowerDTO) {
    try {
      return this.towerEntity.update(
        {
          ...tower,
          attackRange:
            tower.attackRange > tower.maxAttackRange
              ? tower.maxAttackRange
              : tower.attackRange,
          attackSpeed:
            tower.attackSpeed > tower.maxAttackSpeed
              ? tower.maxAttackSpeed
              : tower.attackSpeed,
          damage:
            tower.damage > tower.maxDamage ? tower.maxDamage : tower.damage,
          slowness:
            tower.slowness > tower.maxSlowness
              ? tower.maxSlowness
              : tower.slowness,
        },
        { where: { id: towerId } }
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * Delete a tower by its id.
   * @param {string} towerId - The id of the tower to delete.
   * @returns The towerEntity is being returned.
   */
  deleteTower(towerId: string) {
    return this.towerEntity.destroy({ where: { id: towerId } });
  }
}
