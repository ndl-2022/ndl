import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEnemyDto } from './templates/dtos/create.enemy.dto';
import { EnemyEntity } from '@ndl/entities';
import { EmptyResultError } from 'sequelize';
import { UpdateEnemyDto } from './templates/dtos/update.enemy.dto';

export enum EnemyProviderServiceError {
  NOT_FOUND = 'Enemy not found',
}

@Injectable()
export class EnemyProviderService {
  constructor(
    @InjectModel(EnemyEntity)
    private enemyModel: typeof EnemyEntity
  ) {}

  /**
   * It returns a list of enemies from the database, with the option to filter, sort, and paginate the
   * results
   * @param {QueryOptions} queryOptions - QueryOptions
   * @returns An object with a data property storing your result and a total property returning the total number of item in DB (for pagination).
   */
  async getEnemies() {
    try {
      return {
        data: await this.enemyModel.findAll(),
        total: await this.enemyModel.count(),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * Get an enemy by id.
   * @param {string} id - string - The id of the enemy to get
   * @returns The enemy with the given id.
   */
  async getEnemyById(id: string) {
    try {
      return await this.enemyModel.findByPk(id);
    } catch (e) {
      if (e instanceof EmptyResultError)
        throw new Error(EnemyProviderServiceError.NOT_FOUND);
      throw new Error(e);
    }
  }

  async getRandomEnemy() {
    try {
      return await this.enemyModel.findOne({
        order: this.enemyModel.sequelize.random(),
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * It creates a new enemy in the database
   * @param {CreateEnemyDto} enemyDto - The data of the enemy to create
   * @returns The enemy that was created.
   */
  async createEnemy(enemyDto: CreateEnemyDto) {
    try {
      return await this.enemyModel.create({
        ...enemyDto,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * It updates the enemy with the given id with the given enemyDto
   * @param {string} id - string - The id of the enemy to update
   * @param {UpdateEnemyDto} enemyDto - The data of the enemy to update
   * @returns The number of rows affected by the update.
   */
  async updateEnemy(id: string, enemyDto: UpdateEnemyDto) {
    try {
      return await this.enemyModel.update(
        {
          ...enemyDto,
        },
        {
          where: {
            id,
          },
        }
      );
    } catch (e) {
      if (e instanceof EmptyResultError)
        throw new Error(EnemyProviderServiceError.NOT_FOUND);
      throw new Error(e);
    }
  }

  /**
   * It deletes an enemy from the database
   * @param {string} id - string - The id of the enemy to delete
   * @returns The number of rows deleted.
   */
  async deleteEnemy(id: string) {
    try {
      return await this.enemyModel.destroy({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof EmptyResultError)
        throw new Error(EnemyProviderServiceError.NOT_FOUND);
      throw new Error(e);
    }
  }
}
