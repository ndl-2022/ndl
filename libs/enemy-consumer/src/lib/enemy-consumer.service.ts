import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { EnemyEntity, Response } from '@ndl/shared';
import { firstValueFrom } from 'rxjs';
import { createEnemyBody } from './types/create.enemy.body';
import { updateEnemyBody } from './types/update.enemy.body';

@Injectable()
export class EnemyConsumerService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * It returns a promise that resolves to the data property of the first value of the observable
   * returned by the httpService.get function
   * @returns An array of EnemyEntity objects.
   */
  async getEnemies() {
    return await (
      await firstValueFrom(
        this.httpService.get<Response<EnemyEntity[]>>('/enemy')
      )
    ).data.data;
  }

  /**
   * It returns the first value from the response of the HTTP GET request to the `/enemy/:id` endpoint
   * @param {string} id - string - The id of the enemy you want to get.
   * @returns EnemyEntity
   */
  async getEnemyById(id: string) {
    return await (
      await firstValueFrom(
        this.httpService.get<Response<EnemyEntity>>(`/enemy/${id}`)
      )
    ).data;
  }

  /**
   * > Get a random enemy from the server
   * @returns A Promise that resolves to an EnemyEntity
   */
  async getRandomEnemy() {
    return await (
      await firstValueFrom(
        this.httpService.post<Response<EnemyEntity>>('/enemy/random')
      )
    ).data;
  }

  /**
   * It takes an object of type `createEnemyBody` and returns an object of type `EnemyEntity`
   * @param {createEnemyBody} enemy - createEnemyBody
   * @returns The enemy that was created.
   */
  async createEnemy(enemy: createEnemyBody) {
    return await (
      await firstValueFrom(
        this.httpService.post<Response<EnemyEntity>>('/enemy', enemy)
      )
    ).data;
  }

  /**
   * It takes an id and an enemy object, and returns an enemy object
   * @param {string} id - string - The id of the enemy you want to update
   * @param {updateEnemyBody} enemy - updateEnemyBody
   * @returns The enemy that was updated.
   */
  async updateEnemy(id: string, enemy: updateEnemyBody) {
    return await (
      await firstValueFrom(
        this.httpService.patch<Response<EnemyEntity>>(`/enemy/${id}`, enemy)
      )
    ).data;
  }

  /**
   * It deletes an enemy from the database and returns the deleted enemy
   * @param {string} id - string - The id of the enemy to delete
   * @returns The enemy that was deleted.
   */
  async deleteEnemy(id: string) {
    return await (
      await firstValueFrom(
        this.httpService.delete<Response<EnemyEntity>>(`/enemy/${id}`)
      )
    ).data;
  }
}
