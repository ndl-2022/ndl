import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EnemyProviderModule } from '@ndl/enemy-provider';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.ENEMY_DB_HOST || 'localhost',
      port: parseInt(process.env.ENEMY_DB_PORT) || 5432,
      username: process.env.ENEMY_DB_USERNAME || 'postgres',
      password: process.env.ENEMY_DB_PASSWORD || 'postgres',
      database: process.env.ENEMY_DB_DATABASE || 'postgres',
      models: [],
      autoLoadModels: true,
      logging: process.env.NODE_ENV === 'PRODUCTION' ? false : Logger.debug,
      pool: {
        max: process.env.NODE_ENV === 'PRODUCTION' ? 50 : 2,
        min: process.env.NODE_ENV === 'PRODUCTION' ? 20 : 2,
        idle: 5000,
      },
    }),
    EnemyProviderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
