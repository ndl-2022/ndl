import {
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Body,
  Put,
} from '@nestjs/common';
import { TowerEntity } from '@ndl/entities';
import { Response } from '@ndl/shared';
import { TowerProviderService } from './tower-provider.service';
import { UpdateTowerDTO } from './templates/dtos/update.tower.dto';
import { CreateTowerDTO } from './templates/dtos/create.tower.dto';
import { Logger } from '@nestjs/common';

@Controller('towers')
export class TowerProviderController {
  constructor(private readonly towerService: TowerProviderService) {}

  @Get('/')
  async getTowers() {
    const res = await this.towerService.getTowers();
    Logger.debug(res);
    return {
      data: res.data,
      metadata: {
        total: res.total,
      },
    } as Response<TowerEntity[]>;
  }

  @Post()
  createTower(@Body() towerData: CreateTowerDTO) {
    return {
      data: this.towerService.createTower(towerData),
    } as Response<Promise<TowerEntity>>;
  }

  @Put()
  upgradeTower(
    @Query('towerId') towerId: string,
    @Body() towerData: UpdateTowerDTO
  ) {
    return {
      data: this.towerService.updateTower(towerId, towerData),
    } as Response<Promise<[number]>>;
  }

  @Delete()
  deleteTower(@Query('towerId') towerId: string) {
    return {
      data: this.towerService.deleteTower(towerId),
    } as Response<Promise<number>>;
  }
}
