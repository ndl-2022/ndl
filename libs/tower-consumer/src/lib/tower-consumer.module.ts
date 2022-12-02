import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TowerConsumerService } from './tower-consumer.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [TowerConsumerService],
  exports: [TowerConsumerService],
})
export class TowerConsumerModule {}
