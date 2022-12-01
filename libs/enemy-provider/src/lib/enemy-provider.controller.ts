import { EnemyEntity } from '@ndl/shared';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  EnemyProviderService,
  EnemyProviderServiceError,
} from './enemy-provider.service';
import { CreateEnemyDto } from './templates/dtos/create.enemy.dto';
import { UpdateEnemyDto } from './templates/dtos/update.enemy.dto';
import { Response } from '@ndl/shared';

@Controller('enemy')
export class EnemyProviderController {
  constructor(private readonly enemyService: EnemyProviderService) {}

  @Get()
  async getEnemies() {
    try {
      const enemies = await this.enemyService.getEnemies();

      return {
        data: enemies.data,
        metadata: {
          total: enemies.total,
        },
      } as Response<EnemyEntity[]>;
    } catch (e) {
      Logger.error(e, 'EnemyProviderController');
      throw new InternalServerErrorException();
    }
  }

  @Get(':userId')
  async getEnemy(@Param('userId') userId: string) {
    try {
      return {
        data: await this.enemyService.getEnemyById(userId),
        metadata: {},
      } as Response<EnemyEntity>;
    } catch (e) {
      switch (e) {
        case EnemyProviderServiceError.NOT_FOUND:
          Logger.debug(
            EnemyProviderServiceError.NOT_FOUND,
            'EnemyProviderController'
          );
          throw new BadRequestException('Enemy not found');
        default:
          Logger.error(e, 'EnemyProviderController');
          throw new InternalServerErrorException();
      }
    }
  }

  @Post()
  async createEnemy(@Body() enemyDto: CreateEnemyDto) {
    try {
      return {
        data: await this.enemyService.createEnemy(enemyDto),
        metadata: {},
      } as Response<EnemyEntity>;
    } catch (e) {
      Logger.error(e, 'EnemyProviderController');
      throw new InternalServerErrorException();
    }
  }

  @Patch(':userId')
  async updateEnemy(
    @Body() enemyDto: UpdateEnemyDto,
    @Param('userId') userId: string
  ) {
    try {
      return {
        data: {
          affectedCount: (
            await this.enemyService.updateEnemy(userId, enemyDto)
          )[0],
        },
        metadata: {},
      } as Response<{ affectedCount: number }>;
    } catch (e) {
      switch (e) {
        case EnemyProviderServiceError.NOT_FOUND:
          Logger.debug(
            EnemyProviderServiceError.NOT_FOUND,
            'EnemyProviderController'
          );
          throw new BadRequestException('Enemy not found');
        default:
          Logger.error(e, 'EnemyProviderController');
          throw new InternalServerErrorException();
      }
    }
  }

  @Delete(':userId')
  async deleteEnemy(@Param('userId') userId: string) {
    try {
      return {
        data: {
          affectedCount: await this.enemyService.deleteEnemy(userId),
        },
        metadata: {},
      } as Response<{ affectedCount: number }>;
    } catch (e) {
      switch (e) {
        case EnemyProviderServiceError.NOT_FOUND:
          Logger.debug(
            EnemyProviderServiceError.NOT_FOUND,
            'EnemyProviderController'
          );
          throw new BadRequestException('Enemy not found');
        default:
          Logger.error(e, 'EnemyProviderController');
          throw new InternalServerErrorException();
      }
    }
  }

  @Post('random')
  async getRandomEnemy() {
    try {
      return {
        data: await this.enemyService.getRandomEnemy(),
        metadata: {},
      } as Response<EnemyEntity>;
    } catch (e) {
      Logger.error(e, 'EnemyProviderController');
      throw new InternalServerErrorException();
    }
  }
}
