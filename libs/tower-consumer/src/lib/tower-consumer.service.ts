import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Response } from '@ndl/shared';
import { TowerEntity } from './types/tower.entity';

@Injectable()
export class TowerConsumerService {
  constructor(private readonly httpService: HttpService) {}

  apiRoot = process.env.TOWER_API_URL;

  /**
   * It returns a list of towers from the API
   * @returns An array of TowerEntity objects.
   */
  async getAllTowers() {
    const res = await firstValueFrom(
      this.httpService.get<Response<TowerEntity>>(this.apiRoot + '/towers')
    );
    return res.data;
  }

  /**
   * It returns a promise that resolves to the first value of the first response from the
   * httpService.get() function
   * @param {string} towerId - string - the id of the tower you want to get
   * @returns A tower object
   */
  async getTowerById(towerId: string) {
    const res = await firstValueFrom(
      this.httpService.get<Response<TowerEntity>>(
        this.apiRoot + '/towers/' + towerId
      )
    );
    return res.data;
  }

  /**
   * It creates a new tower
   * @param {TowerEntity} tower - TowerEntity - this is the tower object that we're sending to the API.
   * @returns The tower that was created.
   */
  async createTower(tower: TowerEntity) {
    const res = await firstValueFrom(
      this.httpService.post<Response<TowerEntity>>(
        this.apiRoot + '/towers',
        tower
      )
    );
    return res.data;
  }

  /**
   * It takes a towerId and a tower object, and returns a tower object
   * @param {string} towerId - The id of the tower to update
   * @param {TowerEntity} tower - TowerEntity - this is the tower object that we want to update.
   * @returns The updated tower
   */
  async updateTower(towerId: string, tower: TowerEntity) {
    const res = await firstValueFrom(
      this.httpService.patch<Response<TowerEntity>>(
        this.apiRoot + '/towers/' + towerId,
        tower
      )
    );
    return res.data;
  }

  /**
   * It deletes a tower from the database and returns the deleted tower
   * @param {string} towerId - The id of the tower to delete
   * @returns The tower that was deleted.
   */
  async deleteTower(towerId: string) {
    const res = await firstValueFrom(
      this.httpService.delete<Response<TowerEntity>>(
        this.apiRoot + '/towers/' + towerId
      )
    );
    return res.data;
  }
}
