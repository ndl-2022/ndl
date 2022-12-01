import { Module } from '@nestjs/common';
import { EnemyProviderController } from './enemy-provider.controller';
import { EnemyProviderService } from './enemy-provider.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { EnemyEntity } from '@ndl/shared';

@Module({
  controllers: [EnemyProviderController],
  providers: [EnemyProviderService],
  exports: [],
  imports: [SequelizeModule.forFeature([EnemyEntity])],
})
export class EnemyProviderModule {}
