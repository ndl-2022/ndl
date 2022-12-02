import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Logger } from '@nestjs/common';
import { TowerProviderModule } from '@ndl/tower-provider';
import { TowerEntity } from '@ndl/entities';

@Module({
  imports: [
    TowerProviderModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.TOWER_DB_HOST || 'localhost',
      port: parseInt(process.env.TOWER_DB_PORT) || 5432,
      username: process.env.TOWER_DB_USERNAME || 'postgres',
      password: process.env.TOWER_DB_PASSWORD || 'postgres',
      database: process.env.TOWER_DB_DATABASE || 'protectator',
      models: [TowerEntity],
      autoLoadModels: true,
      logging: process.env.NODE_ENV === 'PRODUCTION' ? false : Logger.debug,
      pool: {
        max: process.env.NODE_ENV === 'PRODUCTION' ? 50 : 2,
        min: process.env.NODE_ENV === 'PRODUCTION' ? 20 : 2,
        idle: 5000,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
