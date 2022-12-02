import { Module } from '@nestjs/common';
import { EnemyConsumerService } from './enemy-consumer.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [],
  providers: [EnemyConsumerService],
  exports: [EnemyConsumerService],
  imports: [
    HttpModule.register({
      baseURL: process.env.ENEMY_API_URL || 'http://localhost:3333',
    }),
  ],
})
export class EnemyConsumerModule {}
