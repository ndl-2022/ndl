import { EnemyConsumerModule, EnemyConsumerService } from '@ndl/enemy-consumer';
import { ServerRoom } from '@ndl/shared';
import { TowerConsumerModule, TowerConsumerService } from '@ndl/tower-consumer';
import { Module } from '@nestjs/common';
import { WebsocketProviderGateway } from './websocket-provider.gateway';
import { WebsocketProviderGuard } from './websocket-provider.guard';
import { WebsocketProviderService } from './websocket-provider.service';

@Module({
  imports: [EnemyConsumerModule, TowerConsumerModule],
  controllers: [],
  providers: [
    WebsocketProviderGateway,
    WebsocketProviderGuard,
    {
      provide: 'WEBSOCKET_HANDLER_FACTORY',
      useFactory: (enemyConsumerService, towerConsumerService) => {
        return {
          create: function (
            websocketProviderGateway: WebsocketProviderGateway,
            room: ServerRoom
          ) {
            return new WebsocketProviderService(
              enemyConsumerService,
              towerConsumerService,
              websocketProviderGateway,
              room
            );
          },
        };
      },
      inject: [EnemyConsumerService, TowerConsumerService],
    },
  ],
  exports: [WebsocketProviderGateway, WebsocketProviderGuard],
})
export class WebsocketProviderModule {}
