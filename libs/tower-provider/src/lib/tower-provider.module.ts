import { Module } from '@nestjs/common';
import { TowerProviderController } from './tower-provider.controller';
import { TowerProviderService } from './tower-provider.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TowerEntity } from '@ndl/shared';

@Module({
  controllers: [TowerProviderController],
  providers: [TowerProviderService],
  exports: [],
  imports: [SequelizeModule.forFeature([TowerEntity])],
})
export class TowerProviderModule {}
