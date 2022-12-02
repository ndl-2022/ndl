import { Module } from '@nestjs/common';
import { TowerConsumerService } from './tower-consumer.service';

@Module({
  controllers: [],
  providers: [TowerConsumerService],
  exports: [],
})
export class TowerConsumerModule {}
